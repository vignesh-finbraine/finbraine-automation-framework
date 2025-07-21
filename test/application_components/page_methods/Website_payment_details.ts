import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Payment_details {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

 
  

  //**Declare */


  readonly txt_payment_details:Locator;
  readonly txt_card_number:Locator;
  readonly txt_expiration_date:Locator;
  readonly txt_security_code:Locator;








  
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
    this.txt_payment_details=this.page.locator('//h1[normalize-space()="Payment Detail"]');
    this.txt_card_number=this.page.locator('//*[contains(text(), "Card number")]/ancestor::form//*[@placeholder="1234 1234 1234 1234"]');
    this.txt_expiration_date=this.page.locator('//input[@id="Field-expiryInput"]');
    this.txt_security_code=this.page.locator('//input[@id="Field-cvcInput"]');
 
  }
    

    // Login to RFC
    
    async user_verify_payment_details_page_displayed(){

      await expect (this.txt_payment_details).toBeVisible();
  
    }
   
    async user_enter_card_number(strnumber:string){
  
      // await this.page.waitForTimeout(5000);
  
      // await this.playwrightFactory.clickForce(this.txt_card_number);
  
      await this.playwrightFactory.fill(this.txt_card_number,strnumber);
  
    }
   
    async user_enter_expiration_date(strdate:string){
  
      await this.playwrightFactory.click(this.txt_expiration_date);
  
      await this.playwrightFactory.fill(this.txt_expiration_date,strdate);
  
    }
   
    async user_enter_security_code(strcode:string){
  
      await this.playwrightFactory.click(this.txt_security_code);
  
      await this.playwrightFactory.fill(this.txt_security_code,strcode)
  
    }
  
    


















  
  
 

  

 

 




}


