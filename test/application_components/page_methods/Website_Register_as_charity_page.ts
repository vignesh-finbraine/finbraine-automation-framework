import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class website_register_ascharity_page {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly emt_homepage_reporting: Locator;
  readonly link_search_open: Locator;
  
  

  //*Declare *//
readonly As_Charity_btn:Locator;
readonly As_Charity_name_field:Locator;
readonly Charity_registration_number:Locator;
readonly Register_Run_for_charity_paragraph:Locator;
readonly txt_chatagoriesDropdown:Locator;
readonly txt_website:Locator;
readonly emailadress:Locator;
readonly postcode:Locator;

//readonly Select_year:Locator;

readonly Term_and_condition_Lnk:Locator;
readonly Submit_btn:Locator;
readonly Verify_msg:Locator;

readonly charity_address1:Locator;
readonly charity_address2:Locator;
readonly mobile_number:Locator;
readonly Catagory_drpdwn:Locator;
readonly Search_Category:Locator;
readonly Category_Name:Locator;
readonly charity_registration_success_mark:Locator;
readonly Charity_registration_thanku_msg:Locator;
readonly charity_registration_success_message:Locator;
readonly Explore_more_btn:Locator;
readonly Footer_msg:Locator;
readonly contact_name_field:Locator;
readonly Invalid_website_URL_msg:Locator;
readonly Invalid_mobile_number_msg:Locator;









 
 






  
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
    this.As_Charity_btn= this.page.locator("//a[normalize-space()='As Charity']")
    this.As_Charity_name_field= this.page.locator("//input[@placeholder='Enter your Charity Name']")
    this.Charity_registration_number= this.page.locator("//input[@placeholder='Enter Registered Number']")
    this.Register_Run_for_charity_paragraph=this.page.locator("//p[contains(text(),'Run for Charity work with thousands of UK charitie')]")
    this.txt_chatagoriesDropdown = this.page.locator("//*[contains(text(),'Category ')]/ancestor::component-select//span[@class='dropdown-btn']");
    //this.txt_website = this.page.locator("//input[@placeholder='Domain or URL']");
    this.charity_address1 = this.page.locator("#address1")     
    this.charity_address2 = this.page.locator("#address2")  
    this.txt_website = this.page.locator("#website")
    this.postcode = this.page.locator("//*[contains(text(),'Postcode')]/ancestor::component-input//input[@placeholder='Enter postcode']")
    this.mobile_number = this.page.locator("#tel")
    this.Catagory_drpdwn= this.page.locator("//*[contains(text(),'Category ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Search_Category= this.page.locator("//input[@placeholder='Press ENTER to search']")
    this.Category_Name=this.page.locator("//div[contains(text(),'Mini and Mum Care Center')]")
    this.Charity_registration_thanku_msg=this.page.locator("//h3[normalize-space()='Thank you so much for your enquiry!']")
    this.charity_registration_success_mark=this.page.locator("//div[@class='success-icon']")
    this.charity_registration_success_message=this.page.locator("//p[contains(text(),'Your details have been passed to your charity of c')]")
    this.Explore_more_btn=this.page.locator("//a[normalize-space()='Explore More']")
     this.emailadress=this.page.locator("#email")
     this.Footer_msg=this.page.locator("//*[contains(text(), 'ⓒ 2025, Run for Charity') and @class='text-footer']")
   
    this.Term_and_condition_Lnk=this.page.locator("//*[contains(text(),'I accept the Run for Charity ')]/ancestor::component-checkbox//span[@class='checkbox__tick']")
    this.Submit_btn=this.page.locator("//*[contains(text(),'Submit')]")
    this.Verify_msg=this.page.locator ("//*[contains(text(),'Please enter the verification code we sent to you earlier.')]")
    this.contact_name_field=this.page.locator("#contact_name")    
    this.Invalid_website_URL_msg=this.page.locator("//div[contains(text(),'The URL is invalid')]")
    this.Invalid_mobile_number_msg=this.page.locator("//div[contains(text(),'The phone number is invalid')]")
  }
  
  

  
/*********************************************************************************************************************/
  
async user_launches_application() {
  let url = process.env.APP_URL || " https://rfc-staging.sportsmediaagency.com/"
  await this.playwrightFactory.launchApplication(url);
}



async user_verify_emailaddress(){
  await  expect(this.emailadress).toBeVisible
}

  async user_enters_emailaddress(striteration: any){
  let emailaddress=await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
  await this.playwrightFactory.fill(this.emailadress,emailaddress)
}
async user_enters_postcode(striteration: string){
  await this.playwrightFactory.fill(this.postcode,striteration)
}



async user_clicks_female(strgender: string){
  await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strgender+"']"))
}
async user_verify_term_and_condition_link(){
  await expect(this.Term_and_condition_Lnk).toBeVisible
}
async user_clicks_term_and_condition_link(){
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.click(this.Term_and_condition_Lnk) 
}
async user_clicks_submit_btn(){
  await this.playwrightFactory.click(this.Submit_btn) 
}
async user_verify_verify_your_account_msg(){
  await expect(this.Verify_msg).toBeVisible
}
async user_verify_submit_button_diabled(){
      await expect(this.Submit_btn).toBeDisabled
      }


async user_clicks_as_charity_btn(){
  
  await this.playwrightFactory.click(this.As_Charity_btn) 
}
async user_verify_charity_name(){
  await expect(this.As_Charity_name_field).toBeVisible();
}
async user_enter_charity_name(striteration : any){
let username = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
await this.playwrightFactory.fill(this.As_Charity_name_field, username);
}
async user_verify_charity_registration_number(){
  await expect(this.Charity_registration_number).toBeVisible();
}

async user_enter_charity_registration_number(striteration :any){
  let regno= await this.dataFactory.getIterationData(this.container,"NUMBER",striteration);
  await this.playwrightFactory.fill(this.Charity_registration_number,regno)
}

  async user_verify_paragraph_below_register_for_charity(){
    await expect(this.Register_Run_for_charity_paragraph).toBeVisible();
  }

  async user_verify_charity_category_dropdwn(){
    await expect(this.txt_chatagoriesDropdown).toBeVisible();
  }
  async user_verify_charity_website(){
    await expect(this.txt_website).toBeVisible();
  }

  async user_verify_charity_address1_field(){
    await expect(this.charity_address1).toBeVisible();
  }

  async user_enter_charity_address1_field(str: string){
    await this.playwrightFactory.fill(this.charity_address1,str)
    }

    async user_verify_charity_address2_field(){
      await expect(this.charity_address2).toBeVisible();
    }
  
    async user_enter_charity_address2_field(str: string){
      await this.playwrightFactory.fill(this.charity_address2,str)
    }

    async user_enter_website(str: string){
    await this.playwrightFactory.fill(this.txt_website,str)
    }

    async user_enter_charity_postcode(strPostcode: string){
    await this.playwrightFactory.fill(this.postcode, strPostcode)
    }
    
    async user_enter_mobile_number(str: string){
    await this.playwrightFactory.fill(this.mobile_number,str)
    }
    
    async user_select_category(strcategory: string){
    await this.playwrightFactory.click(this.Catagory_drpdwn);
    await this.playwrightFactory.fill(this.Search_Category, strcategory);
    await this.page.waitForTimeout(3000)
    await this.Category_Name.waitFor();
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strcategory+"')]"));
    }
    async user_verify_charity_success_mark(){
      await expect(this.charity_registration_success_mark).toBeVisible();
    }
    async user_verify_charity_success_thanku_msg(){
      await this.page.waitForTimeout(3000)
      await expect(this.Charity_registration_thanku_msg).toBeVisible();
    }
    async user_verify_charity_success_msg(){
      await expect(this.charity_registration_success_message).toBeVisible();
    }

    async user_verify_explore_more_btn(){
      await this.page.waitForTimeout(3000)
      await expect(this.Explore_more_btn).toBeVisible();
    }
    async user_verify_footer_msg(){
      await expect(this.Footer_msg).toBeVisible();
    }
    async user_verify_postcode(){
      await expect(this.postcode).toBeVisible();
    }
    async user_enter_contact_name(strname: string){
      await this.playwrightFactory.fill(this.contact_name_field, strname);

    }
    async user_verify_contact_name(){
      await expect(this.contact_name_field).toBeVisible();
    }
    async user_verify_invalid_website_url(){
      await expect(this.Invalid_website_URL_msg).toBeVisible();
    }

    async user_verify_invalid_mobile_number_msg(){
      await expect(this.Invalid_mobile_number_msg).toBeVisible();
    }







}