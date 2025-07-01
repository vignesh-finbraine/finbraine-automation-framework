const axios = require('axios');
const FormData = require('form-data');
class TestRailMethods {
 

  async getConnection() {
    const testRailAPI = axios.create({
      baseURL: 'https://arenaclub.testrail.io/index.php?/api/v2/',
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.TEST_RAIL_USERNAME,
        password: process.env.TEST_RAIL_APIKEY
      },
    });
    return testRailAPI;
  }

  async getTestSuite(suiteId: any) {
    try {
      const testRailAPI = await this.getConnection();
      const response = await testRailAPI.get(`get_suite/${suiteId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Test Suite:', error);
    }
  }

  async isTestPlanCreated(testPlanNameToCheck: any) {
    try {
      const projectId = 2;
      const testRailAPI = await this.getConnection();
      const response = await testRailAPI.get(`get_plans/${projectId}&is_completed=0`);
      const testPlans = await response.data.plans;
     
      const matchingTestPlan = testPlans.find((plan: { name: any; }) => plan.name === testPlanNameToCheck);
           
      if (matchingTestPlan) {
        const testPlanId = matchingTestPlan.id;

        const testRunsResponse = await testRailAPI.get(`get_plan//${testPlanId}&is_completed=0`);
        const testRuns = await testRunsResponse.data.entries[0].runs;
        if (testRuns.length > 0) {
          const latestTestRunId = testRuns[0].id;
          return latestTestRunId;
        } else {
          return false;
        }
      }else{
        return false;
      }

    } catch (error) {
      console.error('Error fetching Test Suite:', error);
    }
  }

 

  async createTestPlan(planName: any, planDescription: any) {
    try {
      const testRailAPI = await this.getConnection();
      const response = await testRailAPI.post('add_plan/2', {
        name: planName,
        description: planDescription,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating Test Plan:', error);
    }
  }

  async addTestSuiteToTestPlan(planId: any, suiteId: number, case_ids:Array<number>) {
    try {
      const testRailAPI = await this.getConnection();
      const response = await testRailAPI.post(`add_plan_entry/${planId}`, {
        suite_id: suiteId,
        name: 'Test Run for Suite', // Customize the name as needed
        include_all: false, // Include all test cases from the suite
        case_ids:  case_ids
      });
      return response.data;
    } catch (error) {
      console.error('Error adding Test Suite to Test Plan:', error);
    }
  }

  async updateTestStatus(runId: any, caseId: any, statusId: any, comment: any) {
    try {
      const testRailAPI = await this.getConnection();
      const response = await testRailAPI.post(`add_result_for_case/${runId}/${caseId}`, {
        status_id: statusId,
        comment: comment
      });
      return response.data;
    } catch (error) {
      console.error('Error updating test status:', error);
    }
  }

  async addAttachmentsToTestResult(testCaseId:any, attachments:any) {
    try {
   
      const testRailAPI = await this.getConnection();
      for (let index = 0; index < attachments.length; index++) {
        const attachment = attachments[index];
        const filetype  = attachment.contentType.split("/")[1];
        if(filetype==="png"){
          const formData = new FormData();
          formData.append('text', attachment.name);
          formData.append('attachment', attachment.body, {
            filename: attachment.name+".png",
            contentType: attachment.contentType
          });
        
          const response = await testRailAPI.post(`add_attachment_to_result/${testCaseId}`, formData,{
            headers: {
              "Content-Type":"multipart/form-data"
            }});
          await response;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

}

export default TestRailMethods;
