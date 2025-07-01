import { test, TestInfo } from '@playwright/test';
import DataFactory from '../../utilities/data-factory';
import { DriverScript } from './driverscript';
import Container from '../../utilities/container';
import Azure_DevOps from '../../utilities/azure_devops';

const records = DataFactory.getAllTestCases();

for (const record of records) {
  // Check if record indicates an API test
  if (record.TestCaseName.includes('@coreapi')) {
    test.describe(`API ${DataFactory.getTestCaseDescription(record)}`, () => {
      test(DataFactory.frameTestCaseName(record), async ({ request }, testInfo: TestInfo) => {
        const container = new Container();
        const dataFactory = new DataFactory(container);
        const azure_devops = new Azure_DevOps(container);
        const testData = await dataFactory.getTestData(record["TestCaseName"], record["TestcaseID"]);

        container.register('dataFactory', dataFactory);
        container.register('testData', testData);
        // Register the API context rather than a page
        container.register('apicontext', request);
        container.register('azure_devops', azure_devops);

        const driverScript = new DriverScript();
        // Note: Since there’s no page for an API test, pass null (or omit) if your driver supports it.
        await driverScript.registerContainer(container, testInfo);
        await driverScript.execute(record, container);
      });
    });
  } else {
    // Original browser-based test case
    test.describe(DataFactory.getTestCaseDescription(record), () => {
      test(DataFactory.frameTestCaseName(record), async ({ page, request }, testInfo: TestInfo) => {
        const container = new Container();
        const dataFactory = new DataFactory(container);
        const azure_devops = new Azure_DevOps(container);
        const testData = await dataFactory.getTestData(record["TestCaseName"], record["TestcaseID"]);

        container.register('dataFactory', dataFactory);
        container.register('testData', testData);
        container.register('page', page);
        container.register('apicontext', request);
        container.register('azure_devops', azure_devops);

        const driverScript = new DriverScript();
        await driverScript.registerContainer(container, testInfo);
        await driverScript.execute(record, container);
      });
    });
  }
}

// Adjust the afterEach hook to account for API tests (which may not have a page)
test.afterEach('Status check', async ({ page, request }, testInfo: TestInfo) => {
  let statusCode = 3;
  let comment = "";
  if (testInfo.status === 'passed') {
    comment = testInfo.errors.toString();
    statusCode = 1;
  } else if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
    // Only attempt screenshot if a page is available
    if (page) {
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach("Failure Page Screenshot", { body: screenshot, contentType: 'image/png' });
    }
    comment = "Errors: " + JSON.stringify(testInfo.errors);
    statusCode = 5;
  }
});