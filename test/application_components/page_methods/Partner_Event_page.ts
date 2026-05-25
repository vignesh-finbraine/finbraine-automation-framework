import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class PARTNER_EVENT_PAGE {
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

     readonly partner_event_manage_btn:Locator;
     readonly partner_event_email_field:Locator;
     readonly partner_event_first_name:Locator;
     readonly partner_event_last_name:Locator;
     readonly partner_charity_name:Locator;
     readonly add_participant_btn:Locator;








  
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
    
    this.partner_event_manage_btn=this.page.locator ("//*[contains(text(),'1 Nov 2025 - 31 Jan 2026')]/ancestor::component-card8//div[@class='card8__buttons']")
    this.partner_event_email_field=this.page.locator("//input[@placeholder='Their email address']")
    this.partner_event_first_name=this.page.locator("//input[@placeholder='Their first name']")
    this.partner_event_last_name=this.page.locator("//input[@placeholder='Their last name']")
    this.partner_charity_name=this.page.locator("//*[contains(text(),' 0807Charity ')]")
    this.add_participant_btn=this.page.locator("//component-button[@label='Add Participant']//button//span")
                                      
    // Login to RFC
    
  }
  
  async user_launches_application() {
    let url = process.env.APP_URL || "https://rfc-portal.sportsmediaagency.com/auth/login?returnUrl=%2Fdashboard"
    await this.playwrightFactory.launchApplication(url);
  }

  async user_clicks_manage_btn(){
    await this.playwrightFactory.click(this.partner_event_manage_btn)
  }
  
  async user_enter_email(striteration: any){
    let Email = await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
    await this.playwrightFactory.fill(this.partner_event_email_field,Email);
  }
 
  async user_enter_firstname(striteration: any){
    let charityname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.partner_event_first_name,charityname);
  }
  async user_enter_lastname(striteration: any){
    
    await this.playwrightFactory.fill(this.partner_event_last_name,striteration);
  }
  
  async user_select_charity_name(){
  await this.playwrightFactory.click(this.partner_charity_name);
  }
 
  async user_clicks_add_participant_btn(){
    await this.playwrightFactory.click(this.add_participant_btn);
    }
   
  
 




}


