import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class CREATE_EVENT_REGISTRATION {
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
readonly Create_Registration_Page_Tittle: Locator;
readonly Select_Event: Locator;
readonly Event_Dorny_Lake: Locator;
readonly Event_Drpdwn_List: Locator;
readonly Primary_Checkbox: Locator;
readonly Charity_drpdwn: Locator;
readonly Charity_Name: Locator;
readonly Select_Payment_Option: Locator;
readonly Participant_Pay: Locator;
readonly Participant_Pays_Family_Regestration: Locator;
readonly Charity_Pays_Family_Regestration: Locator;
readonly charity_pays_participants_family_registration: Locator;
readonly Charity_pays_Participant: Locator;
readonly Set_Registration_Fee: Locator;
readonly YES: Locator;
readonly Registration_Fee: Locator;
readonly Fundraising_Target_Amount: Locator;
readonly TC_Checkbox_one: Locator;
readonly TC_Checkbox_Two: Locator;
readonly Would_You_Like_To_ADD: Locator;
readonly Enter_Age1: Locator;
readonly Enter_Age2: Locator;
readonly Enter_Amount1: Locator;
readonly Enter_Amount2: Locator;
readonly Distance_Field: Locator;
readonly Save_Button: Locator;
readonly Event: Locator;
readonly Registration_Text_Box: Locator;
readonly Error_Popup: Locator;
readonly Background_Img:Locator;
 readonly Published:Locator;
 readonly Hide_Event_Discription:Locator;
 readonly Tick_Box:Locator;
 readonly Test_Event_Date:Locator;
 readonly Search_Charity: Locator;
 readonly Event_drpdwn_search_bar: Locator;
 readonly Event_Dorny_Lake_edit: Locator;
















  
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
    this.Create_Registration_Page_Tittle = this.page.locator("//*[contains(text(),'Create Event Registration Page')]");
    this.Select_Event= this.page.locator("(//*[contains(text(),' Create ')]/ancestor::component-section//span[@class='dropdown-btn'])[1]");
    this.Event_Dorny_Lake= this.page.locator("(//*[contains(text(),' Events ')]/ancestor::component-section//*[contains(text(),' Dorney Lake ')]/ancestor::li//*[contains(text(),' Dorney Lake ')]");
    this.Event_Drpdwn_List= this.page.locator("(//*[contains(text(),'Events ')]/ancestor::component-select//div[@class='dropdown-list'])[1]");
    this.Primary_Checkbox= this.page.locator("//*[contains(text(),'This page is primary registration page')]/ancestor::component-checkbox//span[@class='checkbox__tick']");
    this.Charity_drpdwn= this.page.locator("(//*[contains(text(),'Charity ')]/ancestor::component-select//span[@class='dropdown-btn'])[1]");
    this.Charity_Name= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::component-select//*[contains(text(),' Cancer_kid ')]");
    this.Select_Payment_Option= this.page.locator("//*[contains(text(),'Payment Option ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Participant_Pay= this.page.locator("(//*[contains(text(),'Payment Option ')]/ancestor::component-select//*[contains(text(),' Participant Pays ')])[1]");
    this.Participant_Pays_Family_Regestration= this.page.locator("//*[contains(text(),'Payment Option ')]/ancestor::component-select//*[contains(text(),' Participant Pays + Family Registrations ')]");
    this.Charity_Pays_Family_Regestration= this.page.locator("//*[contains(text(),'Payment Option ')]/ancestor::component-select//*[contains(text(),' Charity Pays For Family Registrations ')]")
    this.charity_pays_participants_family_registration= this.page.locator("//*[contains(text(),'Payment Option ')]/ancestor::component-select//*[contains(text(),' Charity Pays For Participant + Family Registrations ')]");
    this.Charity_pays_Participant= this.page.locator("(//*[contains(text(),'Payment Option ')]/ancestor::component-select//*[contains(text(),' Charity Pays For Participant ')])[1]");
    this.Set_Registration_Fee= this.page.locator("//*[contains(text(),' Would you like to set your own registration fee and Fundraising Target Amount?  ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.YES= this.page.locator("//*[contains(text(),' Would you like to set your own registration fee and Fundraising Target Amount?  ')]/ancestor::component-select//*[contains(text(),' Yes ')]");
    this.Registration_Fee= this.page.locator("//*[contains(text(),' Registration Fee (£) ')]/ancestor::component-input//input[@type='number']");
    this.Fundraising_Target_Amount= this.page.locator("//*[contains(text(),'Fundraising Target Amount (£)')]/ancestor::component-input//input[@type='number']");
    this.TC_Checkbox_one= this.page.locator("//*[contains(text(),'Accept Terms & Conditions')]/ancestor::label//span[@class='checkbox__tick']");
    this.TC_Checkbox_Two= this.page.locator("//*[contains(text(),'Accept terms & conditions')]/ancestor::label//span[@class='checkbox__tick']");
    this.Would_You_Like_To_ADD= this.page.locator("//*[contains(text(),' Would you like to add family?  ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Enter_Age1= this.page.locator('#family1_age');
    this.Enter_Amount1= this.page.locator("(//input[@placeholder='Enter Amount'])[1]");
    this.Enter_Age2= this.page.locator('#family2_age');
    this.Enter_Amount2= this.page.locator("(//input[@placeholder='Enter Amount'])[2]")
    this.Distance_Field= this.page.locator("//ng-multiselect-dropdown[@class='multi-select hasMultiselect ng-untouched ng-dirty']");
    this.Save_Button= this.page.locator("//button[@class='button button-primary min-width-auto']");
    this.Event= this.page.locator("//*[contains(text(),'Dorney Lake')]");
    this.Registration_Text_Box= this.page.frameLocator("//*[contains(text(),'Registration Form Text ')]/ancestor::component-textarea//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
    this.Error_Popup= this.page.locator("//div[@class='swal-title']");
    this.Background_Img=this.page.locator("//span[normalize-space()='Background Image']")
    this.Published=this.page.locator("//span[contains(text(),'Published')]")
    this.Hide_Event_Discription=this.page.locator("//span[contains(text(),'Hide Event Description')]")
    this.Tick_Box=this.page.locator("//span[contains(text(),'Tick box to add Fundraising Information')]")
    this.Test_Event_Date=this.page.locator("//div[normalize-space()='Test event date']")
    this.Search_Charity= this.page.locator("(//*[contains(text(),'Charity')]/ancestor::component-select//input[@placeholder='Search'])[1]");
    this.Event_drpdwn_search_bar= this.page.locator("//*[contains(text(),'Events ')]/ancestor::component-select//input[@placeholder='Search']");
    this.Event_Dorny_Lake_edit= this.page.locator("//*[contains(text(),'Dorney Lake')]");
    

    
    









    
    
  }
  
  

  
async user_verify_create_event_registration_page(){
  await expect(this.Create_Registration_Page_Tittle).toBeVisible();
}
async user_select_event(strevent: string){
  await this.playwrightFactory.click(this.Select_Event);
  await this.playwrightFactory.fill(this.Event_drpdwn_search_bar, strevent);
  await this.page.keyboard.press('Enter');
  await expect(this.Event_Drpdwn_List).toBeVisible();
  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strevent+"')]"))
  }
  async user_select_event_edit_registration_page(strevent: string){
    await this.playwrightFactory.click(this.Select_Event);
  await this.playwrightFactory.fill(this.Event_drpdwn_search_bar, strevent);
  await this.page.keyboard.press('Enter');
  await expect(this.Event_Dorny_Lake_edit).toBeVisible();

  }


async user_check_primary_checkbox(){
  await this.playwrightFactory.click(this.Primary_Checkbox);
}
async user_select_charity(strCharity: string){
  await this.playwrightFactory.click(this.Charity_drpdwn);
  await this.playwrightFactory.fill(this.Search_Charity, strCharity);
  await this.page.keyboard.press('Enter');
  await this.Charity_Name.waitFor();
  await this.playwrightFactory.click(this.Charity_Name);
}

async user_verify_payment_option(){
  await this.playwrightFactory.click(this.Select_Payment_Option);
  await expect(this.Participant_Pay).toBeVisible();
  await expect(this.Participant_Pays_Family_Regestration).toBeVisible();
  await expect(this.charity_pays_participants_family_registration).toBeVisible();
  await expect(this.Charity_Pays_Family_Regestration).toBeVisible();
  await expect(this.Charity_pays_Participant).toBeVisible();
  await this.playwrightFactory.click(this.Participant_Pay);

  
}
async set_regestration_fee_yes(){
  await this.playwrightFactory.click(this.Set_Registration_Fee);
  await this.playwrightFactory.click(this.YES);
}
async verify_registrationfee_field(){
  await expect(this.Registration_Fee).toBeVisible();
}
async verify_fundraising_target_amount(){
  await expect(this.Fundraising_Target_Amount).toBeVisible();
}
async verify_tc_checkbox_and_checked(){
  await expect(this.TC_Checkbox_one).toBeVisible();
  await this.playwrightFactory.click(this.TC_Checkbox_one);
  await expect(this.TC_Checkbox_Two).toBeVisible();
  await this.playwrightFactory.click(this.TC_Checkbox_Two);
}
async user_select_participent_pay_option(){
  await this.playwrightFactory.click(this.Select_Payment_Option);
  await this.playwrightFactory.click(this.Participant_Pay);
}
async verify_tc_checkbox(){
  await expect(this.TC_Checkbox_one).toBeVisible();
  await expect(this.TC_Checkbox_Two).toBeVisible();
}
async user_select_participentpay_familyregistration(){
  await this.playwrightFactory.click(this.Select_Payment_Option);
  await this.playwrightFactory.click(this.Participant_Pays_Family_Regestration);
}
async verify_would_you_like_to_add_family_field(){
  await expect(this.Would_You_Like_To_ADD).toBeVisible();
}
async verify_age_amount_field(){
  await expect(this.Enter_Age1).toBeVisible();
  await expect(this.Enter_Age2).toBeVisible();
  await expect(this.Enter_Amount1).toBeVisible();
  await expect(this.Enter_Amount2).toBeVisible();
}
async user_select_charity_pays_family_registration(){
  await this.playwrightFactory.click(this.Select_Payment_Option);
  await this.playwrightFactory.click(this.Charity_Pays_Family_Regestration);
}
async user_select_charity_pays_participants(){
  await this.playwrightFactory.click(this.Select_Payment_Option);
  await this.playwrightFactory.click(this.Charity_pays_Participant);
}
async user_select_charity_pays_participants_family_registration(){
  await this.playwrightFactory.click(this.Select_Payment_Option);
  await this.playwrightFactory.click(this.charity_pays_participants_family_registration);
}
async verify_distance_auto_populated(){
  await expect(this.Distance_Field).toContainText(' 5K 10K Half Marathon Marathons Bike Ride Corporate Duathlon');
}
async user_verify_event(){
  await expect(this.Select_Event).toContainText(' Test event date x ');
}
 async user_click_save(){
  await this.playwrightFactory.click(this.Save_Button);
 }
 async user_verify_updated_event(strEvent: string){
  await expect(this.page.locator("(//*[contains(text(),'"+strEvent+"')])[1]")).toContainText('Test Event Date');
}
 async user_enter_text_registration_box(strRegistration: string){
  await this.Registration_Text_Box.clear();
  await this.playwrightFactory.fill(this.Registration_Text_Box, strRegistration);
 }
 async user_verify_text_in_registration_box(){
  await expect(this.Registration_Text_Box).toContainText("sadf");
}
 async user_verify_error_popup(){
  await expect(this.Error_Popup).toBeVisible();
 }
 async verify_registration_field_visible(){
   await expect (this.Background_Img).toBeVisible();
   await expect (this.Hide_Event_Discription).toBeVisible();
   await expect (this.Tick_Box).toBeVisible();
}
 async user_clicks_selectevent(){
   await this.playwrightFactory.click(this.Select_Event)
   await expect(this.page.locator('#non-existent-element')).toHaveCount(0);
   await this.playwrightFactory.click(this.Test_Event_Date);
 
 
}
async user_select_payment_option(){
  await this.playwrightFactory.click(this.Select_Payment_Option);
  await this.playwrightFactory.click(this.Participant_Pay);
}
  




}


