import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Participantsignup_page{
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly emt_homepage_reporting: Locator;
  readonly link_search_open: Locator;
  
  

  //*Declare *//

  readonly First_name:Locator;
  readonly Last_name:Locator;
  readonly emailadress:Locator;
  readonly postcode:Locator;
  readonly date_of_birth:Locator;
  
  readonly Year:Locator;
  readonly Select_date:Locator;
  readonly date_of_birth_close_btn:Locator;
  readonly Select_Gender:Locator;
  readonly Female:Locator;
  readonly Term_and_condition_Lnk:Locator;
  readonly Submit_btn:Locator;
  readonly Verify_msg:Locator;
readonly password:Locator;
readonly password_invalid_error_msg:Locator;
readonly password_eye_icon:Locator;








  
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
    this.First_name = this.page.locator("//input[@placeholder='First Name']")
    this.Last_name = this.page.locator("//input[@placeholder='Last Name']")
     this.emailadress=this.page.locator("//input[@placeholder='Enter your Email address ']")
     this.postcode=this.page.locator("//input[@placeholder='Enter Postcode']")
     
    this.Select_Gender=this.page.locator("//*[contains(text(),'Gender ')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.Female=this.page.locator("//div[normalize-space()='Female']")
    this.Term_and_condition_Lnk=this.page.locator("//*[contains(text(),'I accept the Run for Charity ')]/ancestor::component-checkbox//span[@class='checkbox__tick']")
    this.Submit_btn=this.page.locator("//span[normalize-space()='Submit']")
    this.Verify_msg=this.page.locator ("//*[contains(text(),'Please enter the verification code we sent to you earlier.')]")
    this.date_of_birth=this.page.locator('component-datetime').getByRole('button')
    this.Year=this.page.getByLabel('Select year')
   this.Select_date=this.page.getByLabel("selectOption('2007')")
    this.Select_date=this.page.getByText('12', { exact: true })
    this.date_of_birth_close_btn=this.page.getByRole('button', { name: 'Close' })
    this.password=this.page.locator("//input[@placeholder='Password']")
    this.password_invalid_error_msg=this.page.locator("//div[contains(text(),'The password must be at least 8 characters and inc')]")
    this.password_eye_icon=this.page.locator("//a[@class='register__action']")

  }
  
  

  
/*********************************************************************************************************************/
  
async user_launches_application() {
  let url = process.env.APP_URL || " https://rfc-staging.sportsmediaagency.com/"
  await this.playwrightFactory.launchApplication(url);
}

async user_enter_firstname(striteration: any){
  let name = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.First_name,name);
}

async user_verify_firstname(){
  await expect(this.First_name).toBeVisible
}

async user_verify_lastname(){
  await  expect(this.Last_name).toBeVisible
}
async user_enters_lastname(striteration : string){
  await  this.playwrightFactory.fill(this.Last_name,striteration)
}

async user_verify_emailaddress(){
  await  expect(this.emailadress).toBeVisible
}

  async user_enters_emailaddress(striteration: any){
  let emailaddress=await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.fill(this.emailadress,emailaddress)
}
async user_enters_postcode(striteration: string){
  await this.playwrightFactory.fill(this.postcode,striteration)
}
async user_verify_postcode(){
  await expect(this.postcode).toBeVisible();
}
async user_clicks_gender_dropdwn(){
  await this.playwrightFactory.click(this.Select_Gender)
}

async user_clicks_female(strgender: string){
  await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strgender+"']"))
}
async user_verify_term_and_condition_link(){
  await expect(this.Term_and_condition_Lnk).toBeVisible
}
async user_clicks_term_and_condition_link(){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.click(this.Term_and_condition_Lnk) 
  await this.page.waitForTimeout(5000)
}
async user_clicks_submit_btn(){
 
  await this.playwrightFactory.click(this.Submit_btn) 
}
async user_verify_verify_your_account_msg(){
  await expect(this.Verify_msg).toBeVisible
}

async user_clicks_date_of_birth(){
await this.playwrightFactory.click(this.date_of_birth);
await this.page.getByLabel('Select year').selectOption('2007')
await this.page.getByText('12', { exact: true }).click();

await this.page.getByRole('button', { name: 'Close' }).click();
}

async user_enters_password(strpassword: string){
  await this.playwrightFactory.fill(this.password,strpassword) 
}
async user_verify_invalid_password_msg(){
await expect(this.password_invalid_error_msg).toBeVisible
}
async user_clear_password(){
await this.password.clear();
await this.page.waitForTimeout(3000)
}
async user_enter_valid_password(strpassword: string){
await this.playwrightFactory.fill(this.password,strpassword)
}
async user_verify_password_eye_icon(){
await expect(this.password_eye_icon).toBeVisible
}

async user_verify_submit_button_diabled(){
await expect(this.Submit_btn).toBeDisabled
}











































}