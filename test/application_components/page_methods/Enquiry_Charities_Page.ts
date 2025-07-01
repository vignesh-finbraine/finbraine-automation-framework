import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class ENQUIRY_CHARITIES {
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



  readonly Enquiry_Management_btn:Locator;
  readonly Enquiry_charity_btn:Locator;
 readonly Charity_Enquiry_heading:Locator;
 readonly Create_btn:Locator;
 readonly charity_enquiry_name_field:Locator;
readonly charity_enquiry_charity_field:Locator;
readonly charity_enquiry_category_field:Locator;
readonly charity_enquiry_email_field:Locator;
readonly charity_enquiry_phone_field:Locator;
readonly charity_enquiry_state_field:Locator;
readonly charity_enquiry_Issued_At_field:Locator;
readonly charity_enquiry_contacted_field:Locator;
readonly charity_enquiry_converted_field:Locator;
readonly Existing_Search_name:Locator;
readonly charity_enquiry_Edit_btn:Locator;
readonly charity_enquiry_Delete_btn:Locator;
readonly Export_btn:Locator;
readonly Mail_send_msg:Locator;
readonly Filter_btn:Locator;
readonly Filter_enquires_category:Locator;
readonly Filter_enquires_delete_field:Locator;
readonly Filter_enquires_contacted_field:Locator;
readonly Filter_enquires_converted_field:Locator;
readonly Filter_enquires_year_field:Locator;
readonly Filter_enquires_month_field:Locator;
readonly Filter_enquires_apply_btn:Locator;
readonly btn_Search_Charity_Bar:Locator;
 
 















  
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
     this.Enquiry_Management_btn=this.page.locator("//button[normalize-space()='Enquiry Management']")
    this.Enquiry_charity_btn=this.page.locator("//a[@href='/enquiries/charity'][normalize-space()='Charities']")
    this.Charity_Enquiry_heading=this.page.locator("//div[normalize-space()='Charity Enquiries']")
    this.Create_btn=this.page.locator("//span[normalize-space()='Create']")
    this.Existing_Search_name=this.page.locator("(//td[@class='table__col'])[1]")
                             
    this.charity_enquiry_name_field=this.page.locator("//th[normalize-space()='Name']")
    this.charity_enquiry_charity_field=this.page.locator("//th[normalize-space()='Charity']")
    this.charity_enquiry_category_field=this.page.locator("//th[normalize-space()='Category']")
    this.charity_enquiry_email_field=this.page.locator("//th[normalize-space()='Email']")
    this.charity_enquiry_phone_field=this.page.locator("//th[normalize-space()='Phone']")
    this.charity_enquiry_state_field=this.page.locator("//th[normalize-space()='State']")
    this.charity_enquiry_Issued_At_field=this.page.locator("//th[normalize-space()='Issued At']")
    this.charity_enquiry_Issued_At_field=this.page.locator("(//*[contains(text(),'Contacted:')])[1]")
    this.charity_enquiry_contacted_field=this.page.locator("(//*[contains(text(),'Contacted:')])[1]")
    this.charity_enquiry_converted_field=this.page.locator("(//*[contains(text(),'Converted')])[1]")
    this.charity_enquiry_Edit_btn=this.page.locator("(//button[@class='table__button primary d-block'])[1]")
    this.charity_enquiry_Delete_btn=this.page.locator(" (//button[@class='table__button danger d-block'])[1]")
    this.Export_btn=this.page.locator("//component-button[@classname='button button-tertiary']//button")
    this.Mail_send_msg=this.page.locator("//div[normalize-space()='Mail Send Successfully']")
    this.Filter_btn=this.page.locator("//span[normalize-space()='Filter']")
    this.Filter_enquires_category=this.page.locator("//*[contains(text(),'Category ')]/ancestor::component-select//div[@class='multiselect-dropdown']")
    this.Filter_enquires_delete_field=this.page.locator("//*[contains(text(),'Deleted ')]/ancestor::component-select//div[@class='multiselect-dropdown']")
    this.Filter_enquires_contacted_field=this.page.locator("//*[contains(text(),'Contacted ')]/ancestor::component-select//span[@class='dropdown-multiselect__caret']")
    this.Filter_enquires_converted_field=this.page.locator("//*[contains(text(),'Converted ')]/ancestor::component-select//div[@class='multiselect-dropdown']")
    this.Filter_enquires_year_field=this.page.locator("//*[contains(text(),'Year ')]/ancestor::component-select//span[@class='dropdown-multiselect__caret']")
    this.Filter_enquires_month_field=this.page.locator("//*[contains(text(),'Month ')]/ancestor::component-select//span[@class='dropdown-multiselect__caret']")
    this.Filter_enquires_apply_btn=this.page.locator("//component-button[@label='Apply']//span[contains(text(),'Apply')]")
     this.btn_Search_Charity_Bar=this.page.locator("//input[@placeholder='Press ENTER to search']")
    
   
    
    









  
    
  }
  

  
//Methods
async user_verify_charity_enquiry_heading(){
  await expect(this.Charity_Enquiry_heading).toBeVisible();
}
async user_verify_and_click_create_btn(){
  await expect(this.Create_btn).toBeVisible();
  await this.playwrightFactory.click(this.Create_btn)
}
 
async user_verify_charity_enquiry_homepage_name_field(){
  await expect(this.charity_enquiry_name_field).toBeVisible();
}
 
async user_verify_charity_enquiry_homepage_charity_field(){
  await expect(this.charity_enquiry_charity_field).toBeVisible();
}
async user_verify_charity_enquiry_homepage_category_field(){
  await expect(this.charity_enquiry_category_field).toBeVisible();
}
async user_verify_charity_enquiry_homepage_email_field(){
  await expect(this.charity_enquiry_email_field).toBeVisible();
}
async user_verify_charity_enquiry_homepage_phone_field(){
  await expect(this.charity_enquiry_phone_field).toBeVisible();
}                      
async user_verify_charity_enquiry_homepage_state_field(){
  await expect(this.charity_enquiry_state_field).toBeVisible();
}                      
async user_verify_charity_enquiry_homepage_IssuedAt_field(){
  await expect(this.charity_enquiry_Issued_At_field).toBeVisible();
}                      
async user_verify_charity_enquiry_homepage_contacted_field(){
  await expect(this.charity_enquiry_contacted_field).toBeVisible();
}
async user_verify_charity_enquiry_homepage_converted_field(){
  await expect(this.charity_enquiry_converted_field).toBeVisible();
}
 
async user_verify_existing_search_name(){
 
  await expect(this.Existing_Search_name).toBeVisible();
 
}
async user_clicks_editbtn(){
await this.page.waitForTimeout(3000)
await this.Existing_Search_name.hover();
await this.charity_enquiry_Edit_btn.hover();
await this.page.waitForTimeout(3000)
 
await this.playwrightFactory.click(this.charity_enquiry_Edit_btn)
 
}
async user_clicks_deletebtn(){
  await this.page.waitForTimeout(3000)
  await this.Existing_Search_name.hover();
  await this.charity_enquiry_Delete_btn.hover();
  await this.page.waitForTimeout(3000)
 
  await this.playwrightFactory.click(this.charity_enquiry_Delete_btn)
 
  }
  async user_verify_exportbtn(){
    await expect(this.Export_btn).toBeVisible();
  }
  async user_clicks_exportbtn(){
    await this.playwrightFactory.click(this.Export_btn)
    await expect(this.Mail_send_msg).toBeVisible();
  }
  async user_clicks_filterbtn(){
    await this.playwrightFactory.click(this.Filter_btn)
  }
  async user_verify_filter_category(){
    await expect(this.Filter_enquires_category).toBeVisible();
  }
  async user_verify_filter_deleted_field(){
    await expect(this.Filter_enquires_delete_field).toBeVisible();
  }
  async user_verify_filter_contacted_field(){
    await expect(this.Filter_enquires_contacted_field).toBeVisible();
  }
  async user_verify_filter_converted_field(){
    await expect(this.Filter_enquires_converted_field).toBeVisible();
  }
  async user_verify_filter_year_field(){
    await expect(this.Filter_enquires_year_field).toBeVisible();
  }
  async user_verify_filter_month_field(){
    await expect(this.Filter_enquires_month_field).toBeVisible();
  }
  async user_verify_filter_apply_btn(){
    await expect(this.Filter_enquires_apply_btn).toBeVisible();
  }
  async user_enters_created_enquiry_charityname(striteration: any) {
  let abc= await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
  await this.page.waitForTimeout(5000);
  await this.playwrightFactory.fill(this.btn_Search_Charity_Bar,abc);
  await this.page.keyboard.press('Enter');
  await this.page.waitForTimeout(3000);
}

 
  

  




}


