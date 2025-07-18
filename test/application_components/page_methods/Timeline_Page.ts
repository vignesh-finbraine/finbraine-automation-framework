import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class timeline_page {
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
readonly timeline:Locator;
readonly shree_test_one:Locator;
readonly fund_for_charity:Locator;
readonly city_race:Locator;
readonly timeline_heading:Locator;
  








  
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
    this.timeline=this.page.locator("//*[contains(text(),' Charity Management ')]/ancestor::component-sidebar//a[@title='Timeline']")
    this.shree_test_one=this.page.locator("//*[contains(text(),' Timeline')]/ancestor::component-section//*[contains(text(),'Shree test 1')]")
    this.fund_for_charity=this.page.locator("//*[contains(text(),' Timeline')]/ancestor::component-section//*[contains(text(),'Fund for Charity')]")
    this.city_race=this.page.locator("//*[contains(text(),' Timeline')]/ancestor::component-section//*[contains(text(),'City Race')]")
    this.timeline_heading=this.page.locator("//h2[normalize-space()='Timeline']")



}
  
  

  
// Create Category- Flow
  
async user_click_createbtn(){
    await this.playwrightFactory.click(this.btn_create);
    
  }
  async user_click_charitiesbtn(){
    await this.playwrightFactory.click(this.btn_charities);
    await this.page.waitForTimeout(5000);
  }
  async user_click_timeline_btn(){
    await this.playwrightFactory.click(this.timeline);
    
  }
  async user_verify_timline_shree_test_one_field(){
    await expect(this.shree_test_one).toBeVisible();
    
  }
  async user_verify_timline_fund_for_charity(){
    await expect(this.fund_for_charity).toBeVisible();
    
  }
  async user_verify_timline_city_race(){
    await expect(this.city_race).toBeVisible();
    
  }
  async user_verify_timeline_heading(){
    await expect(this.timeline_heading).toBeVisible();
    
  }
  async user_verify_timeline_opn_notpresent(){
    await expect(this.timeline_heading).toBeHidden();
    
  }
  async user_click_charitiesbtn_not_present(){
    await expect(this.btn_charities).toBeHidden
    }
    

}


