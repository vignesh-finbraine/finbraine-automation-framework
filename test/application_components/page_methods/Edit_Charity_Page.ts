import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
 
export class EDIT_CHARITIES {
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
 
 
readonly Membership_btn: Locator;
readonly Membership_Tittle: Locator;
readonly Expiry_Date: Locator;
readonly Expiry_Month: Locator;
readonly Select_Membership: Locator;
readonly Membership_Classic: Locator;
readonly Use_New_Membership_Fee: Locator;
readonly Extend_Membership: Locator;
readonly Select_Account_Manager: Locator;
//readonly Account_Manager_Name: Locator;
readonly Update_Membership_btn: Locator;
readonly Status: Locator
readonly Membership_type_classic: Locator;
readonly Expiry_Past_Date: Locator;
readonly Expiry_Date_Error_Msg: Locator;
readonly btn_next_year:Locator;
readonly successfull_msg:Locator;
readonly Type_Partner: Locator;
readonly Type_Premium: Locator;
readonly Type_Charity_of_the_Year: Locator;
readonly Type_Two_Year: Locator;
readonly Notification_Heading:Locator;
  readonly Frequency_1:Locator;
  readonly Frequency_2:Locator;
  readonly Update_btn1:Locator;
  readonly Update_btn2:Locator;
  readonly Freakquency1_searchbar:Locator;
 //readonly Freakquency1_Dropdown:Locator;
 readonly Freakquency2_searchbar:Locator;
 readonly Freakquency2_Dropdown:Locator;
 readonly OK_btn:Locator;
 readonly Integration:Locator;
 readonly Fundamental:Locator;
 readonly updatebutton:Locator;
  //readonly existing_credit: Locator;
  readonly title_type: Locator;
  readonly title_amount: Locator;
  readonly title_status: Locator;
  readonly title_issued_on: Locator;
  readonly add_credit_btn: Locator;
  readonly add_credit_page: Locator;
  readonly amount_field: Locator;
  readonly expiry_date_field: Locator;
  readonly select_expiry_date: Locator;
  readonly close_expiry_date: Locator;
  readonly type_drpdwn: Locator;
  readonly select_type: Locator;
  readonly create_credit: Locator;
  readonly ok_btn: Locator;
  readonly credit_history: Locator;
  readonly coloumn: Locator
  readonly edit_credit_history: Locator;
  readonly update_credit_title:Locator
  readonly update_amount: Locator;
  readonly update_date: Locator;
  readonly close_btn: Locator;
  readonly update_type: Locator;
  readonly delete_credit: Locator;
  readonly membership_updated: Locator;
  readonly fund_raising: Locator;
  readonly txt_Edit_Charity_Title: Locator;
readonly btn_Profile_Title: Locator;
readonly btn_Branding_Title: Locator;
readonly btn_Page_Content_Title: Locator;
readonly btn_Invoices_Title: Locator;
readonly btn_Membership_Title: Locator;
readonly btn_Fundraising_Platform_Title: Locator;
readonly btn_Users_Title: Locator;
readonly btn_Events_Title: Locator;
readonly btn_Call_Notes_Title: Locator;
 
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
    this.Membership_btn= this.page.locator("//*[contains(text(),' Profile ')]/ancestor::component-section//*[contains(text(),' Membership ')]");
    this.Membership_Tittle= this.page.locator("//*[contains(text(),'Membership')]/ancestor::component-section//h2[@class='title title-side section__title w-100 text-start col']");
    this.Expiry_Date= this.page.locator("//input[@label='Expiry Date']");
    this.Expiry_Month= this.page.locator("//*[contains(text(),'aug')]");
    this.Select_Membership=this.page.locator("//*[contains(text(),'Membership Type ')]/ancestor::component-select//span[@class='dropdown-multiselect__caret']");
    this.Membership_Classic= this.page.locator("//*[contains(text(),'Membership Type')]/ancestor::component-select//*[contains(text(),'Partner')]");
    this.Use_New_Membership_Fee= this.page.locator("//*[contains(text(),'Use New Membership fee')]/ancestor::component-checkbox//span[@class='checkbox__tick']");
    this.Extend_Membership= this.page.locator("//*[contains(text(),'Extend membership upon update')]/ancestor::component-checkbox//span[@class='checkbox__tick']");
    this.Select_Account_Manager= this.page.locator("//*[contains(text(),'Account Manager ')]/ancestor::component-select//span[@class='dropdown-btn']");
    //this.Account_Manager_Name= this.page.locator("//*[contains(text(),'Account Manager ')]/ancestor::component-select//*[contains(text(),' Suraj W ')]");
    this.Update_Membership_btn= this.page.locator("//*[contains(text(),'Update Membership')]");
    this.Status= this.page.locator("//*[contains(text(),'Active Status')]/ancestor::component-checkbox//span[@class='checkbox__tick']");
    this.Membership_type_classic=this.page.locator("//*[contains(text(),'Membership Type')]/ancestor::component-select//*[contains(text(),'Classic')]")
    this.Expiry_Past_Date= this.page.locator("//*[contains(text(),'may')]");
    this.Expiry_Date_Error_Msg= this.page.locator("//*[contains(text(),' The expiry date should be greater than 1 month or more ')]");
    this.btn_next_year=this.page.locator('//button[contains(text(),"›")]');
    this.successfull_msg=this.page.locator('//*[contains(text(), "Successfully updated the charity membership!")]');
    this.Type_Partner= this.page.locator("//*[contains(text(),'Membership Type')]/ancestor::component-select//*[contains(text(), 'Partner ')]");
    this.Type_Premium= this.page.locator("//*[contains(text(),'Membership Type')]/ancestor::component-select//*[contains(text(), ' Premium ')]");
    this.Type_Charity_of_the_Year= this.page.locator("//*[contains(text(),'Membership Type')]/ancestor::component-select//*[contains(text(), ' Charity of the Year ')]");
    this.Type_Two_Year= this.page.locator("//*[contains(text(),'Membership Type')]/ancestor::component-select//*[contains(text(), ' Two Year ')]");
    this.Notification_Heading=this.page.locator("//h2[normalize-space()='Notification Settings']")
    this.Frequency_1=this.page.locator ("(//*[contains(text(),'Frequency ')]/ancestor::component-select)[1]")
    this.Frequency_2=this.page.locator("(//*[contains(text(),'Frequency ')]/ancestor::component-select)[2]")
    this.Update_btn1=this.page.locator("(//*[contains(text(),'Update')]/ancestor::component-button//button[@class='button button-primary mt-4'])[2]")
    this.Update_btn2=this.page.locator("(//*[contains(text(),'Update')]/ancestor::component-button//button[@class='button button-primary mt-4'])[3]")
    this.Freakquency1_searchbar=this.page.locator("(//*[contains(text(), 'Frequency ')]/ancestor::component-select//span[@class='dropdown-btn'])[1]")
    //this.Freakquency1_Dropdown=this.page.locator("//*[contains(text(),' Each Day  ')]")
    this.Freakquency2_searchbar=this.page.locator("(//*[contains(text(), 'Frequency ')]/ancestor::component-select//span[@class='dropdown-btn'])[2]")
    this.Freakquency2_Dropdown=this.page.locator("//*[contains(text(),'Frequency ')]/ancestor::component-select//*[contains(text(),' Once a Week ')]")
    this.OK_btn=this.page.locator("//button[normalize-space()='OK']");
    this.Integration=this.page.locator("//h2[normalize-space()='Integrations']")
    this.Fundamental=this.page.locator("//*[contains(text(),'Integrations')]/ancestor::component-section//span[@class='checkbox__tick']")
    this.updatebutton=this.page.locator("(//*[contains(text(),'Update')])[6]")
    //this.existing_credit = this.page.locator("//div[contains(text(),'240000')]");
    this.title_type = this.page.locator("//th[normalize-space()='Type']");
    this.title_amount = this.page.locator("//th[normalize-space()='Amount']");
    this.title_status = this.page.locator("//component-section[contains(@sectiontitle,'Credit History')]//th[contains(@scope,'col')][normalize-space()='Status']");
    this.title_issued_on = this.page.locator("//th[normalize-space()='Issued On']");
    this.add_credit_btn = this.page.locator("//span[normalize-space()='Add Credit']");
    this.add_credit_page = this.page.locator("//h2[normalize-space()='Add Credit']");
    this.amount_field = this.page.locator("//input[contains(@placeholder,'Amount')]");
    this.expiry_date_field = this.page.locator("//component-datetime[@selector='date']//div//div//div//button");
    this.select_expiry_date = this.page.locator("//span[normalize-space()='30']");
    this.close_expiry_date = this.page.locator("//span[normalize-space()='Close']");
    this.type_drpdwn = this.page.locator("//span[contains(text(),'Select Type')]");
    this.select_type = this.page.locator("//div[normalize-space()='Membership Allocation']");
    this.create_credit = this.page.locator("//div[normalize-space()='Create Credit']");
    this.ok_btn = this.page.locator("//button[normalize-space()='OK']");
    this.credit_history = this.page.locator("//h2[normalize-space()='Credit History']");
    this.coloumn = this.page.locator("//tr[4]//td[4]");
    this.edit_credit_history = this.page.locator("//tr[4]//div[1]//button[1]//component-tooltip[1]//div[1]//a[1]");
    this.update_credit_title = this.page.locator("//h2[normalize-space()='Update Credit']");
    this.update_amount = this.page.locator("//input[@placeholder='Amount']");
    this.update_date = this.page.locator("//component-datetime[@selector='date']//div//div//div//button");
    this.close_btn = this.page.locator("//span[normalize-space()='Close']");
    this.update_type = this.page.locator("//component-select[@placeholder='Select Type']//div//ng-multiselect-dropdown//div//div//span//span//span");
    this.delete_credit = this.page.locator("//tr[5]//div[1]//button[2]//component-tooltip[1]//div[1]//span[1]");
    this.membership_updated = this.page.locator("//div[normalize-space()='Update Membership']");
    this.fund_raising = this.page.locator("//*[contains(text(),'Integrations')]/ancestor::component-section//span[@class='checkbox__tick']");
    this.txt_Edit_Charity_Title=this.page.locator("//h1[normalize-space()='Edit Charity']");
    this.btn_Profile_Title=this.page.locator("//button[normalize-space()='Profile']");
    this.btn_Branding_Title=this.page.locator("//button[normalize-space()='Branding']");
    this.btn_Page_Content_Title=this.page.locator("//button[normalize-space()='Page Content']");
    this.btn_Invoices_Title=this.page.locator("//button[normalize-space()='Invoices']");
    this.btn_Membership_Title=this.page.locator("//button[normalize-space()='Membership']");
    this.btn_Fundraising_Platform_Title=this.page.locator("//button[normalize-space()='Fundraising Platform']")
    this.btn_Users_Title=this.page.locator("//button[normalize-space()='Users']")
    this.btn_Events_Title=this.page.locator("//button[normalize-space()='Events']")
    this.btn_Call_Notes_Title=this.page.locator("//button[normalize-space()='Call Notes']")
 
  }
 
 
 
// Create Category- Flow
 
  async user_click_membership_tab(){
    await this.playwrightFactory.click(this.Membership_btn);
  }
  async user_verify_membership_page(){
    await expect(this.Membership_Tittle).toBeVisible();
 
  }
  async user_select_expiry_date(){
    await this.playwrightFactory.click(this.Expiry_Date);
    await this.playwrightFactory.click(this.btn_next_year);
    await this.playwrightFactory.click(this.Expiry_Month);
  }
  async user_select_membership(){
    await this.playwrightFactory.click(this.Select_Membership);
    await this.playwrightFactory.click(this.Membership_Classic);
 
  }
  async user_check_membership_fee(){
    await this.playwrightFactory.click(this.Use_New_Membership_Fee);
  }
  async user_check_extend_membership_checkbox(){
    await this.playwrightFactory.click(this.Extend_Membership);
  }
  async user_select_account_manager(strname: string){
    await this.playwrightFactory.click(this.Select_Account_Manager);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Account Manager ')]/ancestor::component-select//*[contains(text(),'"+strname+"')]"));
  }
  async user_click_update_membership_btn(){
    await this.playwrightFactory.click(this.Update_Membership_btn);
  }
  async user_check_status_checkbox(){
    await this.playwrightFactory.click(this.Status);
  }
  async user_verify_expiry_date_field(){
    await expect(this.Expiry_Date).toBeVisible();
  }
  async user_select_another_type(){
    await this.playwrightFactory.click(this.Select_Membership);
    await this.playwrightFactory.click(this.Membership_type_classic);
  }
  async user_select_past_date(){
     await this.playwrightFactory.click(this.Expiry_Date);
     await this.playwrightFactory.click(this.Expiry_Past_Date);
  }
  async user_verify_erroe_msg(){
    await expect(this.Expiry_Date_Error_Msg).toContainText(" The expiry date should be greater than 1 month or more from today's date ")
  }
  async user_verify_membership_type_drpdwn(){
     await this.playwrightFactory.click(this.Select_Membership);
    await expect(this.Membership_type_classic).toBeVisible();
    await expect(this.Type_Premium).toBeVisible();
    await expect(this.Type_Partner).toBeVisible();
    await expect(this.Type_Charity_of_the_Year).toBeVisible();
    await expect(this.Type_Two_Year).toBeVisible();
  }
  async user_verify_notification_fields(){
await this.playwrightFactory.click(this.Membership_btn);
await this.page.evaluate(() => {
window.scrollBy(2000, 2500); // Scroll down
});
await expect (this.Membership_Tittle).toBeVisible();
 
await expect (this.Notification_Heading).toBeVisible();
await expect (this.Frequency_1).toBeVisible();
await expect (this.Frequency_2).toBeVisible();
await expect (this.Update_btn1).toBeVisible();
await expect (this.Update_btn2).toBeVisible();
 
}
async user_clicks_frequency_searchbar(strFrequency1: string){
await this.playwrightFactory.click(this.Freakquency1_searchbar);
await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strFrequency1+"')]"));
await this.playwrightFactory.click(this.Update_btn1);
await this.playwrightFactory.click(this.OK_btn);
await this.page.waitForTimeout(3000);
await this.playwrightFactory.click(this.Freakquency2_searchbar);
await this.playwrightFactory.click(this.Freakquency2_Dropdown);
await this.playwrightFactory.click(this.Update_btn2);
await this.playwrightFactory.click(this.OK_btn);
}
async user_view_integration_field(){
await expect (this.Integration).toBeVisible();
await this.playwrightFactory.click(this.Fundamental);
await this.page.waitForTimeout(5000)
await this.playwrightFactory.click(this.updatebutton);
await this.playwrightFactory.click(this.OK_btn);
 
}
async user_verifies_exsisting_credit_to_be_displayed(strCredit: string){
  await expect(this.page.locator("//div[contains(text(),'"+strCredit+"')]")).toContainText('240000');
}
 
async user_verifies_coloumn_title_type_to_be_displayed(){
  await expect(this.title_type).toContainText('Type');
}
 
async user_verifies_coloumn_title_amount_to_be_displayed(){
  await expect(this.title_amount).toContainText('Amount');
}
 
async user_verifies_coloumn_title_stauts_to_be_displayed(){
  await expect(this.title_status).toContainText('Status');
}
 
async user_verifies_coloumn_title_issued_on_to_be_displayed(){
  await expect(this.title_issued_on).toContainText('Issued On');
}
 
async user_verifies_and_clicks_add_credit_btn(){
  await expect(this.add_credit_btn).toContainText('Add Credit');
  await expect(this.add_credit_btn).toBeEnabled();
  await this.playwrightFactory.click(this.add_credit_btn);
}
 
async user_verifies_add_credit_page_to_be_visible(){
  await expect(this.add_credit_page).toContainText('Add Credit');
}
 
async user_enters_amount(strAmt: string){
  await this.playwrightFactory.click(this.amount_field);
  await this.playwrightFactory.fill(this.amount_field, strAmt);
}
 
async user_enters_expiry_date(){
  await this.playwrightFactory.click(this.expiry_date_field);
  await this.playwrightFactory.click(this.select_expiry_date);
  await this.playwrightFactory.click(this.close_expiry_date);
}
 
async user_selects_type(){
  await this.playwrightFactory.click(this.type_drpdwn);
  await this.playwrightFactory.click(this.select_type);
}
 
async users_adds_credit(){
  await this.playwrightFactory.click(this.add_credit_btn);
}
 
async user_enters_credit_successfully(){
  await expect(this.create_credit).toContainText('Create Credit');
  await this.playwrightFactory.click(this.ok_btn);
}
 
async user_verifies_credit_history(){
  await expect(this.credit_history).toBeVisible();
}
async user_clicks_edit_icon(){
  await this.playwrightFactory.click(this.coloumn);
  await this.playwrightFactory.click(this.edit_credit_history);
}
 
async user_verifies_update_credit_title(){
  await expect(this.update_credit_title).toContainText('Update Credit');
}
 
async user_updates_credit_amount(strUpdateAmt: string){
  await this.playwrightFactory.click(this.update_amount);
  await this.update_amount.clear();
  await this.playwrightFactory.click(this.update_amount);
  await this.playwrightFactory.fill(this.update_amount, strUpdateAmt);
}
 
async user_updates_expiry_date(){
  await this.playwrightFactory.click(this.update_date);
  await this.playwrightFactory.click(this.select_expiry_date);
  await this.playwrightFactory.click(this.close_btn);
}
 
async user_updates_type(){
  await this.playwrightFactory.click(this.update_type);
  await this.playwrightFactory.click(this.select_type);
}
 
async user_verifies_delete_btn_functionality(){
  await this.playwrightFactory.click(this.Membership_btn);
  await this.playwrightFactory.click(this.coloumn);
  await expect(this.delete_credit).toBeVisible();
}
async user_verifies_integration_to_be_visible(){
  await expect(this.Integration).toContainText('Integrations');
}
 
async user_clicks_fund_raising_option_to_be_checked_or_unchecked(){
  await this.playwrightFactory.click(this.fund_raising);
}
 
async user_clicks_update_btn(){
  await this.playwrightFactory.click(this.updatebutton);
}
 
async user_verifies_membership_updated(){
  await expect(this.membership_updated).toContainText('Update Membership');
  await this.playwrightFactory.click(this.ok_btn);
}
 
async user_verify_success_msg(){
  await expect(this.successfull_msg).toBeVisible();
  await this.playwrightFactory.click(this.ok_btn)
}
async verify_edit_charity_title(){
    await expect(this.txt_Edit_Charity_Title).toBeVisible();
  }
 
  async verify_profile_title(){
    await expect(this.btn_Profile_Title).toBeVisible();
  }
 
  async verify_branding_title(){
    await expect(this.btn_Branding_Title).toBeVisible();
  }
 
  async verify_page_content_title(){
    await expect(this.btn_Page_Content_Title).toBeVisible();
  }
 
  async verify_membership_title(){
    await expect(this.btn_Membership_Title).toBeVisible();
  }
 
  async verify_fundraising_platform_title(){
    await expect(this.btn_Fundraising_Platform_Title).toBeVisible();
  }
 
  async verify_users_title(){
    await expect(this.btn_Users_Title).toBeVisible();
  }
 
  async verify_events_title(){
    await expect(this.btn_Events_Title).toBeVisible();
   
  }
 
  async verify_call_notes_title(){
    await expect(this.btn_Call_Notes_Title).toBeVisible();
  }
 
}
 
 
 
 