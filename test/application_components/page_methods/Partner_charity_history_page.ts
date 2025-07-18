import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class partner_charity {
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

  readonly row_three:Locator;
  readonly row_four:Locator;
  readonly row_five:Locator;
  readonly partner_charity_btn:Locator;
  








  
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
    
    this.row_three=this.page.locator("//*[contains(text(),'Charity History')]/ancestor::component-table//tr[3]")
    this.row_four=this.page.locator("//*[contains(text(),'Charity History')]/ancestor::component-table//tr[4]")
    this.row_five=this.page.locator("//*[contains(text(),'Charity History')]/ancestor::component-table//tr[5]")
    this.partner_charity_btn=this.page.locator("//a[normalize-space()='Partner Charity History']")
  







    
    
  }
  
  

  
// Create Category- Flow
  
async user_click_createbtn(){
    await this.playwrightFactory.click(this.btn_create);
    
  }
  async user_click_charitiesbtn(){
    await this.playwrightFactory.click(this.btn_charities);
    await this.page.waitForTimeout(5000);
  }
  
async user_verify_partner_charity_history_list(){
    await  expect(this.row_three).toBeVisible
    await  expect(this.row_four).toBeVisible
    await  expect(this.row_five).toBeVisible


    }

    async user_click_partner_charity_btn(){
      await this.playwrightFactory.click(this.partner_charity_btn);
  }
  async user_verify_partner_charity_btn_notpresent(){
    await  expect(this.partner_charity_btn).toBeHidden
}


  

}