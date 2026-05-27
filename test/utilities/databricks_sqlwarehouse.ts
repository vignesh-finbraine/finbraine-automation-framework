import { DBSQLClient } from "@databricks/sql";
import IDBSQLSession from '@databricks/sql/dist/contracts/IDBSQLSession';
import IOperation from '@databricks/sql/dist/contracts/IOperation';
import { Page, APIRequest } from 'playwright';
import { test, expect, TestInfo } from '@playwright/test';
import DataFactory from './data-factory';
import * as fs from 'fs';
import csvParser = require('csv-parser');

interface CsvRow {
    [key: string]: any; // Adjust based on your CSV structure
  }

interface JSONData {
    [key: string]: {
        id: string;
        title: string;
        dataType: string;
        length: string;
        nullable: string;
        primarykey: string;
        foreignKeys: string;
    }[];
}

export class DatabricksSQLwarehouse{
  private token: string; // Define the container type accordingly
  private serverHostname: string;
  private httpPath: string;
  private environment: string;
  private environment_db: string;
  private container: any; // Define the container type accordingly
  private page: Page;
  private testInfo: TestInfo;
  private dataFactory: DataFactory;
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {import('@playwright/test').APIRequest} apicontext
   * @param {Container} container // Define the type of container
   */

  constructor(container: any) {
    
    this.token = (process.env.DATABRICKS_TOKEN || "").trim();
    this.serverHostname = process.env.DATABRICKS_SERVER_HOSTNAME ||  "";
    this.httpPath = process.env.SQLWAREHOUSE_PATH || "";
    this.environment = (process.env.ENVIRONMENT || "qa").trim();
    this.environment_db = process.env.CATALOG_ID || "";
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.dataFactory = container.resolve('dataFactory');
  }

    async executeSelectQuery(query: string) {
        const client: DBSQLClient = new DBSQLClient();
        const connectOptions = {
          host: this.serverHostname,
          path: this.httpPath,
          token: this.token
        };
        
       await client.connect(connectOptions)
          .then(async client => {
            const session: IDBSQLSession = await client.openSession();
        
            const queryOperation: IOperation = await session.executeStatement(
                query,
              {
                runAsync: true
              }
            );
            const result = await queryOperation.fetchAll();
            
            await queryOperation.close();

            await session.close();
            client.close();
            return result;
    
          })
          .catch((error) => {
            console.error(error);
        });
    }   
    
    async uploadWaitForFileMovement(
      dateTimeFolderName: string,
      containerCode: string,
      targetCount: number,
      maxWaitTime: number
  ): Promise<number> {
      const client: DBSQLClient = new DBSQLClient();
      const connectOptions = {
          host: this.serverHostname,
          path: this.httpPath,
          token: this.token
      };
  
      await client.connect(connectOptions);
      const session = await client.openSession();
  
      const query = `SELECT COUNT(*) as count FROM \`dl-${this.environment}-shared-catalog@${this.environment_db}\`.ops.encryptionsource WHERE DateTimeFolderName = '${dateTimeFolderName}' and ContainerCode = '${containerCode}'`;
      console.log(query);
      const startTime = Date.now();
      let currentCount = 0;
      let queryOperation; // Declare queryOperation in the outer scope
  
      while (Date.now() - startTime < maxWaitTime) {
          let result;
          let attempt = 0;
          let success = false;
  
          // Retry logic for executing the query
          while (attempt < 5 && !success) {
              try {
                  queryOperation = await session.executeStatement(query, { runAsync: true });
                  result = await queryOperation.fetchAll();
                  success = true; // Query succeeded, exit retry loop
              } catch (error) {
                  attempt++;
                  console.error(`Error executing statement. Attempt ${attempt} of 5:`, error);
                  if (attempt < 5) {
                      await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds delay between retries
                  } else {
                      console.error("Failed to execute query after 5 attempts.");
                      // Clean up and throw an error
                      if (queryOperation) {
                          await queryOperation.close();
                      }
                      await session.close();
                      client.close();
                      throw new Error("Failed to execute query after 5 attempts.");
                  }
              }
          }
  
          if (result && result[0] && typeof result[0] === 'object' && 'count' in result[0]) {
              const count = result[0].count;
              if (typeof count === 'number') {
                  currentCount = count;
              } else {
                  console.error("Count is not a number: ", count);
                  break;
              }
          } else {
              console.error("Unexpected query result format: ", result);
              break;
          }
  
          if (currentCount >= targetCount) {
              console.log(`Target count of ${targetCount} reached: ${currentCount}`);
              if (queryOperation) {
                  await queryOperation.close();
              }
              await session.close();
              client.close();
              return currentCount;
          }
  
          // Wait for a short period before checking again
          await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds delay
      }
  
      console.log(`Max wait time reached. Current count: ${currentCount}`);
      if (queryOperation) {
          await queryOperation.close();
      }
      await session.close();
      client.close();
      return currentCount;
  }

  async executeSelectQuery_updated(query: string): Promise<Record<string, any>[]> {
    console.log(query);
    const client = new DBSQLClient();
    const connectOptions = {
      host: this.serverHostname,
      path: this.httpPath,
      token: this.token,
    };

    try {
      await client.connect(connectOptions);
      const session: IDBSQLSession = await client.openSession();

      const queryOperation: IOperation = await session.executeStatement(query, {
        runAsync: true,
      });

      // Ensure the fetchAll() returns the expected type
      const result = (await queryOperation.fetchAll()) as Record<string, any>[] | undefined;

      await queryOperation.close();
      await session.close();
      client.close();

      if (!result) {
        console.warn('Query returned no data');
        return [];
      }

      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      return [];
    }
  }

async compareCsvWithTable(csvFilePath: string, negativeDataCsvFilePath: string | null, tableName: string): Promise<void> {
  const csvData: CsvRow[] = [];
  const query = `SELECT * FROM ${tableName}`;

  // Helper to check if a file exists
  const fileExists = (filePath: string): Promise<boolean> =>
    new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => resolve(!err));
    });

  // Helper to read CSV file and return data
  const readCsvFile = (filePath: string): Promise<CsvRow[]> =>
    new Promise((resolve, reject) => {
      const data: CsvRow[] = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row: CsvRow) => data.push(row))
        .on('end', () => resolve(data))
        .on('error', (error) => reject(error));
    });

  return new Promise<void>(async (resolve, reject) => {
    try {
      let negativeDataSet = new Set<string>();

      // Check if negative data file exists and load data if present
      if (negativeDataCsvFilePath && await fileExists(negativeDataCsvFilePath)) {
        const negativeData = await readCsvFile(negativeDataCsvFilePath);
        negativeDataSet = new Set(
          negativeData.map((row) => JSON.stringify(row)) // Convert rows to string for comparison
        );
      }

      // Load the main CSV data
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (row: CsvRow) => {
          // Exclude rows that are in the negative data set
          if (!negativeDataSet.has(JSON.stringify(row))) {
            csvData.push(row);
          }
        })
        .on('end', async () => {
          try {
            // Fetch data from the Databricks table
            const tableData = await this.executeSelectQuery_updated(query);

            // Find common columns
            const csvColumns = new Set(Object.keys(csvData[0] || {}));
            const tableColumns = new Set(Object.keys(tableData[0] || {}));
            const commonColumns = Array.from(csvColumns).filter((col) => tableColumns.has(col));
           
            // Normalize data
            const normalizeData = (data: Record<string, any>[], columns: string[]) =>
              data.map((row) =>
                columns.reduce((acc, col) => {
                  let value = row[col];
                  if (value === null || value === "null") value = '';
                  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
                    value = new Date(value + 'Z').toISOString();
                  }
                  acc[col] = value;
                  return acc;
                }, {} as Record<string, any>)
              );

            const normalizedCsvData = normalizeData(csvData, commonColumns);
            const normalizedTableData = normalizeData(tableData, commonColumns);
          
            // Compare data
            const matchedRecords = normalizedCsvData.filter((csvRow) =>
              normalizedTableData.some((tableRow) => JSON.stringify(csvRow) === JSON.stringify(tableRow))
            );

            const mismatchedRecords = normalizedCsvData.filter((csvRow) =>
              !normalizedTableData.some((tableRow) => JSON.stringify(csvRow) === JSON.stringify(tableRow))
            );

            const formatAsTable = (records: any[]) => {
              const headers = Object.keys(records[0] || {});
              const columnWidths = headers.map(header =>
                Math.max(header.length, ...records.map(record => (record[header] || '').toString().length))
              );

              const formatRow = (row: { [x: string]: any; }) =>
                headers.map((header, index) => (row[header] || '').toString().padEnd(columnWidths[index])).join(' | ');

              const headerRow = formatRow(Object.fromEntries(headers.map(h => [h, h])));
              const separator = columnWidths.map(w => '-'.repeat(w)).join('-+-');
              const rows = records.map(record => formatRow(record));

              return [headerRow, separator, ...rows].join('\n');
            };

            const mismatchedRecordsTable = formatAsTable(mismatchedRecords);
            expect.soft(mismatchedRecords.length,tableName+" - "+ mismatchedRecords.length+" - Mismatched Records: \n" + mismatchedRecordsTable).toBe(0);
            console.log(tableName+" - Matched Records: \n" + formatAsTable(matchedRecords));

            resolve();
          } catch (error) {
            console.error('Error during comparison:', error);
            reject(error);
          }
        })
        .on('error', (error: Error) => {
          console.error('Error reading CSV file:', error);
          reject(error);
        });
    } catch (error) {
      console.error('Error handling CSV files:', error);
      reject(error);
    }
  });
}

async verifySegregatedData(source: string){
    let jsonFilePath = `test/data/data_dictionary/${source}_Data_Dictionary.json`;
    let jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const allKeys = Object.keys(JSON.parse(jsonData));
   for (let index = 0; index < allKeys.length; index++) {
    const fileName = allKeys[index];
    await this.compareCsvWithTable("test\\data\\generated_data\\Scribe\\CA\\CA\\"+fileName,"test\\data\\exception_data\\Scribe\\CA\\CA\\"+fileName,'`dl-'+this.environment+'-ca-catalog@azeuwdlloddls01`.scribe.'+fileName.toLowerCase().replace(".csv",""));
   }
}

async getAquisitionCount(strDate: string): Promise<Record<string, any>[]>{
  let Query = 'SELECT sum(unique_records.Failed_Records_Count) as FAILED_RECORDS_COUNT FROM (SELECT DISTINCT Folder_Name, Dqc_Rule_Id, Failed_Records_Count, DQC_Rule_FileId from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data Where Dqc_Rule_Id Like "DL_DQ_DA.00%" and Processing_Date like "%'+strDate+'%" ) AS unique_records;'
  let count = await this.executeSelectQuery_updated(Query)
  console.log(count[0]["FAILED_RECORDS_COUNT"])
  return count;
}

async getAquisitionCountForRuleId(strDate: string, strSource: string, strSourceVersion: string, strRule: string): Promise<Record<string, any>[]>{
  let Query = 'select sum(Failed_Records_Count) as FAILED_RECORDS_COUNT from( Select distinct a.Dqc_Rule_Id,concat(m.Source,coalesce(m.Source_Version,"'+strSourceVersion+'")) as DataSource,a.Failed_Records_Count as Failed_Records_Count, a.Folder_Name as Folder_Name from (Select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date like "%'+strDate+'%" )a join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data where IsActive = true) b on a.Exception_Id = b.Exception_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_reason d on d.Reason_Id = a.Reason_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_action_takers e on e.Action_Takers_Id = a.Action_Takers_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rules f  on a.Dqc_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_action g on f.RuleAction_Id = g.RuleAction_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_type h on f.RuleType_Id = h.RuleType_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_phase i on i.RulePhase_Id = f.RulePhase_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator_mapping k on k.DQC_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator l on k.RuleIndicator_Id = l.RuleIndicator_Id join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rule_files where lower(source) like "%%" ) as m on a.DQC_Rule_FileId = m.DQC_Rule_FileId where a.Dqc_Rule_Id in ("'+strRule+'"));'
  let count = await this.executeSelectQuery_updated(Query)
  console.log(count[0]["FAILED_RECORDS_COUNT"])
  return count;
}

async getAquisitionFolderNameForRuleId(strDate: string, strSource: string, strSourceVersion: string, strRule: string): Promise<Record<string, any>[]>{
  let Query = 'select max(Folder_Name) as Folder_Name from( Select distinct a.Dqc_Rule_Id,concat(m.Source,coalesce(m.Source_Version,"'+strSourceVersion+'")) as DataSource,a.Failed_Records_Count as Failed_Records_Count, a.Folder_Name as Folder_Name from (Select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date like "%'+strDate+'%" )a join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data where IsActive = true) b on a.Exception_Id = b.Exception_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_reason d on d.Reason_Id = a.Reason_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_action_takers e on e.Action_Takers_Id = a.Action_Takers_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rules f  on a.Dqc_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_action g on f.RuleAction_Id = g.RuleAction_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_type h on f.RuleType_Id = h.RuleType_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_phase i on i.RulePhase_Id = f.RulePhase_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator_mapping k on k.DQC_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator l on k.RuleIndicator_Id = l.RuleIndicator_Id join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rule_files where lower(source) like "%'+strSource+'%" ) as m on a.DQC_Rule_FileId = m.DQC_Rule_FileId where a.Dqc_Rule_Id in ("'+strRule+'"));'
  let folder_name_max = await this.executeSelectQuery_updated(Query)
  return folder_name_max[0]["Folder_Name"];
}

async getIngestionCountSummary(strDate: string, strSource: string, strSourceVersion: string, strCountries: any): Promise<Record<string, any>[]>{
 // let Query = 'select count(*) as FAILED_RECORDS_COUNT from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data where Exception_Id in (select distinct(Exception_Id) from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date LIKE "%'+strDate+'%" and Dqc_Rule_Id in ("DL_DQ_DI.001", "DL_DQ_DI.003")) and IsActive = true and Country_Code in ('+strCountries+')';
  let Query = 'select sum(Failed_Records_Count) as FAILED_RECORDS_COUNT from( Select distinct a.Dqc_Rule_Id,concat(m.Source,coalesce(m.Source_Version,"'+strSourceVersion+'")) as DataSource,a.Failed_Records_Count as Failed_Records_Count, a.Folder_Name as Folder_Name from (Select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date like "%'+strDate+'%" )a join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data WHERE Country_Code in ('+strCountries+') and IsActive = true) b on a.Exception_Id = b.Exception_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_reason d on d.Reason_Id = a.Reason_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_action_takers e on e.Action_Takers_Id = a.Action_Takers_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rules f  on a.Dqc_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_action g on f.RuleAction_Id = g.RuleAction_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_type h on f.RuleType_Id = h.RuleType_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_phase i on i.RulePhase_Id = f.RulePhase_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator_mapping k on k.DQC_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator l on k.RuleIndicator_Id = l.RuleIndicator_Id join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rule_files where lower(source) like "%'+strSource.toLowerCase()+'%" ) as m on a.DQC_Rule_FileId = m.DQC_Rule_FileId where a.Dqc_Rule_Id in ("DL_DQ_DI.001", "DL_DQ_DI.003"));'
  let count = await this.executeSelectQuery_updated(Query)
  console.log(count[0]["FAILED_RECORDS_COUNT"])
  return count;
}

async getIngestionCountForRuleId(strDate: string, strSource: string, strSourceVersion: string, strRule: string, strCountries: string[]): Promise<Record<string, any>[]>{
 // let Query = 'select count(*) as FAILED_RECORDS_COUNT from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data where Exception_Id in (select distinct(Exception_Id) from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date LIKE "%'+strDate+'%" and Dqc_Rule_Id in ("'+strRule+'")) and IsActive =true and Country_Code in ('+strCountries+')'
  let Query = 'select sum(Failed_Records_Count) as FAILED_RECORDS_COUNT from( Select distinct a.Dqc_Rule_Id,concat(m.Source,coalesce(m.Source_Version,"'+strSourceVersion+'")) as DataSource,a.Failed_Records_Count as Failed_Records_Count, a.Folder_Name as Folder_Name from (Select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date like "%'+strDate+'%" )a join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data WHERE Country_Code in ('+strCountries+')  and IsActive = true) b on a.Exception_Id = b.Exception_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_reason d on d.Reason_Id = a.Reason_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_action_takers e on e.Action_Takers_Id = a.Action_Takers_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rules f  on a.Dqc_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_action g on f.RuleAction_Id = g.RuleAction_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_type h on f.RuleType_Id = h.RuleType_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_phase i on i.RulePhase_Id = f.RulePhase_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator_mapping k on k.DQC_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator l on k.RuleIndicator_Id = l.RuleIndicator_Id join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rule_files where lower(source) like "%'+strSource.toLowerCase()+'%" ) as m on a.DQC_Rule_FileId = m.DQC_Rule_FileId where a.Dqc_Rule_Id in ("'+strRule+'"));'
  let count = await this.executeSelectQuery_updated(Query)
  console.log(count[0]["FAILED_RECORDS_COUNT"])
  return count;
}

async getIngestionFolderNameForRuleId(strDate: string, strSource: string, strSourceVersion: string, strRule: string, strCountries: string[]): Promise<Record<string, any>[]>{
  // let Query = 'select count(*) as FAILED_RECORDS_COUNT from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data where Exception_Id in (select distinct(Exception_Id) from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date LIKE "%'+strDate+'%" and Dqc_Rule_Id in ("'+strRule+'")) and IsActive =true and Country_Code in ('+strCountries+')'
   let Query = 'select max(Folder_Name) as Folder_Name  from( Select distinct a.Dqc_Rule_Id,concat(m.Source,coalesce(m.Source_Version,"'+strSourceVersion+'")) as DataSource,a.Failed_Records_Count as Failed_Records_Count, a.Folder_Name as Folder_Name from (Select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date like "%'+strDate+'%" )a join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data WHERE Country_Code in ('+strCountries+') and IsActive = true) b on a.Exception_Id = b.Exception_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_reason d on d.Reason_Id = a.Reason_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_action_takers e on e.Action_Takers_Id = a.Action_Takers_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rules f  on a.Dqc_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_action g on f.RuleAction_Id = g.RuleAction_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_type h on f.RuleType_Id = h.RuleType_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_phase i on i.RulePhase_Id = f.RulePhase_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator_mapping k on k.DQC_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator l on k.RuleIndicator_Id = l.RuleIndicator_Id join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rule_files where lower(source) like "%'+strSource.toLowerCase()+'%" ) as m on a.DQC_Rule_FileId = m.DQC_Rule_FileId where a.Dqc_Rule_Id in ("'+strRule+'"));'
   let folder_name_max = await this.executeSelectQuery_updated(Query);
   return folder_name_max[0]["Folder_Name"];
 }

async getBusinessRulesCountSummary(strDate: string, strSource: string, strSourceVersion: string, strCountries: any): Promise<Record<string, any>[]>{
   let Query = 'select sum(Failed_Records_Count) as FAILED_RECORDS_COUNT from( Select distinct a.Dqc_Rule_Id,concat(m.Source,coalesce(m.Source_Version,"'+strSourceVersion+'")) as DataSource,a.Failed_Records_Count as Failed_Records_Count, a.Folder_Name as Folder_Name from (Select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date like "%'+strDate+'%" )a join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data WHERE Country_Code in ('+strCountries+') and IsActive = true) b on a.Exception_Id = b.Exception_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_reason d on d.Reason_Id = a.Reason_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_action_takers e on e.Action_Takers_Id = a.Action_Takers_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rules f  on a.Dqc_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_action g on f.RuleAction_Id = g.RuleAction_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_type h on f.RuleType_Id = h.RuleType_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_phase i on i.RulePhase_Id = f.RulePhase_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator_mapping k on k.DQC_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator l on k.RuleIndicator_Id = l.RuleIndicator_Id join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rule_files where lower(source) like "%'+strSource.toLowerCase()+'%" ) as m on a.DQC_Rule_FileId = m.DQC_Rule_FileId where a.Dqc_Rule_Id like "%DL_DQ_BR%" );'
   console.log(Query);
   let count = await this.executeSelectQuery_updated(Query)
   console.log(count[0]["FAILED_RECORDS_COUNT"])
   return count;
 }

 async getBusinessRulesCountForRuleID(strDate: string, strSource: string, strSourceVersion: string, strCountries: any, strRuleID: string): Promise<Record<string, any>[]>{
  let Query = 'select sum(Failed_Records_Count) as FAILED_RECORDS_COUNT from( Select distinct a.Dqc_Rule_Id,concat(m.Source,coalesce(m.Source_Version,"'+strSourceVersion+'")) as DataSource,a.Failed_Records_Count as Failed_Records_Count, a.Folder_Name as Folder_Name from (Select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exceptions_data where Processing_Date like "%'+strDate+'%" )a join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_records_data WHERE Country_Code in ('+strCountries+') and IsActive = true) b on a.Exception_Id = b.Exception_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_reason d on d.Reason_Id = a.Reason_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_exception_action_takers e on e.Action_Takers_Id = a.Action_Takers_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rules f  on a.Dqc_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_action g on f.RuleAction_Id = g.RuleAction_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_type h on f.RuleType_Id = h.RuleType_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_phase i on i.RulePhase_Id = f.RulePhase_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator_mapping k on k.DQC_Rule_Id = f.Dqc_Rule_Id left join `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.rule_indicator l on k.RuleIndicator_Id = l.RuleIndicator_Id join (select * from `dl-'+this.environment+'-shared-catalog@'+this.environment_db+'`.data_quality.dqc_rule_files where lower(source) like "%'+strSource.toLowerCase()+'%" ) as m on a.DQC_Rule_FileId = m.DQC_Rule_FileId where a.Dqc_Rule_Id like "%'+strRuleID+'%" );'
  console.log(Query);
  let count = await this.executeSelectQuery_updated(Query)
  console.log(count[0]["FAILED_RECORDS_COUNT"])
  return count;
}

}