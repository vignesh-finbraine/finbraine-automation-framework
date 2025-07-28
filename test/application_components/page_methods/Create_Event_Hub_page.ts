import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class CREATE_EVENT_HUBPAGE {
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


readonly Event_hub_btn:Locator;
readonly Event_Title:Locator;
readonly Event_hub_dashboard_page:Locator;

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
    this.Event_hub_btn= this.page.locator("//a[normalize-space()='Event Hub Pages']")
    this.Event_Title= this.page.locator("//input[@placeholder='Enter Title']")
    this.Event_hub_dashboard_page= this.page.locator("//h1[normalize-space()='Dashboard']");  
  }
  
  async user_clicks_event_hub_btn(){
    await this.playwrightFactory.click(this.Event_hub_btn);
  }
  async user_enter_event_title(striteration: any){
    let charityname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.Event_Title,charityname);
  }

  async user_verify_dashboard_page(){
    await expect(this.Event_hub_dashboard_page).toBeVisible();
  }

}


