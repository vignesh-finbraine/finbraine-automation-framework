import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class REGISTRATION_EVENT_WEBSITE {
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

  readonly btn_eventname: Locator;
  readonly btn_10k: Locator;
  readonly txt_searchbox: Locator; 
  readonly btn_search: Locator;
  readonly lbl_eventname: Locator;
  readonly lbl_availability: Locator;
  readonly availability_status: Locator;
  readonly lbl_eventday: Locator;
  readonly lbl_cost_of_event: Locator;
  readonly lbl_location: Locator; 
  readonly eventday_details: Locator;
  readonly cost_details: Locator
  readonly location_details: Locator;
  readonly btn_select: Locator;
  readonly btn_register: Locator;
  readonly btn_viewdetail: Locator;
  readonly event_details: Locator;
  readonly msg_privacy_policy: Locator;
  readonly txt_email_address: Locator;
  readonly btn_next: Locator; 
  readonly txt_charity_category: Locator;
  readonly drpdwn_charity_category: Locator;
  readonly txt_charity: Locator;
  readonly drpdwn_charity: Locator;
  readonly btn_next1: Locator;
  readonly btn_successok: Locator;  










  
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
    this.btn_eventname=this.page.locator('//a[@id="event_name-tab"]');
    this.btn_10k=this.page.locator('//a[normalize-space()="All"]')
    this.txt_searchbox=this.page.locator('//input[@placeholder="Search your Event "]')
    this.btn_search=this.page.locator('//div[@class="search_button"]//button[@class="button button-primary button-primary-rfc"]')
    this.btn_viewdetail=this.page.locator('//span[normalize-space()="View Detail"]')
    this.lbl_eventname=this.page.locator('//div[@class="event-name"]')
    this.lbl_availability=this.page.locator('//p[normalize-space()="Availability"]');
    this.availability_status=this.page.locator('//span[@class="paddingBox availableBox"]')
    this.lbl_eventday=this.page.locator('//p[normalize-space()="Event Day"]')
     
    this.lbl_cost_of_event=this.page.locator('//p[normalize-space()="Cost of the Events"]') 
    this.lbl_location=this.page.locator('//p[normalize-space()="Location"]')
    this.eventday_details=this.page.locator('//p[normalize-space()="Sunday, 24th August, 2025"]')
    this.cost_details=this.page.locator('//p[normalize-space()="£3,000"]')
    this.location_details=this.page.locator('//p[normalize-space()="London EC4R 3TN, UK"]')
    this.btn_select=this.page.locator('(//component-button[@classname="button button-primary"][@label="Select"])[2]')
    this.btn_register=this.page.locator('//button[@class="button button-primary button-sm btnsm"]//span[contains(text(),"Register")]') 
    this.event_details=this.page.locator('//div[@class="content"]')
    this.msg_privacy_policy=this.page.locator('//p[@class="custom-info-text"]')   
    this.txt_email_address=this.page.locator('(//input[@placeholder="Enter your Email address "])[1]')
    this.btn_successok=this.page.locator('//button[normalize-space()="OK"]')
    this.btn_next=this.page.locator('//button[@class="button button-primary button-primary-rfc"]')
    this.txt_charity_category=this.page.locator('//span[@class="dropdown-btn"]//ancestor::component-select[@placeholder="--Select  Charity Category--"]')
    this.drpdwn_charity_category=this.page.locator('//div[normalize-space()="Mini and Mum Care Center"]')
    this.txt_charity=this.page.locator('//span[@class="dropdown-btn"]//ancestor::component-select[@placeholder="--Select  Charity--"]')
    this.drpdwn_charity=this.page.locator('//div[normalize-space()="Stapline Testing"]')
    this.btn_next1=this.page.locator('//component-button[@label="Next"]')
      }

    
    

    // Login to RFC
    
 
    async user_clicks_eventname(){
      await this.playwrightFactory.click(this.btn_eventname);
   
  }
   
  //async user_clicks_eventtype(){
    //await this.playwrightFactory.click(this.btn_10k);
   
   
  //}
  async user_enters_eventname(streventname: string){
      await this.playwrightFactory.click(this.txt_searchbox);
      await this.playwrightFactory.fill(this.txt_searchbox, streventname);
  }
  async user_clicks_search(){
      await this.playwrightFactory.click(this.btn_search);
   
      }
  async user_clicks_view_detail(){
    await this.page.waitForTimeout(3000)    
  await this.playwrightFactory.click(this.btn_viewdetail);    
  }    
  ////verification of event details ///
  async verify_eventname(){
      await expect(this.lbl_eventname).toBeVisible()
  } 
  async verify_availability(){
  await expect(this.lbl_availability).toBeVisible()
  await expect(this.availability_status).toBeVisible()     
  }
  async verify_event_day(){
  await expect(this.lbl_eventday).toBeVisible()
  //await expect(this.eventday_details).toBeVisible()     
  }
  async verify_cost_of_the_event(){
  await expect(this.lbl_cost_of_event).toBeVisible()
  await expect(this.cost_details).toBeVisible()     
  }
  async verify_location(){
  await expect(this.lbl_location).toBeVisible()
  await expect(this.location_details).toBeVisible()     
  }
  async verify_select_distance(){
  await expect(this.btn_select).toBeEnabled()
  await this.playwrightFactory.click(this.btn_select)     
  }
  // async verify_register_button(){
  // await this.playwrightFactory.click(this.btn_register);    
  // }
   
  ///verification of Genaral details page////
  async verify_event_details(){
  await expect(this.event_details).toBeVisible();    
  }
  async verify_email_address(stremail: string){
  await this.playwrightFactory.click(this.txt_email_address)
  await this.playwrightFactory.fill(this.txt_email_address, stremail);
  }
  async verify_suceessmsg_dispaly(){
    await this.playwrightFactory.click(this.btn_successok);
  }
    async verify_next_button(){
  await this.playwrightFactory.click(this.btn_next); 
  }
   
   
   
  async verify_charity_category(){
  await this.playwrightFactory.click(this.txt_charity_category); 
  await this.playwrightFactory.click(this.drpdwn_charity_category);   
  }
  async verify_charity(){
  await this.playwrightFactory.click(this.txt_charity); 
  await this.playwrightFactory.click(this.drpdwn_charity);   
  }
   
   
  async verify_next_button1(){
  await expect(this.btn_next1).toBeVisible();
  await this.playwrightFactory.click(this.btn_next1);    
  }
   
}


