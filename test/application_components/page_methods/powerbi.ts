import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import { PowerBI_Actions } from '../../utilities/powerbi';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';

interface FilteredColumn {
    name: string,
    type_text: string
}

export class PowerBI {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private powerbi: PowerBI_Actions; 
  private databricks_dbfs: DatabricksFactoryDBFS;
  private databricks_sqlware: DatabricksSQLwarehouse;

  readonly emt_homepage_reporting: Locator;

  /**
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DataFactory} dataFactory
   * @param {any} container
   * @param {PowerBI_Actions} powerbi
   */

  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.powerbi = container.resolve('powerbi');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');
    
    /********************Page Objects Starts************************/
    this.emt_homepage_reporting = this.page.getByText('Reporting', { exact: true });
  }

  async user_generates_powerbi_testflows(){
    let authToken = await this.powerbi.getOrRefreshToken();
    await this.powerbi.getGroupsDataflowsAndTransactionsToCsv(authToken);
  }

  async user_validates_the_dataflow(strGroupID: string, strDataflowID: string) {
    let authToken = await this.powerbi.getOrRefreshToken();

    let tables:any = await this.powerbi.getDataflowTables(strGroupID, strDataflowID, authToken);
    let tableDetails: any = tables["pbi:mashup"]["document"].split("shared #");

    let consolidatedDataflowTableDetails: any = {};
   
    for (let index = 1; index < tableDetails.length; index++) {
      const tableDetail = tableDetails[index];
      let catalogue = "dl-"+tableDetail.split("dl-")[1].split('"')[0].trim();
      if(catalogue.toLowerCase().includes("global-central") || tableDetail.toLowerCase().includes("`dl")){
        let schma_table = tableDetail.split("`.")[1].replaceAll('"','').split(" ")[0];
        let schema = schma_table.split(".")[0].trim();

        let tableName = tableDetail.split("=")[0].replaceAll('"','').trim();
        let tableDB = schma_table.split(".")[1].replaceAll('"','').replaceAll(",","").trim();
        consolidatedDataflowTableDetails[tableName]=[{"db_table":tableDB,"catalogue":catalogue, "schema":schema}];
      }else{
        let schemaFS = tableDetail.split(', Kind = "Schema"')[0];
        let schema_split = schemaFS.split("Name =");
        let schema = schema_split[schema_split.length-1].replaceAll('"','').trim();
        
        let tableName = tableDetail.split("=")[0].replaceAll('"','').trim();
        let tableDB = tableDetail.split("Navigation 3")[1].split("Name = ")[1].split(",")[0].replaceAll('"','').trim();
        consolidatedDataflowTableDetails[tableName]=[{"db_table":tableDB,"catalogue":catalogue, "schema":schema}];
      }
      
    }
    
    for (let index = 0; index < tables.entities.length; index++) {
      const entity:any = tables.entities[index];
       consolidatedDataflowTableDetails[entity.name.trim()][0]["attributes"] = entity.attributes;
    }
    let jsonKeys_Tables = Object.keys(consolidatedDataflowTableDetails);

    // console.log(JSON.stringify(consolidatedDataflowTableDetails))
    for (let index = 0; index < jsonKeys_Tables.length; index++) {
      const dataflow_table = consolidatedDataflowTableDetails[jsonKeys_Tables[index]][0];
      let catalogname = dataflow_table["catalogue"];
      let table = dataflow_table["db_table"];
      let schema = dataflow_table["schema"];
      let attributes = dataflow_table["attributes"];
      let tables_databricks:any = await this.databricks_dbfs.fetchATable(catalogname+"."+schema+"."+table);
      let filtered_columns_databricks: FilteredColumn[] = tables_databricks.map((obj: { name: any; type_text: any; }) => ({name: obj.name, dataType: obj.type_text.split("(")[0].replace("timestamp","dateTime").replace("int64","int").replace("bigint","int").replace("decimal","double")}))
      await this.compareJson(attributes, filtered_columns_databricks, catalogname+"."+schema+"."+table);
      console.log(catalogname+"."+schema+"."+table);
      console.log(filtered_columns_databricks);
      console.log(attributes);
    }
   //console.log(JSON.stringify(consolidatedDataflowTableDetails));
  }

  async compareJson(powerBI_Table_Column_Json: any, databricks_Table_Column_Json: any, tableName: any){

   
    let mismatches: string[] = [];

    for (let index = 0; index < powerBI_Table_Column_Json.length; index++) {
      let powerBI_Columns = powerBI_Table_Column_Json[index];
      let powerBI_Column_Name = powerBI_Columns.name;
      let powerBI_Column_DataType = powerBI_Columns.dataType;
      let found = false;

        for (let indexDB_ColCnt = 0; indexDB_ColCnt < databricks_Table_Column_Json.length; indexDB_ColCnt++) {
          const databricksColumns = databricks_Table_Column_Json[indexDB_ColCnt];
          let databricks_Column_Name = databricksColumns.name;
          let databricks_Column_DataType = databricksColumns.dataType;

          if(powerBI_Column_Name===databricks_Column_Name){
            expect.soft(databricks_Column_DataType, "Table Name "+tableName+" - Column "+powerBI_Column_Name).toContain(powerBI_Column_DataType.replace("int64","int").replace("bigint","int"))
            found = true;
          }
          
        }
      
       if(!found){
        expect.soft(found, "Table Name "+tableName+ " Column unavailable "+powerBI_Column_Name).toBeTruthy();
       }
        
    }

  }

  async user_updates_the_dataflow_refresh_schedules(iteration = 0) {

    let authToken = await this.powerbi.getOrRefreshToken();
    let groupId = await this.dataFactory.getIterationData(this.container,"GroupID",iteration);
    let dataflowID = await this.dataFactory.getIterationData(this.container,"DataflowID",iteration);
    let scheduleType = await this.dataFactory.getIterationData(this.container,"Days",iteration);
    let timeScheduled = await this.dataFactory.getIterationData(this.container,"Times",iteration);
    let enabled = true;
    let formattedscheduletime = timeScheduled;
    let arrScheduleTypeDays: string[] = [];
    let arrTimeScheduled: string[] = [];

    if(scheduleType.trim().length ==0){
      enabled = false;
    }else{
      timeScheduled = "0"+timeScheduled;
      formattedscheduletime = timeScheduled.slice(-5)
      arrScheduleTypeDays = scheduleType.split(",");
      arrTimeScheduled = formattedscheduletime.split(",");
    }
   
   
    await this.powerbi.updateRefreshSchedules(groupId, dataflowID, authToken, arrScheduleTypeDays, arrTimeScheduled, enabled);
  }

  async user_logsin_powerbi_online(){
    await this.powerbi.launch_power_bi_and_log_in();
  }
  async user_selects_the_report_from_myworkspace(strReportName: string){
    await this.powerbi.user_selects_the_report_from_myworkspace(strReportName);
  }
  async user_validates_minimum_adoptions_report(){
    await this.powerbi.userValidatesTheMinimumAdoptionsReport();
  }
  async userValidatesLevviaBaselineDeploymentReport(){
    await this.powerbi.userValidatesLevviaBaselineDeploymentReport();
  }

  async uservalidatespowerbidata(){
    await this.powerbi.queryDataset();
  }
  

}