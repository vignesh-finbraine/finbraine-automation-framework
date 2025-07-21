import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class LANDING_PAGE {
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


readonly LandingPage_SearchBar: Locator;
readonly Item_Per_Page: Locator;
readonly Select_Specific_Page: Locator;
readonly Previous_btn: Locator;
readonly Next_btn: Locator;
readonly Page_Number: Locator;
//readonly Five_Page: Locator;
readonly View_Charities_btn: Locator;
readonly Charities_Tittle: Locator;
readonly Filter_Button: Locator;
readonly Filter_Charity: Locator;
readonly Filter_Delete: Locator;
readonly Filter_Charity_Name: Locator;
//readonly Filter_Deleted_All: Locator;
readonly Apply_Button: Locator;
readonly Reset_Button: Locator;
readonly Get_Involve_Tittle: Locator;
readonly Create_Button: Locator;
readonly Landing_Page_Name: Locator;
readonly Landing_Page_Slug: Locator;
readonly Update_Button: Locator;
readonly Charity_Name: Locator;
readonly Select:Locator;
readonly NoDataAvailable:Locator;
readonly Name:Locator;
readonly Cancer:Locator;
readonly Created_event:Locator;
readonly SAVE:Locator;
readonly OKBTN:Locator;
readonly Charity: Locator;
readonly search_charity:Locator;
 //readonly automation_marathon_name:Locator;
readonly Existing_search_name:Locator;
readonly txt_title_list:Locator;
readonly txt_charity_list:Locator;
readonly txt_event_page_list:Locator;
readonly txt_other_events_list:Locator;
readonly txt_Action_list:Locator;
readonly link_automation_charity:Locator;
readonly link_automation_testing_rutuja:Locator;
readonly link_playwright_automation:Locator;
readonly drpdwn_event_page:Locator;
readonly txt_Charity_Search_Bar: Locator;
readonly link_event:Locator;
readonly txt_Event_Pages: Locator;
readonly txt_Future_Dated_Event: Locator;
readonly landing_charity_searchbar: Locator;
 













  
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
 
 
    this.LandingPage_SearchBar= this.page.locator("//input[@placeholder='Press ENTER to search']");
    this.Item_Per_Page= this.page.locator("(//span[@class='dropdown-btn']/ancestor::component-select)[2]");
    this.Select_Specific_Page= this.page.locator("//input[@type='number']");
    this.Previous_btn= this.page.locator("(//button[@class='button button-secondary icon-sm'])[1]");
    this.Next_btn= this.page.locator("(//button[@class='button button-secondary icon-sm'])[2]")
    this.Page_Number= this.page.locator("//*[contains(text(),'Select a specific page')]/ancestor::component-pagination//input[@type='number']");
    //this.Five_Page= this.page.locator("//*[contains(text(),' 5 ')]/ancestor::li");
    this.View_Charities_btn= this.page.locator("(//button[@class='button button-primary min-width-auto'])[1]");
    this.Charities_Tittle= this.page.locator("//*[contains(text(),'Charities')]/ancestor::component-table//div[@class='title-purple card__title']");
    this.Filter_Button= this.page.locator("//component-button[@label='Filter']");
    this.Filter_Charity= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::form//ng-multiselect-dropdown[@id='root-paginated-select']");
    this.Filter_Delete= this.page.locator("//*[contains(text(),'Deleted ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Filter_Charity_Name= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::form//*[contains(text(),' Cancer_kid ')]");
    //this.Filter_Deleted_All= this.page.locator("//*[contains(text(),'Deleted ')]/ancestor::component-select//*[contains(text(),' All ')]");
    this.Apply_Button= this.page.locator("//component-button[@label='Apply']//button");
    this.Reset_Button= this.page.locator("//*[contains(text(),'Reset')]/ancestor::component-button//*[contains(text(),'Reset')]");
    this.Get_Involve_Tittle= this.page.locator("//*[contains(text(),'Create Get Involved Charity Page')]");
    this.Create_Button= this.page.locator("//component-button[@label='Create']//button//span");
    this.Landing_Page_Name= this.page.locator("(//div[@class='table__product'])[1]");
    this.Landing_Page_Slug= this.page.locator("//input[@placeholder='Slug']");
    this.Update_Button= this.page.locator("//component-button[@label='Update']//button//span");
    this.Charity_Name= this.page.locator("//*[contains(text(),' Cancer_kid')]");
    this.Name=this.page.locator ("//input[@placeholder='Title of the event page listing']")
    this.Select=this.page.locator("//*[contains(text(),'Event Pages ')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.NoDataAvailable=this.page.locator("//h5[normalize-space()='No data available']")
    this.Cancer=this.page.locator("(//*[contains(text(),' Create')]/ancestor::component-section//*[contains(text(),'Charity')]/ancestor::component-select//*[contains(text(),' Cancer_kid ')])[1]")
    this.SAVE=this.page.locator("//span[normalize-space()='Save']")
    this.OKBTN=this.page.locator("//button[normalize-space()='OK']")
    this.Created_event=this.page.locator("//div[contains(text(),'Created at: Mon June 9, 2025 -')]")
    this.Charity=this.page.locator ("//*[contains(text(),' Create')]/ancestor::component-section//*[contains(text(),'Charity')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.search_charity=this.page.locator("//input[@placeholder='Search']")
    //this.automation_marathon_name=this.page.locator("(//*[contains(text(),' Automation City Marathony4yap ')])[1]")
    this.Existing_search_name=this.page.locator("(//div[@class='table__item'])[1]")
    this.txt_title_list=this.page.locator('//th[normalize-space()="Title"]');
    this.txt_charity_list=this.page.locator('//th[normalize-space()="Charity"]');
    this.txt_event_page_list=this.page.locator('//th[normalize-space()="Event Pages"]');
    this.txt_other_events_list=this.page.locator('//th[normalize-space()="Other Events"]');
    this.txt_Action_list=this.page.locator('//th[normalize-space()="Action"]');
    this.link_automation_charity=this.page.locator('//div[contains(text(),"Automation Charity")]');
    this.link_automation_testing_rutuja=this.page.locator('//div[contains(text(),"Automation Testing by Rutuja")]');
    this.link_playwright_automation=this.page.locator('//div[contains(text(),"Automation Playwright for Rfc")]');
    this.drpdwn_event_page=this.page.locator('//*[contains(text(), "Event Pages ")]/ancestor::component-select//*[@class="dropdown-btn"]');
    this.link_event=this.page.locator("//*[contains(text(),'Event Pages')]/ancestor::component-select//ul[@class='item2']");
    this.txt_Charity_Search_Bar=this.page.locator("//*[contains(text(),'Filter Registration Pages')]/ancestor::ngb-modal-window//*[contains(text(),'Charity ')]/ancestor::component-select//input[@placeholder='Search']");
    this.txt_Event_Pages=this.page.locator("//*[contains(text(),'Event Pages ')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.txt_Future_Dated_Event=this.page.locator("//ul//div[contains(text(),'Created at: Mon June 9, 2025 -')]")
    this.landing_charity_searchbar=this.page.locator("//*[contains(text(),'Charity')]/ancestor::component-select//input[@placeholder='Search']")
 

  
    









  
    
  }
  

  
  async user_search_lnading_page(strSearchManager: string){
    await this.playwrightFactory.fill(this.LandingPage_SearchBar, strSearchManager);
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Enter');
   
 
  }
 
  async user_sees_pagination(){
    await expect(this.Item_Per_Page).toBeVisible();
    await expect(this.Select_Specific_Page).toBeVisible();
    await expect(this.Previous_btn).toBeVisible();
    await expect(this.Next_btn).toBeVisible();
  }
  async user_select_item_per_page(strPagenumber: string){
    await this.playwrightFactory.click(this.Item_Per_Page);
    await this.playwrightFactory.clickForce(this.page.locator("(//*[contains(text(),'Items per page:')]/parent::div//*[contains(@type,'checkbox') and contains(@aria-label,'"+strPagenumber+"')])[1]"));
    await this.page.waitForTimeout(3000);
  }
  async user_select_specific_page(strPage: string){
    await this.Select_Specific_Page.clear();
    await this.playwrightFactory.fill(this.Select_Specific_Page, strPage);
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator("//span[normalize-space()='"+strPage+"']")).toContainText('2');
  }
  async user_navigate_forward_backward(strPage: string){
    await this.playwrightFactory.click(this.Previous_btn);
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator("//span[normalize-space()='"+strPage+"']")).toContainText('1');
    await this.playwrightFactory.click(this.Next_btn);
    await this.page.waitForTimeout(3000);
    await expect(this.Page_Number).toContainText('2');
 
  }
  async user_sees_view_charities_btn(){
    await expect(this.View_Charities_btn).toBeVisible();
    await this.View_Charities_btn.hover();
  }
  async user_clicks_view_charities_btn(){
    await this.playwrightFactory.click(this.View_Charities_btn);
    await this.Charities_Tittle.waitFor();
    await expect(this.Charities_Tittle).toBeVisible();
  }
  async user_click_filter(){
    await this.playwrightFactory.click(this.Filter_Button);
  }
  async user_verify_charity_deleted_fields_filter(){
    await expect(this.Filter_Charity).toBeVisible();
    await expect(this.Filter_Delete).toBeVisible();
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
  async user_click_reset_button(){
    await this.playwrightFactory.click(this.Reset_Button);
  }
  async user_verify_tittle(){
    await expect(this.Get_Involve_Tittle).toBeVisible();
  }
  async user_click_create_button(){
    await this.playwrightFactory.click(this.Create_Button);
  }
  async user_click_landing_page(){
    await this.playwrightFactory.click(this.Landing_Page_Name);
  }
  async user_edit_slug(strSlug: string){
    await this.page.waitForTimeout(5000);
    await this.Landing_Page_Slug.clear();
    await this.playwrightFactory.fill(this.Landing_Page_Slug, strSlug);
  }
  async user_click_update(){
    await this.playwrightFactory.click(this.Update_Button);
  }
  async user_verify_charity_name(strName: string){
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator("//*[contains(text(),'"+strName+"')]")).toBeVisible()
  }
  async user_enters_name(striteration: any) {
  let name= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.Name,name);
}
  async user_verify_no_data_available_msg() {
  await this.playwrightFactory.click(this.Select)
  await expect (this.NoDataAvailable).toBeVisible();
}
async user_clicks_selectopn() {
  await this.playwrightFactory.click(this.Charity)
  await this.playwrightFactory.click(this.Cancer)
 
}
async user_clicks_select(strEvent: string) {
  await this.playwrightFactory.click(this.Select)
  await this.playwrightFactory.click(this.page.locator("(//*[contains(text(),'"+strEvent+"')])[1]"))
}
   async user_clicks_savebtn() {
   await this.playwrightFactory.click(this.SAVE)
   await this.playwrightFactory.click(this.OKBTN)
 
}
async user_clicks_charity() {
  await this.playwrightFactory.click(this.Charity)
  await this.page.waitForTimeout(5000)
 }
 async user_search_charity(strsearch: string){
  await this.playwrightFactory.fill(this.search_charity, strsearch);
  await this.page.keyboard.press('Enter');
  await this.page.waitForTimeout(3000);
  await this.playwrightFactory.click(this.page.locator("(//*[contains(text(),' Create')]/ancestor::component-section//*[contains(text(),'Charity')]/ancestor::component-select//*[contains(text(),'"+strsearch+"')])[1]"));
  await this.page.waitForTimeout(3000);
}
async user_clicks_charity_dropdown(strcharityname: string) {
    await this.playwrightFactory.click(this.Charity)
    await this.playwrightFactory.fill(this.landing_charity_searchbar,strcharityname)
    await this.page.keyboard.press('Enter');
    
    await this.playwrightFactory.click(this.page.locator("(//*[contains(text(),'"+strcharityname+"')])[1]"))
    
  }
  async verify_searchbar_existingname(striteration: any) {
let name= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.page.waitForTimeout(5000);
  await this.playwrightFactory.fill(this.LandingPage_SearchBar,name);
  await this.page.keyboard.press('Enter');
  await this.page.waitForTimeout(5000);
  await expect(this.Existing_search_name).toBeVisible();
  await this.playwrightFactory.click(this.Existing_search_name)
  }
  async user_verifies_listing_fields(){
    await expect(this.txt_title_list).toBeVisible();
    await expect(this.txt_charity_list).toBeVisible();
    await expect(this.txt_event_page_list).toBeVisible();
    await expect(this.txt_other_events_list).toBeVisible();
    await expect(this.txt_Action_list).toBeVisible();
 
  }
  async user_verifies_multiple_pages_with_same_event(strCharity: string){
 
    await expect (this.page.locator("//div[contains(text(),'"+strCharity+"')]")).toBeVisible();
  }
  async user_clicks_edit(strEdit: string){
    await this.playwrightFactory.click(this.page.locator("//div[contains(text(),'"+strEdit+"')]"));
  }
 
  async user_verify_event_pages(){
    await this.playwrightFactory.click(this.drpdwn_event_page);
    await expect (this.link_event).toBeVisible();
    await this.playwrightFactory.click(this.drpdwn_event_page);
 
  }
  async user_clicks_charity_drpdwn() {
    await this.playwrightFactory.click(this.Charity)
    await this.page.waitForTimeout(5000)
      }
 async user_clicks_on_event_pages(){
        await this.txt_Event_Pages.click();
 
      }
      async user_verify_future_dated_event(strDate: string){
        await expect(this.page.locator("(//ul//div[contains(text(),'"+strDate+"')])[1]")).toBeVisible();
     }
     async user_verify_filter_result(strCharity: string){
      await expect(this.page.locator("(//*[contains(text(),'"+strCharity+"')])[1]")).toBeVisible();
    }
   
 
 

  




}


