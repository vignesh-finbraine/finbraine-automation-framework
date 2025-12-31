import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
 
export class MARKETING_EVENT {
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
 
 
readonly Create_Marketing_Forlder_Tittle: Locator;
readonly Folder_Name: Locator;
readonly Select_Event: Locator;
readonly Event_DropDown_Option: Locator;
//readonly Dorney_Lake: Locator;
readonly Drop_Box_Url: Locator;
readonly Save_btn: Locator;
readonly Update_btn:Locator;
 
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
   this.Create_Marketing_Forlder_Tittle= this.page.locator("//*[contains(text(),'Create Marketing Folders')]");
   this.Folder_Name= this.page.locator("//input[@placeholder='Name']");
   this.Select_Event= this.page.locator("//*[contains(text(),'Event ')]/ancestor::component-select//span[@class='dropdown-btn']");
   this.Event_DropDown_Option= this.page.locator("//*[contains(text(),'Event ')]/ancestor::component-select//ul[@class='item2']");
   //this.Dorney_Lake= this.page.locator("//*[contains(text(),' Dorney Lake ')]");
   this.Drop_Box_Url= this.page.locator("//input[@placeholder='Enter DropBox URL']");
   this.Save_btn= this.page.locator("//component-button[@label='Save']//button");
   this.Update_btn= this.page.locator("//span[normalize-space()='Update']")
     
  }
 
async user_verify_create_folder_tittle(){
  await expect(this.Create_Marketing_Forlder_Tittle).toBeVisible();
}
async user_enter_folder_name(striteration : any){
  let foldername = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
await this.playwrightFactory.fill(this.Folder_Name, foldername);
}
async user_select_event(strEvent: string){
  await this.playwrightFactory.click(this.Select_Event);
  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strEvent+"')]"));
}
async user_verify_event_drpdwn_option(){
  await this.playwrightFactory.click(this.Select_Event);
  await expect(this.Event_DropDown_Option).toBeVisible();
}
async user_enter_dropbox_url(strURL: string){
  await expect(this.Drop_Box_Url).toBeVisible();
  await this.playwrightFactory.fill(this.Drop_Box_Url,strURL);
}
async user_click_save_btn(){
  await this.playwrightFactory.click(this.Save_btn);
}
 
async user_clear_name(){
  await this.Folder_Name.clear();
  await this.page.waitForTimeout(3000)
  }
 
  async user_click_update_btn(){
    await this.playwrightFactory.click(this.Update_btn);
  }
}
 
 
 
 