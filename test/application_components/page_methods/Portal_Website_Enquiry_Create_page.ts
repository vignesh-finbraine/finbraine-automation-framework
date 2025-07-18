import {expect, LocatorScreenshotOptions, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Website_ENQUIRY_HOMEPAGE{
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly emt_homepage_reporting: Locator;
  readonly link_search_open: Locator;
  readonly select_site: Locator;
 readonly select_site_run_for_charity: Locator;
  

  //**Declare */


 

readonly Event_name:Locator;
readonly website_first_name:Locator;
readonly website_Last_name:Locator;

readonly website_btn:Locator;
readonly website_event_drpdwn:Locator;
 readonly Search_field:Locator;
 readonly charity_Search_field:Locator;
readonly charity_Search_drpdwn:Locator;
readonly charity_drpdwn_opn:Locator;









  
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
     
    this.Event_name=this.page.locator("//input[@placeholder='Enter Event Name']")
    this.website_first_name=this.page.locator("//input[@placeholder='Their first name']")
    this.website_Last_name=this.page.locator("//input[@placeholder='Their last name']")

    this.website_btn=this.page.locator("//a[normalize-space()='Website']")
   
    this.select_site = this.page.locator("//*[contains(text(),'Site ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.select_site_run_for_charity = this.page.locator("//div[contains(text(),'RunForCharity')]");
    this.website_event_drpdwn= this.page.locator("//component-select[@label='Event']//div//ng-multiselect-dropdown//div//div//span//span[contains(text(),'Please Select')]")  
    this.Search_field= this.page.locator("//*[contains(text(),'Event ')]/ancestor::component-select//input[@placeholder='Press ENTER to search']")
    this.charity_Search_field= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::component-select//input[@placeholder='Press ENTER to search']")                                  
    this.charity_Search_drpdwn= this.page.locator("(//*[contains(text(),'Charity ')]/ancestor::component-select//span[@class='dropdown-btn'])[1]")
    this.charity_drpdwn_opn= this.page.locator("//*[contains(text(),'Charity ')]/ancestor::component-select//*[contains(text(),'0807Charity')]")

  }
  

                       
 /******************** Page Object with Optional Field************************/
 
 
 
async user_enters_event_name(striteration: any){
  let name= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.Event_name,name);
}

async user_enters_first_name(striteration: any){
  let name= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.playwrightFactory.fill(this.website_first_name,name);
}
 
async user_enters_last_name(striteration: any){
  await this.playwrightFactory.fill(this.website_Last_name,striteration);
  }
  
  async user_click_website_btn(){
    await this.playwrightFactory.click(this.website_btn);
    
  }

  async user_clicks_site_field(){
    await expect(this.select_site).toBeVisible();
    await this.playwrightFactory.click(this.select_site);
  }
  async user_clicks_run_for_charity_opn(strcharity: string){
    await expect(this.select_site_run_for_charity).toBeVisible();
    await this.playwrightFactory.click(this.page.locator("//div[contains(text(),'"+strcharity+"')]"))
    }
   
    async user_select_event(strCharity: string){
      await this.playwrightFactory.click(this.website_event_drpdwn);
      await this.page.waitForTimeout(3000)
     await this.playwrightFactory.fill(this.Search_field, strCharity);
      await this.page.keyboard.press('Enter');
      await this.playwrightFactory.click(this.page.locator("//*[contains(text(),' "+strCharity+" ')]"))

}
async user_select_charity(strCharity: string){
  await this.playwrightFactory.click(this.charity_Search_drpdwn);
  await this.page.waitForTimeout(3000)
 await this.playwrightFactory.fill(this.charity_Search_field, strCharity);
  await this.page.keyboard.press('Enter');
  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Charity ')]/ancestor::component-select//*[contains(text(),'"+strCharity+"')]"))

}
async user_clear_first_name(){
  await this.website_first_name.clear();
  await this.page.waitForTimeout(3000)
  }
}

