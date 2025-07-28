import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class WEBSITE_EVENT_DETAILS_PAGE {
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
readonly Select_btn: Locator;
readonly Event_Name: Locator;
readonly Event_Image: Locator;
readonly Event_Detail_Link: Locator;
readonly Event_Date_Location: Locator;
readonly Event_Cost: Locator;
readonly Privacy_Policy_msg: Locator;
readonly Event_Email_box: Locator;
readonly Next_btn: Locator;
readonly Email_success_msg: Locator;
readonly Ok_btn: Locator;
readonly Preferred_charity_detail_tittle: Locator;
readonly Charity_Catagory: Locator;
readonly Charity_Catagory_Search_bar: Locator;
readonly Charity_Catagory_drpdwn_list: Locator;
readonly Charity: Locator;
readonly Charity_search_bar: Locator;
readonly Charity_drpdwn_list: Locator;
readonly Registor_Intrest_btn: Locator;
readonly Your_Information_tittle: Locator;
readonly First_Name: Locator;
readonly Last_Name: Locator;
readonly DOB: Locator;
readonly Gender: Locator;
readonly Male: Locator;
readonly Phone_Number: Locator;
readonly Postcode: Locator;
readonly TC1: Locator;
readonly TC2: Locator;
readonly TC3: Locator;
readonly Submit_btn: Locator;
readonly Select_Month: Locator;
readonly Select_Year: Locator;
readonly Date: Locator;
readonly Register_success_msg: Locator;
readonly Load_more_btn: Locator;


readonly txt_Profile_Icon: Locator;
readonly txt_Login: Locator;
readonly drpdwn_Select_Distance: Locator;
//readonly txt_10k: Locator;
readonly tab_Choose_Distance_Category: Locator;
readonly btn_10K_Select_Button: Locator;
readonly btn_Next_Button: Locator;
readonly txt_Email_Address: Locator;
readonly btn_Ok_Button: Locator;
readonly txt_Preferred_Charity_Details_Title: Locator;
readonly drpdwn_Charity_Category: Locator;
readonly txt_Search_Charity_Category: Locator;
readonly txt_Charity_Category_Name: Locator;
readonly drpdwn_Charity: Locator;
readonly txt_Search_Charity: Locator;
readonly txt_Charity_Name: Locator;
readonly btn_Register_Interest_Button: Locator;
readonly txt_First_Name: Locator;
readonly txt_Last_Name: Locator;
readonly txt_Date_of_Birth: Locator;
readonly txt_Gender: Locator;
readonly txt_Male: Locator;
readonly txt_Phone_Number: Locator;
readonly txt_Postcode: Locator;
readonly txt_TC1: Locator;
readonly txt_TC2: Locator;
readonly txt_TC3: Locator;
readonly btn_Submit: Locator;
readonly date_of_birth:Locator;
 
  readonly Year:Locator;
  readonly Select_date:Locator;
  readonly date_of_birth_close_btn:Locator;
  readonly Female:Locator;
  readonly Fundraising_Amount: Locator;
 








  
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
    this.Select_btn= this.page.locator("(//*[contains(text(),'Select')]/ancestor::button)[1]");
    this.Event_Name= this.page.locator("//*[contains(text(),' Automation Interstate Marathoniki ')]");
    this.Event_Image= this.page.locator("//figure[@class='image__figure']//img");
    this.Event_Detail_Link= this.page.locator("//*[contains(text(),'Click here to view Event Detail')]");
    this.Event_Date_Location= this.page.locator("//p[@class='text-muted-eventname mt-2']");
    this.Event_Cost= this.page.locator("//div[@class='pricewithEvent']");
    this.Privacy_Policy_msg= this.page.locator("//p[@class='custom-info-text']");
    this.Event_Email_box= this.page.locator("//input[@placeholder='Enter your Email address ']");
    this.Next_btn= this.page.locator("//*[contains(text(),'Next')]/ancestor::button");
    this.Email_success_msg= this.page.locator("//*[contains(text(),'Validation passed. You can register for this event.')]");
    this.Ok_btn= this.page.locator("//div[@class='swal-modal']//*[contains(text(),'OK')]");
    this.Preferred_charity_detail_tittle= this.page.locator("//*[contains(text(),'Preferred Charity Details ')]");
    this.Charity_Catagory= this.page.locator("//*[contains(text(),'--Select  Charity Category--')]")
    this.Charity_Catagory_Search_bar= this.page.locator("//component-select[contains(@placeholder,'Charity Category--')]//input[contains(@placeholder,'Search')]");
    this.Charity_Catagory_drpdwn_list= this.page.locator("//*[contains(text(),'Charity Category ')]/ancestor::component-select//ul[@class='item2']");
    this.Charity= this.page.locator("//*[contains(text(),'--Select  Charity--')]");
    this.Charity_search_bar= this.page.locator("//component-select[contains(@placeholder,'Charity--')]//input[contains(@placeholder,'Search')]");
    this.Charity_drpdwn_list= this.page.locator("(//*[contains(text(),'Charity ')]/ancestor::component-select//ul[@class='item2'])[2]")
    this.Registor_Intrest_btn= this.page.locator("//*[contains(text(),'Register Interest')]");
    this.Your_Information_tittle= this.page.locator("//*[contains(text(),'Your Information ')]");
    this.First_Name= this.page.locator("//input[@placeholder='Enter your First Name ']");
    this.Last_Name= this.page.locator("//input[contains(@placeholder,'Enter your Last Name')]");
    this.Gender= this.page.locator("//*[contains(text(),'Gender')]/ancestor::component-select//span[@class='selected-item']")
    this.Male=this.page.locator("//*[contains(text(),'Male')]");
    this.Phone_Number= this.page.locator("//component-input[@inputclassname='input-primary i18n-input']");
    this.Postcode= this.page.locator("//input[@placeholder='Enter Postcode']");
    this.TC1= this.page.locator("(//span[@class='checkbox__tick'])[1]");
    this.TC2= this.page.locator("(//span[@class='checkbox__tick'])[2]");
    this.TC3= this.page.locator("(//span[@class='checkbox__tick'])[3]");
    this.Submit_btn= this.page.locator("//*[contains(text(),'Submit')]/ancestor::button")
    this.DOB= this.page.locator("//button[@class='datepicker__mask']");
    this.Select_Month=this.page.locator("//select[@title='Select month']");
    this.Select_Year= this.page.locator("//select[@title='Select year']");
    this.Date= this.page.locator("(//span[@class='custom-day'])[8]");
    this.Register_success_msg= this.page.locator("//h3[@class='registerSuccess mt-3']");
    this.Load_more_btn= this.page.locator("//*[contains(text(),'Explore More')]");
    
    this.txt_Profile_Icon=this.page.locator("#dropdownMenu")
    this.txt_Login=this.page.locator("//a[normalize-space()='Login']")
    this.drpdwn_Select_Distance=this.page.locator("//select[@class='select ng-pristine ng-valid ng-touched']")
  //this.txt_10k=this.page.locator("//option[@value='9e4b6f93-5241-45e6-8ddb-868bd07a55aa']")
    this.tab_Choose_Distance_Category=this.page.locator("//a[normalize-space()='Choose Distance Category']")
    this.btn_10K_Select_Button=this.page.locator("(//*[contains(text(),'Select')]/ancestor::component-button//button[@class='button button-primary'])[1]")
    this.btn_Next_Button=this.btn_Next_Button=this.page.locator("//component-button[@classname='button button-primary button-primary-rfc']//button")
    this.txt_Email_Address=this.page.locator(" //*[contains(text(),'Email Address ')]/ancestor::component-input//input[@placeholder='Enter your Email address ']")
    this.btn_Ok_Button=this.page.locator("//button[normalize-space()='OK']")
    this.txt_Preferred_Charity_Details_Title=this.page.locator("//div[contains(text(),'Preferred Charity Details')]")
    this.drpdwn_Charity_Category= this.page.locator("//*[contains(text(),'Category ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.txt_Search_Charity_Category= this.page.locator("//component-select[contains(@placeholder,'Charity Category--')]//input[contains(@placeholder,'Search')]");
    this.txt_Charity_Category_Name= this.page.locator("//div[contains(text(),'Mini and Mum Care Center')]");
    this.drpdwn_Charity=this.page.locator("//component-select[contains(@placeholder,'Charity--')]//span[2]");
    this.txt_Search_Charity=this.page.locator("//component-select[contains(@placeholder,'Charity--')]//input[contains(@placeholder,'Search')]")
    this.txt_Charity_Name= this.page.locator("//div[contains(text(),'Automation City Marathonp3gkz')]");
    this.btn_Register_Interest_Button=this.page.locator("//span[normalize-space()='Register Interest']");
    this.txt_First_Name=this.page.locator("//input[@placeholder='Enter your First Name ']")
    this.txt_Last_Name=this.page.locator("//input[@placeholder='Enter your Last Name ']")
    this.txt_Date_of_Birth=this.page.locator("//*[contains(text(),'Date of Birth ')]/ancestor::component-datetime//button[@class='datepicker__mask']")
    this.txt_Gender= this.page.locator("//*[contains(text(),'-- Select Gender--')]")
    this.txt_Male=this.page.locator("//*[contains(text(),'Male')]");
    this.txt_Phone_Number= this.page.locator("#emergencyPhone");
    this.txt_Postcode= this.page.locator("//input[@placeholder='Enter Postcode']");
    this.txt_TC1= this.page.locator("//*[contains(text(),' I accept the Run for Charity ')]");
    this.txt_TC2= this.page.locator("//*[contains(text(),' I accept the Event ')]");
    this.txt_TC3= this.page.locator("//*[contains(text(),' I accept the Charity ')]");
    this.btn_Submit= this.page.locator("//*[contains(text(),'Submit')]/ancestor::button")
     this.date_of_birth=this.page.locator('component-datetime').getByRole('button')
    this.Year=this.page.getByLabel('Select year')
   this.Select_date=this.page.getByLabel("selectOption('2007')")
    this.Select_date=this.page.getByText('12', { exact: true })
    this.date_of_birth_close_btn=this.page.getByRole('button', { name: 'Close' })
    this.Female=this.page.locator("//div[normalize-space()='Female']")
    this.Fundraising_Amount= this.page.locator("//*[contains(text(),'Fundraising Amount')]/ancestor::component-input//input[@placeholder='How much are you aiming to fundraise?']");
  

   
    
  }
  async user_click_select_btn(){
    await this.playwrightFactory.click(this.Select_btn);
  }
  async user_verify_event_name(strName: string){
    await expect(this.page.locator("//*[contains(text(),'"+strName+"')]")).toBeVisible();
  }
  async user_verify_event_image(){
    await expect(this.Event_Image).toBeVisible();
  }
  async user_verify_event_detail_link(){
    await expect(this.Event_Detail_Link).toBeVisible();
  }
  async user_verify_event_date_and_location(){
    await expect(this.Event_Date_Location).toBeVisible();
  }
  async user_verify_event_cost(){
    await expect(this.Event_Cost).toBeVisible();
  }
  async user_verify_privacy_policy_msg(){
    await expect(this.Privacy_Policy_msg).toBeVisible();
    await expect(this.Privacy_Policy_msg).toContainText(' We use your email to help with registration and contact you if there are issues. Your data is handled as per our ');
  }
  async user_enter_email(striteration: any){
     let Email = await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
    await this.playwrightFactory.fill(this.Event_Email_box,Email);
    await this.page.waitForTimeout(3000);
  }
  async user_verify_next_btn(){
    await expect(this.Next_btn).toBeEnabled();
  }
  async user_click_next_btn(){
    await this.playwrightFactory.click(this.Next_btn);
  }
  async user_verify_success_msg(){
    await expect(this.Email_success_msg).toContainText('Validation passed. You can register for this event.');
  }
  async user_click_ok_btn(){
    await this.playwrightFactory.click(this.Ok_btn);
  }
  async user_verify_preffered_charity_tittle(){
    await expect(this.Preferred_charity_detail_tittle).toBeVisible();
  }
  async user_select_charity_catagory_from_drpdwn(strSearch: string){
    await this.playwrightFactory.clickForce(this.Charity_Catagory);
    await expect(this.Charity_Catagory_drpdwn_list).toBeVisible();
    await this.playwrightFactory.fill(this.Charity_Catagory_Search_bar, strSearch);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strSearch+"')]"))
  }
  async user_select_charity_from_drpdwn(strSearch: string){
    await this.playwrightFactory.clickForce(this.Charity);
    await expect(this.Charity_drpdwn_list).toBeVisible();
    await this.playwrightFactory.fill(this.Charity_search_bar, strSearch);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strSearch+"')]"))
  }
  async user_click_register_intrest(){
    await this.playwrightFactory.click(this.Registor_Intrest_btn);
  }
  async user_verify_register_intrest_tittle(){
    await expect(this.Your_Information_tittle).toBeVisible();
  }
  async user_enter_first_name(striteration: any){
    await this.playwrightFactory.click(this.First_Name);
let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.First_Name,firstname);
  }
  async user_enter_last_name(strLast: string){
    await this.playwrightFactory.click(this.Last_Name);
    await this.playwrightFactory.fill(this.Last_Name, strLast);
  }
  async user_select_dob(){
    await this.playwrightFactory.click(this.DOB);
    await this.Select_Month.selectOption({label:'Apr'});
    await this.Select_Year.selectOption({label:'2000'});
    await this.playwrightFactory.click(this.Date);
  }
  async user_select_gender(){
    //await this.playwrightFactory.click(this.Gender);
     await this.page.locator('ng-multiselect-dropdown').filter({ hasText: '-- Select Gender--' }).locator('span').nth(2).click();
    await this.playwrightFactory.click(this.Male);
  }
  async user_enter_phonnumber(strNumber: string){
   // await this.playwrightFactory.fill(this.Phone_Number, strNumber);
    await this.page.getByRole('textbox', { name: 'Enter Mobile number' }).click();
  await this.page.getByRole('textbox', { name: 'Enter Mobile number' }).fill('+44 872 181 3108');
  }
  
  async user_accept_tc(){
    await this.playwrightFactory.click(this.TC1);
    await this.playwrightFactory.click(this.TC2);
    await this.playwrightFactory.click(this.TC3);
  }
  async user_click_submit_btn(){
    await expect(this.Submit_btn).toBeEnabled();
    await this.playwrightFactory.click(this.Submit_btn);
  }
  async user_verify_register_success_msg(){
    await expect(this.Register_success_msg).toBeVisible();
    await expect(this.Register_success_msg).toContainText('Thank you for registering your Interest!');
  }
  async user_verify_explore_more_btn(){
    await expect(this.Load_more_btn).toBeVisible();
  }


  async user_launches_application() {
    let url = process.env.APP_URL || "https://rfc-staging.sportsmediaagency.com/"
    await this.playwrightFactory.launchApplication(url);
  }
 
  async user_hover_profile_icon(){
    await this.txt_Profile_Icon.hover();
  }
 
  async user_verify_login(){
    await expect(this.txt_Login).toBeVisible();
  }
 
  async user_click_on_login(){
    await this.playwrightFactory.click(this.txt_Login)
  }
 
  async user_selects_distance(){
    await this.drpdwn_Select_Distance.selectOption({label:' 10K '})
     //await this.playwrightFactory.click(this.drpdwn_Select_Distance)
  }
 
  async user_verify_choose_distance_category_tab(){
    await expect(this.tab_Choose_Distance_Category).toBeVisible();
  }
 
  async user_clicks_choose_distance_category_tab(){
    await this.playwrightFactory.click(this.tab_Choose_Distance_Category)
  }
 
  async user_verify_10K_select_button(){
    await expect(this.btn_10K_Select_Button).toBeVisible();
  }
 
  async user_clicks_10K_select_button(){
    await this.playwrightFactory.click(this.btn_10K_Select_Button)
    await this.page.waitForTimeout(10000);
  }
 
  async user_verify_next_button(){
    await expect(this.btn_Next_Button).toBeVisible();
  }
 
  async user_clicks_next_button(){
    await this.playwrightFactory.clickForce(this.btn_Next_Button);
    await this.page.waitForTimeout(5000);
  }
 
 
 
  async user_verify_ok_button(){
    await expect(this.btn_Ok_Button).toBeVisible();
  }
 
  async user_clicks_ok_button(){
    await this.playwrightFactory.click(this.btn_Ok_Button);
    await this.page.waitForTimeout(5000);
  }
 
  async user_verify_preferred_charity_details_title(){
    await expect(this.txt_Preferred_Charity_Details_Title).toBeVisible();
    await this.page.waitForTimeout(5000);
  }
 
 
  async user_select_charity_category(strcategory: string){
    await this.playwrightFactory.click(this.drpdwn_Charity_Category);
    await this.playwrightFactory.fill(this.txt_Search_Charity_Category, strcategory);
    await this.page.waitForTimeout(3000)
    await this.txt_Charity_Category_Name.waitFor();
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strcategory+"')]"));
    }
 
 
  async user_select_charity(strcharity: string){
    await this.playwrightFactory.click(this.drpdwn_Charity);
    await this.playwrightFactory.fill(this.txt_Search_Charity, strcharity);
    await this.page.waitForTimeout(3000)
    await this.txt_Charity_Name.waitFor();
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strcharity+"')]"));
    }
 
 
   async user_verify_register_interest_button(){
    await expect(this.btn_Register_Interest_Button).toBeVisible();
  }
 
  async user_clicks_register_interest_button(){
    await this.playwrightFactory.click(this.btn_Register_Interest_Button);
  }
 
  async user_verify_first_name(){
    await expect(this.txt_First_Name).toBeVisible();
  }
 
  async user_enter_firstname(striteration: any){
  let name = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.txt_First_Name,name);
}
 
  async user_verify_last_name(){
    await expect(this.txt_Last_Name).toBeVisible();
  }
 
  async user_enters_lastname(striteration : string){
  await  this.playwrightFactory.fill(this.txt_Last_Name,striteration)
}
 
  async user_verify_date_of_birth(){
    await expect(this.txt_Date_of_Birth).toBeVisible();
  }
 
  async user_verify_gender(){
    await expect(this.txt_Gender).toBeVisible();
  }
 
  async user_verify_phone_number(){
    await expect(this.txt_Phone_Number).toBeVisible();
  }
 
  async user_verify_postcode(){
    await expect(this.txt_Postcode).toBeVisible();
  }
 
  async user_verify_terms_and_condition1(){
    await expect(this.txt_TC1).toBeVisible();
  }
 
  async user_verify_terms_and_condition2(){
    await expect(this.txt_TC2).toBeVisible();
  }
 
  async user_verify_terms_and_condition3(){
    await expect(this.txt_TC3).toBeVisible();
  }
 
  async user_verify_submit_button(){
    await expect(this.btn_Submit).toBeVisible();
  }
 
  async user_clicks_date_of_birth(){
await this.playwrightFactory.click(this.date_of_birth);
await this.page.getByLabel('Select year').selectOption('2007')
await this.page.getByText('12', { exact: true }).click();
 
await this.page.getByRole('button', { name: 'Close' }).click();
}
 
async user_clicks_female(strgender: string){
  await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strgender+"']"))
}
  async user_clicks_gender(){
    await this.playwrightFactory.clickForce(this.txt_Gender)
  }
 
  async user_enter_phone_number(str: string){
    await this.playwrightFactory.fill(this.txt_Phone_Number,str)
    }
 
    async user_enter_postcode(strPostcode: string){
    await this.playwrightFactory.fill(this.txt_Postcode, strPostcode)
    }
 
    async user_clicks_tc1(){
    await this.playwrightFactory.click(this.TC1)
    await this.page.waitForTimeout(3000);
  }
 
  async user_clicks_tc2(){
    await this.page.waitForTimeout(3000);
    await this.playwrightFactory.click(this.TC2)
  }
 
  async user_clicks_tc3(){
    await this.page.waitForTimeout(3000);
    await this.playwrightFactory.click(this.TC3)
  }
 
  async user_clicks_submit_button(){
    await this.page.waitForTimeout(3000);
    await this.playwrightFactory.click(this.btn_Submit)
  }
  async user_enter_fundraising_amount(strAmount: string){
    await this.playwrightFactory.fill(this.Fundraising_Amount, strAmount);
  }


}


