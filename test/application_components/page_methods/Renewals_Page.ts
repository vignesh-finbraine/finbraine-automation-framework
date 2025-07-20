import {expect, LocatorScreenshotOptions, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { runInThisContext } from 'vm';


export class RENEWALS_PAGE{
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


  readonly Renewals_Call_list: Locator; 
  readonly New_Business_List: Locator;
  readonly Reniwal_success_rate_list: Locator;
  readonly Revenue_Success_list: Locator;
 


 










  
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
    this.Renewals_Call_list= this.page.locator("//ul[@class='list-group list-group-flush']"); 
    this.New_Business_List= this.page.locator("//*[contains(text(),'New Business')]/ancestor::component-table//table"); 
    this.Reniwal_success_rate_list= this.page.locator("//*[contains(text(),'Renewal Success Rate')]/ancestor::component-table//table");
    this.Revenue_Success_list= this.page.locator("//*[contains(text(),'Revenue Success')]/ancestor::component-table//table");
 
  }
  

                       
 /******************** Page Object with Optional Field************************/
 
 async user_verify_renewals_call_list(){

  await expect(this.Renewals_Call_list).toBeVisible();

}

async user_verify_new_business_list(){

  await expect(this.New_Business_List).toBeVisible();

}

async user_verify_reniwal_success_rate_list(){

  await expect(this.Reniwal_success_rate_list).toBeVisible();

}

async user_verify_revenue_success_list(){

  await expect(this.Revenue_Success_list).toBeVisible();

}
 








}


