import { Page, APIRequest } from 'playwright';
import { APIRequestContext, TestInfo } from '@playwright/test';
import DataFactory from '../utilities/data-factory';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions, ContainerSASPermissions } from "@azure/storage-blob";
const { parse } = require('json2csv');
const csv = require('csv-parser');

// Define a type for the task structure
type Task = {
  task_key: string;
  state: { life_cycle_state: string };
  subtasks?: Task[];
};

export class DatabricksFactoryDBFS {
  private token: string; // Define the container type accordingly
  private serverHostname: string;
  private clusterID: string;
  private httpPath: string;
  private container: any; // Define the container type accordingly
  private page: Page;
  private testInfo: TestInfo;
  private dataFactory: DataFactory;
  private apicontext: APIRequest; // Define the type of playwrightapicontext
  private runID: string;
  private runIngestionJobID: string;
  private maxRetries: number;
  private retryDelay: number;


  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {import('@playwright/test').APIRequest} apicontext
   * @param {Container} container // Define the type of container
   */

  constructor(container: any) {
    this.token = (process.env.DATABRICKS_TOKEN || "").trim();
    this.serverHostname = process.env.DATABRICKS_SERVER_HOSTNAME || "";
    this.httpPath = process.env.SQLWAREHOUSE_PATH || "";
    this.clusterID = process.env.CLUSTER_ID ||"";
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.dataFactory = container.resolve('dataFactory');
    this.apicontext = container.resolve('apicontext');
    this.maxRetries = 3;
    this.retryDelay = 1000;
    this.runID = "";
    this.runIngestionJobID = "";
  }

  async uploadFile_chunk_working(localFilePath: string, dbfsFilePath: string) {
    const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB per chunk
  
    const DBFS_CREATE_API = `https://${this.serverHostname}/api/2.0/dbfs/create`;
    const DBFS_ADD_BLOCK_API = `https://${this.serverHostname}/api/2.0/dbfs/add-block`;
    const DBFS_CLOSE_API = `https://${this.serverHostname}/api/2.0/dbfs/close`;
  
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  
    try {
      // Initialize the file upload
      const createResponse = await this.retry(async () => {
        return await this.page.request.post(DBFS_CREATE_API, {
          headers,
          data: {
            path: dbfsFilePath,
            overwrite: true
          }
        });
      });
  
      if (createResponse.status() !== 200) {
        throw new Error('Failed to initialize file upload');
      }
  
      const handle = (await createResponse.json()).handle;
      const stream = fs.createReadStream(localFilePath, { highWaterMark: CHUNK_SIZE });
  
      let chunkCount = 0;
  
      for await (const chunk of stream) {
        chunkCount++;
        await this.retry(async () => {
          const base64Chunk = chunk.toString('base64');
          const addBlockResponse = await this.page.request.post(DBFS_ADD_BLOCK_API, {
            headers,
            data: {
              handle: handle,
              data: base64Chunk
            }
          });
  
          if (addBlockResponse.status() !== 200) {
            throw new Error('Failed to upload chunk');
          }
  
          console.log(`Successfully uploaded chunk ${chunkCount}`);
        });
      }
  
      // Finalize the file upload
      const closeResponse = await this.retry(async () => {
        return await this.page.request.post(DBFS_CLOSE_API, {
          headers,
          data: {
            handle: handle
          }
        });
      });
  
      if (closeResponse.status() === 200) {
        console.log(`Successfully uploaded: ${localFilePath} to ${dbfsFilePath}`);
      } else {
        throw new Error('Failed to finalize file upload');
      }
    } catch (error) {
      console.error(`Error File Upload`, error);
    }
  }

  async uploadFile(localFilePath: string, dbfsFilePath: string) {
    const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB per chunk

  try {
    await this.retry(async () => {
      const data = fs.readFileSync(localFilePath);
      const totalChunks = Math.ceil(data.length / CHUNK_SIZE);
      let offset = 0;

      // Step 1: Create a handle
      const createResponse = await this.page.request.post(`https://${this.serverHostname}/api/2.0/dbfs/create`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          path: dbfsFilePath,
          overwrite: true
        }
      });

      if (!createResponse.ok()) {
        throw new Error(`Failed to create handle: ${await createResponse.json()}`);
      }

      const handle = (await createResponse.json()).handle;

      // Step 2: Add blocks
      for (let i = 0; i < totalChunks; i++) {
        const chunk = data.slice(offset, offset + CHUNK_SIZE);
        offset += CHUNK_SIZE;

        const addBlockResponse = await this.page.request.post(`https://${this.serverHostname}/api/2.0/dbfs/add-block`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          data: {
            handle: handle,
            data: chunk.toString('base64')
          }
        });

        if (!addBlockResponse.ok()) {
          throw new Error(`Failed to add block ${i + 1}: ${await addBlockResponse.json()}`);
        }

        console.log(`Successfully uploaded chunk ${i + 1} of ${totalChunks}`);
      }

      // Step 3: Close the handle
      const closeResponse = await this.page.request.post(`https://${this.serverHostname}/api/2.0/dbfs/close`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          handle: handle
        }
      });

      if (!closeResponse.ok()) {
        throw new Error(`Failed to close handle: ${await closeResponse.json()}`);
      }

      console.log(`Successfully uploaded: ${localFilePath} to ${dbfsFilePath}`);
    });
  } catch (error) {
    console.error('Error uploading file after retries', error);
  }
}
  
  
  async uploadFile_old(localFilePath: string, dbfsFilePath: string) {
    const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB per chunk
  
    try {
      const DBFS_API = `https://${this.serverHostname}/api/2.0/dbfs/put`;
      const data = fs.readFileSync(localFilePath);
      const totalChunks = Math.ceil(data.length / CHUNK_SIZE);
      let offset = 0;
  
      for (let i = 0; i < totalChunks; i++) {
        const chunk = data.slice(offset, offset + CHUNK_SIZE);
        const base64Content = chunk.toString('base64');
        offset += CHUNK_SIZE;
  
        const response = await this.page.request.post(DBFS_API, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            path: dbfsFilePath,
            contents: base64Content,
            overwrite: i === 0, // Overwrite only on the first chunk
            eof: i === totalChunks - 1 // Mark the last chunk
          }),
          timeout: 3000000
        });
  
        if (response.status() === 200) {
          console.log(`Successfully uploaded chunk ${i + 1} of ${totalChunks}`);
        } else {
          console.error(`Failed to upload chunk ${i + 1} of ${totalChunks}`, await response.json());
          break;
        }
      }
  
      console.log(`Successfully uploaded: ${localFilePath} to ${dbfsFilePath}`);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  }

  async uploadFile_1(localFilePath: string, dbfsFilePath: string) {
    const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB per chunk
  
    try {
      const DBFS_API = `https://${this.serverHostname}/api/2.0/dbfs/put`;
      const data = fs.readFileSync(localFilePath);
      const base64Content = Buffer.from(data).toString('base64');
      const totalChunks = Math.ceil(base64Content.length / CHUNK_SIZE);
      let offset = 0;
  
      for (let i = 0; i < totalChunks; i++) {
        const chunk = base64Content.slice(offset, offset + CHUNK_SIZE);
        offset += CHUNK_SIZE;
  
        const response = await this.page.request.post(DBFS_API, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          data: {
            path: dbfsFilePath,
            contents: chunk,
            overwrite: true,
            eof: i === totalChunks - 1 // Mark the last chunk
          },
          timeout: 3000000
        });
  
        if (response.status() === 200) {
          console.log(`Successfully uploaded chunk ${i + 1} of ${totalChunks}`);
        } else {
          console.error(`Failed to upload chunk ${i + 1} of ${totalChunks}`, await response.json());
          break;
        }
      }
  
      console.log(`Successfully uploaded: ${localFilePath} to ${dbfsFilePath}`);
    } catch (error) {
      console.error(`Error uploading file ${localFilePath}:`, error);
    }
  }

async uploadFile_oldome(localFilePath: string, dbfsFilePath: string) {
    try {
      const DBFS_API = 'https://'+this.serverHostname+'/api/2.0/dbfs/put';
      const data = fs.readFileSync(localFilePath);
      let content = Buffer.from(data).toString('base64');
      console.log(data);
      // if (localFilePath.endsWith('.gz')) {
      //   // Decompress the file
      //   content = zlib.gunzipSync(data).toString('base64');
      // }

      const response = await this.page.request.post(DBFS_API, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          path: dbfsFilePath,
          contents: content,
          overwrite: true
        },
        timeout: 3000000
      });
  
      if (response.status() === 200) {
        console.log(`Successfully uploaded: ${localFilePath} to ${dbfsFilePath}`);
      } else {
        console.error(`Failed to upload: ${localFilePath}`, response);
      }
    } catch (error) {
      console.error(`Error uploading file ${localFilePath}:`, error);
    }
  }


  async uploadFolder_Header_Levvia(localFolder:string, dbfsDestination:string, strContainer:string) {
    try {
      const files = fs.readdirSync(localFolder);
  
      for (const file of files) {
        if (file === 'levvia-header.csv') {
          const localFilePath = path.join(localFolder, file);
          const dbfsFilePath = dbfsDestination + "/" + path.basename(localFilePath);
  
          const stats = fs.statSync(localFilePath);
  
          if (stats.isFile()) {
            // Read and modify the CSV file
            const csvData: any[] = [];
            fs.createReadStream(localFilePath)
              .pipe(csv())
              .on('data', (row: { Container: string; }) => {
                if (row.Container === 'CA') {
                  row.Container = strContainer;
                }
                csvData.push(row);
              })
              .on('end', async () => {
                // Convert JSON back to CSV
                const fields = ['Container', 'StartDate', 'EndDate', 'TransactionStatus', 'LoadType'];
                const opts = { fields };
                const csvContent = parse(csvData, opts);
  
                // Write modified CSV to a temporary file
                const tempFilePath = localFilePath + '.tmp';
                fs.writeFileSync(tempFilePath, csvContent);
  
                // Upload the modified file
                await this.uploadFile(tempFilePath, dbfsFilePath);
  
                // Remove the temporary file
                fs.unlinkSync(tempFilePath);
  
                console.log(`Uploaded modified file to ${dbfsFilePath}`);
              });
          }
        }
      }
    } catch (error) {
      console.error('Failed to read the local folder or upload files', error);
    }
  }

  async uploadFolder(localFolder: string, dbfsDestination: string) {
    try {
      const files = fs.readdirSync(localFolder);

      for (const file of files) {
        const localFilePath = path.join(localFolder, file);
        //const gzippedFilePath = localFilePath + '.gz';
       // const dbfsFilePath = path.join(dbfsDestination, path.basename(localFilePath));
        const dbfsFilePath =dbfsDestination+"/"+path.basename(localFilePath);
        
        const stats = fs.statSync(localFilePath);

        if (stats.isFile()) {
          //await this.gzipFile(localFilePath, gzippedFilePath);
          //await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 5 seconds
         // console.log('Exiting...');
          console.log(dbfsFilePath);
          await this.uploadFile(localFilePath, dbfsFilePath);
          //fs.unlinkSync(gzippedFilePath); // Remove the encrypted file after upload
        }
      }
    } catch (error) {
      console.error('Failed to read the local folder or upload files', error);
    }
  }

  private async gzipFile(inputPath: string, outputPath: string) {
    return new Promise<void>((resolve, reject) => {
      const gzip = zlib.createGzip();
      const inputStream = fs.createReadStream(inputPath);
      const outputStream = fs.createWriteStream(outputPath);

      inputStream.pipe(gzip).pipe(outputStream);
      outputStream.on('finish', resolve);
      outputStream.on('error', reject);
    });
  }
  async renameFileWithExtension(file: any) {
    try {
        const filePath = path.parse(file);
        const newFileName = `${filePath.name}${filePath.ext}.encr`;
        const newPath = path.join(filePath.dir, newFileName);

        await fs.renameSync(file, newPath);
        console.log('File renamed successfully!');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
        console.log('Exiting...');
    } catch (err) {
        console.error('Error renaming file:', err);
    }
  }

  private async encryptFile(inputPath: string, outputPath: string) {
    // Implement your encryption logic here
    fs.copyFileSync(inputPath, outputPath); // For demonstration, copying the gzipped file
    console.log('File encrypted:', inputPath, 'to', outputPath);
  }

  
  async uploadFolder_old(localFolder: string, dbfsDestination: string) {
  
    try {
      const files = fs.readdirSync(localFolder);
  
      for (const file of files) {
        const localFilePath = path.join(localFolder, file);
        const dbfsFilePath = path.join(dbfsDestination, file);
  
        const stats = fs.statSync(localFilePath);
  
        if (stats.isFile()) {
          await this.uploadFile(localFilePath, dbfsFilePath);
        }
      }
    } catch (error) {
      console.error('Failed to read the local folder or upload files', error);
    } 
  }

  async uploadNotebook(filePath: string, destinationPath: string) {
    const apiRequestContext = await this.apicontext.newContext({
        baseURL: 'https://' + this.serverHostname,
        extraHTTPHeaders: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        }
    });

    try {
        const fileContent = require('fs').readFileSync(filePath, 'utf-8');

        const requestBody = {
            content: Buffer.from(fileContent).toString('base64'),
            path: destinationPath,
            overwrite: true,
            language: "PYTHON",
            format: 'SOURCE'
        };

        const response = await apiRequestContext.post('/api/2.0/workspace/import', {
            data: requestBody
        });

        if (response.ok()) {
            console.log('Notebook uploaded successfully.');
        } else {
            throw new Error(`Failed to upload notebook: ${response.status()} ${response.statusText()}`);
        }
    } catch (error) {
        console.error('Error uploading notebook:', error);
    } finally {
        await apiRequestContext.dispose();
    }
}
  
async runJob_Update_MetaData(accountName:string, containerName:string, destinationFolderPath:string, metadata: JSON, strFileName: string) {
  const existingClusterId = this.clusterID;
  const notebookPath = '/Workspace/Users/usa-knarayanp@deloitte.com/'+strFileName;
  const jobId = '413210966131847';

  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://'+this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });
  
  
  try {
      const requestBody = {
          job_id: jobId,
          existing_cluster_id: existingClusterId,
          notebook_task: {
              notebook_path: notebookPath,
              base_parameters: {
                  account_name: accountName,
                  container_name: containerName,
                  destination_folder_path: destinationFolderPath,
                  metadata_widgets:JSON.stringify(metadata)
              }
          },
          run_name: "Automation File Upload"
      };

      const response = await apiRequestContext.post('/api/2.0/jobs/runs/submit', {
          data: requestBody
      });

      if (response.ok()) {
          const responseData = await response.json();
          this.runID = responseData.run_id;
          console.log('Notebook triggered successfully:', this.runID);
      } else {
          throw new Error(`Failed to trigger notebook: ${response.status()} ${response.statusText()}`);
      }
  } catch (error) {
      console.error('Error triggering notebook:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}


  async runJob_Upload_Set_MetaData(accountName:string, containerName:string, sourceFolderPath:string, destinationFolderPath:string, metadata: JSON) {
    const existingClusterId = this.clusterID;
    const notebookPath = '/Workspace/Users/usa-knarayanp@deloitte.com/FileUpload';
    const jobId = '413210966131847';

    const apiRequestContext = await this.apicontext.newContext({
        baseURL: 'https://'+this.serverHostname,
        extraHTTPHeaders: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        }
    });
    
    
    try {
        const requestBody = {
            job_id: jobId,
            existing_cluster_id: existingClusterId,
            notebook_task: {
                notebook_path: notebookPath,
                base_parameters: {
                    account_name: accountName,
                    container_name: containerName,
                    source_folder_path: sourceFolderPath,
                    destination_folder_path: destinationFolderPath,
                    metadata_widgets:JSON.stringify(metadata)
                }
            },
            run_name: "Automation File Upload"
        };

        const response = await apiRequestContext.post('/api/2.0/jobs/runs/submit', {
            data: requestBody
        });

        if (response.ok()) {
            const responseData = await response.json();
            this.runID = responseData.run_id;
            console.log('Notebook triggered successfully:', this.runID);
        } else {
            throw new Error(`Failed to trigger notebook: ${response.status()} ${response.statusText()}`);
        }
    } catch (error) {
        console.error('Error triggering notebook:', error);
    } finally {
        await apiRequestContext.dispose();
    }
}

async runJob_Upload_Set_MetaData_Parquet_Hardcoded(accountName:string, containerName:string, container_code: string, destinationFolderPath:string, metadata: JSON, strFileName: string) {
  const existingClusterId = this.clusterID;
  const notebookPath = '/Workspace/Users/usa-knarayanp@deloitte.com/'+strFileName;
  const jobId = '413210966131847';

  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://'+this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });
  
  
  try {
      const requestBody = {
          job_id: jobId,
          existing_cluster_id: existingClusterId,
          notebook_task: {
              notebook_path: notebookPath,
              base_parameters: {
                  account_name: accountName,
                  container_name: containerName,
                  container_code: container_code,
                  destination_folder_path: destinationFolderPath,
                  metadata_widgets:JSON.stringify(metadata)
              }
          },
          run_name: "Automation File Upload Omnia V4 "+container_code
      };

      const response = await apiRequestContext.post('/api/2.0/jobs/runs/submit', {
          data: requestBody
      });

      if (response.ok()) {
          const responseData = await response.json();
          this.runID = responseData.run_id;
          console.log('Notebook triggered successfully:', this.runID);
      } else {
          throw new Error(`Failed to trigger notebook: ${response.status()} ${response.statusText()}`);
      }
  } catch (error) {
      console.error('Error triggering notebook:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}

async runJob_Upload_Set_MetaData_Parquet(accountName:string, containerName:string, sourceFolderPath:string, destinationFolderPath:string, metadata: JSON, strFileName: string) {
  const existingClusterId = this.clusterID;
  const notebookPath = '/Workspace/Users/usa-knarayanp@deloitte.com/'+strFileName;
  const jobId = '413210966131847';

  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://'+this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });
  
  
  try {
      const requestBody = {
          job_id: jobId,
          existing_cluster_id: existingClusterId,
          notebook_task: {
              notebook_path: notebookPath,
              base_parameters: {
                  account_name: accountName,
                  container_name: containerName,
                  source_folder_path: sourceFolderPath,
                  destination_folder_path: destinationFolderPath,
                  metadata_widgets:JSON.stringify(metadata)
              }
          },
          run_name: "Automation File Upload"
      };

      const response = await apiRequestContext.post('/api/2.0/jobs/runs/submit', {
          data: requestBody
      });

      if (response.ok()) {
          const responseData = await response.json();
          this.runID = responseData.run_id;
          console.log('Notebook triggered successfully:', this.runID);
      } else {
          throw new Error(`Failed to trigger notebook: ${response.status()} ${response.statusText()}`);
      }
  } catch (error) {
      console.error('Error triggering notebook:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}

async runJob_Ingestion_Workflows(requestBody: any) {
  const existingClusterId = this.clusterID;

  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://'+this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });
  
  try {
      const response = await apiRequestContext.post('/api/2.0/jobs/run-now', {
          data: requestBody
      });

      if (response.ok()) {
          const responseData = await response.json();
          this.runIngestionJobID = responseData.run_id;
          console.log('Notebook triggered successfully:', this.runIngestionJobID);
      } else {
          throw new Error(`Failed to trigger notebook: ${response.status()} ${response.statusText()}`);
      }
  } catch (error) {
      console.error('Error triggering notebook:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}

async runJob_Ingestion_Workflows_JobName(jobName: any ) {
  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://' + this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });

  try {
      // Step 1: List all jobs
      const listJobsResponse = await apiRequestContext.get('/api/2.0/jobs/list');
      if (!listJobsResponse.ok()) {
          throw new Error(`Failed to list jobs: ${listJobsResponse.status()} ${listJobsResponse.statusText()}`);
      }

      const jobsList = await listJobsResponse.json();

      // Step 2: Find job by name
      const job = jobsList.jobs.find((j: { settings: { name: any; }; }) => j.settings.name === jobName);
      if (!job) {
          throw new Error(`Job with name ${jobName} not found.`);
      }

      // Step 3: Trigger the job
      const runJobResponse = await apiRequestContext.post('/api/2.0/jobs/run-now', {
          data: {
              job_id: job.job_id // Using the found job ID
          }
      });

      if (runJobResponse.ok()) {
          const responseData = await runJobResponse.json();
          this.runIngestionJobID = responseData.run_id;
          console.log('Notebook triggered successfully:', this.runIngestionJobID);
      } else {
          throw new Error(`Failed to trigger notebook: ${runJobResponse.status()} ${runJobResponse.statusText()}`);
      }
  } catch (error) {
      console.error('Error triggering notebook:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}

async waitForJob() {
    const apiRequestContext = await this.apicontext.newContext({
        baseURL: 'https://'+this.serverHostname,
        extraHTTPHeaders: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        }
    });

    try {
        const apiUrl = `/api/2.0/jobs/runs/get?run_id=${this.runID}`;
        while (true) {
            const response = await apiRequestContext.get(apiUrl);
            if (response.ok()) {
                const responseData = await response.json();
                const status = responseData.state.life_cycle_state;

                if (['TERMINATED', 'SKIPPED', 'FINISHED'].includes(status)) {
                    console.log('Job completed successfully.');
                    break;
                } else if (['FAILED', 'TIMEDOUT', 'INTERNAL_ERROR'].includes(status)) {
                    console.log('Job failed or timed out.');
                    break;
                } else {
                    console.log(`Current job status: ${status}. Waiting...`);
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
                }
            } else {
                throw new Error(`Failed to get job status: ${response.status()} ${response.statusText()}`);
            }
        }
    } catch (error) {
        console.error('Error waiting for job:', error);
    } finally {
        await apiRequestContext.dispose();
    }
}

async waitForJob_IngestionCompletion() {
  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://'+this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });

  try {
      const apiUrl = `/api/2.0/jobs/runs/get?run_id=${this.runIngestionJobID}`;
      while (true) {
          const response = await apiRequestContext.get(apiUrl);
          if (response.ok()) {
              const responseData = await response.json();
              const status = responseData.state.life_cycle_state;

              if (['TERMINATED', 'SKIPPED', 'FINISHED'].includes(status)) {
                  console.log('Job completed successfully.');
                  break;
              } else if (['FAILED', 'TIMEDOUT', 'INTERNAL_ERROR'].includes(status)) {
                  console.log('Job failed or timed out.');
                  break;
              } else {
                  console.log(`Current job status: ${status}. Waiting...`);
                  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
              }
          } else {
              throw new Error(`Failed to get job status: ${response.status()} ${response.statusText()}`);
          }
      }
  } catch (error) {
      console.error('Error waiting for job:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}
async waitForJob_IngestionCompletion_By_Workflow(jobName: any) {
  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://' + this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });

  try {
      // Step 1: List all jobs to find the job by name
      const listJobsResponse = await apiRequestContext.get('/api/2.0/jobs/list');
      if (!listJobsResponse.ok()) {
          throw new Error(`Failed to list jobs: ${listJobsResponse.status()} ${listJobsResponse.statusText()}`);
      }

      const jobsList = await listJobsResponse.json();
      const job = jobsList.jobs.find((j: { settings: { name: any; }; }) => j.settings.name === jobName);
      if (!job) {
          throw new Error(`Job with name ${jobName} not found.`);
      }

      // Step 2: Find active run for the job
      const runsListResponse = await apiRequestContext.get(`/api/2.0/jobs/runs/list?job_id=${job.job_id}`);
      if (!runsListResponse.ok()) {
          throw new Error(`Failed to list job runs: ${runsListResponse.status()} ${runsListResponse.statusText()}`);
      }

      const runsList = await runsListResponse.json();
      const activeRun = runsList.runs.find((r: { state: { life_cycle_state: string; }; }) => ['RUNNING', 'PENDING'].includes(r.state.life_cycle_state));
      if (!activeRun) {
          throw new Error(`No active run found for job ${jobName}.`);
      }

      const runId = activeRun.run_id;

      // Step 3: Poll the job status and print task and subtask statuses
      const apiUrl = `/api/2.0/jobs/runs/get?run_id=${runId}`;
      while (true) {
          const response = await apiRequestContext.get(apiUrl);
          if (response.ok()) {
              const responseData = await response.json();
              const status = responseData.state.life_cycle_state;

              // Print main job status
              console.log(`Current job status: ${status}.`);

              // Recursive function to print tasks and their statuses
              const printTaskStatuses = (tasks: any[], level = 0) => {
                  const indent = ' '.repeat(level * 2);
                  tasks.forEach(task => {
                      console.log(`${indent}Task ${task.task_key} status: ${task.state.life_cycle_state}`);
                      if (task.subtasks && task.subtasks.length > 0) {
                          printTaskStatuses(task.subtasks, level + 1); // Recursively print subtasks
                      }
                  });
              };

              // Call the recursive function to print tasks and subtasks
              if (responseData.tasks) {
                  printTaskStatuses(responseData.tasks);
              }

              if (['TERMINATED', 'SKIPPED', 'FINISHED'].includes(status)) {
                  console.log('Job completed successfully.');
                  break;
              } else if (['FAILED', 'TIMEDOUT', 'INTERNAL_ERROR'].includes(status)) {
                  console.log('Job failed or timed out.');
                  break;
              } else {
                  console.log('Job still running. Waiting...');
                  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
              }
          } else {
              throw new Error(`Failed to get job status: ${response.status()} ${response.statusText()}`);
          }
      }
  } catch (error) {
      console.error('Error waiting for job:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}

async getJobAndSpecificTaskStatus(jobName: string, taskName: string, subTaskName: string) {
  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://' + this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });

  try {
      // Step 1: List all jobs to find the job by name
      const listJobsResponse = await apiRequestContext.get('/api/2.0/jobs/list');
      if (!listJobsResponse.ok()) {
          throw new Error(`Failed to list jobs: ${listJobsResponse.status()} ${listJobsResponse.statusText()}`);
      }

      const jobsList = await listJobsResponse.json();
      const job = jobsList.jobs.find((j: { settings: { name: string; }; }) => j.settings.name === jobName);
      if (!job) {
          throw new Error(`Job with name ${jobName} not found.`);
      }

      // Step 2: Find the latest run for the job
      const runsListResponse = await apiRequestContext.get(`/api/2.0/jobs/runs/list?job_id=${job.job_id}`);
      if (!runsListResponse.ok()) {
          throw new Error(`Failed to list job runs: ${runsListResponse.status()} ${runsListResponse.statusText()}`);
      }

      const runsList = await runsListResponse.json();
      if (runsList.runs.length === 0) {
          throw new Error(`No runs found for job ${jobName}.`);
      }

      const latestRun = runsList.runs[0]; // Assuming the first run is the latest
      const runId = latestRun.run_id;

      // Step 3: Get the status of the specific task or subtask by name
      const apiUrl = `/api/2.0/jobs/runs/get?run_id=${runId}`;
      const response = await apiRequestContext.get(apiUrl);
      if (!response.ok()) {
          throw new Error(`Failed to get job status: ${response.status()} ${response.statusText()}`);
      }

      const responseData = await response.json();
      const status = responseData.state.result_state;

      console.log(`Current job status: ${status}.`);

      // Step 4: Fetch tasks for the specific run
      if (responseData.tasks && responseData.tasks.length > 0) {
          // Find the task with the specified taskName
          await this.waitForSubtaskCompletion(apiRequestContext, job.job_id, taskName);
      } else {
          console.log('No tasks found for the current job run.');
      }

  } catch (error) {
      console.error('Error fetching job or task status:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}

async getJobAndSpecificSubTaskStatus(jobName: string, taskName: string, subTaskName: string) {
  const apiRequestContext = await this.apicontext.newContext({
      baseURL: 'https://' + this.serverHostname,
      extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
      }
  });

  try {
      // Step 1: List all jobs to find the job by name
      const listJobsResponse = await apiRequestContext.get('/api/2.0/jobs/list');
      if (!listJobsResponse.ok()) {
          throw new Error(`Failed to list jobs: ${listJobsResponse.status()} ${listJobsResponse.statusText()}`);
      }

      const jobsList = await listJobsResponse.json();
      const job = jobsList.jobs.find((j: { settings: { name: string; }; }) => j.settings.name === jobName);
      if (!job) {
          throw new Error(`Job with name ${jobName} not found.`);
      }

      // Step 2: Find the latest run for the job
      const runsListResponse = await apiRequestContext.get(`/api/2.0/jobs/runs/list?job_id=${job.job_id}`);
      if (!runsListResponse.ok()) {
          throw new Error(`Failed to list job runs: ${runsListResponse.status()} ${runsListResponse.statusText()}`);
      }

      const runsList = await runsListResponse.json();
      if (runsList.runs.length === 0) {
          throw new Error(`No runs found for job ${jobName}.`);
      }

      const latestRun = runsList.runs[0]; // Assuming the first run is the latest
      const runId = latestRun.run_id;

      // Step 3: Get the status of the specific task or subtask by name
      const apiUrl = `/api/2.0/jobs/runs/get?run_id=${runId}`;
      const response = await apiRequestContext.get(apiUrl);
      if (!response.ok()) {
          throw new Error(`Failed to get job status: ${response.status()} ${response.statusText()}`);
      }

      const responseData = await response.json();
      const status = responseData.state.result_state;

      console.log(`Current job status: ${status}.`);

      // Step 4: Fetch tasks for the specific run
      if (responseData.tasks && responseData.tasks.length > 0) {
          // Find the task with the specified taskName
          const task = responseData.tasks.find((task: any) => task.task_key === taskName);
          if (task) {
              console.log(`Task ${task.task_key} status: ${task.state.result_state}`);
              // Fetch and wait for the specific sub-task to complete
              await this.waitForSubtaskCompletion(apiRequestContext, task.run_job_task.job_id, subTaskName);
          } else {
              console.log(`Task with name ${taskName} not found.`);
          }
      } else {
          console.log('No tasks found for the current job run.');
      }

  } catch (error) {
      console.error('Error fetching job or task status:', error);
  } finally {
      await apiRequestContext.dispose();
  }
}

// Helper function to wait for specific subtask status recursively
async waitForSubtaskCompletion(apiRequestContext: any, job_id: string, subTaskName: string) {
  try {
      let isCompleted = false;
      while (!isCompleted) {
          // Get the list of runs for the subtask job
          const runsListResponse = await apiRequestContext.get(`/api/2.0/jobs/runs/list?job_id=${job_id}`);
          if (!runsListResponse.ok()) {
              throw new Error(`Failed to list job runs: ${runsListResponse.status()} ${runsListResponse.statusText()}`);
          }

          const runsList = await runsListResponse.json();
          if (runsList.runs.length === 0) {
              throw new Error(`No runs found for Job ${job_id}.`);
          }

          const latestRun = runsList.runs[0]; // Assuming the first run is the latest
          const runId = latestRun.run_id;
          const subtaskApiUrl = `/api/2.0/jobs/runs/get?run_id=${runId}`;
          const subtaskResponse = await apiRequestContext.get(subtaskApiUrl);
          if (subtaskResponse.ok()) {
              const subtaskData = await subtaskResponse.json();
              // Check if tasks contain the specified subTaskName
              if (subtaskData.tasks && subtaskData.tasks.length > 0) {
                  const subtask = subtaskData.tasks.find((subtask: any) => subtask.task_key === subTaskName);
                  if (subtask) {
                      const subtaskStatus = subtask.state.result_state;
                      console.log(`  Subtask ${subtask.task_key} status: ${subtaskStatus}`);
                      if (['TERMINATED', 'SKIPPED', 'FINISHED', 'SUCCESS'].includes(subtaskStatus)) {
                          console.log('Subtask completed successfully.');
                          isCompleted = true;
                      } else if (['FAILED', 'TIMEDOUT', 'INTERNAL_ERROR'].includes(subtaskStatus)) {
                          console.log('Subtask failed or timed out.');
                          isCompleted = true;
                      } else {
                          console.log(`Current subtask status: ${subtaskStatus}. Waiting...`);
                          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
                      }
                  } else {
                      console.log(`Subtask with name ${subTaskName} not found.`);
                      isCompleted = true;
                  }
              } else {
                  console.log('No subtasks found for the current task.');
                  isCompleted = true;
              }
          } else {
              console.log(`Failed to get subtask status: ${subtaskResponse.status()} ${subtaskResponse.statusText()}`);
              isCompleted = true;
          }
      }
  } catch (error) {
      console.error('Error fetching subtask status:', error);
  }
}


async getCurrentTimestamp(): Promise<string> {
  let now = new Date();

  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
  let day = String(now.getDate()).padStart(2, '0');
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(Math.floor((Math.random() * 59) + 1)).padStart(2, '0')
  //String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`
 //return `${year}${month}${day}131313`
 // return `${year}${month}15`;
}

async copyHeader(source: string) {
  // Check if the source is Levvia_V2
  if (source === 'Levvia_V2') {
      const sourceFilePath = path.join("test/data/lookup_data/Levvia_V2", 'levvia-header.csv');
      const destinationFilePath = path.join("test/data/generated_data/Levvia_V2", 'levvia-header.csv');

      // Copy the file
      fs.copyFileSync(sourceFilePath, destinationFilePath);

      console.log('CSV file copied successfully.');
  }
}

async copyHeader_For_Container_old(source: string, strContainerCode: string) {
  // Check if the source is Levvia_V2
  if (source === 'Levvia_V2') {
      const sourceFilePath = path.join("test/data/lookup_data/Levvia_V2", 'levvia-header.csv');
      const destinationFilePath = path.join("test/data/generated_data/Levvia_V2/"+strContainerCode, 'levvia-header.csv');

      // Copy the file
      fs.copyFileSync(sourceFilePath, destinationFilePath);

      console.log('CSV file copied successfully.');
  }
  else if(source === 'Omnia_V4') {
    const sourceFilePath = path.join("test/data/lookup_data/Omnia_V4", 'header.csv');
    const destinationFilePath = path.join("test/data/generated_data/Omnia_V4", 'header.csv');

    // Copy the file
    fs.copyFileSync(sourceFilePath, destinationFilePath);

    console.log('CSV file copied successfully.');
}
}

async copyHeader_For_Container(source: string, strContainerCode: string) {
  try {
    if (source === 'Levvia_V2') {
      const sourceFilePath = path.join("test/data/lookup_data/Levvia_V2", 'levvia-header.csv');
      const destinationFilePath = path.join("test/data/generated_data/Levvia_V2", strContainerCode, 'levvia-header.csv');

      // Read the CSV file
      const csvData: any[] = [];
      fs.createReadStream(sourceFilePath)
        .pipe(csv())
        .on('data', (row: { Container: string; }) => {
          // Update Container code
          row.Container = strContainerCode;
          csvData.push(row);
        })
        .on('end', () => {
          // Convert JSON back to CSV
          const fields = ['Container', 'StartDate', 'EndDate', 'TransactionStatus', 'LoadType'];
          const opts = { fields };
          const csvContent = parse(csvData, opts);

          // Write modified CSV to destination file
          fs.writeFileSync(destinationFilePath, csvContent);

          console.log(`Updated and saved ${destinationFilePath}`);
        });
    } 
    else if (source === 'Levvia_V3') {
      const sourceFilePath = path.join("test/data/lookup_data/Levvia_V2", 'levvia-header.csv');
      const destinationFilePath = path.join("test/data/generated_data/Levvia_V3", strContainerCode, 'levvia-header.csv');

      // Read the CSV file
      const csvData: any[] = [];
      fs.createReadStream(sourceFilePath)
        .pipe(csv())
        .on('data', (row: { Container: string; }) => {
          // Update Container code
          row.Container = strContainerCode;
          csvData.push(row);
        })
        .on('end', () => {
          // Convert JSON back to CSV
          const fields = ['Container', 'StartDate', 'EndDate', 'TransactionStatus', 'LoadType'];
          const opts = { fields };
          const csvContent = parse(csvData, opts);

          // Write modified CSV to destination file
          fs.writeFileSync(destinationFilePath, csvContent);

          console.log(`Updated and saved ${destinationFilePath}`);
        });
    } 
    else if (source === 'Omnia_V4') {
      const sourceFilePath = path.join("test/data/lookup_data/Omnia_V4", 'header.csv');
      const destinationFilePath = path.join("test/data/generated_data/Omnia_V4", 'header.csv');

      // Copy the file
      fs.copyFileSync(sourceFilePath, destinationFilePath);

      console.log('CSV file copied successfully.');
    } else {
      console.log('Source not recognized or implemented.');
    }
  } catch (error) {
    console.error('Failed to update or copy CSV file', error);
  }
}

async renameFiles(source: string, date_time_stamp: string, countryCode:string) {
  // Check if the source is Levvia_V2
  if (source === 'EMS') {
    fs.readdirSync("test/data/generated_data/EMS/"+countryCode).forEach(file => {
      if(file.includes(".csv")){
        const sourceFilePath = path.join("test/data/generated_data/EMS/"+countryCode, file);
        const destinationFilePath = path.join("test/data/generated_data/EMS/"+countryCode, file.replace(".csv","")+"_"+date_time_stamp+'.csv');
  
        fs.renameSync(sourceFilePath, destinationFilePath);
        console.log('CSV Renamed For EMS.');
      }
    });
  }
}

async fetchTables_old(catalogName: any, schemaName: any) {
  try {
    const apiRequestContext = await this.apicontext.newContext({
          baseURL: `https://${this.serverHostname}`,
          extraHTTPHeaders: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        });

    const response = await apiRequestContext.get('/api/2.1/unity-catalog/tables', {
      params: {
        catalog_name: catalogName,
        schema_name: schemaName
      }
    });
    if (response.status() !== 200) {
      throw new Error(`Failed to fetch tables for catalog ${catalogName}, status code: ${JSON.stringify(response)}`);
    }
    const tables = await response.json();
    return tables.tables || [];
  } catch (error) {
    console.error(`Error fetching tables for catalog ${catalogName}:`, error);
    return [];
  }
}

async fetchTables(catalogName: any, schemaName: any) {
  try {
    return await this.retry(async () => {
      const apiRequestContext = await this.apicontext.newContext({
        baseURL: `https://${this.serverHostname}`,
        extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      const response = await apiRequestContext.get('/api/2.1/unity-catalog/tables', {
        params: {
          catalog_name: catalogName,
          schema_name: schemaName
        }
      });
      if (response.status() !== 200) {
        throw new Error(`Failed to fetch tables for catalog ${catalogName}, status code: ${response.status()}`);
      }
      const tables = await response.json();
      return tables.tables || [];
    });
  } catch (error) {
    console.error(`Error fetching tables for catalog ${catalogName}:`, error);
    return [];
  }
}

async fetchATable(tableName: any) {
  try {
    return await this.retry(async () => {
      const apiRequestContext = await this.apicontext.newContext({
        baseURL: `https://${this.serverHostname}`,
        extraHTTPHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      const response = await apiRequestContext.get('/api/2.1/unity-catalog/tables/'+tableName, {
      });
      if (response.status() !== 200) {
        throw new Error(`Failed to fetch tables for catalog ${tableName}, status code: ${response.status()}`);
      }
      const table = await response.json();
      return table.columns || [];
    });
  } catch (error) {
    console.error(`Error fetching tables for catalog ${tableName}:`, error);
    return [];
  }
}


async retry(fn: { (): Promise<any>; (): any; }) {
  let retries = 0;
  while (retries < this.maxRetries) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      console.warn(`Retry attempt ${retries}/${this.maxRetries}. Error: ${error}`);
      if (retries < this.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      } else {
        throw error;
      }
    }
  }
}


}
