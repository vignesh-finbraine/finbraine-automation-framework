import {expect, LocatorScreenshotOptions, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { runInThisContext } from 'vm';


export class EXTERNAL_ENQUIRY_HOMEPAGE{
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


 
readonly External_btn:Locator;
readonly Event_name:Locator;
readonly first_name:Locator;
readonly Last_name:Locator;
readonly Charity_Name:Locator;
readonly Charity_drpdwn:Locator;
readonly Search_field:Locator;
readonly External_email_field:Locator;
readonly External_edit_first_row:Locator;
readonly save_btn:Locator;

 










  
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
    this.External_btn=this.page.locator("//a[normalize-space()='External']")   
    this.Event_name=this.page.locator("//input[@placeholder='Enter Event Name']")
    this.first_name=this.page.locator("#firstName")
    this.Last_name=this.page.locator("#lastName")
    this.Charity_Name=this.page.locator("//*[contains(text(),'Charity ')]/ancestor::component-select//*[contains(text(),'0807Charity')]")
    this.Charity_drpdwn= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Search_field= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::component-select//input[@placeholder='Press ENTER to search']")
    this.External_email_field= this.page.locator("//input[@placeholder='Their email address']")
    this.External_edit_first_row= this.page.locator("(//div[@class='table__product'])[1]")
    this.save_btn= this.page.locator("//span[normalize-space()='Save']")
                                     
  
    
  }
  

                       
 /******************** Page Object with Optional Field************************/
 
 
 async user_click_external_btn(){
  await this.playwrightFactory.click(this.External_btn);
  
}

async user_enters_event_name(striteration: any){
  let name= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.Event_name,name);
}
async user_enters_first_name(striteration: any){
  let name= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.first_name,name);
}

 
async user_enters_last_name(striteration: any){
  await this.playwrightFactory.fill(this.Last_name,striteration);
  }
  
  async user_select_charity(strCharity: string){
    await this.playwrightFactory.click(this.Charity_drpdwn);
    await this.page.waitForTimeout(3000)
   await this.playwrightFactory.fill(this.Search_field, strCharity);
    await this.page.keyboard.press('Enter');
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Charity ')]/ancestor::component-select//*[contains(text(),'"+strCharity+"')]"));
  }

  async user_enters_email(striteration: any){
    let Email= await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
    await this.playwrightFactory.fill(this.External_email_field,Email);
}



async user_clear_first_name(){
  await this.first_name.clear();
  await this.page.waitForTimeout(3000)
  }
  async user_click_external_edit_first_row_name(){
    await this.playwrightFactory.click(this.External_edit_first_row);
    
  }
  async user_click_save_btn(){
    await this.playwrightFactory.click(this.save_btn);
    
  }
}