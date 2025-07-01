import { FullConfig, Reporter, Suite, TestCase, TestResult, TestStep } from '@playwright/test/reporter';
import Azure_DevOps from './test/utilities/azure_devops';

class MyReporter implements Reporter {
  private azure_devops: Azure_DevOps;
  private pendingTasks: Promise<void>[] = []; // Track pending tasks per worker

  constructor() {
    this.azure_devops = new Azure_DevOps(""); // Ensure proper initialization
  }

  async onBegin(config: FullConfig, suite: Suite) {
    //console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  async onTestBegin(test: TestCase, result: TestResult) {
    console.log(`Starting test ${test.title}`);
  }
  async onStepBegin(test: TestCase, result: TestResult, step: TestStep): Promise<void>  {
    if (step.title.startsWith("Step:-") && step.title.includes("${")) {
      console.log(`[Worker] Step Title: ${step.title}`);
    }
  }
  async onStepEnd(test: TestCase, result: TestResult, step: TestStep): Promise<void> {
    if (step.title.startsWith("Step:-") && step.title.includes("${")) {
      const promise = (async () => {
        try {
          const adoTestCaseIds = step.title.split("${")[1].split("}")[0].split("#");
          const status = step.error ? 'failed' : 'passed';

          console.log(`[Worker] Step Title: ${step.title}`);
          console.log(`[Worker] Status: ${status}`);
          console.log(`[Worker] Start Time: ${step.startTime}`);
          console.log(`[Worker] Duration: ${step.duration}ms`);

          await Promise.all(
            adoTestCaseIds.map(async (testCaseId) => {
              console.log(`[Worker] Updating Test Case: ${testCaseId}`);
              try {
                const suiteId = await this.azure_devops.getSuiteIdByTestPlanAndTestCase(testCaseId);
                const testPointId = await this.azure_devops.getTestPointId(suiteId, testCaseId);
                const results = await this.azure_devops.updateTestCaseStatusInRun(
                  suiteId,
                  testPointId,
                  status.toLowerCase()
                );

                const attachments = result.attachments;
                for (const attachment of attachments) {
                  if (attachment.name && step.title.startsWith(attachment.name) && status.includes("passed")) {
                    if (attachment.body) {
                      await this.azure_devops.uploadAttachmentToTestCase(
                        results.lastTestRunId,
                        results.lastResultId,
                        attachment.body.toString('base64'),
                        attachment.name.replace(":","").split("${")[0]+".png"
                      );
                    }
                  }
                }
              } catch (error) {
                console.error(`[Worker] Error updating Test Case ${testCaseId}:`, error);
              }
            })
          );
        } catch (error) {
          console.error('[Worker] Error in onStepEnd:', error);
        }
      })();

      // Add the promise to the list of pending tasks
      this.pendingTasks.push(promise);
    }
  }

  async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
    console.log(`[Worker] Test Ended: ${test.title}`);
    const status = result.status;
    console.log(`[Worker] Test Status: ${status}`);
    if (result.error) {
      console.error(`[Worker] Test Error: ${result.error.message}`);
    }

    // Wait for all pending tasks for this worker to complete
    await Promise.all(this.pendingTasks);
    console.log(`[Worker] All async operations for test "${test.title}" have completed.`);
  }
}

export default MyReporter;