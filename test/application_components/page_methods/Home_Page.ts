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
readonly Dashboard: Locator;
readonly Website: Locator;
readonly External: Locator;
readonly Renewals: Locator;
readonly Finance_Mnagement: Locator;
readonly Invoice_tab: Locator;
readonly Partner_Packages: Locator;
readonly Event_Hub: Locator;
readonly Roll_drpdwn: Locator;
readonly Roll_AccountManager: Locator;
readonly Switch_Roll_btn: Locator;
readonly Roll_Admin: Locator;
readonly drpdwn_User_Role: Locator;
readonly txt_Account_Manager_Role: Locator;
readonly txt_Participant_Role_Dashboard: Locator;
readonly txt_Participant_Role_My_Profile: Locator;
readonly txt_Participant_Role_My_Events: Locator;
readonly txt_Participant_Role_Entries: Locator;
readonly txt_Participant_Role_Book_Events: Locator;
readonly txt_Participant_Role_Support: Locator;
readonly link_Administrator_Active_Role: Locator;
readonly txt_Switch_Role: Locator;
readonly txt_Account_Manager_Active_Role: Locator;
readonly txt_Administrator: Locator;
 
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
    this.Event_Photo_Vedios= this.page.locator("//*[contains(text(),'Marketing Management')]/ancestor::component-sidebar//a[@title='Events(Photos, Videos)']");
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
    this.Dashboard=this.page.locator("//*[contains(text(),' Dashboard ')]"); 
    this.Website= this.page.locator("//*[contains(text(),'Website ')]");
    this.External= this.page.locator("//*[contains(text(),'External ')]");
    this.Renewals= this.page.locator("//*[contains(text(),'Renewals') and @class='sidebar__link']");
    this.Finance_Mnagement= this.page.locator("//*[contains(text(),'Finance Management') and @class='sidebar__head']");
    this.Invoice_tab= this.page.locator("//*[contains(text(),'Invoices') and @class='sidebar__link']")
    this.Partner_Packages= this.page.locator("//*[contains(text(),'Partner Packages') and @class='sidebar__link']")
    this.Event_Hub= this.page.locator("//*[contains(text(),'Event Hub Pages') and @class='sidebar__link']")
    this.Roll_drpdwn= this.page.locator("(//span[@class='dropdown-btn']/ancestor::ng-multiselect-dropdown)[1]");
    this.Roll_AccountManager= this.page.locator("//*[contains(text(),'AccountManager')]");
    this.Switch_Roll_btn= this.page.locator("//*[contains(text(),'Switch Role')]/ancestor::component-button");
    this.Roll_Admin= this.page.locator("//*[contains(text(),'Administrator')]");
    this.drpdwn_User_Role=this.page.locator("(//*[contains(text(),'Administrator · Active ')])[1]")
    this.txt_Account_Manager_Role=this.page.locator("//*[contains(text(),' AccountManager ')]")
    this.txt_Participant_Role_Dashboard=this.page.locator("//*[contains(text(),' Dashboard ')]/ancestor::component-sidebar//a[@class='sidebar__item router-link-active']")
    this.txt_Participant_Role_My_Profile=this.page.locator("(//*[contains(text(),' My Profile ')])[2]")
    this.txt_Participant_Role_My_Events=this.page.locator("//*[contains(text(),' My Events ')]")
    this.txt_Participant_Role_Entries=this.page.locator("(//*[contains(text(),' Entries ')]/ancestor::component-sidebar//a[@class='sidebar__item'])[3]")
    this.txt_Participant_Role_Book_Events=this.page.locator("//*[contains(text(),' Book Events ')]")
    this.txt_Participant_Role_Support=this.page.locator("//a[@class='sidebar__item'][normalize-space()='Support']")
    this.link_Administrator_Active_Role=this.page.locator("(//ng-multiselect-dropdown[@class='multi-select ng-untouched ng-valid ng-dirty']/ancestor::component-sidebar//div[@class='multiselect-dropdown'])[1]")
    this.txt_Switch_Role=this.page.locator("//*[contains(text(),'Switch Role')]")
    this.txt_Account_Manager_Active_Role=this.page.locator("(//ng-multiselect-dropdown[@class='multi-select ng-untouched ng-valid ng-dirty']/ancestor::component-sidebar//div[@class='multiselect-dropdown'])[1]")
    this.txt_Administrator=this.page.locator("//*[contains(text(),' Administrator')]")

  }
  

  
//******** Methods**********************/
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
  await this.page.waitForTimeout(5000);
  await this.playwrightFactory.click(this.Marketing_Management);
}
async user_click_event_photo_vedio(){
  await this.page.waitForTimeout(2000);
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
async user_verify_dashboard_tab(){
  await expect(this.Dashboard).toBeVisible();
}
async user_click_external_tab(){
  await this.playwrightFactory.click(this.External);
}
async user_click_website_tab(){
  await this.playwrightFactory.click(this.Website);
}
async user_click_renewals_tab(){
  await this.playwrightFactory.click(this.Renewals);
}
async user_click_contract_tab(){
  await this.playwrightFactory.click(this.lnk_contract);
}
async user_click_finance_management(){
  await this.playwrightFactory.click(this.Finance_Mnagement);
}
async user_click_invoce_tab(){
  await this.playwrightFactory.click(this.Invoice_tab);
}
async user_click_partner_packages(){
  await this.playwrightFactory.click(this.Partner_Packages);
}
async user_click_event_hub(){
  await this.playwrightFactory.click(this.Event_Hub);
}
async user_switch_roll_to_account_manger(){
await this.playwrightFactory.click(this.Roll_drpdwn);
await this.playwrightFactory.click(this.Roll_AccountManager);
await this.playwrightFactory.click(this.Switch_Roll_btn);
await this.page.waitForTimeout(3000);
}
async user_switch_roll_to_admin(){
await this.playwrightFactory.click(this.Roll_drpdwn); 
await this.playwrightFactory.click(this.Roll_Admin);
await this.playwrightFactory.click(this.Switch_Roll_btn);
}
async user_Verify_Account_Manager_has_no_access_to_Marketing_Management_Module(){
  await expect (this.Marketing_Management).not.toBeVisible();

}

async user_Verify_Event_Manager_has_no_access_to_Marketing_Management_Module(){
  await expect (this.Marketing_Management).not.toBeVisible();
}
 
async user_Verify_Charity_user_can_view_the_listing_of_the_created_marketing_folders(){
 
  await expect (this.Marketing_Management).toBeVisible();
  await this.playwrightFactory.click(this.Marketing_Management);
  await this.playwrightFactory.click(this.Event_Photo_Vedios);
 
}
 
async user_Verify_Participant_can_not_access_marketing_management(){
  await expect (this.Marketing_Management).not.toBeVisible();
}


async user_verify_charity_management(){

  await expect(this.element_CharityManagement).toBeVisible();

}
async user_click_partner_charity_history(){
  await this.playwrightFactory.click(this.lnk_partner_charity_history);
}

async user_click_contract(){

  await this.playwrightFactory.click(this.lnk_contract);

}
 
async user_verify_user_role(){
  await expect(this.drpdwn_User_Role).toBeVisible();
}
async user_verify_account_manager_role(){
  await expect(this.txt_Account_Manager_Role).toBeVisible();
}
 
async user_verify_charity_management_not_present(){
    await expect(this.element_CharityManagement).toBeHidden();
  }
 
  async user_verify_participant_role_dashboard(){
  await expect(this.txt_Participant_Role_Dashboard).toBeVisible();
}
 
async user_verify_participant_role_my_profile(){
  await expect(this.txt_Participant_Role_My_Profile).toBeVisible();
}
 
async user_verify_participant_role_my_events(){
  await expect(this.txt_Participant_Role_My_Events).toBeVisible();
  await this.page.waitForTimeout(3000);
}
 
async user_verify_participant_role_entries(){
  await expect(this.txt_Participant_Role_Entries).toBeVisible();
}
 
async user_verify_participant_role_book_events(){
  await expect(this.txt_Participant_Role_Book_Events).toBeVisible();
}
 
 
async user_verify_participant_role_support(){
  await expect(this.txt_Participant_Role_Support).toBeVisible();
}
 
async user_verify_administrator_active_role(){
  await expect(this.link_Administrator_Active_Role).toBeVisible();
}
 
async user_clicks_administrator_active_role(){
  await this.playwrightFactory.click(this.link_Administrator_Active_Role);
}
 
async user_clicks_account_manager_role(){
  await this.playwrightFactory.click(this.txt_Account_Manager_Role);
}
 
async user_verify_switch_role(){
  await expect(this.txt_Switch_Role).toBeVisible();
}
 
async user_clicks_switch_role(){
  await this.playwrightFactory.click(this.txt_Switch_Role);
}
 
async user_click_account_manager_active_role(){
  await this.playwrightFactory.click(this.txt_Account_Manager_Active_Role);
}
 
async user_clicks_administrator(){
  await this.playwrightFactory.click(this.txt_Administrator);
}

}


