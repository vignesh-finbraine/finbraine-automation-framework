import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class MANAGE_CUSTOM_FIELD {
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
readonly txt_custom_field_name:Locator;
  readonly drpdwn_type:Locator;
  readonly btn_text:Locator;
  readonly btn_save:Locator;
  readonly txt_success_msg:Locator;
  readonly btn_ok:Locator;
 













  
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
    this.txt_custom_field_name=this.page.locator('//input[@placeholder="Name of the field"]');
 this.drpdwn_type=this.page.locator('//*[contains(text(), "Type ")]/ancestor::component-select//*[contains(text(), "Please Select")]');
 this.btn_text=this.page.locator('//div[normalize-space()="Text"]');
 this.btn_save=this.page.locator('//span[normalize-space()="Save"]');
 this.txt_success_msg=this.page.locator('//div[normalize-space()="Create Custom Field"]');
 this.btn_ok=this.page.locator('//button[normalize-space()="OK"]');
    
    









    
    
  }
  
  

  

  
 
  async user_enters_name(striteration : any) {
    let username= await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration)
   await this.playwrightFactory.fill(this.txt_custom_field_name, username );
   
 
 }
 
  async user_selects_type(){
    await this.playwrightFactory.click(this.drpdwn_type);
    await this.playwrightFactory.click(this.btn_text);
   
   
   
 
  }
 
  async user_clicks_save_btn(){
    await this.playwrightFactory.click(this.btn_save);
    await this.txt_success_msg.waitFor();
    await expect(this.txt_success_msg).toBeVisible();
    await this.playwrightFactory.click(this.btn_ok);
  }
 




}


