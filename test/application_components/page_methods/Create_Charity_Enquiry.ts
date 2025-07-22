import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class CREATE_ENQUIRY_CHARITIES {
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


  readonly Enquiry_Management_btn:Locator;
  readonly Enquiry_charity_btn:Locator;
 readonly Charity_Enquiry_heading:Locator;
 readonly Create_btn:Locator;
 readonly Charity_Name:Locator;
 readonly Categories_Animal:Locator;
 readonly Registration_Number:Locator;
 readonly Contact_name:Locator;
 readonly Contact_email:Locator;
 readonly Contact_Number:Locator;
 readonly Address_line1:Locator;
 readonly City:Locator;
 readonly Postcode:Locator;
 readonly Site:Locator;
 readonly Website:Locator;
 readonly Address_line2:Locator;
 readonly Addtional_details_Contacted:Locator;
 readonly Addtional_details_Coverted:Locator;
 readonly Addtional_details_Comment:Locator;
 readonly Select_Categories:Locator;
 readonly SAVE:Locator;
 readonly OKBTN:Locator;
 readonly btn_Search_Charity_Bar:Locator;
 readonly Existing_Search_name:Locator;
 readonly Contacted_Yes_btn:Locator;
 readonly Converted_Yes_btn:Locator;
readonly Categories:Locator;

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
    this.emt_homepage_reporting = this.page.getByText('Reporting', { exact: true });
    this.link_search_open = this.page.getByRole('link', { name: 'Portal open' });
     this.Enquiry_Management_btn=this.page.locator("//button[normalize-space()='Enquiry Management']")
    this.Enquiry_charity_btn=this.page.locator("//a[@href='/enquiries/charity'][normalize-space()='Charities']")
    this.Charity_Enquiry_heading=this.page.locator("//div[normalize-space()='Charity Enquiries']")
    this.Create_btn=this.page.locator("//span[normalize-space()='Create']")
    this.Charity_Name=this.page.locator("//input[@placeholder='Name of the charity']")
    this.Categories_Animal=this.page.locator("//div[normalize-space()='Animal']")
    this.Registration_Number=this.page.locator("//input[@placeholder='The charities registration number']")
    this.Contact_name=this.page.locator("//input[@placeholder='The Charities Contact person name']")
    this.Contact_email=this.page.locator("//input[@placeholder='Charities contact email address']")
    this.Contact_Number=this.page.locator("//*[contains(text(),'Contact Number ')]/ancestor::component-i18n-selector//input[@id='phoneNumber']")
    this.Address_line1=this.page.locator("//input[@placeholder='Address 1']")
    this.City=this.page.locator("//input[@placeholder='The city where charity is based']")
    this.Postcode=this.page.locator("//input[@placeholder='Postal address']")
    this.Site=this.page.locator("(//*[contains(text(),'Please Select')]/ancestor::component-select//span[@class='dropdown-multiselect__caret'])[2]")
    this.Select_Categories=this.page.locator("//*[contains(text(),'Categories ')]/ancestor::component-select//div[@class='multiselect-dropdown']")
    this.SAVE=this.page.locator("//span[normalize-space()='Save']")
    this.OKBTN=this.page.locator("//button[normalize-space()='OK']")
    this.btn_Search_Charity_Bar=this.page.locator("//input[@placeholder='Press ENTER to search']")
    this.Existing_Search_name=this.page.locator("(//td[@class='table__col'])[1]")
    this.Website=this.page.locator("//input[@placeholder='Website link']")
 this.Address_line2=this.page.locator("//input[@placeholder='Address 2']")
 this.Addtional_details_Contacted=this.page.locator("//*[contains(text(),'Contacted ')]/ancestor::component-select//span[@class='dropdown-btn']")
 this.Addtional_details_Coverted=this.page.locator("//*[contains(text(),'Converted ')]/ancestor::component-select//span[@class='dropdown-btn']")
 this.Addtional_details_Comment=this.page.locator("//component-textarea[@label='Comments']//div//div//div//textarea")
 this.Contacted_Yes_btn=this.page.locator("//component-select[@label='Contacted']//div[contains(text(),'Yes')]")
 this.Converted_Yes_btn=this.page.locator("//component-select[@label='Converted']//div[contains(text(),'Yes')]")
 this.Categories=this.page.locator("//*[contains(text(),'Categories ')]/ancestor::component-select//span[@class='dropdown-btn']")
   
  }
  

  
//Methods
async user_enters_charity_name(striteration: any){
  let name= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.Charity_Name,name);
}
 
async user_clicks_categories_field(strcategory:string){
  await this.playwrightFactory.click(this.Select_Categories)
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strcategory+"']"));
}
async user_enters_registration_number(striteration: string){
  await this.playwrightFactory.fill(this.Registration_Number,striteration);
}
 
 
async user_enters_contact_name(striteration: any){
  let name= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.Contact_name,name);
}
 
async user_enters_contact_email(striteration: any){
    let Email= await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
    await this.playwrightFactory.fill(this.Contact_email,Email);
}
 
async user_enters_contact_number(striteration: string){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.fill(this.Contact_Number,striteration);
 
}
async user_enters_address_line1(striteration: string){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.fill(this.Address_line1,striteration);
}
 
async user_enters_city(striteration: string){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.fill(this.City,striteration);
 
}
async user_enters_postcode(striteration: string){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.fill(this.Postcode,striteration);
 
}
async user_verify_siteopn(){
  await expect(this.Site).toBeVisible();
}
async user_clicks_savebtn(){
  await this.playwrightFactory.click(this.SAVE);
}
async user_clicks_okbtn(){
  await this.playwrightFactory.click(this.OKBTN);
}
 
 
 
                       
 /******************** Page Object with Optional Field************************/
 
 async user_enters_website(striteration :string){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.fill(this.Website,striteration);
 }
 
async user_enters_addressline2(striteration :string){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.fill(this.Address_line2,striteration);
}
 
async user_clicks_contacted_field(){
  await this.playwrightFactory.click(this.Addtional_details_Contacted)
  await this.playwrightFactory.click(this.Contacted_Yes_btn)
 
}
async user_clicks_converted_field(){
  await this.playwrightFactory.click(this.Addtional_details_Coverted)
  await this.playwrightFactory.click(this.Converted_Yes_btn)
}
async user_enters_comment_field(striteration: string){
    await this.page.waitForTimeout(3000)
    await this.playwrightFactory.fill(this.Addtional_details_Comment,striteration);
    await this.page.waitForTimeout(3000)
}
 
 
async user_launches_application() {
  let url = process.env.APP_URL || "https://rfc-portal.sportsmediaagency.com/auth/login?returnUrl=%2Fdashboard"
  await this.playwrightFactory.launchApplication(url);
  }
 
async user_clicks_enquiry_management_btn(){
  await this.playwrightFactory.click(this.Enquiry_Management_btn)
}
 
async user_verify_and_clicks_enquiry_charity_btn(){
  await expect(this.Enquiry_charity_btn).toBeVisible();
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.click(this.Enquiry_charity_btn)
}
async user_verify_charity_enquiry_heading(){
  await expect(this.Charity_Enquiry_heading).toBeVisible();
}
async user_verify_and_click_create_btn(){
  await expect(this.Create_btn).toBeVisible();
  await this.playwrightFactory.click(this.Create_btn)
}
async user_verify_charity_name(){
  await expect(this.Charity_Name).toBeVisible();
}
 async user_verify_categories_field(){
  await expect(this.Categories).toBeVisible();
}
async user_verify_registration_number(){
  await expect(this.Registration_Number).toBeVisible();
}
 
async user_verify_contact_name(){
  await expect(this.Contact_name).toBeVisible();
}
async user_verify_contact_email(){
  await expect(this.Contact_email).toBeVisible();
}
async user_verify_contact_number(){
  await this.page.waitForTimeout(3000)
  await expect(this.Contact_Number).toBeVisible();
}
async user_verify_address_line1(){
  await expect(this.Address_line1).toBeVisible();
}
async user_verify_city(){
  await expect(this.City).toBeVisible();
}
async user_verify_postcode(){
  await expect(this.Postcode).toBeVisible();
}
async user_verify_site(){
  await expect(this.Site).toBeVisible();
}
                       
 /******************** Page Object with Optional Field************************/
 
 async user_verify_website(){
  await expect(this.Website).toBeVisible();
}
async user_verify_addressline2(){
  await expect(this.Address_line2).toBeVisible();
}
 
async user_verify_contacted_field(){
  await expect(this.Addtional_details_Contacted).toBeVisible();
}
async user_verify_converted_field(){
  await expect(this.Addtional_details_Coverted).toBeVisible();
}
async user_verify_comment_field(){
  await expect(this.Addtional_details_Comment).toBeVisible();
}
 
}


