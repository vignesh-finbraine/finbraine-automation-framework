import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class EVENT_PHOTO_VEDIOS {
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
  readonly Marketing_Folder_Tittle: Locator;
  readonly Column_Name: Locator;
  readonly Column_Event: Locator;
  readonly Column_Event_Catagory: Locator;
  readonly Column_Action: Locator;
  readonly First_Row: Locator;
  readonly Marketing_Folder_Search_Bar: Locator;
  readonly Search_Result: Locator;
  readonly Folder_Delete_btn: Locator;
  //readonly Folder_Name: Locator;
  readonly Delete_Success_Massage: Locator;
  readonly OK_BTN: Locator;
  readonly txt_items_Per_Page: Locator;
//readonly txt_Items_Per_Page_5: Locator;
readonly txt_Select_Specific_Page: Locator;
readonly btn_Filter: Locator
readonly txt_Filter_Event_Folders: Locator;
readonly txt_Event: Locator;
readonly drpdwn_Membership: Locator;
readonly btn_Apply: Locator;
readonly txt_Membership_Event: Locator;
readonly txt_Existing_Folder_Name: Locator;
readonly btn_create: Locator;
readonly txt_Search_Result: Locator;
readonly OK_BTN_Delete: Locator;
readonly txt_Filter_Event_Folder_Search_Bar: Locator;
readonly txt_Membership: Locator;













  
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
    this.Marketing_Folder_Tittle= this.page.locator("//*[contains(text(),'Marketing Folders')]");
    this.Column_Name= this.page.locator("//th[@class='table__col']/ancestor::table//*[contains(text(),'Name')]");
    this.Column_Event= this.page.locator("//div[text()='Folders']/ancestor::component-table//*[contains(text(),'Event')]/ancestor::tr[1]/th[2]");
    this.Column_Event_Catagory= this.page.locator("//div[text()='Folders']/ancestor::component-table//*[contains(text(),'Event')]/ancestor::tr[1]/th[3]");
    this.Column_Action= this.page.locator("//div[text()='Folders']/ancestor::component-table//*[contains(text(),'Event')]/ancestor::tr[1]/th[4]");
     this.First_Row= this.page.locator("//div[text()='Folders']/ancestor::component-table//tr[2]");
     this.Marketing_Folder_Search_Bar= this.page.locator("//input[@placeholder='Press ENTER to search']");
     this.Search_Result= this.page.locator("//div[@class='table__details']");
     this.Folder_Delete_btn= this.page.locator("(//button[@class='table__button danger d-block'])[1]");
    // this.Folder_Name= this.page.locator("(//div[@class='table__product'])[1]");
     this.Delete_Success_Massage= this.page.locator("//*[contains(text(),'Are you sure?')]")
     this.OK_BTN_Delete= this.page.locator("//button[normalize-space()='OK']");
     this.txt_items_Per_Page=this.page.locator("//*[contains(text(),'Items per page:')]/ancestor::pagination-template//span[@class='dropdown-btn']")
    //this.txt_Items_Per_Page_5=this.page.locator("//component-pagination[@position='center']//li[1]//div[1]")
    this.txt_Select_Specific_Page=this.page.locator("//span[normalize-space()='Select a specific page:']")
    this.btn_Filter=this.page.locator("//span[normalize-space()='Filter']")
    this.txt_Filter_Event_Folders=this.page.locator("//span[normalize-space()='Filter Event Folders']")
    this.txt_Event=this.page.locator("//span[contains(text(),'Please select')]")
    this.drpdwn_Membership=this.page.locator("//ul//div[contains(text(),'Membership')]")
    this.btn_Apply=this.page.locator("//span[normalize-space()='Apply']")
    this.txt_Membership_Event=this.page.locator("(//tr[@class='table__row'])[2]")
    this.txt_Existing_Folder_Name=this.page.locator("//div[contains(text(),'Automation Interstate Marathon')]")
    this.btn_create =this.page.getByRole('button', { name: 'Create' });
    this.txt_Search_Result=this.page.locator("//div[@class='table__details']")
    this.OK_BTN= this.page.locator("//*[contains(text(),'OK')]/ancestor::div//button[@class='swal-button swal-button--confirm']");
    this.txt_Filter_Event_Folder_Search_Bar=this.page.locator("//*[contains(text(),'Filter Event Folders')]/ancestor::ngb-modal-window//input[@placeholder='Search']")
    this.txt_Membership=this.page.locator("//*[contains(text(),' Membership ')]/ancestor::component-select//input[@aria-label='Membership']")
    









    
    
  }
  
  async user_clicks_btn_create() {
        await this.playwrightFactory.click(this.btn_create);
      }

  
async user_verify_tittle(){
  await this.Marketing_Folder_Tittle.waitFor();
  await expect(this.Marketing_Folder_Tittle).toBeVisible();
}
async verify_name_event_eventcatagory_action_tab(){
  await expect(this.Column_Name).toBeVisible();
  await expect(this.Column_Event).toBeVisible();
  await expect(this.Column_Event_Catagory).toBeVisible();
  await expect(this.Column_Action).toBeVisible();
}
async user_verify_first_row_of_table(){
  await expect(this.First_Row).toBeVisible();
}
async user_enter_value_search_bar(strSearch: string){
  await this.playwrightFactory.fill(this.Marketing_Folder_Search_Bar, strSearch);
  await this.page.keyboard.press('Enter');
}
async user_verify_search_result(){
  await this.Search_Result.waitFor();
  await expect(this.Search_Result).toBeVisible();
}
async user_enter_created_value_search_bar(striteration : any){
 let foldername1 = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
 await this.page.waitForTimeout(5000);
await this.playwrightFactory.fill(this.Marketing_Folder_Search_Bar, foldername1);
  await this.page.keyboard.press('Enter');
  await this.page.waitForTimeout(5000);
}
async user_click_delete_button(striteration: any){
  let foldername1 = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
  await this.page.locator("//div[text()='Folders']/ancestor::component-table//td[normalize-space()='"+foldername1+"']/ancestor::tr[1]/td[1]").hover();
  await this.playwrightFactory.click(this.Folder_Delete_btn);
}
async user_verify_delete_msg(){
  await expect(this.Delete_Success_Massage).toBeVisible();
}
async user_click_ok_btn(){
  await this.playwrightFactory.click(this.OK_BTN_Delete);
}
async user_click_ok(){
  await this.playwrightFactory.click(this.OK_BTN);
}
async user_selects_items_per_page(strPagenumber: string){
        await this.txt_items_Per_Page.click();
        await this.playwrightFactory.clickForce(this.page.locator("(//*[contains(text(),'Items per page:')]/parent::div//*[contains(@type,'checkbox') and contains(@aria-label,'"+strPagenumber+"')])[1]"));
 
      }
 
      async user_verify_select_a_specific_page(){
        await expect(this.txt_Select_Specific_Page).toBeVisible();
 
      }
 
      async user_clicks_on_filter_button(){
        await expect(this.btn_Filter).toBeVisible();
        await this.btn_Filter.click();
      }
 
      async user_verify_filter_event_folders(){
        await expect(this.txt_Filter_Event_Folders).toBeVisible();
      }
 
      async user_selects_event_on_filter_event_folders(){
        await this.txt_Event.click();
        //await this.playwrightFactory.click(this.drpdwn_Membership);
 
      }
      async user_search_membership_on_search_bar(streventsearch: string){
  await this.playwrightFactory.fill(this.txt_Filter_Event_Folder_Search_Bar, streventsearch);
  await this.page.keyboard.press('Enter');
  await this.page.waitForTimeout(3000);
  await this.playwrightFactory.clickForce(this.txt_Membership);
  await this.page.waitForTimeout(3000);
}
 
      async user_clicks_on_apply_button(){
        await expect(this.btn_Apply).toBeVisible();
        await this.btn_Apply.click();
      }
 
      async user_verify_selected_membership_event(){
        await expect(this.txt_Membership_Event).toBeVisible();
      }
      async user_click_searche_folder(){
        await this.playwrightFactory.click(this.txt_Existing_Folder_Name);
      }
      async user_verify_and_click_on_search_result(){
      await expect (this.txt_Search_Result).toBeVisible();
      await this.txt_Search_Result.click();
 
    }      

  





}


