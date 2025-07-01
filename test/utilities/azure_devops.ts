import DataFactory from '../utilities/data-factory';
import Container from './container';
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

class Azure_DevOps {

    readonly organizationName: string;
    readonly organizationUrl: string;
    readonly personalAccessToken: string;
    readonly projectName: string;
    readonly workItemType: string;
    readonly apiVersion: string;
    private container: any;
    private test_plan_id: string;

    constructor(container: any) {
        this.container = container;
        this.organizationName = (process.env.AZURE_ORGANIZATION || "").trim(); 
        this.organizationUrl = 'https://dev.azure.com/' + this.organizationName;
        this.personalAccessToken = (process.env.AZURE_TOKEN|| "").trim();
        this.projectName = (process.env.PROJECT_NAME|| "").trim();
        this.test_plan_id = (process.env.TEST_PLAN_ID|| "").trim();
        this.workItemType = 'Test Case';
        this.apiVersion = '7.1';
    }

    async updateTestCasesId_ADO() {
        const alltestcases = DataFactory.getAllTestCases();
        let testArray = [];
       for (let index = 0; index < alltestcases.length; index++) {
            const testcase = alltestcases[index]["TestCaseName"];
            let testcaseId =  await this.getWorkItemIdByName(testcase);
            if(testcaseId){
                let json = {"testcase":testcase, "testcaseId":testcaseId}
                testArray.push(json);
            }    
        }
        console.log(testArray)
        const testdata = 'test/data/testdata.csv';
        const business_flow = 'test/data/business_flow.csv';
        await  this.updateCsvFile(business_flow, testArray);
        await  this.updateCsvFile(testdata, testArray);
    }

    
    async updateCsvFile(csvFilePath: any, jsonTestData: any[]) {
        try {
          const fileContent = await readFileAsync(csvFilePath, 'utf-8');
      
          const csvWriter = createCsvWriter({
            path: csvFilePath,
            header: await this.extractHeaders(fileContent , csvFilePath),
          });
        
          const updatedCsvData: any[] = await new Promise((resolve) => {
            const data: any[] = [];
      
            fs.createReadStream(csvFilePath)
              .pipe(csv())
              .on('data', (row: { TestCaseName: any }) => {
                const matchingTest = jsonTestData.find(
                  (test: { testcase: any }) => test.testcase === row.TestCaseName
                );
                if (matchingTest) {
                  data.push({
                    ...row,
                    TestCaseName: row.TestCaseName,
                    TestcaseID: matchingTest.testcaseId,
                  });
                } else {
                  data.push(row);
                }
              })
              .on('end', () => resolve(data));
          });
      
          await csvWriter.writeRecords(updatedCsvData);
      
          console.log('CSV file updated successfully');
        } catch (error) {
          console.error('Error updating CSV file:', error);
        }
      }
  
    async extractHeaders(csvContent: string, csvFilePath: any): Promise<any[]> {
        return new Promise((resolve) => {
          const headers: any[] = [];
      
          fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('headers', (headerList: string[]) => {
              headerList.forEach((header) => {
                if (header === 'TestCaseName' || header === 'TestcaseID') {
                  headers.push({ id: header, title: header });
                } else {
                  headers.push({ id: header, title: header, default: '' });
                }
              });
              resolve(headers);
            })
            .on('end', () => {
              // This block may not execute if there is no data in the CSV file.
              // If you encounter issues, you might need to resolve(headers) in the 'headers' event.
              if (headers.length === 0) {
                resolve(headers);
              }
            });
        });
      }

    // Function to get Work Item ID by name
    async getWorkItemIdByName(workItemName: any) {
        try {
            
            const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/wit/wiql?api-version=7.1`;

            const wiqlQuery = {
                query: `SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = @project AND [System.WorkItemType] = '${this.workItemType}' AND [System.Title] = '${workItemName}' ORDER BY [System.CreatedDate] DESC`,
                parameters: [{ name: 'project', value: this.projectName }],
            };

            const response = await axios.post(apiUrl, wiqlQuery, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
                },
            });

            // Extract the Work Item ID from the response
            const workItemId = response.data.workItems[0]?.id;
            return workItemId;
        } catch (error) {
            console.error('Error:', error);
        }
    }

async getAllTestCases() {
    try {
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/wit/wiql?api-version=7.1`;
      const wiqlQuery = {
        query: `SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = @project AND [System.WorkItemType] = '${this.workItemType}' ORDER BY [System.CreatedDate] DESC`,
        parameters: [{ name: 'project', value: this.projectName }],
      };
  
      const response = await axios.post(apiUrl, wiqlQuery, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
        },
      });
  
      // Extract the Work Item IDs from the response
      const workItemIds = response.data.workItems.map((item: { id: any; }) => item.id);
      return workItemIds;
  
      // You can now use these IDs to fetch additional details if needed
    } catch (error) {
      console.error('Error:', error);
    }
  }


async getTestCaseDetails(id: any) {
    const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/wit/workitems/${id}?api-version=${this.apiVersion}`
    const response = await axios.get(`${apiUrl}`, {
        headers: {
            'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`
        }
    });

    return response.data;
}

async getTestSuiteIdByPlanAndName(suiteName: string): Promise<string> {
  try {
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/testplan/Plans//${this.test_plan_id}/suites?api-version=${this.apiVersion}`;
      
      const response = await axios.get(apiUrl, {
          headers: {
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });

      const suites = response.data.value;
      const suite = suites.find((s: { name: string }) => s.name === suiteName);
      return suite ? suite.id : "";
  } catch (error) {
      console.error('Error fetching Test Suite ID:', error);
      return "";
  }
}


async updateTestCaseStatus(suiteId: string, testCaseId: string, status: string): Promise<void> {
  try {
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/test/plans/${this.test_plan_id}/suites/${suiteId}/testcases/${testCaseId}?api-version=${this.apiVersion}`;
      
      const payload = {
          outcome: status, // Example statuses: 'Passed', 'Failed', 'NotExecuted'
      };

      const response = await axios.patch(apiUrl, payload, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });

      console.log(`Updated Test Case ${testCaseId} status to ${status}:`, response.status);
  } catch (error) {
      console.error('Error updating Test Case status:', error);
  }
}

async getTestRunId(suiteId: string): Promise<string | null> {
  try {
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/test/Runs?planId=${this.test_plan_id}&suiteId=${suiteId}&api-version=${this.apiVersion}`;
      const response = await axios.get(apiUrl, {
          headers: {
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });

      const testRuns = response.data.value;
      return testRuns.length > 0 ? testRuns[0].id : null; // Return the most recent Test Run ID
  } catch (error) {
      console.error('Error fetching Test Run ID:', error);
      return null;
  }
}

async uploadAttachmentToTestCase(
  testRunId: string,
  testCaseResultId: string,
  base64Image: string,
  fileName: string
): Promise<void> {
  try {
      // Step 3: Construct API URL
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/test/runs/${testRunId}/results/${testCaseResultId}/attachments?api-version=${this.apiVersion}`;

      // Step 4: Upload the Attachment
      const payload = {
          fileName: fileName, // e.g., 'screenshot.png'
          stream: base64Image, // Base64-encoded image passed as parameter
          comment: 'Uploaded evidence for test case',
          attachmentType: 'GeneralAttachment',
      };

      const response = await axios.post(apiUrl, payload, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });
      await response.data;
      console.log(`Attachment uploaded successfully for Test Run ID ${testRunId}:`, response.status);
  } catch (error) {
      console.error('Error uploading attachment:', error);
  }
}

async getTestPointId(suiteId: string, testCaseId: string): Promise<string> {
  try {
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/test/Plans/${this.test_plan_id}/Suites/${suiteId}/Points?api-version=${this.apiVersion}`;

      const response = await axios.get(apiUrl, {
          headers: {
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });

      const testPoints = response.data.value;
      const testPoint = testPoints.find((point: { testCase: { id: string } }) => point.testCase.id === testCaseId);

      return testPoint ? testPoint.id : ""; // Return the Test Point ID
  } catch (error) {
      console.error('Error fetching Test Point ID:', error);
      return "";
  }
}

async createTestRun(suiteId: string, testPointIds: string[]): Promise<string> {
  try {
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/test/runs?api-version=${this.apiVersion}`;
      const payload = {
          name: `Run for Plan ${this.test_plan_id} and Suite ${suiteId}`,
          plan: { id: this.test_plan_id },
          points: testPointIds, // Add test points to the run
      };

      const response = await axios.post(apiUrl, payload, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });

      return await response.data.id; // Return the Test Run ID
  } catch (error) {
      console.error('Error creating Test Run:', error);
      return "";
  }
}

async getTestCaseResultId(testRunId: string, testCaseId: string): Promise<string> {
  try {
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/testresults/runs/${testRunId}/results?api-version=api-version=7.1-preview.2`;

      const response = await axios.get(apiUrl, {
          headers: {
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });

      const testResults = await response.data.value;
      const testCaseResult = testResults.find((result: { testCase: { id: string } }) => result.testCase.id === testCaseId);

      return testCaseResult ? testCaseResult.testResultId : null; // Return the Test Case Result ID
  } catch (error) {
      console.error('Error fetching Test Case Result ID:', error);
      return "";
  }
}

async updateTestCaseStatusInRun(
  suiteId: string,
  testpoint: string,
  status: string
): Promise<any> {
  try {
      const apiUrl = `${this.organizationUrl}/${this.projectName}/_apis/testplan/Plans/${this.test_plan_id}/Suites/${suiteId}/TestPoint?includePointDetails=true&returnIdentityRef=true&api-version=7.1`;
      const payload = [{"id":testpoint,"results":{"outcome":status.toLowerCase()}}]


      const response = await axios.patch(apiUrl, payload, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });
  
      console.log(`Updated Test Case Result to ${response.data.value[0].testCaseReference.name}`);
      return await response.data.value[0].results;
  } catch (error) {
      console.error('Error updating Test Case status:', error);
  }
}

async getSuiteIdByTestPlanAndTestCase(testCaseId: string): Promise<string> {
  try {
      // Construct the API URL with the provided Test Case ID
      const apiUrl = `${this.organizationUrl}/_apis/testplan/suites?testCaseId=${testCaseId}&api-version=${this.apiVersion}`;
      
      // Make the API request to fetch all suites associated with the Test Case ID
      const response = await axios.get(apiUrl, {
          headers: {
              'Authorization': `Basic ${Buffer.from(`:${this.personalAccessToken}`).toString('base64')}`,
          },
      });

      const testSuites = response.data.value;
      // Filter the suites to find the one belonging to the specified Test Plan ID
      const suite = testSuites.find((suite: { plan: { id: string } }) => suite.plan.id.toString() === this.test_plan_id);

      if (suite) {
        //  console.log(`Found Suite ID: ${suite.id} for Test Plan ID: ${this.test_plan_id} and Test Case ID: ${testCaseId}`);
          return suite.id;
      } else {
          console.log(`No Test Suite found for Test Plan ID: ${this.test_plan_id} and Test Case ID: ${testCaseId}`);
          return "";
      }
  } catch (error) {
      console.error('Error fetching Test Suite ID:', error);
      return "";
  }
}


}


export default Azure_DevOps;