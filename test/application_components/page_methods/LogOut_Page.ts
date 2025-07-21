import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class LOGOUT_PAGE {
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


readonly Profile_icon: Locator;
readonly Logout_Button: Locator;

readonly Account_Manager: Locator;
readonly Ayush_Profile_Icon: Locator;
readonly Event_Manager: Locator;
readonly Vaishnavi_Profile_Icon: Locator;
readonly Charity_Charity_Users: Locator;
readonly Rutuja_Profile_Icon: Locator;
readonly Participant: Locator;
readonly Shivani_Profile_Icon: Locator;








  
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
    this.Profile_icon= this.page.locator("//img[@src='https://rfc-api.sportsmediaagency.com//storage/media/images/4kjSms2ZhUjXyJXeiv5O3DUlkeOm1qkGqpCadtm4/4kjSms2ZhUjXyJXeiv5O3DUlkeOm1qkGqpCadtm4.png']");
    this.Logout_Button= this.page.locator("//*[contains(text(),'Log')]");
    
    this.Account_Manager=this.page.locator("(//*[contains(text(),' Overview ')])[2]")
    this.Ayush_Profile_Icon=this.page.locator("//img[@alt='Ayush T']")
    this.Event_Manager=this.page.locator("//h1[normalize-space()='Dashboard']")
    this.Vaishnavi_Profile_Icon=this.page.locator("//img[@alt='Vaishnavi Dange']")
    this.Charity_Charity_Users=this.page.locator("//h1[normalize-space()='Dashboard']")
    this.Rutuja_Profile_Icon=this.page.locator("//img[@alt='Rutuja Mohite']")
    this.Participant=this.page.locator("//h1[normalize-space()='Dashboard']")
    this.Shivani_Profile_Icon=this.page.locator("//img[@alt='Shivani Chauhan']")









  
    
  }
  

  
// Create Category- Flow
  
  async user_clicks_profileicon(){
    await this.Profile_icon.hover();
  }
  async user_click_logout_button(){
    await this.Logout_Button.hover();
    await this.playwrightFactory.click(this.Logout_Button);
  }

  async user_verify_account_manager(){
    await expect(this.Account_Manager).toBeVisible();
    await this.page.waitForTimeout(3000);
  }
 
  async user_clicks_ayush_profile_icon(){
    await this.Ayush_Profile_Icon.hover();
  }
 
  async user_verify_event_manager(){
    await expect(this.Event_Manager).toBeVisible();
  }
 
  async user_clicks_vaishnavi_profile_icon(){
    await this.Vaishnavi_Profile_Icon.hover();
  }
 
  async user_verify_charity_charity_users(){
    await expect(this.Charity_Charity_Users).toBeVisible();
    await this.page.waitForTimeout(3000);
  }
 
  async user_clicks_rutuja_profile_icon(){
    await this.Rutuja_Profile_Icon.hover();
  }
 
  async user_verify_participant(){
    await expect(this.Participant).toBeVisible();
  }
 
  async user_clicks_shivani_profile_icon(){
    await this.Shivani_Profile_Icon.hover();
  }




}


