import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class WEBSITE_REGISTER_MY_CHARITY_PAGE {
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

readonly btn_Partners: Locator;
readonly txt_Register_My_Charity_Submenu: Locator;
readonly txt_Register_Your_Charity_Title: Locator;
readonly txt_Charity_Name: Locator;
readonly txt_Charity_Registration_Number:Locator;
readonly Catagory_drpdwn:Locator;
readonly Search_Category:Locator;
readonly Category_Name:Locator;
readonly txt_website:Locator;
readonly charity_address1:Locator;
readonly charity_address2:Locator;
readonly txt_City: Locator;
readonly postcode:Locator;
readonly contact_name_field:Locator;
readonly mobile_number:Locator;
readonly emailaddress:Locator;
readonly Term_and_condition_Lnk:Locator;
readonly Submit_btn:Locator;
readonly txt_Successful_Message: Locator;


















  
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
    this.btn_Partners=this.page.locator("//div[@class='header__item']//div[@title='Partners']")
    this.txt_Register_My_Charity_Submenu=this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Register My Charity')])[2]")
    this.txt_Register_Your_Charity_Title=this.page.locator("//h1[normalize-space()='Register Your Charity']")
    this.txt_Charity_Name=this.page.locator("//input[@id='charity_name']")
    this.txt_Charity_Registration_Number=this.page.locator("//input[@placeholder='Enter Registered Number']")
    this.Catagory_drpdwn= this.page.locator("//*[contains(text(),'Category ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Search_Category= this.page.locator("//input[@placeholder='Press ENTER to search']")
    this.Category_Name=this.page.locator("//div[contains(text(),'Mini and Mum Care Center')]")
    this.txt_website = this.page.locator("#website")
    this.charity_address1 = this.page.locator("#address1")    
    this.charity_address2 = this.page.locator("#address2")  
    this.txt_City=this.page.locator("//input[@id='city']")
    this.postcode = this.page.locator("//*[contains(text(),'Postcode')]/ancestor::component-input//input[@placeholder='Enter postcode']")
    this.contact_name_field=this.page.locator("#contact_name") 
    this.mobile_number = this.page.locator("#tel")
    this.emailaddress=this.page.locator("#email")
    this.Term_and_condition_Lnk=this.page.locator("//*[contains(text(),'I accept the Run for Charity ')]/ancestor::component-checkbox//span[@class='checkbox__tick']") 
    this.Submit_btn=this.page.locator("//span[normalize-space()='Submit']") 
    this.txt_Successful_Message=this.page.locator("//h3[normalize-space()='Thank you for getting in touch!']")


    
    








  
    
  }
  

  
// Website Register My Charity Page
  
 async user_launches_application() {
    let url = process.env.APP_URL || "https://rfc-staging.sportsmediaagency.com/"
    await this.playwrightFactory.launchApplication(url);
  }


  async user_verify_partners_menu(){
    await expect(this.btn_Partners).toBeVisible();
  }

  async user_hover_on_partners_menu(){
    await this.btn_Partners.hover();
  }

  async user_verify_register_my_charity_submenu(){
    await expect(this.txt_Register_My_Charity_Submenu).toBeVisible();
  }

  async user_clicks_register_my_charity_submenu(){
    await this.playwrightFactory.click(this.txt_Register_My_Charity_Submenu);
    await this.page.waitForTimeout(3000);
  }  

  async user_verify_register_your_charity_title(){
    await expect(this.txt_Register_Your_Charity_Title).toBeVisible();
    await this.page.waitForTimeout(5000);
  }

  async user_verify_charity_name(){
  await expect(this.txt_Charity_Name).toBeVisible();
}

async user_enters_charity_name(striteration : any){
 
let username = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
await this.playwrightFactory.fill(this.txt_Charity_Name, username);
 
}

async user_verify_charity_registration_number(){
  await expect(this.txt_Charity_Registration_Number).toBeVisible();
}

async user_enter_charity_registration_number(strnum: string){
  await this.playwrightFactory.fill(this.txt_Charity_Registration_Number,strnum)
}

async user_select_category(strcategory: string){
    await this.playwrightFactory.click(this.Catagory_drpdwn);
    await this.playwrightFactory.fill(this.Search_Category, strcategory);
    await this.page.waitForTimeout(3000)
    await this.Category_Name.waitFor();
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strcategory+"')]"));
}

async user_enter_website(strwebsite: string){
    await this.playwrightFactory.fill(this.txt_website,strwebsite)
}

async user_verify_charity_address1_field(){
    await expect(this.charity_address1).toBeVisible();
}
 
async user_enter_charity_address1_field(straddress1: string){
    await this.playwrightFactory.fill(this.charity_address1,straddress1)
}
 
async user_verify_charity_address2_field(){
    await expect(this.charity_address2).toBeVisible();
}
 
async user_enter_charity_address2_field(straddress2: string){
    await this.playwrightFactory.fill(this.charity_address2,straddress2)
}

async user_verify_city_name(){
    await expect(this.txt_City).toBeVisible();
}
 
async user_enter_city_name(strcity: string){
    await this.playwrightFactory.fill(this.txt_City,strcity)
}

async user_enters_postcode(strpostcode: string){
  await this.playwrightFactory.fill(this.postcode,strpostcode)
}

async user_enter_contact_name(strcontactname: string){
  await this.playwrightFactory.fill(this.contact_name_field, strcontactname);
 
}

async user_enter_mobile_number(strmobilenumber: string){
  await this.playwrightFactory.fill(this.mobile_number,strmobilenumber)
}

async user_enters_emailaddress(stremailaddress: any){
  let emailaddress=await this.dataFactory.getIterationData(this.container,'EMAIL',stremailaddress);
  await this.playwrightFactory.fill(this.emailaddress,emailaddress)
}

async user_verify_term_and_condition_link(){
  await expect(this.Term_and_condition_Lnk).toBeVisible();
}

async user_clicks_term_and_condition_link(){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.click(this.Term_and_condition_Lnk)
}

async user_verify_submit_button(){
    await expect(this.Submit_btn).toBeVisible();
}
 
async user_clicks_submit_button(){
    await this.playwrightFactory.click(this.Submit_btn)
}

async user_verify_successful_message(){
    await expect(this.txt_Successful_Message).toBeVisible();
}








 
































  

 




















  


}










 
 







