import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class CONTRACT_PAGE {
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
readonly btn_create: Locator;
readonly btn_charities: Locator;
readonly contract_btn:Locator;
readonly Search_bar: Locator;

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
    this.btn_create = this.page.locator("//component-button[@label='Create']//button//span");
    this.btn_charities = this.page.locator("//*[contains(text(),'Charities')]/ancestor::div//a[@class='nav__link']");
    this.contract_btn=this.page.locator("//*[contains(text(),' Charity Management ')]/ancestor::component-sidebar//a[@title='Contract']")
    this.Search_bar= this.page.locator("//input[@placeholder='Press ENTER to search']");
}
  
  

  
// Create Category- Flow
  
async user_click_createbtn(){
    await this.playwrightFactory.click(this.btn_create);
    
  }
  async user_click_charitiesbtn(){
    await this.playwrightFactory.click(this.btn_charities);
    await this.page.waitForTimeout(5000);
  }
  async user_click_contract_btn(){
    await this.playwrightFactory.click(this.contract_btn);
  }
  async user_verify_contract_btn_notpresent(){
    await expect(this.contract_btn).toBeHidden();
 
  }

  async user_searched_created_contract(striteration: any){

    let charityname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);

    await this.playwrightFactory.fill(this.Search_bar,charityname);

  }

  async user_verify_searched_contract(striteration: any){

     let charityname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);

    await expect(this.page.locator("//*[contains(text(),'"+charityname+"')]")).toBeVisible();

  }

}


