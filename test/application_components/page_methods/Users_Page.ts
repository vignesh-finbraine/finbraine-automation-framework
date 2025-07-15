import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class USER_PAGE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly emt_homepage_reporting: Locator;
  readonly link_search_open: Locator;
  

  //**Declare */
readonly create_button: Locator;
readonly search_bar: Locator;
readonly verification_msg: Locator;
readonly Export_btn: Locator;
readonly Export_Success_msg: Locator;
readonly Filter_btn: Locator;
readonly role: Locator;
readonly status: Locator;
readonly Verification: Locator;
readonly Year: Locator;
readonly Month: Locator;
readonly Period: Locator;
readonly Deleted: Locator;
readonly Apply_btn: Locator;
readonly User: Locator;
readonly Last_Name: Locator;
readonly Save_Button: Locator;
readonly Save_success_msg: Locator;
readonly Ok_btn: Locator;
readonly Delete_btn: Locator;
readonly Delete_success_msg: Locator;
readonly No_Record_Found_mssg: Locator;
readonly Restricted_msg: Locator;
readonly Restriction_success_msg: Locator;
readonly Verify_btn: Locator;
readonly Account_Restricted_msg: Locator;












  
  /**
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DataFactory} dataFactory
   * @param {any} container
   * @param {DatabricksSQLwarehouse} databricks_sqlware;
   * @param {DatabricksFactoryDBFS} databricks_dbfs;
   */

  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');

    /******************** Page Objects ************************/
this.emt_homepage_reporting = this.page.getByText('Reporting', { exact: true });
    this.link_search_open = this.page.getByRole('link', { name: 'Portal open' });
    this.create_button= this.page.locator("//*[contains(text(),'Create')]/ancestor::button");
    this.search_bar= this.page.locator("//input[@placeholder='Press ENTER to search']");
    this.verification_msg= this.page.locator("//*[contains(text(),'Please enter the verification code we sent to you earlier.')]");
    this.Export_btn= this.page.locator("//*[contains(text(),'Export')]");
    this.Export_Success_msg= this.page.locator("//*[contains(text(),'The exported file will be sent to your email shortly.')]");
    this.Filter_btn= this.page.locator("//*[contains(text(),'Filter')]");
    this.role= this.page.locator("//*[contains(text(),'Filter Users')]/ancestor::div//*[contains(text(),'Role')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.status= this.page.locator("//*[contains(text(),'Filter Users')]/ancestor::div//*[contains(text(),'Status')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Verification= this.page.locator("//*[contains(text(),'Filter Users')]/ancestor::div//*[contains(text(),'Verification')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Year= this.page.locator("//*[contains(text(),'Filter Users')]/ancestor::div//*[contains(text(),'Year')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Month= this.page.locator("//*[contains(text(),'Filter Users')]/ancestor::div//*[contains(text(),'Month')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Period= this.page.locator("//*[contains(text(),'Filter Users')]/ancestor::div//*[contains(text(),'Period')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Deleted= this.page.locator("//*[contains(text(),'Filter Users')]/ancestor::div//*[contains(text(),'Deleted')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Apply_btn= this.page.locator("//*[contains(text(),'Filter Users')]/ancestor::div//*[contains(text(),'Apply')]");
    this.User= this.page.locator("//*[contains(text(),'Ayush T')]");
    this.Last_Name= this.page.locator("//input[@placeholder='Their last name']");
    this.Save_Button= this.page.locator("//*[contains(text(),'Save')]");
    this.Save_success_msg= this.page.locator("//div[@class='swal-text']");
    this.Ok_btn= this.page.locator("//div[@class='swal-modal']//*[contains(text(),'OK')]");
    this.Delete_btn= this.page.locator("//*[contains(text(),'Delete')]");
    this.Delete_success_msg= this.page.locator("//*[contains(text(),'You want to delete this user.')]");
    this.No_Record_Found_mssg= this.page.locator("//*[contains(text(),'No records found!')]")
    this.Restricted_msg= this.page.locator("//*[contains(text(),'You want to restrict this user.')]");
    this.Restriction_success_msg= this.page.locator("//*[contains(text(),'Restriction has been placed on specified user account(s).')]");
    this.Verify_btn= this.page.locator("//button[@class='swal-button swal-button--confirm swal-button--danger']");
    this.Account_Restricted_msg= this.page.locator("//div[@class='swal-text']");
    


    
    

    
    
  }
  async user_click_create_button(){
    await this.playwrightFactory.click(this.create_button);
  }
  async user_search_created_user(striteration: any){
     let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.search_bar,firstname);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
  }
  async user_verify_search_result(striteration: any){
    let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await expect(this.page.locator("//*[contains(text(),'"+firstname+"')]")).toBeVisible();
  }
  async user_click_login_user_button(striteration: any){
    let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.page.locator("//*[contains(text(),'"+firstname+"')]").hover();
    await this.playwrightFactory.click(this.page.locator("(//*[contains(text(),'"+firstname+"')]/ancestor::tr//button[@class='table__button success'])[1]"));
  }
  async user_verify_verification_msg(){
    await expect(this.verification_msg).toContainText('Please enter the verification code we sent to you earlier.');

  }
  async user_click_export_btn(){
    await this.playwrightFactory.click(this.Export_btn);
  }
  async user_verify_export_success_msg(){
    await expect(this.Export_Success_msg).toContainText('The exported file will be sent to your email shortly.');
  }
  async user_click_filter_btn(){
    await this.playwrightFactory.click(this.Filter_btn);
  }
  async user_select_role(strRole: string){
    await this.playwrightFactory.click(this.role);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Role')]/ancestor::component-select//*[contains(text(),'"+strRole+"')]"));
  }
  async user_select_status(strStatus: string){
    await this.playwrightFactory.click(this.status);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Status')]/ancestor::component-select//*[contains(text(),'"+strStatus+"')]"));
  }
  async user_select_verification(strVerification: string){
    await this.playwrightFactory.click(this.Verification);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Verification')]/ancestor::component-select//*[contains(text(),'"+strVerification+"')]"));
  }
  async user_select_period(strPeriod: string){
    await this.playwrightFactory.click(this.Period);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Period')]/ancestor::component-select//*[contains(text(),'"+strPeriod+"')]"));
  }
  async user_select_deleted(strDeleted: string){
    await this.playwrightFactory.click(this.Deleted);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Deleted')]/ancestor::component-select//*[contains(text(),'"+strDeleted+"')]"));
  }
  async user_click_apply(){
    await this.playwrightFactory.click(this.Apply_btn);
  }
  async user_verify_filtered_user(){
    await expect(this.User).toBeVisible();
  }
  async user_click_edit_button(striteration: any){
    let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.page.locator("//*[contains(text(),'"+firstname+"')]").click();
  }
  async user_edit_last_name(strLastname: string){
    await this.Last_Name.clear();
    await this.playwrightFactory.fill(this.Last_Name, strLastname);
  }
async user_click_save_btn(){
  await this.playwrightFactory.click(this.Save_Button);
}
async user_verify_save_success_msg(){
  await expect(this.Save_success_msg).toContainText("User has been Updated.")
}
async user_click_ok_btn(){
  await this.page.waitForTimeout(2000);
  await this.playwrightFactory.click(this.Ok_btn);
}
async user_click_delete_btn(){
  await this.playwrightFactory.click(this.Delete_btn);
}
async user_verify_delete_success_msg(){
  await expect(this.Delete_success_msg).toContainText('You want to delete this user.');
}
async user_verify_user_deleted(){
  await expect(this.No_Record_Found_mssg).toContainText('No records found!');
}
async user_click_restrict_button(striteration: any){
  let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.page.locator("//*[contains(text(),'"+firstname+"')]").hover();
    await this.playwrightFactory.click(this.page.locator("(//*[contains(text(),'"+firstname+"')]/ancestor::tr//button[@class='table__button danger'])[1]"));
}
async user_verify_restrict_msg(){
  await expect(this.Restricted_msg).toContainText('You want to restrict this user.');
}
async user_verify_restriction_success_msg(){
  await expect(this.Restriction_success_msg).toContainText('Restriction has been placed on specified user account(s).');
}
async user_click_verify_btn(){
  await this.playwrightFactory.click(this.Verify_btn)
}
async user_verify_account_restricted_msg(){
  await expect(this.Account_Restricted_msg).toContainText('Your account is currently restricted. Please contact the admin to have this resolved.');
}
  
 

 




}


