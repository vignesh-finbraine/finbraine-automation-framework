import { APIRequestContext } from 'playwright';
import { expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PlaywrightFactoryActions } from './playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from './databricks_sqlware';
import { DatabricksFactoryDBFS } from './databricks_dbfs';


enum Status {
    INPROGRESS = "inprogress",
    FAILED = "failed",
    SUCCESS = "success",
    CANCEL = "cancel",
    UNKNOWN = "unknown"
}

export type WorkspaeDataflow = {
  WorkspaceName: string;
  dataFlow: string;
  description: string;
  tag:string;
  method_name:string;
};

export class PowerBI_Actions {
  private username_srvcacnt!: string;
  private password_srvcacnt!: string;
  private client_id_srvcacnt!: string;
  private username_usrcacnt!: string;
  private password_usrcacnt!: string;
  private apirequest: APIRequestContext;
  private sourceRegion!: string;
  private environment!: string;
  private validRegions: any;
  private validEnvironments: any;
  private allowedFiles: any;
  private page: Page;
  private playwrightFactory: PlaywrightFactoryActions;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

 
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {import('@playwright/test').APIRequest} apicontext
   * @param {Container} container // Define the type of container
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DatabricksSQLwarehouse} databricks_sqlware;
   * @param {DatabricksFactoryDBFS} databricks_dbfs;
   */

  constructor(container: any) {
    this.page = container.resolve('page');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');
    this.apirequest = this.page.request;        
    this.environment = (process.env.ENVIRONMENT || "").trim();
    this.sourceRegion = (process.env.REGION || "EMA").trim();
    this.validRegions = ['EMA', 'AME', 'APA'];
    this.validEnvironments = ['PRD', 'STG', 'QA', 'LOD', 'DEV'];
    this.allowedFiles = this.validEnvironments.flatMap((env: any) => 
    this.validRegions.map((region: string) => 
          `dl-dataflow-list-${env}-${region.toLowerCase()}-master.csv`
      )
  );
  }

  // Method to asynchronously fetch credentials from Key Vault
  private async initializeSecrets() {
    this.client_id_srvcacnt = process.env.POWERBI_CLIENTID || "18fbca16-2224-45f6-85b0-f7bf2b39b3f3";
    this.username_srvcacnt = process.env.POWERBI_SERVICE_USER ||"";
    this.password_srvcacnt = process.env.POWERBI_SERVICE_PASSWORD || "";
    this.username_usrcacnt = process.env.POWERBI_REPORT_USER ||"";
    this.password_usrcacnt = process.env.POWERBI_REPORT_PASSWORD || "";
    
    // Validate environment variables
    if (!this.client_id_srvcacnt || !this.username_srvcacnt || !this.password_srvcacnt) {
      throw new Error('Missing required secrets: POWERBI_CLIENTID, POWERBI_USER, or POWERBI_PASSWORD.');
    }
  }

  async getAccessToken() {
    await this.initializeSecrets().catch((error) => {
      throw new Error(`Error initializing secrets: ${error}`);
    });
    const tokenEndpoint = `PROVIDE_YOUR_ORGANISATION_END_POINT`;
  
    const body = new URLSearchParams({
      client_id: this.client_id_srvcacnt,
      scope: 'https://analysis.windows.net/powerbi/api/.default',
      grant_type: 'password',
      username: this.username_srvcacnt,
      password: this.password_srvcacnt,
    });
  
    const response = await this.apirequest.post(tokenEndpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: body.toString(),
    });
  
    const data = await response.json();
    if (response.status() !== 200) {
      expect(false,"Unable to Login").toBeTruthy();
    }
  
    // Store the token in an environment variable
    process.env[`TOKEN`] = data.access_token;
  
    // Calculate expiration time and store it as a string in an environment variable
    const expiresIn = parseInt(data.expires_in, 10); // in seconds
    const tokenExpirationTime = Math.floor(Date.now() / 1000) + expiresIn;
    process.env[`TOKEN_EXPIRATION_TIME`] = tokenExpirationTime.toString();
  
    return data.access_token;
  }

  
async isTokenAboutToExpire(bufferTimeInSeconds: number = 600): Promise<boolean> {
  const tokenExpirationTime = parseInt(process.env[`TOKEN_EXPIRATION_TIME`] || "0", 10);

  const currentTime = Math.floor(Date.now() / 1000);

  return tokenExpirationTime - currentTime <= bufferTimeInSeconds;
}

async getOrRefreshToken(): Promise<string> {
  // Check if the TOKEN is present in the environment variable
  if (!process.env.TOKEN) {
    console.log("No token found. Fetching a new token...");
    return await this.getAccessToken();
  }

  // If TOKEN is present, check for its expiration
  if (await this.isTokenAboutToExpire()) {
    console.log("Token is about to expire. Fetching a new token...");
    return await this.getAccessToken();
  }

  // If TOKEN exists and is not about to expire, return the existing token
  return process.env.TOKEN;
}

  // Method to get groups starting with "DL-LOD-AUTH"
  async getAuthLodGroups(accessToken: string) {
    const endpoint = 'https://api.powerbi.com/v1.0/myorg/groups';
    const response = await this.apirequest.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      maxRetries: 5,
    });

    const data = await response.json();
    if (response.status() !== 200) {
      throw new Error(`Error fetching groups: ${JSON.stringify(data)}`);
    }

    const environment = process.env.ENVIRONMENT || 'LOD';
    const GroupNamePrefix = this.getGroupNamePrefix(environment);
    return data.value.filter((group: any) => group.name.startsWith(GroupNamePrefix));
  }

  // Helper function to determine the group prefix
  private getGroupNamePrefix(environment: string): string {
    switch (environment.toUpperCase()) {
      case 'LOD':
        return 'DL-LOD';
      case 'PRD':
        return 'DL-DATA';
      case 'STG':
        return 'DL-STAGE';
      case 'QA':
        return 'DL-QA';
      case 'DEV':
        return 'DL-NPD';
      default:
        return 'DL-LOD';
    }
  }

  // Method to get dataflows for a specific group
async getDataflowsForGroup(groupId: string, accessToken: string) {
  const endpoint = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dataflows`;
  const maxAttempts = 3;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      const response = await this.apirequest.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        maxRetries: 5,
      });

      if (response.status() === 200) {
        const data = await response.json();
        return data.value;
      } else {
        const data = await response.json();
        throw new Error(`Error fetching dataflows for group ${groupId}: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new Error(`Failed after ${maxAttempts} attempts: ${error}`);
      }
      console.warn(`Attempt ${attempt} failed. Retrying...`);
    }
  }
}

// Method to get dataflow transactions for a specific group and dataflow
async getDataflowTransactions(
  groupId: string,
  dataflowId: string,
  accessToken: string
) {
  const endpoint = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dataflows/${dataflowId}/transactions`;
  let refreshTime = await this.getLatestRefreshTime(groupId, dataflowId, accessToken);
  let previousSortedTransactions: any[] | null = null;
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Attempt to fetch transactions
      const response = await this.apirequest.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        maxRetries: 5,
      });

      if (response.status() !== 200) {
        const data = await response.json();
        throw new Error(
          `Error fetching transactions for dataflow ${dataflowId}: ${JSON.stringify(data)}`
        );
      }

      const data = await response.json();

      // Sort transactions by startTime in descending order
      const sortedTransactions = await data.value.sort(
        (a: any, b: any) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      );

      if(sortedTransactions.length === 0){
        return sortedTransactions;
      }

      // Check if the latest transaction is from today's UTC date
      const latestTransaction = sortedTransactions[0];
      let latestTransactionStatus = latestTransaction.status.toLowerCase();
      let todayUTC = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      let transactionDate  = new Date(latestTransaction.startTime)
      .toISOString()
      .split('T')[0];

      if(latestTransaction.endTime){
        transactionDate = new Date(latestTransaction.endTime)
        .toISOString()
        .split('T')[0];
      }
      
      if (transactionDate === todayUTC) {
        // Latest transaction is from today (success or failure)
        return sortedTransactions;
      }
      else if (latestTransactionStatus === Status.INPROGRESS) {
        // Transaction is Inprogress Then It Is Latest
        return sortedTransactions;
      }
       else if (transactionDate === refreshTime && latestTransactionStatus === "success") {
        // Transaction is successful and matches refresh time
        return sortedTransactions;
      } else if (
        latestTransactionStatus.includes("fail") || 
        latestTransactionStatus.includes("cancel")
      ) {
        // If latest transaction has failed or canceled, check for consistency
        if (
          previousSortedTransactions &&
          JSON.stringify(previousSortedTransactions) === JSON.stringify(sortedTransactions)
        ) {
          // Consistent failure or cancel, return sorted transactions
          return sortedTransactions;
        }
      }

      // Update previous transactions for comparison in the next attempt
      previousSortedTransactions = sortedTransactions;

    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error}`);
      if (attempt === maxAttempts) {
        // If all attempts are exhausted, return a failure response
        return [
          {
            refreshType: "inconclusive",
            startTime: "",
            endTime: "",
            status: "Failed_Inconclusive_API_Issue",
          },
        ];
      }
    }
  }

  // Fallback return in case all attempts are inconclusive
  return [
    {
      refreshType: "inconclusive",
      startTime: "",
      endTime: "",
      status: "Failed_Inconclusive_API_Issue",
    },
  ];
}


async getDataflowTables(
  groupId: string,
  dataflowId: string,
  accessToken: string
): Promise<string> {
  const endpoint = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dataflows/${dataflowId}`;
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;
      const response = await this.apirequest.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status() !== 200) {
        const data = await response.json();
        throw new Error(
          `Error fetching dataflow ${dataflowId}: ${JSON.stringify(data)}`
        );
      }

      const data = await response.json();

      return data;
      

    } catch (error) {
      console.error(`Error on attempt ${attempt}: ${error}`);

      if (attempt === maxRetries) {
        throw new Error(
          `Failed to fetch the Tables ${error}`
        );
      }

      // Optional delay before retrying (e.g., 1 second)
      await this.delay(1000);
    }
  }
  return ""; // Return empty string if retry loop is exhausted unexpectedly
}

async getLatestRefreshTime(
  groupId: string,
  dataflowId: string,
  accessToken: string
): Promise<string> {
  const endpoint = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dataflows/${dataflowId}`;
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;
      const response = await this.apirequest.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status() !== 200) {
        const data = await response.json();
        throw new Error(
          `Error fetching dataflow ${dataflowId}: ${JSON.stringify(data)}`
        );
      }

      const data = await response.json();

      // Ensure `entities` is an array, default to empty if not present
      const entities = Array.isArray(data.entities) ? data.entities : [];

      // Extract refresh times safely, ignoring entities without partitions or refreshTime
      const refreshTimes = entities.flatMap((entity: any) =>
        Array.isArray(entity.partitions) // Check if `partitions` exists
          ? entity.partitions
              .map((partition: any) =>
                partition.refreshTime // Check if `refreshTime` exists
                  ? new Date(partition.refreshTime).getTime()
                  : null
              )
              .filter((time: number | null) => time !== null) // Ignore null values
          : []
      );

      if (refreshTimes.length === 0) {
        console.info(
          `No valid refresh times found for dataflow ${dataflowId}. Returning empty string.`
        );
        return ""; // Return empty string if no valid refresh times
      }

      // Find the latest refresh time
      const latestRefreshTime = new Date(Math.max(...refreshTimes));
      return latestRefreshTime.toISOString().split("T")[0];
    } catch (error) {
      console.error(`Error on attempt ${attempt}: ${error}`);

      if (attempt === maxRetries) {
        throw new Error(
          `Failed to fetch the latest refresh time after ${maxRetries} attempts: ${error}`
        );
      }

      // Optional delay before retrying (e.g., 1 second)
      await this.delay(1000);
    }
  }
  return ""; // Return empty string if retry loop is exhausted unexpectedly
}
  // Method to get workspace ID, using environment variable or fetching it
  async getWorkspaceIdByName(workspaceName: string, accessToken: string, maxAttempts = 2) {
    const sanitizedWorkspaceName = await this.sanitizeWorkspaceName(workspaceName);
    let workspaceId = process.env[`POWERBI_WORKSPACEID_${sanitizedWorkspaceName}`];

    if (!workspaceId) {
      workspaceId = await this.fetchWorkspaceIdByName(workspaceName, accessToken, maxAttempts);
      process.env[`POWERBI_WORKSPACEID_${sanitizedWorkspaceName}`] = workspaceId;  // Cache it
    }

    return workspaceId;
  }

  // Internal method to fetch workspace ID from PowerBI API
  private async fetchWorkspaceIdByName(workspaceName: string, accessToken: string, maxAttempts = 3) {
    const endpoint = 'https://api.powerbi.com/v1.0/myorg/groups';
    let attempts = 0;
    let lastError;

    while (attempts < maxAttempts) {
      try {
        const response = await this.apirequest.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          maxRetries: 5,
        });

        const data = await response.json();
        if (response.status() !== 200) {
          throw new Error(`Error fetching groups: ${JSON.stringify(data)}`);
        }

        const group = data.value.find((g: any) => g.name.toLowerCase() === workspaceName.toLowerCase()) ||
          data.value.find((g: any) => g.name.toLowerCase().includes(workspaceName.toLowerCase()));

        if (!group) {
          throw new Error(`Workspace "${workspaceName}" not found`);
        }

        return group.id;
      } catch (error) {
        lastError = error;
        attempts++;
        console.log(`Attempt ${attempts} failed: ${error}. Retrying...`);
        if (attempts === maxAttempts) {
          throw new Error(`Failed to fetch workspace "${workspaceName}" after ${maxAttempts} attempts: ${lastError}`);
        }

        await this.delay(45000);  // Wait 45 seconds before retrying
      }
    }
  }

  // Method to get dataflow ID, first checking in environment variables
  async getDataflowIdByName(groupId: any, dataflowName: string, accessToken: string, maxAttempts = 2) {
    return await this.fetchDataflowIdByName(groupId, dataflowName, accessToken, maxAttempts);
  }

  // Internal method to fetch dataflow ID from PowerBI API
  private async fetchDataflowIdByName(groupId: string, dataflowName: string, accessToken: string, maxAttempts = 2) {
    const endpoint = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dataflows`;
    let attempts = 0;
    let lastError;

    while (attempts < maxAttempts) {
      try {
        const response = await this.apirequest.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          maxRetries: 5,
        });

        const data = await response.json();
        if (response.status() !== 200) {
          throw new Error(`Error fetching dataflows for group ${groupId}: ${JSON.stringify(data)}`);
        }

        const dataflow = data.value.find((df: any) => df.name === dataflowName);

        if (!dataflow) {
          throw new Error(`Dataflow ${dataflowName} not found in group ${groupId}`);
        }

        return dataflow.objectId;
      } catch (error) {
        lastError = error;
        attempts++;
        console.log(`Attempt ${attempts} failed: ${error}. Retrying...`);
        if (attempts === maxAttempts) {
          throw new Error(`Failed to fetch dataflow ${dataflowName} after ${maxAttempts} attempts: ${lastError}`);
        }

        await this.delay(45000);  // Wait 45 seconds before retrying
      }
    }
  }

  // Method to trigger dataflow refresh and wait for completion
async triggerRefreshAndWaitForCompletion(
  groupId: any,
  dataflowId: string,
  accessToken: string,
  groupName: string,
  dataflowName: string
) {
  try {
    // Trigger a refresh
    await this.retriggerDataflowRefresh(groupId, dataflowId, accessToken);
    console.log(`Refresh triggered for ${groupName} ${dataflowName} - Dataflow ID ${dataflowId}. Polling for status...`);
  
    const maxPollingTime = 45 * 60 * 1000; // 45 minutes in milliseconds
    const { status, startTime, endTime, refreshType } = await this.pollDataflowRefreshStatus(
      groupId,
      dataflowId,
      accessToken,
      maxPollingTime,
      5000,
      groupName,
      dataflowName
    );
    console.log(`Final status for ${groupName} ${dataflowName} - Dataflow ID ${dataflowId}: ${status}`);
    // Return all three details
    return { status, startTime, endTime, refreshType };
  } catch (error) {
    console.error(`Error during refresh or polling process for ${groupName} ${dataflowName} - Dataflow ID ${dataflowId}: ${error}`);
    throw new Error(`Failed to refresh or get status for ${groupName} ${dataflowName} - Dataflow ID ${dataflowId}`);
  }
}

async pollDataflowRefreshStatus(
  groupId: any,
  dataflowId: string,
  accessToken: string,
  maxPollingTime: number,
  delay = 5000,
  groupName: string,
  dataflowName: string
) {
  await this.delay(delay); // Initial delay before polling
  const startTimeClock = Date.now();  // Record the start time of polling

  while (true) {
    try {
      // Check if the polling time has exceeded 45 minutes
      const elapsedTime = Date.now() - startTimeClock;
      accessToken = await this.getOrRefreshToken();
      // Fetch the latest transaction for the dataflow
      const transactions = await this.getDataflowTransactions(groupId, dataflowId, accessToken);
      if (transactions && transactions.length > 0) {
        const latestTransaction = transactions[0]; // Get the latest transaction
        const status = latestTransaction.status.toLowerCase();

        // Extract startTime and endTime from the latest transaction
        const { startTime: transactionStartTime, endTime: transactionEndTime, refreshType: refreshType } = latestTransaction;

        // Check if the refresh is complete (success/failed)
        if (status !== Status.INPROGRESS) {
          // Return the status and start/end time
          return {
            status,
            startTime: transactionStartTime,
            endTime: transactionEndTime,
            refreshType: refreshType
          };
        }
        if (elapsedTime > maxPollingTime) {
          return {
            status: "inprogress_timeout_cancel_attempt",
            startTime: transactionStartTime,
            endTime: transactionEndTime,
            refreshType: refreshType
          };
        }
        console.log(`Refresh in progress for ${groupName} ${dataflowName} - Dataflow ID ${dataflowId}. Current status: ${status}`);
      } else {
        if (elapsedTime > maxPollingTime) {
          throw new Error(`Polling exceeded maximum allowed time of 45 minutes for ${groupName} ${dataflowName} - Dataflow ID ${dataflowId}`);
        }
        console.log(`No transactions found for ${groupName} ${dataflowName} - Dataflow ID ${dataflowId}. Retrying...`);
      }
    } catch (error) {
      console.error(`Error fetching transactions for ${groupName} ${dataflowName} - Dataflow ID ${dataflowId}: ${error}`);
    }

    // Wait before the next polling attempt
    await this.delay(delay);
  }
}

  // Method to trigger dataflow refresh
  async retriggerDataflowRefresh(groupId: string, dataflowId: string, accessToken: string) {
    const endpoint = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dataflows/${dataflowId}/refreshes`;
    const refreshRequestBody = { notifyOption: 'MailOnFailure' };
  
    const maxAttempts = 10; // Total attempts
    const delayBetweenAttempts = 10000; // 10 seconds (in milliseconds)
  
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await this.apirequest.post(endpoint, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          data: refreshRequestBody,
        });
  
        if (response.status() === 200) {
          console.log(`Dataflow ${dataflowId} refresh triggered successfully.`);
          return; // Exit on success
        } else {
          const data = await response.json();
          throw new Error(`Error triggering dataflow refresh: ${JSON.stringify(data)}`);
        }
      } catch (error) {
        console.error(`Attempt ${attempt} failed: ${error}`);
  
        if (attempt < maxAttempts) {
          console.log(`Retrying in ${delayBetweenAttempts / 1000} seconds...`);
          await this.delay(delayBetweenAttempts); // Wait before next attempt
        } else {
          throw new Error(`All ${maxAttempts} attempts failed for dataflow ${dataflowId}.`);
        }
      }
    }
  }  
  
async writeCsvHeader() {
  const csvHeader = 'TestcaseID,TestCaseName,TestcaseDescription,Tags,Keyword_1\n';
  this.writeOrAppendFile(csvHeader,{ flag: 'w' },true)
}

  // Method to get groups, dataflows, transactions, last refresh, and next refresh, and write to CSV
  async getGroupsDataflowsAndTransactionsToCsv(accessToken: string) {
    try {
      const authLodGroups = await this.getAuthLodGroups(accessToken);

      // Write CSV header before processing the data
      await this.writeCsvHeader();

      for (const group of authLodGroups) {
        const dataflows = await this.getDataflowsForGroup(group.id, accessToken);

        for (const dataflow of dataflows) {
          let record = {
            WorkspaceName: group.name,
            dataFlow: dataflow.name,
            description: "Datflow Column and Data Type Validation for "+dataflow.name,
            tag: "tags: @dataflow",
            method_name: "datalens_powerbi.user_validates_the_dataflow,"+group.id+","+dataflow.objectId,
          };
          this.appendStatusToCSV(record);
        }
      }

    } catch (error) {
      console.error(`Error fetching groups, dataflows, and transactions: ${error}`);
    }
  }

  // Helper delay function
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Method to sanitize workspace names (removing invalid characters)
  async sanitizeWorkspaceName(workspaceName: string) {
    return workspaceName.toUpperCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  }

  async handleTransactionStatus(
    transactions: any[],
    retryCount: number,
    workspaceId: any,
    dataflowID: string,
    authToken: string,
    workspaceName: string,
    dataFlowName: string,
    monitorInProgress: string
  ): Promise<{ initialStatus: string | undefined; finalStatus: string; startTime?: string; endTime?: string;  refreshType?: string; }> {
    let initialStatus: string | undefined;
    let finalStatus = Status.UNKNOWN;
    let startTime: string | undefined;
    let endTime: string | undefined;
    let refreshType: string | undefined;
  
    if (transactions && transactions.length > 0) {
      const latestTransaction = transactions[0];
      const latestStatus = latestTransaction.status.toLowerCase();
  
      if (retryCount === 0) {
        initialStatus = latestStatus;
      }
  
      // Place 1: Failed or Canceled Transaction Handling
      if (latestStatus.includes(Status.FAILED) || latestStatus.includes(Status.CANCEL)) {
        try {
          // Trigger refresh and capture status, start time, and end time
          const { status, startTime: transactionStartTime, endTime: transactionEndTime, refreshType: transactionRefreshType } =
            await this.triggerRefreshAndWaitForCompletion(workspaceId, dataflowID, authToken, workspaceName, dataFlowName);
          
          // Update start and end times
          finalStatus = status.toLowerCase();
          startTime = transactionStartTime;
          endTime = transactionEndTime;
          refreshType = transactionRefreshType;
          expect.soft(finalStatus).not.toContain(Status.FAILED);
          expect.soft(finalStatus).not.toContain(Status.CANCEL);
        } catch (error) {
          console.error(`Error during dataflow refresh: ${error}`);
          finalStatus = Status.FAILED;
        }
      } 
      // Place 4: In Progress Transaction Handling
      else if (latestStatus.includes(Status.INPROGRESS)) {
        if (monitorInProgress.toUpperCase() === "YES") {
          const maxPollingTime = 45 * 60 * 1000; // 45 minutes in milliseconds
          try {
            // Poll status and capture status, start time, and end time
            const { status, startTime: transactionStartTime, endTime: transactionEndTime, refreshType: transactionRefreshType } = 
              await this.pollDataflowRefreshStatus(workspaceId, dataflowID, authToken, maxPollingTime, 5000, workspaceName, dataFlowName);
            
            // Update start and end times
            finalStatus = status.toLowerCase();
            startTime = transactionStartTime;
            endTime = transactionEndTime;
            refreshType = transactionRefreshType;
            expect.soft(finalStatus).not.toContain(Status.FAILED);
            expect.soft(finalStatus).not.toContain(Status.CANCEL);
          } catch (error) {
            finalStatus = Status.FAILED;
            console.error(`Error polling dataflow refresh status: ${error}`);
          }
        } else {
          finalStatus = latestStatus;
          startTime = latestTransaction.startTime; // Update start time for default case
          endTime = latestTransaction.endTime;     // Update end time for default case
          refreshType = latestTransaction.refreshType;
        }
      } 
      // Place 7: Default Case Handling
      else {
        finalStatus = latestStatus; // No retrigger, use initial status or default
        startTime = latestTransaction.startTime; // Update start time for default case
        endTime = latestTransaction.endTime;     // Update end time for default case
        refreshType = latestTransaction.refreshType;
      }
    } else {
      initialStatus = "not refreshed even once";
    }
  
    // Final return statement with start and end times
    return { initialStatus, finalStatus, startTime, endTime, refreshType };
  }

  // Function to escape CSV fields with commas and neutralize formula injections
  private escapeCsvField(field: string): string {
    // Neutralize potential formula injection by prefixing =, +, -, @
    if (field.match(/^[=+\-@]/)) {
      field = `'${field}`;
    }
    // Escape double quotes inside fields and wrap fields containing commas in quotes
    if (field.includes(',')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  }

  // Function to append statuses to CSV with proper escaping
  appendStatusToCSV(status: WorkspaeDataflow) {
    const csvRow = `${this.escapeCsvField(status.WorkspaceName)},${this.escapeCsvField(status.dataFlow)},${this.escapeCsvField(status.description)},${this.escapeCsvField(status.tag)},${this.escapeCsvField(status.method_name)}\n`;
    this.writeOrAppendFile(csvRow,'', false);
  }

  writeOrAppendFile(csvRow: string, options: any, write: boolean) {
    try {
        const safeRegion = this.sanitizeInput(this.sourceRegion.toUpperCase());
        const safeEnvironment = this.sanitizeInput(this.environment.toUpperCase());
        const safeRegionLower = this.sanitizeInput(this.sourceRegion.toLowerCase());
        // Construct the file name
       // const fileName = `dl-dataflow-list-${safeEnvironment}-${safeRegionLower}-master.csv`;
        const fileName = `dataflow_tests.csv`;
        const resolvedBaseDir = path.resolve(__dirname, '../data/business_transactions');
       // const directoryPath = path.join(resolvedBaseDir, safeRegion);
       const directoryPath = path.join(resolvedBaseDir);
        fs.mkdirSync(directoryPath, { recursive: true });
        //this.allowedFiles.includes(fileName)

        if (fileName) {
                const resolvedFilePath = path.join(directoryPath, fileName)

                if (!resolvedFilePath.startsWith(resolvedBaseDir)) {
                    throw new Error('Invalid file path');
                }

                if(write){
                  fs.writeFileSync(resolvedFilePath, csvRow, options);
                }else{
                  fs.appendFileSync(resolvedFilePath, csvRow, options || {});
                }
          
        }else{
          throw new Error('Invalid file name -> '+fileName);
        }
       
    } catch (error) {
        console.error(`Error writing to CSV file`+error);
    }
}

  sanitizeInput(input: string): string {
    return input.replace(/[^a-zA-Z0-9-_]/g, '_');
  }

  async launch_power_bi_and_log_in(){
    await this.initializeSecrets();
    const baseURL: string = process.env.POWER_BI_APP_URL || "https://app.powerbi.com/";
    await this.page.goto(baseURL, { waitUntil: 'domcontentloaded' });   
    await this.page.getByPlaceholder('Enter email').click();
    await this.page.getByPlaceholder('Enter email').fill(this.username_usrcacnt);
    await this.page.locator("#submitBtn").click();
    await this.page.getByPlaceholder('Password').fill(this.password_usrcacnt);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async user_selects_the_report_from_myworkspace(reportName: string){
    await this.page.getByTestId('navbar-label-item-my-workspace').click();
    await this.page.locator("//*[contains(text(),'"+reportName+"') and contains(@href,'reports')]").click();  
  }

  async userValidatesTheReportText(strFieldName :string, strValue: string){
    await this.playwrightFactory.verifyLocatorText(this.page.locator("//*[contains(text(),'"+strFieldName+"')]/ancestor::div[@data-testid='visual-content-desc']//*[@class='value']"), strValue.toString(), strFieldName);
    await this.playwrightFactory.embedScreenshotLocator(this.page.locator("//*[contains(text(),'"+strFieldName+"')]/ancestor::div[@data-testid='visual-content-desc']"), strFieldName)
  }

  async user_resets_the_filter(){
    await this.playwrightFactory.click(this.page.locator("//*[text()='Reset Filters']/following::visual-modern[1]"))
  }

  async userValidatesTheMinimumAdoptionsReport(){
    await this.userValidatesTheReportText("Clients","12");
    await this.userValidatesTheReportText("Engagements","2,579");
    await this.userValidatesTheReportText("In-Progress","1,109");
    await this.userValidatesTheReportText("Archived","1,470");
  }

  
  async userValidatesLevviaBaselineDeploymentReport(){
    await this.user_resets_the_filter();
    await this.userValidatesTheReportText("Clients","4,369");
    await this.userValidatesTheReportText("Total Engagements","20,960");

    const rows1 = this.page.locator("//*[text()='Total Engagements by Type']/following::*[contains(@class,'slice') and contains(@class,'setFocusRing')]");
    const count1 = await rows1.count();
    for (let i = 0; i < count1; ++i)
      console.log(await rows1.nth(i).getAttribute("aria-label"));


    await this.page.getByRole('combobox', { name: 'Industry' }).locator('i').click();
    await this.page.getByText('Automotive').click();
    await this.page.getByRole('combobox', { name: 'Industry' }).click();
    await this.page.getByRole('combobox', { name: 'Industry' }).locator('i').click();
    await this.page.getByText('Banking').click();
    await this.page.getByRole('combobox', { name: 'Industry' }).click();


    await this.page.getByLabel('Trending by Month').click();

    const rows = this.page.locator("//*[text()='Current Engagement State']/following::*[contains(@class,'slice') and contains(@class,'setFocusRing')]");
    const count = await rows.count();
    for (let i = 0; i < count; ++i)
      console.log(await rows.nth(i).getAttribute("aria-label"));
    //await this.page.pause();
    //*[text()='Reset Filters']/following::*[contains(@aria-label,'Financial Statement Audit') and contains(@class,'slice')]
  }

  
async  queryDataset() {
  const sql = require('mssql');
  await this.initializeSecrets().catch((error) => {
    throw new Error(`Error initializing secrets: ${error}`);
  });

  const tokenEndpoint = `https://login.microsoftonline.com/deloitte.onmicrosoft.com/oauth2/v2.0/token`;
  
  const body = new URLSearchParams({
    client_id: this.client_id_srvcacnt,
    scope: 'https://analysis.windows.net/powerbi/api/.default',
    grant_type: 'password',
    username: this.username_srvcacnt,
    password: this.password_srvcacnt
  });

  const response = await this.apirequest.post(tokenEndpoint, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body.toString(),
  });

  const data = await response.json();
  if (response.status() !== 200) {
    expect(false,"Unable to Login").toBeTruthy();
  }
//azure-active-directory-access-token
  // Store the token in an environment variable
  process.env[`TOKEN`] = data.access_token;

  const dataflowDef = await this.getDataflowDefinition("0afb60f0-fb97-4d9d-a6e1-e0c9eb3ac15e","cfaafe36-02eb-4e01-b814-fa29e274db35",data.access_token);
  console.log(JSON.stringify(dataflowDef));
  // Extract tables from dataflow definition
  const tables = dataflowDef.entities;
  console.log(JSON.stringify(tables));
  // Define the new dataset name
  // const newDatasetName = 'New Dataset from Dataflow';

  // Create a new dataset in Power BI
//  const newDataset = await this.createDatasetFromDataflow("0afb60f0-fb97-4d9d-a6e1-e0c9eb3ac15e", data.access_token, newDatasetName, tables);

  // console.log(`Dataset '${newDatasetName}' created successfully with ID: ${newDataset.id}`);

}



// Function to retrieve dataflow definition using Playwright
async getDataflowDefinition(groupId:any, dataflowId:any, accessToken: any) {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dataflows/${dataflowId}`;
  const headers = { Authorization: `Bearer ${accessToken}` };

  const response = await this.apirequest.get(url, { headers });
  if (!response.ok()) throw new Error(`Error retrieving dataflow definition: ${response.status()}`);

  return await response.json();
}

// Function to create a new dataset from dataflow using Playwright
async createDatasetFromDataflow(groupId:any, accessToken: any, datasetName: any, tables: any) {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/datasets`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  const datasetDefinition = {
    name: datasetName,
    defaultMode: 'Import',
    tables: tables.map((table: { name: any; attributes: any[]; }) => ({
      name: table.name,
      columns: table.attributes.map((column) => ({
        name: column.name,
        dataType: column.dataType,
      })),
    })),
  };

  const response = await this.apirequest.post(url, { headers, data: JSON.stringify(datasetDefinition) });
  if (!response.ok()) throw new Error(`Error creating dataset: ${response.status()}`);

  return await response.json();
}

// Method to trigger dataflow refresh
async updateRefreshSchedules(groupId: string, dataflowId: string, accessToken: string, scheduleType: any, timeScheduled: any, enabled: any) {
  const endpoint = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/dataflows/${dataflowId}/refreshSchedule`;
  const refreshRequestBody = {
    "value": {
      "days": scheduleType,
      "times": timeScheduled,
      "enabled": enabled,
      "localTimeZoneId": "UTC"
    }
  }
console.log(refreshRequestBody);
  const maxAttempts = 3; // Total attempts
  const delayBetweenAttempts = 3000; // 10 seconds (in milliseconds)

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await this.apirequest.patch(endpoint, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: refreshRequestBody,
      });

      if (response.status() === 200) {
        console.log(`Dataflow ${dataflowId} schedule updated successfully.`);
        return; // Exit on success
      } else {
        const data = await response.json();
        throw new Error(`Error  during schedule updation: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error}`);

      if (attempt < maxAttempts) {
        console.log(`Retrying in ${delayBetweenAttempts / 1000} seconds...`);
        await this.delay(delayBetweenAttempts); // Wait before next attempt
      } else {
        throw new Error(`All ${maxAttempts} attempts failed for dataflow ${dataflowId}.`);
      }
    }
  }
}  

}
