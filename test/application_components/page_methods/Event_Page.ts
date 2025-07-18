import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Event_PAGE {
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
readonly btn_create: Locator;
readonly Event_List: Locator;
readonly Event_SearchBar: Locator;
readonly Event_Name: Locator;
readonly View_Icon: Locator;
readonly Event_Tittle: Locator;
readonly Created_Event_Name: Locator;
readonly btn_three_dots:Locator;
readonly btn_Requirments:Locator;
 readonly btn_custom_field:Locator;
 readonly btn_edit:Locator;
 readonly btn_delete:Locator;
readonly txt_confirmation_msg:Locator;
readonly txt_sucessfully_deleted_msg:Locator;
readonly txt_no_record:Locator;
readonly btn_ok: Locator;
readonly txt_Category: Locator;
readonly txt_Category_Title: Locator;
readonly drpdwn_Half_Marathon: Locator;
readonly txt_Year_Title: Locator;
readonly txt_Year: Locator;
readonly drpdwn_2025: Locator;
readonly txt_Month: Locator;
readonly drpdwn_May: Locator;
readonly txt_State: Locator;
readonly drpdwn_Live: Locator;
readonly txt_Status_Title: Locator;
readonly txt_Status: Locator;
readonly drpdwn_Active: Locator;
readonly txt_Partner_Title: Locator;
readonly txt_Partner: Locator;
readonly drpdwn_Yes: Locator;
readonly txt_Deleted_Title: Locator;
readonly btn_Apply: Locator;
readonly btn_Export: Locator;
readonly txt_Export_Email_Success_Message: Locator;
readonly btn_OK_Button: Locator;
readonly btn_Charity_Summary: Locator;
//readonly txt_Automation_Interstate_Marathonymb: Locator;
readonly txt_Charity_Summary_For_Event: Locator;
readonly txt_Automation_Interstate_Marathonymb: Locator;
readonly btn_participant:Locator;
readonly participant_table:Locator;
readonly btn:Locator;












  
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
    this.btn_create = this.page.locator("//component-button[@label='Create']//button//span");
    this.Event_List= this.page.locator("//table[@class='table table-borderless local-table']");
    this.Event_SearchBar= this.page.locator("//input[@placeholder='Press ENTER to search']");
    this.Event_Name= this.page.locator("//div[@class='table__product event__title']");
    this.View_Icon= this.page.locator("(//*[contains(@href,'https://rfc-staging.sportsmediaagency.com/event')])[2]");
    this.Event_Tittle= this.page.locator("//div[@class='event-name']");
    this.Created_Event_Name= this.page.locator("//div[@class='table__product event__title']");
    this.btn_three_dots=this.page.locator('component-dropdown').filter({ hasText: 'Delete Archive Duplicate' }).locator('#dropdownMenu');
    this.btn_Requirments=this.page.locator('(//*[contains(text()," Automation Using Playwright by Rutuja ")]/ancestor::tr//*[contains(text()," Requirements ")])[2]');
    this.btn_custom_field=this.page.locator('(//*[contains(text()," Automation Using Playwright by Rutuja ")]/ancestor::tr//*[contains(text()," Custom Fields ")])[2]');
    this.btn_edit=this.page.locator('//div[@class="table__product event__title"]');
    this.btn_delete=this.page.locator('//span[normalize-space()="Delete"]');
    this.txt_confirmation_msg=this.page.locator('//div[normalize-space()="Are you sure?"]');
    this.txt_sucessfully_deleted_msg=this.page.locator('//div[normalize-space()="Successfully deleted the event!"]');
    this.txt_no_record=this.page.locator('//caption[normalize-space()="No records found!"]');
    this.btn_ok=this.page.locator('//button[normalize-space()="OK"]');
    this.txt_Category_Title=this.page.locator("//span[normalize-space()='Category']");
    this.txt_Category=this.page.locator('ng-multiselect-dropdown').filter({ hasText: 'Please Select 5K 10K Half' }).locator('span').nth(1);
    this.drpdwn_Half_Marathon=this.page.getByText('Half Marathon', { exact: true });
    this.txt_Year_Title=this.page.locator("//span[normalize-space()='Year']");
    this.txt_Year=this.page.locator("//*[contains(text(),'Year ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.drpdwn_2025=this.page.locator("//div[normalize-space()='2025']");
    this.txt_Month=this.page.locator("//*[contains(text(),'Month ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.drpdwn_May=this.page.locator("//div[normalize-space()='May']");
    this.txt_State=this.page.locator("//*[contains(text(),'State ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.drpdwn_Live=this.page.locator("//div[normalize-space()='Live']");
    this.txt_Status_Title=this.page.locator("//span[normalize-space()='Status']");
    this.txt_Status=this.page.getByText('Please Select').nth(1);
    this.drpdwn_Active=this.page.locator('#createEventForm').getByText('Active', { exact: true });
    this.txt_Partner_Title=this.page.locator("//span[normalize-space()='Partner']");
    this.txt_Partner=this.page.getByText('Please Select').nth(1);
    this.drpdwn_Yes=this.page.getByText('Yes');
    this.txt_Deleted_Title=this.page.locator("//span[normalize-space()='Deleted']");
    this.btn_Apply=this.page.locator("//component-button[@label='Apply']//button");
    this.btn_Export=this.page.locator("//span[normalize-space()='Export']");
    this.txt_Export_Email_Success_Message=this.page.locator("//div[normalize-space()='Mail Send Successfully']");
    this.btn_OK_Button=this.page.locator("//button[normalize-space()='OK']");
   this.btn_Charity_Summary=this.page.locator("(//*[contains(@href,'charity-summary')]/ancestor::table//a[@href='/events/9f00a870-2f9b-4a47-bf47-8beb506c9155/charity-summary'])[2]");
   this.txt_Charity_Summary_For_Event=this.page.locator("//h2[contains(text(),'Charity Summary for Event: Automation Interstate M')]");
 this.txt_Automation_Interstate_Marathonymb=this.page.locator("//div[normalize-space()='Automation Interstate Marathonymb']");
 this.btn_participant=this.page.locator("(//*[contains(text(),'Automation Using Playwright by Rutuja')]/ancestor::tr//*[contains(text(),'Participants')])[2]")
 this.participant_table=this.page.locator("//*[contains(text(),'Participants')]/ancestor::component-table//table")
 this.btn=this.page.locator("//div[@data-popper-placement='bottom-start']//div//a[contains(text(),'Participants')")








    
    
  }
  
  

  
// Create Category- Flow
  
async user_click_createbtn(){
    await this.playwrightFactory.click(this.btn_create);
   
  }
  async user_sees_event_list(){
   
    await expect(this.Event_List).toBeVisible();
  }
  async user_enter_eventname_searchbar(strSearch: string){
    await this.playwrightFactory.fill(this.Event_SearchBar, strSearch);
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    //await this.Event_Name.waitFor();
  }
  async user_verify_viewbutton_enabled(){
    await this.Event_Name.hover();
    await expect(this.View_Icon).toBeEnabled();
 
  }
  async user_clicks_view_button(){
   
    await this.playwrightFactory.click(this.View_Icon);
 
  }
  async user_verify_eventname(){
     await this.Event_Tittle.waitFor();
    await expect(this.Event_Tittle).toBeVisible();
 
  }
  async user_verify_search_result(){
    await expect(this.Event_Name).toBeVisible();
  }
  async user_search_created_event(striteration: any){
    let event = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.Event_SearchBar,event);
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Enter');
  }
  async user_verify_created_event(){
    await expect(this.Created_Event_Name).toBeVisible();
  }
   async user_clicks_three_dots(){
    await this.Event_Name.hover();
    await this.btn_three_dots.waitFor();
    await this.playwrightFactory.clickForce(this.btn_three_dots);
    await this.btn_Requirments.waitFor();
    await this.playwrightFactory.clickForce(this.btn_Requirments);
   
   
   
}

 async user_clicks_three_dots_for_participant(striteration: any){
  await this.Event_Name.hover();
  await this.btn_three_dots.waitFor();
  await this.playwrightFactory.clickForce(this.btn_three_dots);
  let charityname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.page.waitForTimeout(3000)
  //await this.page.locator("(//*[contains(text(),'"+charityname+"')]/ancestor::tr//*[contains(text(),'Participants')])[2]")
   //await this.playwrightFactory.click(this.page.locator("(//*[contains(text(),'"+charityname+"')]/ancestor::tr//*[contains(text(),'Participants')])[2]"));
   await this.playwrightFactory.click(this.btn)
 }

 async user_verify_participant_table(){
 await expect(this.participant_table).toBeVisible();

}

async user_clicks_three_dots_for_custom_field(){
  await this.Event_Name.hover();
    await this.btn_three_dots.waitFor();
    await this.playwrightFactory.clickForce(this.btn_three_dots);
    await this.btn_custom_field.waitFor();
    await this.playwrightFactory.click(this.btn_custom_field);
   
   
  }
  async user_clicks_edit_btn(){
    await this.playwrightFactory.click(this.btn_edit);
 
  }
  async user_delete_event(){
    await this.playwrightFactory.click(this.btn_delete);
  }
 
  async user_verifies_confirmation_msg(){
    await expect (this.txt_confirmation_msg).toBeVisible();
 
  }
 
    async user_click_ok(){
    await this.playwrightFactory.click(this.btn_ok);
   
  }
 
  async user_verifies_successfully_deleted_event(){
    await expect(this.txt_sucessfully_deleted_msg).toBeVisible();
    await this.playwrightFactory.click(this.btn_ok);
  }
 
  async user_verifies_no_record_found_msg(){
    await expect (this.txt_no_record).toBeVisible();
  }
  async user_selects_category(){
      await expect(this.txt_Category_Title).toBeVisible();
      await this.playwrightFactory.click(this.txt_Category);
      await this.playwrightFactory.click(this.drpdwn_Half_Marathon);
 
 
    }
 
    async user_selects_year(stryear: string){
      await expect(this.txt_Year_Title).toBeVisible();
      await this.txt_Year.click();
      await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+stryear+"']"));
     
    }
 
    async user_selects_month(strmonth: string){
      await this.txt_Month.click();
      await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strmonth+"']"));
    }
 
    async user_selects_state(strstate: string){
      await this.txt_State.click();
      await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strstate+"']"));
      //await this.page.pau(3000)
    }
 
    async user_selects_status(strstatus: string){
      await expect(this.txt_Status_Title).toBeVisible();
      await this.playwrightFactory.click(this.txt_Status);
      await this.playwrightFactory.click(this.drpdwn_Active);
      //await this.playwrightFactory.click(this.page.locator("#createEventForm').getByText('"+strstatus+"', { exact: true }"));
      //await this.page.pause()
     
    }
 
    async user_selects_partner(strpartner: string){
      await expect(this.txt_Status_Title).toBeVisible();
       await this.playwrightFactory.click(this.txt_Partner);
       await this.playwrightFactory.click(this.drpdwn_Yes);
 
 
    }
 
    async user_selects_deleted(){
      await expect(this.txt_Deleted_Title).toBeVisible();
 
    }
 
    async user_clicks_apply_button(){
      await this.btn_Apply.click();
    }
 
    async user_clicks_export_button(){
      await expect(this.btn_Export).toBeVisible();
      await this.btn_Export.click();
    }
 
    async user_verify_export_email_success_message(){
      await expect(this.txt_Export_Email_Success_Message).toBeVisible();
      await expect(this.txt_Export_Email_Success_Message).toContainText('Mail Send Successfully');
 
    }
 
    async user_clicks_ok_button(){
      await expect(this.btn_OK_Button).toBeVisible();
      await this.btn_OK_Button.click();
 
    }
    async user_view_charity_summary(strCahritysummary: string){
      await this.txt_Automation_Interstate_Marathonymb.hover();
      //await this.page.locator("//div[normalize-space()='"+strCahritysummary+"']").hover();
      await this.btn_Charity_Summary.hover();
      await this.page.waitForTimeout(5000);
      await this.btn_Charity_Summary.click();
    }
 
    async user_verify_charity_summary_for_event(){
      await expect(this.txt_Charity_Summary_For_Event).toBeVisible();
     
    }



}


