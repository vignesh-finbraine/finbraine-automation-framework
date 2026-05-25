import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Home_page {
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
  readonly Profile_icon:Locator;
  readonly Register_btn:Locator;
  readonly Participant_Active:Locator;
  readonly Find_charity_btn:Locator;
  readonly Register_my_charity_btn:Locator;
  readonly Join_the_Run_for_charity_NewsLetter_tittle: Locator;
readonly Sub_Heading_News_letter: Locator;
readonly Select_Catagory_drpdwn: Locator;
readonly email_adress: Locator;
readonly First_name: Locator;
readonly Last_Name: Locator;
readonly News_ltter_subscribe_btn: Locator;
  readonly Success_msg:Locator;








  
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
    this.Profile_icon=this.page.locator("#dropdownMenu")
    this.Register_btn=this.page.locator("//a[normalize-space()='Register']")
    this.Participant_Active=this.page.locator("//div[contains(text(),'Participant · Active')]")                 
    this.Find_charity_btn=this.page.locator("//div[@class='header__item']//div[@title='Find a Charity']")
    this.Register_my_charity_btn=this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Register My Charity')])[1]")

    this.Join_the_Run_for_charity_NewsLetter_tittle= this.page.locator("//*[contains(text(),'Join the Run For Charity Newsletter')]");
    this.Sub_Heading_News_letter= this.page.locator("//*[contains(text(),'Be a Part of the Run for Charity Community')]");
    this.Select_Catagory_drpdwn= this.page.locator("//*[contains(text(),'Select your category')]/ancestor::div//select[@id='mce-group[30622]']");
    this.email_adress= this.page.locator('#mce-EMAIL');
    this.First_name= this.page.locator('#mce-FNAME');
    this.Last_Name= this.page.locator('#mce-LNAME');
    this.News_ltter_subscribe_btn= this.page.locator("//button[@class='button btn-subscribe' and contains(text(), 'Subscribe')]");
    this.Success_msg= this.page.locator("//*[contains(text(),'Thank you for subscribing!')]")
    
  }
  
  

  
/*********************************************************************************************************************/
  
async user_launches_application() {
  let url = process.env.APP_URL || " https://rfc-staging.sportsmediaagency.com/"
  await this.playwrightFactory.launchApplication(url);
}

async user_clicks_profile_icon(){
  await this.Profile_icon.hover();
  
}

async user_clicks_register_btn(){
  await this.playwrightFactory.click(this.Register_btn)
}

async user_verify_participant_active(){
await expect(this.Participant_Active).toBeVisible();
}
async user_hover_find_charity_btn(){
  await this.Find_charity_btn.hover();
  
}
async user_clicks_register_my_charity_btn(){
  await this.playwrightFactory.click(this.Register_my_charity_btn)
}


async user_enter_email(striteration: any){
  let Email = await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
 await this.playwrightFactory.fill(this.email_adress,Email);
}
async user_verify_email_field(){
 await expect(this.email_adress).toBeVisible();
}
async user_verify_first_name_field(){
 await expect(this.First_name).toBeVisible();
}
async user_enter_first_name(striteration: any){
 let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
 await this.playwrightFactory.fill(this.First_name,firstname);
}
async user_verify_last_name(){
 await expect(this.Last_Name).toBeVisible();
}
async user_enter_last_name(strLname: string){
 await this.playwrightFactory.fill(this.Last_Name, strLname);
}
async user_verify_subscribe_btn(){
 await expect(this.News_ltter_subscribe_btn).toBeVisible();
 await expect(this.News_ltter_subscribe_btn).toBeEnabled();
}

async user_verify_newsletter_heading(){
  await this.page.evaluate(() => {
    window.scrollBy(3000, 3500); 
    });
 await expect(this.Join_the_Run_for_charity_NewsLetter_tittle).toBeVisible();
 }
 async user_select_option_from_catagory_drpdwn(){
  await this.Select_Catagory_drpdwn.selectOption({label:'Charity'})

}
async user_clicks_subscribe_btn(){
  await this.playwrightFactory.click(this.News_ltter_subscribe_btn)
 }
 async user_verify_success_msg(){
  await expect(this.Success_msg).toBeVisible();
 }








































}