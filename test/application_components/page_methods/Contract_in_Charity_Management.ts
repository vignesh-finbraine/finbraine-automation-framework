import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Contract_in_Charity_Management {
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

  readonly txt_Contracts_Title: Locator;
  readonly txt_Create_Contracts_Title: Locator;
  readonly Type_btn:Locator;
  readonly type_search_bar:Locator;
  readonly Membership_checkbox:Locator;
  readonly title:Locator;
  readonly state:Locator;
  readonly current_checkbox:Locator;
  readonly Agreement:Locator

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
    this.txt_Contracts_Title=this.page.locator("//div[@class='title-purple card__title']")
    this.txt_Create_Contracts_Title=this.page.locator("//h1[normalize-space()='Create Contracts']")
    this.type_search_bar= this.page.locator("//*[contains(text(),'Type')]/ancestor::component-select//input[@placeholder='Search']");
    this.Type_btn=this.page.locator("//*[contains(text(),'Type')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.Membership_checkbox=this.page.locator("//*[contains(text(),'Type')]/ancestor::component-select//*[contains(text(),' Membership Agreement ')]")
    this.title=this.page.locator("//*[contains(text(),'Title')]/ancestor::component-input//input[@type='text']")
    this.state=this.page.locator("//*[contains(text(),'State ')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.current_checkbox=this.page.locator("//*[contains(text(),' Current ')]")
    this.Agreement=this.page.locator("//*[contains(text(),'Agreement (Max Size - 4 MB) ')]/ancestor::component-input//input[@placeholder='Select Agreement']")

  }
  
  async user_launches_application() {
    let url = process.env.APP_URL || "https://rfc-portal.sportsmediaagency.com/auth/login?returnUrl=%2Fdashboard"
    await this.playwrightFactory.launchApplication(url);
  }

  async user_verify_contracts_title(){
    await expect(this.txt_Contracts_Title).toBeVisible();
  }
 
  async user_verify_create_contracts_title(){
    await expect(this.txt_Create_Contracts_Title).toBeVisible();
    await this.page.waitForTimeout(3000)
  }
 
  async user_click_create_contract_type_btn(){
    await this.playwrightFactory.click(this.Type_btn);
    await this.page.waitForTimeout(3000)
  }
 
  async user_click_create_contract_type_dropdwn(strtype: string){
    await this.playwrightFactory.fill(this.type_search_bar,strtype);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000)
    await expect(this.Membership_checkbox).toBeVisible();
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Type')]/ancestor::component-select//*[contains(text(),'"+strtype+"')]"))
    }
 
  async user_enters_create_contract_title(strtitle: string){
    await this.playwrightFactory.fill(this.title,strtitle);
  }
 
  async user_clicks_create_contract_state_btn(){
    await this.playwrightFactory.click(this.state);
  }
 
  async user_click_create_contract_state_dropdwn(strstate: string){
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strstate+"')]"))
  }
 
 
   async user_clicks_create_contract_aggrement_btn(){
  await this.Agreement.setInputFiles('C:/Users/shivani.chouhan/Downloads/AAAssureIT_Tools_SW_List 1 (2) 1.pdf')
 
  }
  
}


