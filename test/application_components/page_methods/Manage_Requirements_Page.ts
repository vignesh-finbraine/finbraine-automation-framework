import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class MANAGE_REQUIRMENT {
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

readonly txt_min_age:Locator;
  readonly date_picker:Locator;
  readonly btn_year:Locator;
  readonly btn_close:Locator;
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
    this.txt_min_age=this.page.locator('//input[@placeholder="Minimum registration age"]');
 this.date_picker=this.page.locator('//*[contains(text(), "Born Before ")]/ancestor::component-section//button[contains(@class, "datepicker__mask" )]');
 this.btn_year=this.page.locator('//select[@title="Select year"]');
 this.btn_close=this.page.locator('//span[normalize-space()="Close"]');
 this.btn_save=this.page.locator('//span[normalize-space()="Save"]');
 this.txt_success_msg=this.page.locator('//div[normalize-space()="Create Requirement"]');
 this.btn_ok=this.page.locator('//button[normalize-space()="OK"]');
    
    









    
    
  }
  
  

  
// Create Category- Flow
  
async user_enters_minimum_age_for_registration(strage:string){
  await expect (this.txt_min_age).toBeVisible();
  await expect(this.txt_min_age).toBeEditable();
  await this.playwrightFactory.click(this.txt_min_age);
  await this.playwrightFactory.fill(this.txt_min_age,strage);
   
}
 
 
async user_picks_date(){
  await this.playwrightFactory.click(this.date_picker);
  await this.playwrightFactory.click(this.btn_year);
  await this.page.getByLabel('Select year').selectOption('2019')
  await this.playwrightFactory.click(this.btn_close);
 
}
 
  async user_clicks_save_btn(){
    await this.playwrightFactory.click(this.btn_save);
    await this.txt_success_msg.waitFor();
    await expect(this.txt_success_msg).toBeVisible();
    await this.playwrightFactory.click(this.btn_ok);
  }



}


