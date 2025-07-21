import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class WEBSITE_NORTH_WEST_REGIONS_PAGE {
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


readonly txt_Find_an_Event: Locator;
readonly txt_Regions: Locator;
readonly txt_North_West_Title: Locator;
readonly txt_Associated_Event: Locator;

















  
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
    this.txt_Find_an_Event=this.page.locator("//div[@class='header__item']//div[@title='Find an Event']")
    this.txt_Regions=this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Regions')])[1]")
    this.txt_North_West_Title=this.page.locator("//h1[normalize-space()='North West']")
    this.txt_Associated_Event=this.page.locator("//div[@class='card8__container']")
    
    

    
    








  
    
  }
  

  
// Website home page- Flow
  
 async user_launches_application() {
    let url = process.env.APP_URL || "https://rfc-staging.sportsmediaagency.com/"
    await this.playwrightFactory.launchApplication(url);
  }

  async user_verify_find_an_event(){
    await expect(this.txt_Find_an_Event).toBeVisible();
  }

  async user_hover_on_find_an_event(){
    await this.txt_Find_an_Event.hover();
  }

  async user_verify_regions(){
    await expect(this.txt_Regions).toBeVisible();
  }

  async user_click_on_regions(){
    await this.playwrightFactory.click(this.txt_Regions);
  }

  async user_verify_north_west_title(){
    await expect(this.txt_North_West_Title).toBeVisible();
  }

  async user_verify_associated_event(){
    await expect(this.txt_Associated_Event).toBeVisible();
  }

  


  








  

 























}










 
 







