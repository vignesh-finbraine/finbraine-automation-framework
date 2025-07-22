import {expect, LocatorScreenshotOptions, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { runInThisContext } from 'vm';


export class EVENT_HUB_PAGE{
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

  readonly Filter_Button: Locator;
  readonly Filter_Charity: Locator;
  readonly Filter_Delete: Locator;
  readonly txt_Charity_Search_Bar: Locator;
  readonly Apply_Button: Locator;
  readonly lnk_contentmanagement: Locator;
  readonly lnk_event_hub_pages: Locator;
  readonly btn_create: Locator;
  readonly txt_title: Locator;
  readonly slugname: Locator;
  readonly drpdwn_charity: Locator;
  readonly drpdwn_payment_option: Locator;
  readonly txt_registration_fee: Locator;
  readonly txt_fundraising_targetamount: Locator;
  readonly txt_status: Locator;
  readonly drpdwn_status: Locator;
  readonly btn_pick_a_file: Locator;
  readonly img_select: Locator;
  readonly txt_charity: Locator;
  readonly txt_payment_option: Locator;
  readonly btn_save: Locator;
  readonly txt_eventname: Locator;
  readonly txt_city: Locator;
  readonly drpdwn_city:Locator;
  readonly txt_eventdate: Locator;
  readonly date_picker_startdate: Locator;
  readonly date_picker_enddate:Locator;
  readonly txt_eventdistance: Locator;
  readonly drpdwn_eventdistance: Locator;
  readonly txt_eventregion:Locator;
  readonly drpdwn_eventregion: Locator;
  readonly btn_search: Locator;
  readonly btn_clear: Locator;
  readonly errordialog_box: Locator;
  readonly btn_ok2: Locator;
  readonly btn_ok: Locator;
  readonly field_title: Locator;
  readonly field_charity: Locator;
  readonly field_status: Locator;
  readonly field_issuedate: Locator;
  readonly field_action: Locator;
  readonly btn_view: Locator;
  readonly btn_copyurl: Locator
  readonly btn_filter: Locator
  readonly txt_itemsperpage: Locator;
  readonly txt_selectaspecificpage: Locator;
  readonly btn_pagefrwd: Locator;
  readonly btn_pagebackward: Locator;
  readonly txt_charity_in_filter: Locator;
  readonly drpdwn_charity_in_filter: Locator;
  readonly drpdwn_deleted: Locator; 
  readonly btn_apply: Locator;
  readonly btn_reset: Locator;
  readonly checkbox_marked_as_featured: Locator;
  readonly txt_searchbar: Locator;
  readonly btn_deleteineventhub_listing: Locator;

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
    this.Filter_Button= this.page.locator("//component-button[@label='Filter']");
    this.Filter_Charity= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::form//ng-multiselect-dropdown[@id='root-paginated-select']");
    this.Filter_Delete= this.page.locator("//*[contains(text(),'Deleted ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.txt_Charity_Search_Bar=this.page.locator("//*[contains(text(),'Filter Event Hub Pages')]/ancestor::ngb-modal-window//*[contains(text(),'Charity ')]/ancestor::component-select//input[@placeholder='Search']");
    this.Apply_Button= this.page.locator("//component-button[@label='Apply']//button");
    this.lnk_contentmanagement=this.page.locator('//button[normalize-space()="Content Management"]')
this.lnk_event_hub_pages=this.page.locator('//a[normalize-space()="Event Hub Pages"]')
this.btn_create=this.page.locator('//span[normalize-space()="Create"]')
this.txt_title=this.page.locator('//input[@id="title"]')
this.slugname=this.page.locator('//input[@placeholder="Slug"]')
this.txt_charity=this.page.locator('//ng-multiselect-dropdown[@id="root-paginated-select"]//div//span[contains(text(),"Please select")]')
this.txt_payment_option=this.page.locator('//component-select[@label="Payment Option"]//div//span[contains(text(),"Please select")]') 
this.txt_registration_fee=this.page.locator('//input[@placeholder="Enter Your Own registration Fee it should not exceed £15"]')
this.txt_fundraising_targetamount=this.page.locator('//input[@placeholder="How much can you Fundraise?"]')
this.txt_status=this.page.locator('(//span[contains(text(),"Please Select")])[1]')
this.drpdwn_status=this.page.locator('//input[@type="checkbox"][@aria-label="Published"]')
this.btn_pick_a_file=this.page.locator('//span[normalize-space()="Pick a File"]')
this.img_select=this.page.locator('//span[@class="mt-3 img__card__title"])[3]')
this.drpdwn_charity=this.page.locator('//div[normalize-space()="0807Charity"]')
this.drpdwn_payment_option=this.page.locator('//div[normalize-space()="Participant Pays"]')
this.btn_save=this.page.locator('//span[normalize-space()="Save"]')
this.btn_ok=this.page.locator('//button[normalize-space()="OK"]')
this.txt_eventname=this.page.locator('//input[@id="event_name"]')
this.txt_city=this.page.locator('//component-select[@label="City"]//div//span[contains(text(),"Please Select")]')
this.drpdwn_city=this.page.locator('//div[normalize-space()="Bedford Running Events"]')
this.txt_eventdate=this.page.locator('//div[@class="calendar__list datepicker__container"]//parent::component-datetime')
this.txt_eventdistance=this.page.locator('//component-select[@label="Event Distance"]//div//span[contains(text(),"Please Select")]')
this.drpdwn_eventdistance=this.page.locator('//div[normalize-space()="10K"]')
this.txt_eventregion=this.page.locator('//component-select[@label="Event Region"]//div//span[contains(text(),"Please Select")]')
this.drpdwn_eventregion=this.page.locator('//div[normalize-space()="London"]')
this.btn_search=this.page.locator('//span[normalize-space()="Search"]')
this.btn_clear=this.page.locator('//span[normalize-space()="Clear"]')
this.date_picker_startdate=this.page.locator('//div[@aria-label="Friday, August 1, 2025"]//span[@class="custom-day"][normalize-space()="1"]')
this.date_picker_enddate=this.page.locator('//div[@aria-label="Monday, September 1, 2025"]//span[@class="custom-day range"][normalize-space()="1"]')
this.errordialog_box=this.page.locator('//div[@role="dialog"]')
this.btn_ok2=this.page.locator('//button[normalize-space()="OK"]')
this.field_title=this.page.locator('//th[normalize-space()="Title"]')
this.field_charity=this.page.locator('//th[normalize-space()="Charity"]')
this.field_status=this.page.locator('//th[normalize-space()="Status"]')
this.field_issuedate=this.page.locator('//th[normalize-space()="Issued At"]')
this.field_action=this.page.locator('//th[normalize-space()="Action"]')
this.btn_view=this.page.locator('//component-button[@label="View"]//button[@class="button button-primary button-sm"]')
this.btn_copyurl=this.page.locator('//span[normalize-space()="Copy Url"]')
this.btn_filter=this.page.locator('//span[normalize-space()="Filter"]')
this.txt_itemsperpage=this.page.locator('(//span[@class="dropdown-multiselect__caret"])[3]')
this.txt_selectaspecificpage=this.page.locator('//input[@type="number"]')
this.btn_pagefrwd=this.page.locator('(//component-button[@classname="button button-secondary icon-sm"])[2]')
this.btn_pagebackward=this.page.locator('(//component-button[@classname="button button-secondary icon-sm"])[1]')
this.txt_charity_in_filter=this.page.locator('//span[contains(text(),"Please Select")]')
this.drpdwn_charity_in_filter=this.page.locator('//div[normalize-space()="0807Charity"]')
this.drpdwn_deleted=this.page.locator('//component-select[@placeholder="All"]')
this.btn_apply=this.page.locator('//span[normalize-space()="Apply"]')
this.btn_reset= this.page.locator('')
this.checkbox_marked_as_featured=this.page.locator('//span[@class="checkbox__tick"]')
this.txt_searchbar= this.page.locator('//input[@placeholder="Press ENTER to search"]')
this.btn_deleteineventhub_listing= this.page.locator('(//button[@class="table__button danger d-block"])[1]')
    
  }
  

                       
 /******************** Page Object with Optional Field************************/
 
 
 

 async user_click_filter(){

  await this.playwrightFactory.click(this.Filter_Button);

}

async user_select_charity_for_filter(strCharityname: string){

  await this.playwrightFactory.click(this.Filter_Charity);

  await this.playwrightFactory.fill(this.txt_Charity_Search_Bar, strCharityname)

  await this.page.keyboard.press('Enter');

  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Charity ')]/ancestor::form//*[contains(text(),'"+strCharityname+"')]"));

}

async user_select_deleted_drpdwn(strDeletedAll: string){

  await this.playwrightFactory.click(this.Filter_Delete);

  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Deleted ')]/ancestor::component-select//*[contains(text(),'"+strDeletedAll+"')]"));

}

async user_click_and_veirfy_apply_button(){

  await expect(this.Apply_Button).toBeEnabled();

  await this.playwrightFactory.click(this.Apply_Button);

}

async user_verify_filter_result(strCharity: string){

      await expect(this.page.locator("(//*[contains(text(),'"+strCharity+"')])[1]")).toBeVisible();

    }

async verify_admin_acess_eventhub_page(){
  
    await this.playwrightFactory.click(this.lnk_contentmanagement);
  
    await this.playwrightFactory.click(this.lnk_event_hub_pages)
  
  }
  
  async verify_create_button(){
  
    await expect(this.btn_create).toBeVisible();
  
    await this.playwrightFactory.click(this.btn_create)
  
  }
  
  async enter_title(strtitle: string){
  
  await this.playwrightFactory.click(this.txt_title);
  
  await this.playwrightFactory.fill(this.txt_title,strtitle);  
  
  }
  
  async user_enters_slugname(strSlugName: string){
  
  await this.playwrightFactory.fill(this.slugname,strSlugName)
  
  }
  
  async user_clear(){
  
    await this.slugname.clear()
  
  }
  
  async display_error_msg(){
  
  await expect(this.errordialog_box).toBeVisible()
  
  await this.playwrightFactory.click(this.btn_ok2)
  
  }
  
     async select_charity(){
  
    await this.playwrightFactory.click(this.txt_charity)
  
    await this.playwrightFactory.click(this.drpdwn_charity)
  
  }
  
  async select_paymentoption(){
  
    await this.playwrightFactory.click(this.txt_payment_option)
  
    await this.playwrightFactory.click(this.drpdwn_payment_option)
  
  }
  
  async enter_registrationfee(strfee: string ){
  
    await this.playwrightFactory.click(this.txt_registration_fee)
  
    await this.playwrightFactory.fill(this.txt_registration_fee,strfee);
   
  }
  
  async enter_fundraising(stramount: string ){
  
    await this.playwrightFactory.click(this.txt_fundraising_targetamount)
  
    await this.playwrightFactory.fill(this.txt_fundraising_targetamount,stramount);
   
  }
  
  async select_status(){
  
    await this.playwrightFactory.click(this.txt_status)
  
    await this.playwrightFactory.click(this.drpdwn_status)
  
  }
  
  async select_image(){
  
    await this.playwrightFactory.click(this.btn_pick_a_file)
  
    await this.playwrightFactory.click(this.img_select)
  
  }
   
  async select_filter_event_name(strname: string){
  
  await this.playwrightFactory.click(this.txt_eventname)
  
  await this.playwrightFactory.fill(this.txt_eventname,strname)
  
  await this.playwrightFactory.click(this.btn_search)
  
  await this.page.evaluate(() => {
  
  window.scrollBy(3000, 3500); // Scroll down
  
  });
  
  await this.playwrightFactory.click(this.checkbox_marked_as_featured)
  
  }
   
  async click_save(){
  
    await this.playwrightFactory.click(this.btn_save)
  
    await this.playwrightFactory.click(this.btn_ok)
  
  }
   
  //// verification of filters to fetch event data////
   
  async enter_event_name(strname: string){
  
  await this.playwrightFactory.click(this.txt_eventname)
  
  await this.playwrightFactory.fill(this.txt_eventname,strname)
  
  await this.playwrightFactory.click(this.btn_search)
  
  await this.page.evaluate(() => {
  
  window.scrollBy(3000, 3500); // Scroll down
  
  });
  
  await this.playwrightFactory.click(this.btn_clear)
  
  }
   
  async enter_city(){
  
  await this.playwrightFactory.click(this.txt_city)
  
  await this.playwrightFactory.click(this.drpdwn_city)
  
  await this.playwrightFactory.click(this.btn_search)
  
  await this.page.evaluate(() => {
  
  window.scrollBy(3000, 3500); // Scroll down
  
  });
  
  await this.playwrightFactory.click(this.btn_clear)
  
  }
   
  async enter_event_date(){
  
  await this.playwrightFactory.click(this.txt_eventname)
  
    await this.playwrightFactory.click(this.date_picker_startdate);
  
      await this.playwrightFactory.click(this.date_picker_enddate);
  
  await this.playwrightFactory.click(this.btn_search)
  
  await this.page.evaluate(() => {
  
  window.scrollBy(3000, 3500); // Scroll down
  
  });
  
  await this.playwrightFactory.click(this.btn_clear)
  
  }
   
  async enter_event_distance(){
  
  await this.playwrightFactory.click(this.txt_eventdistance)
  
  await this.playwrightFactory.click(this.drpdwn_eventdistance)
  
  await this.playwrightFactory.click(this.btn_search)
  
  await this.page.evaluate(() => {
  
  window.scrollBy(3000, 3500); // Scroll down
  
  });
  
  await this.playwrightFactory.click(this.btn_clear)
  
  }
   
  async enter_event_region(){
  
  await this.playwrightFactory.click(this.txt_eventregion)
  
  await this.playwrightFactory.click(this.drpdwn_eventregion)
  
  await this.playwrightFactory.click(this.btn_search)
  
  await this.page.evaluate(() => {
  
  window.scrollBy(3000, 3500); // Scroll down
  
  });
  
  await this.playwrightFactory.click(this.btn_clear)
  
  }
   
  ////verification of searchbar,pagination and fields in event hub listing page TC-38,39,40////
   
  async verify_fields_in_eventhub_listing_page(){
  
  await expect(this.field_title).toBeVisible() 
  
  await expect(this.field_charity).toBeVisible()
  
  await expect(this.field_status).toBeVisible()
  
  await expect(this.field_issuedate).toBeVisible()
  
  await expect(this.field_action).toBeVisible()
  
  }
  
  async verify_button_view(){
  
  await expect(this.btn_view).toBeVisible()
  
  await this.playwrightFactory.click(this.btn_view)
  
  }
  
  async verify_copyurl(){
  
  await expect(this.btn_copyurl).toBeVisible()
  
  await this.playwrightFactory.click(this.btn_copyurl)
  
  }
   
  async verify_filter(){
  
    await this.playwrightFactory.click(this.btn_filter)
  
    await this.playwrightFactory.click(this.txt_charity_in_filter)
  
    await this.playwrightFactory.click(this.drpdwn_charity_in_filter)
  
      await this.playwrightFactory.click(this.drpdwn_deleted)
  
  } 
  
      async verify_apply(){
  
        await this.playwrightFactory.click(this.btn_apply) 
  
  }
   
  async verify_reset_in_filter(){
  
    await this.playwrightFactory.click(this.btn_reset)
  
  }
   
  async verify_search_bar(streventname: string){
  
    await this.playwrightFactory.click(this.txt_searchbar);
  
    await this.playwrightFactory.fill(this.txt_searchbar,streventname)
  
    await this.page.waitForTimeout(3000);
  
      await this.page.keyboard.press('Enter')
  
  }
  
  async verify_deletion_in_eventhub_listing(){
  
    await this.btn_deleteineventhub_listing.hover()
  
  await this.playwrightFactory.click(this.btn_deleteineventhub_listing)
  
  }
  
}


