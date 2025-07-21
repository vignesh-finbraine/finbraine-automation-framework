import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class WEBSITE_ALL_DISTANCES_PAGE {
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
readonly Distances_List: Locator;
readonly Search_bar: Locator;
readonly Search_button: Locator;
readonly Distance_5K: Locator;

readonly txt_search_bar:Locator;

  readonly btn_search:Locator;

  readonly link_5k_event:Locator;
 










  
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
    this.Distances_List= this.page.locator("//div[@class='d-flex flex-wrap pt-1']");
    this.Search_bar= this.page.locator("//input[@placeholder='Press ENTER to search Distances']");
     this.Search_button= this.page.locator("//*[contains(text(),'Search')]/ancestor::button");
     this.Distance_5K= this.page.locator("//a[@href='/distances/5k']/ancestor::component-card9//*[contains(text(),'5K')]")
     this.txt_search_bar=this.page.locator('//input[@placeholder="Press ENTER to search Distances"]');
     this.btn_search=this.page.locator('//span[normalize-space()="Search"]');
     this.link_5k_event=this.page.locator('//*[contains(text(), "5K")]/ancestor::component-card9//*[contains(text(), "50 Events")]');
    
    

   
    
  }
  async user_verify_distances_list(){
    await expect(this.Distances_List).toBeVisible();
  }
  async user_navigate_back(){
    await this.page.goBack();
  }
  async user_search_event(strEvent: string){
    await this.playwrightFactory.fill(this.Search_bar, strEvent);
    await this.playwrightFactory.click(this.Search_button);

  }
  async user_verify_5K_distance(){
    await expect(this.Distance_5K).toBeVisible();
  }
  async user_click_5K_distance(){
    await this.playwrightFactory.click(this.Distance_5K);
  }
  
  async user_search_distance_in_search_bar(strdistance:string){
    await this.playwrightFactory.click(this.txt_search_bar);
    await this.playwrightFactory.fill(this.txt_search_bar,strdistance)
}
 
  async user_click_search(){
    await this.playwrightFactory.click(this.btn_search);
  }
 
  async user_click_5k_event(){
    await this.playwrightFactory.click(this.link_5k_event);
  }
  

 

 




}

