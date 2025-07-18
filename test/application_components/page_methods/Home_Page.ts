import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class HOME_PAGE {
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


readonly element_CharityManagement: Locator;
readonly element_charities: Locator;
readonly element_EventManagement: Locator;
readonly element_event: Locator;
readonly element_Managers: Locator;
readonly Marketing_Management: Locator;
readonly Event_Photo_Vedios: Locator;
readonly Tutorial: Locator;
readonly Content_Management: Locator;
readonly Registration: Locator;
readonly Landing_Page: Locator;
readonly link_participants:Locator;
readonly lnk_partner_charity_history: Locator;
    readonly lnk_charity_users: Locator;
    readonly lnk_contract: Locator;
    readonly lnk_timeline: Locator;
    readonly Enquiry_Management_btn:Locator;
  readonly Enquiry_charity_btn:Locator;
  readonly Partner_Events_btn:Locator;

  readonly Account_Managament: Locator;
  readonly Users: Locator;
   readonly Users_Table:Locator;












  
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
    this.element_CharityManagement = this.page.locator("//*[contains(text(),' Charity Management ')]");
    this.element_charities = this.page.locator("//div[@title='Charity Management']//div//a[@title='Charities']");
    this.element_EventManagement= this.page.locator("//div[@title='Event Management']//div//button");
    this.element_event= this.page.locator("//div[@title='Event Management']//div//a[@title='Events']");
    this.element_Managers= this.page.locator("//*[contains(text(),' Managers ')]");
    this.Marketing_Management= this.page.locator("//*[contains(text(),' Marketing Management ')]");
    this.Event_Photo_Vedios= this.page.locator("//*[contains(text(),' Marketing Management ')]/ancestor::component-sidebar//a[@title='Events(Photos, Videos)']");
    this.Tutorial= this.page.locator("//*[contains(text(),' Marketing Management ')]/ancestor::component-sidebar//a[@title='Tutorials(Explanatory Videos)']");
    this.Content_Management= this.page.locator("//*[contains(text(),' Content Management ')]");
    this.Registration= this.page.locator("//*[contains(text(),' Registration Pages ')]");
    this.Landing_Page= this.page.locator("//*[contains(text(),' Landing Pages ')]");
    this.link_participants=this.page.locator('//a[normalize-space()="Participants"]');
    this.lnk_partner_charity_history=this.page.locator("//*[contains(text(),' Charity Management ')]/ancestor::component-sidebar//a[@title='Partner Charity History']")
    this.lnk_charity_users=this.page.locator("//*[contains(text(),' Charity Management ')]/ancestor::component-sidebar//a[@title='Charity Users']")
   this.lnk_timeline=this.page.locator("//*[contains(text(),' Charity Management ')]/ancestor::component-sidebar//a[@title='Timeline']")
   this.lnk_contract=this.page.locator("//*[contains(text(),' Charity Management ')]/ancestor::component-sidebar//a[@title='Contract']")
   this.Enquiry_Management_btn=this.page.locator("//button[normalize-space()='Enquiry Management']")
    this.Enquiry_charity_btn=this.page.locator("//a[@href='/enquiries/charity'][normalize-space()='Charities']")
   
    this.Partner_Events_btn=this.page.locator("//a[normalize-space()='Partner Events']")
    this.Account_Managament= this.page.locator("//*[contains(text(),' Account Management ')]");
    this.Users= this.page.locator("//div[@title='Account Management']//div//a[@title='Users']");
    this.Users_Table= this.page.locator("//*[contains(text(),'Users')]/ancestor::component-table//table")
    









  
    
  }
  

  
// Create Category- Flow
  async user_waituntil_charitymanagementvisible(){
    await this.element_CharityManagement.waitFor();
  }
  async user_click_charities(){
    await this.playwrightFactory.click(this.element_charities);
  

  }
  async user_click_eventmanagement(){
  await this.playwrightFactory.click(this.element_EventManagement);
}

async user_click_event(){
  await this.playwrightFactory.click(this.element_event);
}
async user_click_managers(){
  await this.playwrightFactory.click(this.element_Managers);
}
async user_click_marketing_management(){
  await this.playwrightFactory.click(this.Marketing_Management);
}
async user_click_event_photo_vedio(){
  await this.playwrightFactory.click(this.Event_Photo_Vedios);
}
async user_click_tutorials(){
  await this.playwrightFactory.click(this.Tutorial);
}
async user_click_content_management(){
  await this.playwrightFactory.click(this.Content_Management);
}
async user_click_registration_pages(){
  await this.playwrightFactory.click(this.Registration);
}
async user_click_landing_page(){
  await this.playwrightFactory.click(this.Landing_Page);
}
async user_click_charity_management(){
  await this.playwrightFactory.click(this.element_CharityManagement);
}
async user_clicks_participant(){
    await expect (this.link_participants).toBeVisible();
    await this.playwrightFactory.click(this.link_participants);
  }
  async verify_managers(){
await expect (this.element_Managers).toBeVisible();
}
async verify_charities(){
await expect(this.element_charities).toBeVisible();
}
async verify_partner_charity_history(){
await expect(this.lnk_partner_charity_history).toBeVisible();
}
async verify_charity_users(){
await expect(this.lnk_charity_users).toBeVisible();
}
async verify_contract(){
await expect(this.lnk_contract).toBeVisible();
}
async user_clicks_enquiry_management_btn(){
  await this.playwrightFactory.click(this.Enquiry_Management_btn)
}
 
async user_verify_and_clicks_enquiry_charity_btn(){
  await expect(this.Enquiry_charity_btn).toBeVisible();
  await this.page.waitForTimeout(3000)
  await this.playwrightFactory.click(this.Enquiry_charity_btn)
}
async user_clicks_partner_events_btn(){
  await this.playwrightFactory.click(this.Partner_Events_btn)
}

async user_click_account_management(){
  await this.playwrightFactory.click(this.Account_Managament);
}
async user_verify_users_tab(){
  await expect(this.Users).toBeVisible();
}
async user_click_user_tab(){
  await this.playwrightFactory.click(this.Users);
}
async user_verify_users_table(){
  await expect(this.Users_Table).toBeVisible();
}



}


