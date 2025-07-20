import {expect, LocatorScreenshotOptions, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { runInThisContext } from 'vm';


export class EVENT_HUB_PAGE{
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

  readonly Filter_Button: Locator;
  readonly Filter_Charity: Locator;
  readonly Filter_Delete: Locator;
  readonly txt_Charity_Search_Bar: Locator;
  readonly Apply_Button: Locator;



 










  
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
    this.emt_homepage_reporting = this.page.getByText('Reporting', { exact: true });
    this.link_search_open = this.page.getByRole('link', { name: 'Portal open' });
    this.Filter_Button= this.page.locator("//component-button[@label='Filter']");
    this.Filter_Charity= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::form//ng-multiselect-dropdown[@id='root-paginated-select']");
    this.Filter_Delete= this.page.locator("//*[contains(text(),'Deleted ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.txt_Charity_Search_Bar=this.page.locator("//*[contains(text(),'Filter Event Hub Pages')]/ancestor::ngb-modal-window//*[contains(text(),'Charity ')]/ancestor::component-select//input[@placeholder='Search']");
    this.Apply_Button= this.page.locator("//component-button[@label='Apply']//button");
    
  }
  

                       
 /******************** Page Object with Optional Field************************/
 
 
 

 async user_click_filter(){

  await this.playwrightFactory.click(this.Filter_Button);

}

async user_select_charity_for_filter(strCharityname: string){

  await this.playwrightFactory.click(this.Filter_Charity);

  await this.playwrightFactory.fill(this.txt_Charity_Search_Bar, strCharityname)

  await this.page.keyboard.press('Enter');

  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Charity ')]/ancestor::form//*[contains(text(),'"+strCharityname+"')]"));

}

async user_select_deleted_drpdwn(strDeletedAll: string){

  await this.playwrightFactory.click(this.Filter_Delete);

  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Deleted ')]/ancestor::component-select//*[contains(text(),'"+strDeletedAll+"')]"));

}

async user_click_and_veirfy_apply_button(){

  await expect(this.Apply_Button).toBeEnabled();

  await this.playwrightFactory.click(this.Apply_Button);

}

async user_verify_filter_result(strCharity: string){

      await expect(this.page.locator("(//*[contains(text(),'"+strCharity+"')])[1]")).toBeVisible();

    }







}


