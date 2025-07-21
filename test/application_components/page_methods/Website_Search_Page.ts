import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Website_Search_Page {
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


  readonly txt_search_bar:Locator;
  readonly btn_search:Locator;
  readonly link_half_marathon:Locator;









  
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
   
    this.txt_search_bar=this.page.locator('//input[@placeholder="Type anything to search..."]');

    this.btn_search=this.page.locator('//component-button[@label="Search"]//span[contains(text(),"Search")]');

    this.link_half_marathon=this.page.locator('//h6[normalize-space()="Royal Parks Half Marathon"]');
 
  }
    

    // Login to RFC
    
    async user_search_event(strevent:string){
      await this.playwrightFactory.click(this.txt_search_bar);
      await this.playwrightFactory.fill(this.txt_search_bar,strevent);
    }
   
    async user_click_search(){
      await this.playwrightFactory.click(this.btn_search);
    }
   
   
    async user_click_link_half_marathon(){
      await this.playwrightFactory.click(this.link_half_marathon);
    }




















  
  
 

  

 

 




}


