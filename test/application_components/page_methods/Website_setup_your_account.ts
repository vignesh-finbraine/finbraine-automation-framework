import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Setup_account {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

 
  

  //**Declare */


  readonly txt_setup_account:Locator;
  readonly txt_create_password:Locator;
  readonly txt_confirm_password:Locator;








  
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
    this.txt_setup_account=this.page.locator('//h1[normalize-space()="Setup your Account"]');
    this.txt_create_password=this.page.locator('//div[@class="input"]//input[@placeholder="Enter your password"]');
    this.txt_confirm_password=this.page.locator('//component-input[@formcontrolname="confirmPassword"]//input[@placeholder="Enter your password"]');
 
  }
    

    // Login to RFC
    
    async user_verify_setup_account_page_displayed(){

      await expect (this.txt_setup_account).toBeVisible();
  
    }
   
    async user_create_password(strpassword:string){
  
      await this.playwrightFactory.click(this.txt_create_password);
  
      await this.playwrightFactory.fill(this.txt_create_password,strpassword)
  
    }
   
    async user_enter_confirm_password(strpassword:string){
  
      await this.playwrightFactory.click(this.txt_confirm_password);
  
      await this.playwrightFactory.fill(this.txt_confirm_password,strpassword)
  
    }
   
  
    


















  
  
 

  

 

 




}


