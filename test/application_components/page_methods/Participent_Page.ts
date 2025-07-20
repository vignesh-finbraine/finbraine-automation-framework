import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class PARTICIPENT_PAGE {
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
readonly btn_Event_Managament: Locator;
  readonly link_participants:Locator;
  readonly txt_search_participant:Locator;
  readonly title_name:Locator;
  readonly participant_name:Locator;
  readonly title_event:Locator;
  readonly event_name:Locator;
  readonly title_status:Locator;
  readonly status_notified:Locator;
  readonly title_activity:Locator;
  //readonly activity_name:Locator;
  readonly btn_back:Locator;
  readonly btn_export:Locator;
  readonly txt_success_msg:Locator;
  readonly btn_ok:Locator;
  readonly btn_filter:Locator;
  readonly drpdwn_events:Locator;
  readonly txt_search:Locator;
  readonly btn_london_marathon:Locator;
  readonly btn_state:Locator;
  readonly btn_live:Locator;
  readonly btn_status:Locator;
  readonly btn_notified:Locator;
  readonly btn_payment_status:Locator;
  readonly btn_paid:Locator;
  readonly btn_category:Locator;
  readonly btn_5k:Locator;
  readonly btn_gender:Locator;
  readonly btn_male:Locator;
  readonly btn_apply:Locator;
  readonly filtered_data:Locator;

  readonly Adress_Line_1: Locator;
  readonly Save_btn: Locator;
  readonly Update_Success_msg: Locator;
  readonly btn_OK: Locator;










  
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
     this.btn_Event_Managament=this.page.locator('//button[normalize-space()="Event Management"]');
     this.link_participants=this.page.locator('//a[normalize-space()="Participants"]');
     this.txt_search_participant=this.page.locator('//input[@placeholder="Press ENTER to search"]');
     this.title_name=this.page.locator('//th[normalize-space()="Name"]');
     this.participant_name=this.page.locator('//div[normalize-space()="Suraj Waghmare"]');
     this.title_event=this.page.locator('//th[normalize-space()="Event"]');
     this.event_name=this.page.locator('//div[contains(text(),"Chepstow Running Festival Half Marathon- January 2")]');
     this.title_status=this.page.locator('//th[normalize-space()="Status"]');
     this.status_notified=this.page.locator('//div[contains(text(),"Incomplete")]');
     this.title_activity=this.page.locator('//th[normalize-space()="Activity"]');
     this.btn_back=this.page.locator('//*[@class="search__close"]');
     this.btn_export=this.page.locator('//span[normalize-space()="Export"]');
     this.txt_success_msg=this.page.locator('//div[@class="swal-title"]');
     this.btn_ok=this.page.locator('//button[normalize-space()="OK"]');
     this.btn_filter=this.page.locator('//span[normalize-space()="Filter"]');
     this.drpdwn_events=this.page.locator('//component-select[@label="Event"]//div//span[contains(text(),"Please Select")]');
     this.txt_search=this.page.locator('//component-select[@label="Event"]//input[@placeholder="Press ENTER to search"]');
     this.btn_london_marathon=this.page.locator('//li[@class="multiselect-item-checkbox"]//div[contains(text(),"London Marathon 5K")]');
     this.btn_state=this.page.locator('//component-select[@label="State"]//div//span[contains(text(),"Please Select")]');
     this.btn_live=this.page.locator('//div[normalize-space()="Live"]');
     this.btn_status=this.page.locator('//component-select[@label="Status"]//div//span[contains(text(),"Please Select")]');
     this.btn_notified=this.page.locator('//li[@class="multiselect-item-checkbox"]//div[contains(text(),"Notified")]');
     this.btn_payment_status=this.page.locator('//component-select[@label="Payment Status"]//div//span[contains(text(),"Please Select")]');
     this.btn_paid=this.page.locator('//li[@class="multiselect-item-checkbox"]//div[contains(text(),"Paid")]');
     this.btn_category=this.page.locator('//ng-multiselect-dropdown[@id="root-paginated-select"]//div//span[contains(text(),"Please Select")]');
     this.btn_5k=this.page.locator('//component-select[@label="Category"]//div[contains(text(),"sa")]');
     this.btn_gender=this.page.locator('//component-select[@label="Gender"]//div//span[contains(text(),"Please Select")]');
     this.btn_male=this.page.locator('//div[normalize-space()="Male"]');
     this.btn_apply=this.page.locator('//component-button[@label="Apply"]//span[contains(text(),"Apply")]');
     this.filtered_data=this.page.locator('//div[normalize-space()="Suraj W"]');
     this.Adress_Line_1= this.page.locator("//*[contains(text(),'Adress Line 1')]/ancestor::component-input//input[@id='address']");
     this.Save_btn= this.page.locator("//*[contains(text(),'Save')]/ancestor::component-button");
     this.Update_Success_msg= this.page.locator("//*[contains(text(),'Registration successfully updated! But there are warnings.')]");
     this.btn_OK= this.page.locator("//button[@class='swal-button swal-button--confirm']");

    
    









    
    
  }
  
  

  
// Create Category- Flow
  
 
async user_searches_participant_in_list(strname:string){
   await this.playwrightFactory.click(this.txt_search_participant);
   await this.playwrightFactory.fill(this.txt_search_participant,strname);
   await this.txt_search_participant.press('Enter');
   await this.page.locator("//div[normalize-space()='"+strname+"']").waitFor();


 }
 
  async user_verifies_name(){
    await expect (this.title_name).toBeVisible();
    await expect (this.participant_name).toBeVisible();
 
  }
 
  async user_verifies_event(){
    await expect (this.title_event).toBeVisible();
    await expect (this.event_name).toBeVisible();
  }
 
  async user_verifies_status(){
    await expect (this.title_status).toBeVisible();
    await expect (this.status_notified).toBeVisible();
  }
 
  async user_verifies_activity(){
    await expect (this.title_activity).toBeVisible();
 
 
  }
 
  async user_clicks_back_btn(){
    await this.playwrightFactory.click(this.btn_back);
 
  }
//******************** Verify Export functionality is working for Participants for all (without filters) *************************** */
 
 
async user_verifies_export_functionality(){
   await this.playwrightFactory.click(this.btn_export);
 
 
 
}
 
async user_verifies_succcess_msg(){
   await expect(this.txt_success_msg).toBeVisible();
 
}
 
async user_clicks_ok_btn(){
   await this.playwrightFactory.click(this.btn_ok);
 
}
 
 
//*********************** Verify filter and Export functionality is working for Participants ******************************************************** */
 
 
   async user_applies_filter(){
    await expect (this.btn_filter).toBeVisible();
    await this.playwrightFactory.click(this.btn_filter);
 
   }
 
   async user_selects_event(strevent:string){
    await this.playwrightFactory.click(this.drpdwn_events);
    await this.playwrightFactory.click(this.txt_search,);
    await this.playwrightFactory.fill(this.txt_search,strevent)
    await this.txt_search.press('Enter');
    await this.playwrightFactory.click(this.page.locator("//li[@class='multiselect-item-checkbox']//div[contains(text(),'"+strevent+"')]"));
 
   }
 
   async user_selects_state(){
    await this.playwrightFactory.click(this.btn_state);
    await this.playwrightFactory.click(this.btn_live);
 
  }
 
 async user_selects_status(){
    await this.playwrightFactory.click(this.btn_status);
    await this.playwrightFactory.click(this.btn_notified);
 
 }
 
 async user_selects_payment_status(){
    await this.playwrightFactory.click(this.btn_payment_status);
    await this.playwrightFactory.click(this.btn_paid);
 
 }
 
 async user_selects_category(strcategory: string){
    await this.playwrightFactory.click(this.btn_category);
    await this.playwrightFactory.click(this.page.locator("//component-select[@label='Category']//div[contains(text(),'"+strcategory+"')]"));
 
 }
   
 
 async user_selects_gender(){
    await this.playwrightFactory.click(this.btn_gender);
    await this.playwrightFactory.click(this.btn_male);
 
 }
 
 async user_clicks_apply_btn(){
    await this.playwrightFactory.click(this.btn_apply);
   
 
 }
 
 async user_verifies_filtered_data(){
   await expect (this.filtered_data).toBeVisible();
 
 }
 
 async user_export_filtered_data(){
    await this.playwrightFactory.click(this.btn_export);
 
 }
 
 async user_verifies_success_msg(){
     await expect(this.txt_success_msg).toBeVisible();
 
 }
 
 async user_click_ok_btn(){
    await this.playwrightFactory.click(this.btn_ok);
 
 }
 
 async user_click_participant(strname: string){

   await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strname+"']"))

}

async user_edit_Adress(strEmail: string){

   await this.Adress_Line_1.clear();

   await this.playwrightFactory.fill(this.Adress_Line_1, strEmail);

}

async user_click_save_btn(){

   await this.playwrightFactory.click(this.Save_btn);

}

async user_verify_success_msg(){

   await expect(this.Update_Success_msg).toBeVisible();

}

async user_click_ok_button(){
 
    await this.playwrightFactory.click(this.btn_OK);
 
  }
 
  




}


