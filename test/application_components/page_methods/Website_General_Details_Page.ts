import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Website_General_Details_Page {
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

 
  readonly btn_select:Locator;
  readonly txt_email_address:Locator;
  readonly btn_next:Locator;
  readonly drpdwn_charity_category:Locator;
  readonly btn_animal:Locator;
  readonly txt_success_msg:Locator;
  readonly btn_ok:Locator;
  readonly btn_next2:Locator;
  readonly drpdwn_select_charity:Locator;
  readonly txt_charity:Locator;
  readonly radio_btn_register_now:Locator;
  readonly txt_predefined_email:Locator;
  readonly txt_first_name:Locator;
  readonly txt_last_name:Locator;
 
  //************ Calender ************* */
  readonly btn_calender:Locator;
  readonly btn_close:Locator;
  readonly Date: Locator;
  readonly DOB: Locator;
  readonly Select_Month: Locator;
  readonly Select_Year: Locator;
 
 
  //*********************************** */
  readonly btn_select_gender:Locator;
  readonly btn_male:Locator;
 
  //******Contact Details********** */
 
  readonly txt_contact_details:Locator;
  readonly txt_mobile_number:Locator;
  readonly txt_phone_number:Locator;
  readonly txt_address_1:Locator;
  readonly txt_address_2:Locator;
  readonly txt_city:Locator;
  readonly txt_county:Locator;
  readonly txt_postcode:Locator;
  readonly drpdwn_country:Locator;
  readonly btn_united_kingdom:Locator;
  readonly txt_emergency_contact_name:Locator;
  readonly txt_emergency_no:Locator;
 
 
  //******** Race details **********************/
 
  readonly txt_race_details:Locator;
  readonly btn_finish_time_hours:Locator;
  readonly btn_hours:Locator;
  readonly btn_finish_time_minutes:Locator;
  readonly btn_minutes:Locator;
  readonly drpdwn_participant_race_before:Locator;
  readonly btn_no:Locator;
  readonly drpdwn_tshirt_size:Locator;
  readonly btn_size_m:Locator;
  readonly drpdwn_preffered_heat_time:Locator;
  readonly checkbox_time:Locator;
  readonly txt_fundraising_amount:Locator;

//************Terms n Conditions **************** */
 
readonly txt_terms_and_condition:Locator;

readonly checkbox_run_for_charity:Locator;

readonly checkbox_event_terms:Locator;

readonly link_t_n_c_1:Locator;

readonly page_t_n_c:Locator;

readonly link_privacy_policy:Locator;

readonly page_privacy_policy:Locator;

readonly checkbox_terms_and_condition:Locator;

readonly btn_submit:Locator;








  
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
    
    

    this.btn_select=this.page.locator('(//*[contains(text(),"Select")]/ancestor::button)[1]');
    this.txt_email_address=this.page.locator('//input[@placeholder="Enter your Email address "]');
    this.btn_next=this.page.locator('//span[normalize-space()="Next"]');
    this.txt_success_msg=this.page.getByText('Success');
    this.btn_ok=this.page.getByRole('button', { name: 'OK' });
    this.btn_next2=this.page.getByRole('button', { name: 'Next' });
    this.drpdwn_charity_category=this.page.locator('//*[contains(text(), "--Select  Charity Category--")]/ancestor::ng-multiselect-dropdown//*[@class="dropdown-multiselect__caret"]');
    this.btn_animal=this.page.locator('//div[normalize-space()="Animal"]');
    this.drpdwn_select_charity=this.page.locator('//*[contains(text(), "--Select  Charity--")]/ancestor::ng-multiselect-dropdown//*[@class="dropdown-multiselect__caret"]');
    this.txt_charity=this.page.locator('//div[normalize-space()="RF charity two"]');
    this.radio_btn_register_now=this.page.locator('//*[contains(text(), "Register Now")]');
    this.txt_predefined_email=this.page.locator('//span[normalize-space()="Rutuja@gmail.com"]');
    this.txt_first_name=this.page.locator('//input[contains(@placeholder,"Enter your First Name")]');
    this.txt_last_name=this.page.locator('//input[@placeholder="Enter your Last Name "]');
 
    //********************** Calender *********************************** */
    this.btn_calender=this.page.locator('button[class="datepicker__mask"]');
    this.btn_close=this.page.locator('//span[normalize-space()="Close"]');
    this.DOB= this.page.locator("//button[@class='datepicker__mask']");
    this.Date= this.page.locator("(//span[@class='custom-day'])[8]");
    this.Select_Month=this.page.locator("//select[@title='Select month']");
    this.Select_Year= this.page.locator("//select[@title='Select year']");
 
 
   //********************************************************************** */
    this.btn_select_gender=this.page.locator('//*[contains(text(), "-- Select Gender--")]/ancestor::ng-multiselect-dropdown//*[@class="dropdown-multiselect__caret"]');
    this.btn_male=this.page.locator('//div[normalize-space()="Male"]');
 
    //*************** Contact Details *****************************/
 
    this.txt_contact_details=this.page.locator('//div[contains(text(),"Contact Details")]');
    this.txt_phone_number=this.page.locator('//*[@id="phoneNumberStep42"]');
    this.txt_mobile_number=this.page.locator('//*[@id="phoneNumberStep43"]');
    this.txt_address_1=this.page.locator('//input[@placeholder="Enter Apartment, Building Name"]');
    this.txt_address_2=this.page.locator('//input[@placeholder="Enter Street Name"]');
    this.txt_city=this.page.locator('//input[@placeholder="Enter city name"]');
    this.txt_county=this.page.locator('//input[@placeholder="Enter county name"]');
    this.txt_postcode=this.page.locator('//input[@placeholder="Enter postcode"]');
    this.drpdwn_country=this.page.locator('//*[contains(text(), "Country")]/ancestor::component-i18n-selector//*[@class="dropdown-multiselect__caret"]');
    this.btn_united_kingdom=this.page.locator('(//*[contains(text(), "Country ")]/ancestor::component-i18n-selector//*[@class="multiselect-item-checkbox"]//*[contains(text(), "United Kingdom")])[1]');
    this.txt_emergency_contact_name=this.page.locator('//input[@placeholder="Enter emergency contact name"]');
    this.txt_emergency_no=this.page.locator('//input[@id="emergencyPhone"]');
 
 
    //************* Race details ******************************************* */
 
    this.txt_race_details=this.page.locator('//div[contains(text(),"Race Details")]');
    this.btn_finish_time_hours=this.page.locator('//*[contains(text(), "Hours")]/ancestor::component-select//*[@class="dropdown-multiselect__caret"]');
    this.btn_hours=this.page.locator('//*[contains(text(), "Hours")]/ancestor::component-select//*[contains(text(), "02")]');
    this.btn_finish_time_minutes=this.page.locator('//*[contains(text(), "Minutes")]/ancestor::component-select//*[@class="dropdown-multiselect__caret"]');
    this.btn_minutes=this.page.locator('//*[contains(text(), "Minutes")]/ancestor::component-select//*[contains(text(), "04")]');
    this.drpdwn_participant_race_before=this.page.locator('//*[contains(text(), "Participant Race Before ")]/ancestor::component-select//*[@class="dropdown-multiselect__caret"]');
    this.btn_no=this.page.locator('//div[normalize-space()="No"]');
    this.drpdwn_tshirt_size=this.page.locator('//*[contains(text(), "T-Shirt Size ")]/ancestor::component-select//*[@class="dropdown-multiselect__caret"]');
    this.btn_size_m=this.page.locator('//*[contains(text(), "T-Shirt Size ")]/ancestor::component-select//*[contains(text(), "S M")]');
    this.drpdwn_preffered_heat_time=this.page.locator('//*[contains(text(), "Preferred Heat Time ")]/ancestor::component-select//*[@class="dropdown-multiselect__caret"]');
    this.checkbox_time=this.page.locator('//*[contains(text(), "Preferred Heat Time ")]/ancestor::component-select//*[contains(text(), "09:00 - 09:30")]');
    this.txt_fundraising_amount=this.page.locator('//input[@placeholder="How much are you aiming to fundraise?"]');
 
    //***************** Additional Information ************************************************** */
 
    // this.txt_additional_information=this.page.locator('//div[contains(text(),"Additional Information")]');
    // this.txt_passport_number=this.page.locator('//input[@placeholder="Enter passport number"]');
    // this.checkbox_medical_certificate=this.page.locator('//*[contains(text(), "Medical Certificate/PPS  ")]/ancestor::component-checkbox//*[@class="checkbox__tick"]');
    // this.checkbox_race_number=this.page.locator('//*[contains(text(), "Race Number Collection  ")]/ancestor::component-checkbox//*[@class="checkbox__tick"]');
 
    //********************* Terms and Conditions *************************************************** */
 
    this.txt_terms_and_condition=this.page.locator('//div[contains(text(),"Terms & Conditions")]');
    this.checkbox_run_for_charity=this.page.locator('//component-checkbox[@formcontrolname="runforcharity_terms"]//span[@class="checkbox__tick"]');
    this.checkbox_event_terms=this.page.locator('//component-checkbox[@formcontrolname="event_terms"]//span[@class="checkbox__tick"]');
 
    this.page_t_n_c=this.page.locator('//h2[normalize-space()="Terms & Conditions"]');
    this.link_t_n_c_1=this.page.locator('//*[contains(text(), " I accept the Run for Charity ")]/ancestor::label//*[@href="terms-and-conditions"]');
    this.link_privacy_policy=this.page.locator('//*[contains(text(), " I accept the Run for Charity ")]/ancestor::label//*[@href="privacy-policy"]');
    this.page_privacy_policy=this.page.locator('//h2[normalize-space()="Privacy Policy"]');
    this.checkbox_terms_and_condition=this.page.locator('//*[contains(text(), " I accept the Charity ")]/ancestor::label//*[@class="checkbox__tick"]');
    this.btn_submit=this.page.locator('//span[normalize-space()="Submit"]');
    
  }
  

  async user_click_select(){
    await this.playwrightFactory.click(this.btn_select);
    await this.page.waitForTimeout(3000);
  }
 
  async user_enter_email_address(stremail:string){
    await this.playwrightFactory.click(this.txt_email_address);
    await this.playwrightFactory.fill(this.txt_email_address,stremail);
  }
 
  async user_click_next(){
    await this.playwrightFactory.click(this.btn_next);
 
  }
 
  async user_verify_sucess_msg(){
    await expect (this.txt_success_msg).toBeVisible();
 
  }
 
  async user_click_ok(){
    await this.playwrightFactory.click(this.btn_ok)
 
  }
 
  async user_click_next_btn(){
    await this.playwrightFactory.click(this.btn_next2)
 
  }
 
 
  async user_click_charity_category_dropdown(){
    await this.playwrightFactory.click(this.drpdwn_charity_category);
  }
 
  async user_select_charity_category(){
    await this.playwrightFactory.click(this.btn_animal);
 
  }
 
  async user_click_select_charity(){
    await this.playwrightFactory.click(this.drpdwn_select_charity);
 
  }
 
  async user_select_charity(){
    await this.playwrightFactory.click(this.txt_charity);
  }
 
  async user_click_register_now(){
    await this.playwrightFactory.click(this.radio_btn_register_now);
  }
 
  async user_verify_predefined_email(){
    await expect (this.txt_predefined_email).toBeVisible();
 
  }
 
 
  async user_enter_first_name(strname:string){
    await this.playwrightFactory.click(this.txt_first_name);
    await this.playwrightFactory.fill(this.txt_first_name,strname);
  }
 
  async user_enter_last_name(strlname:string){
    await this.playwrightFactory.click(this.txt_last_name);
    await this.playwrightFactory.fill(this.txt_last_name,strlname);
  }
 
  async user_select_date_of_birth(){
    await this.playwrightFactory.click(this.DOB);
    await this.Select_Month.selectOption({label:'Apr'});
    await this.Select_Year.selectOption({label:'2000'});
    await this.playwrightFactory.click(this.Date);
  }
 
  async user_click_select_gender(){
    await this.playwrightFactory.click(this.btn_select_gender);
    await this.playwrightFactory.click(this.btn_male);
  }
 
  //****************** Contact Details *************************************** */
 
  async user_verify_contact_detail_page_displayed(){
    await expect (this.txt_contact_details).toBeVisible();
 
  }
 
   async user_enter_phone_number(strphone:string){
    await this.playwrightFactory.click(this.txt_phone_number);
    await this.playwrightFactory.fill(this.txt_phone_number,strphone);
  }
 
  async user_enter_mobile_number(strnumber:string){
    await this.playwrightFactory.click(this.txt_mobile_number);
    await this.playwrightFactory.fill(this.txt_mobile_number,strnumber)
  }
 
 
 
  async user_enter_address_1(straddress1:string){
    await this.playwrightFactory.click(this.txt_address_1);
    await this.playwrightFactory.fill(this.txt_address_1,straddress1);
 
  }
 
  async user_enter_address_2(straddress2:string){
    await this.playwrightFactory.click(this.txt_address_2);
    await this.playwrightFactory.fill(this.txt_address_2,straddress2);
  }
 
  async user_enter_city(strcity:string){
    await this.playwrightFactory.click(this.txt_city);
    await this.playwrightFactory.fill(this.txt_city,strcity);
  }
 
 
  async user_enter_county(strcounty:string){
    await this.playwrightFactory.click(this.txt_county);
    await this.playwrightFactory.fill(this.txt_county,strcounty)
  }
 
  async user_enter_postcode(strpostcode:string){
    await this.playwrightFactory.click(this.txt_postcode);
    await this.playwrightFactory.fill(this.txt_postcode,strpostcode);
 
  }
 
 
  async user_select_country(){
    await this.playwrightFactory.click(this.drpdwn_country);
    await this.playwrightFactory.click(this.btn_united_kingdom);
  }
 
 
  async user_enter_emergency_contact_name(strname:string){
    await this.playwrightFactory.click(this.txt_emergency_contact_name);
    await this.playwrightFactory.fill(this.txt_emergency_contact_name,strname);
  }
 
 
  async user_enter_emergency_no(strnumber:string){
    await this.playwrightFactory.click(this.txt_emergency_no);
    await this.playwrightFactory.fill(this.txt_emergency_no,strnumber);
  }
 
 
  //******************** Race Details *********************************************** */
 
  // async user_verify_race_detail_page_displayed(){
  //   await expect (this.txt_race_details).toBeVisible();
 
  // }
 
  async user_select_estimated_finish_time_in_hour(){
    await this.playwrightFactory.click(this.btn_finish_time_hours);
    await this.playwrightFactory.click(this.btn_hours);
  }
 
  async user_select_estimated_finish_time_in_minutes(){
    await this.playwrightFactory.click(this.btn_finish_time_minutes);
    await this.playwrightFactory.click(this.btn_minutes);
 
  }
 
  async user_select_participant_race_before(){
    await this.playwrightFactory.click(this.drpdwn_participant_race_before);
    await this.playwrightFactory.click(this.btn_no);
 
  }
 
 
  async user_select_tshirt_size(){
    await this.playwrightFactory.click(this.drpdwn_tshirt_size);
    await this.playwrightFactory.click(this.btn_size_m);
  }
 
  async user_click_preffered_heat_time_dropdown(){
    await this.playwrightFactory.click(this.drpdwn_preffered_heat_time);
    await this.playwrightFactory.click(this.checkbox_time);
  }
 
  // async user_select_heat_time(){
  //   await this.playwrightFactory.click(this.checkbox_time);
  // }
 
  async user_enter_fundraising_amount(stramount:string){
    await this.playwrightFactory.click(this.txt_fundraising_amount);
    await this.playwrightFactory.fill(this.txt_fundraising_amount,stramount);
  }
 
 
  //************** Additional Information *************************** */
 
  // async user_verify_additional_information_page_displayed(){
  //   await expect (this.txt_additional_information).toBeVisible();
 
  // }
 
  // async user_enter_passport_number(strnumber:string){
  //   await this.playwrightFactory.click(this.txt_passport_number);
  //   await this.playwrightFactory.fill(this.txt_passport_number,strnumber);
  // }
 
 
  // async user_click_medical_certificate_checkbox(){
  //   await this.playwrightFactory.click(this.checkbox_medical_certificate);
  // }
 
  // async user_click_race_number_checkbox(){
  //   await this.playwrightFactory.click(this.checkbox_race_number);
  // }
 
 
  //*************** Terms and Conditions *************************** */
 
  async user_verify_terms_and_condition_page_displayed(){
    await expect (this.txt_terms_and_condition).toBeVisible();
  }
 
  async user_click_run_for_charity_checkbox(){
    await this.playwrightFactory.click(this.checkbox_run_for_charity);
  }
 
  async user_click_event_terms_checkbox(){
    await this.playwrightFactory.click(this.checkbox_event_terms);
    //await this.page.pause();
  }
 
  async user_click_charity_terms_and_condition_checkbox(){
    await this.playwrightFactory.click(this.checkbox_terms_and_condition);
    await this.page.waitForTimeout(3000);
 
  }
 
  async user_verify_run_for_charity_Terms_n_conditoion_link_accessibility(){
    await expect (this.link_t_n_c_1).toBeVisible();
    await this.playwrightFactory.click(this.link_t_n_c_1);
 
  }
 
  async user_verify_successfully_landed_on_terms_and_condition_page(){
    await this.page.waitForTimeout(3000);
    await expect (this.page_t_n_c).toBeVisible();
    await this.page.waitForTimeout(3000);
 
  }
 
  async user_verify_run_for_charity_privacy_policy_link_accessibility(){
    await expect (this.link_privacy_policy).toBeVisible();
    await this.playwrightFactory.click(this.link_privacy_policy);
  }
 
  async user_verify_successfully_landed_on_privacy_policy_page(){
    await expect (this.page_privacy_policy).toBeVisible();
    await this.page.waitForTimeout(3000);
     await this.page.bringToFront();
}
 
  async user_click_submit_button(){
    await expect (this.btn_submit).toBeEnabled();
    await this.playwrightFactory.click(this.btn_submit)
  }

 




}

