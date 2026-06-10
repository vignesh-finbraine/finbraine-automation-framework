import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';

export class CREATE_DATA_CONTRACT_PAGE {
private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;


  readonly Contract_name_txt: Locator;
  readonly Tenant_name_drpdwn: Locator;
  readonly select_status_drpdwn: Locator;
  readonly source_type_manual_radiobtn: Locator;
  readonly source_type_api_radiobtn: Locator;
  readonly source_type_sftp_radiobtn: Locator;
  readonly select_profile_drpdwn: Locator;
  readonly description_txt: Locator;
  readonly next_btn: Locator;
  readonly base_url_txt: Locator;
  readonly api_key_txt: Locator;
  readonly end_point_txt: Locator;
  readonly contract_name: Locator;
  readonly host_name_txt: Locator;
  readonly username_txt: Locator;
  readonly password_txt: Locator;
  readonly remote_path_txt: Locator;


   constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');


  /******************** Page Objects ************************/
 this.Contract_name_txt = this.page.getByPlaceholder("Enter name...");
 this.Tenant_name_drpdwn = this.page.locator("//select[@name='bank']");
 this.select_status_drpdwn = this.page.locator("//select[@name='status']");
 this.source_type_manual_radiobtn = this.page.locator("//label[text()=' Manual Upload ']");
 this.source_type_api_radiobtn = this.page.locator("//label[text()=' API ']");
 this.source_type_sftp_radiobtn = this.page.locator("//label[text()=' SFTP ']");
 this.select_profile_drpdwn = this.page.locator("//select[@name='selectedProfile'] ");
 this.description_txt = this.page.locator("//textarea[@name='description']");
 this.next_btn = this.page.locator("//button[text()=' Next ']");
 this.base_url_txt = this.page.getByPlaceholder("Enter base URL (e.g. https://api.example.com/v1)");
 this.api_key_txt = this.page.getByPlaceholder("Enter API key");
 this.end_point_txt = this.page.getByPlaceholder("e.g. api/app/demo/bank/customers?profile=1");
 this.contract_name = this.page.locator("//span[text()='Contract:']/following-sibling::span[@class='banner-value'][1]");
 this.host_name_txt = this.page.getByPlaceholder("e.g. sftp.bankname.com or 192.168.1.100");
 this.username_txt = this.page.getByPlaceholder("Enter SFTP username");
 this.password_txt = this.page.getByPlaceholder("Enter SFTP password");
 this.remote_path_txt = this.page.getByPlaceholder("e.g. /data/etb/incoming");


}

//user select source type as Manual
async user_select_sourcetype_Manual(){
 this.source_type_manual_radiobtn.click();
}


// user select source type as API
async user_select_sourcetype_API(){
this.source_type_api_radiobtn.click();
}

// user select source type as SFTP
async user_select_sourcetype_SFTP(){
this.source_type_sftp_radiobtn.click();
}

//user enter data contract details
async user_enter_contract_details(strDataContractName: string){
    await this.playwrightFactory.fill(this.Contract_name_txt,strDataContractName);
    await this.Tenant_name_drpdwn.selectOption({ label: "VSTbank" });
    await this.select_status_drpdwn.selectOption({ label: "Active" });
    await this.select_profile_drpdwn.selectOption({ label: "Banking Customer Profile" });
    await this.description_txt.fill("This is test data contract created by automation script");
    await this.page.waitForTimeout(3000);

}

//user click on next button for API and SFTP source type
async user_click_on_next_btn(){
await this.next_btn.click();
await this.page.waitForTimeout(3000);

}

//user verify API configuration fields are displayed and enter API details
async user_verify_contract_api(strBaseUrl: string, strEndPoint: string){
await this.playwrightFactory.fill(this.base_url_txt, strBaseUrl);
await this.playwrightFactory.fill(this.end_point_txt, strEndPoint);
await this.page.waitForTimeout(6000);
}

//user verify SFTP configuration fields are displayed and enter SFTP details
async user_verify_sftp_cofiguration(strHostName: string, strRemotePath: string){
await expect(this.contract_name).toHaveText("DC_SFTP_VSTbank_Test_Contract");
await this.playwrightFactory.fill(this.host_name_txt, strHostName);
await this.playwrightFactory.fill(this.remote_path_txt, strRemotePath);
}

//user enter username and password for SFTP source type
async user_enter_username_password_SFTP(strUsername: string, strPassword: string){
await this.playwrightFactory.fill(this.username_txt, strUsername);
await this.playwrightFactory.fill(this.password_txt, strPassword);
await this.page.waitForTimeout(6000);

}









}