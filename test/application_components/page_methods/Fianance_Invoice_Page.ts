import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class INVOICE_PAGE{
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

readonly txt_username: Locator;
readonly txt_password: Locator;
readonly btn_login: Locator;
readonly txt_invalid_Username: Locator;
readonly txt_invalid_password: Locator;
readonly wrong_password: Locator;
readonly Login_Logo: Locator;


readonly btn_finance_management: Locator;
  readonly btn_invoices: Locator;
  readonly txt_pressentertosearch: Locator;
  //readonly txt_invoicename: Locator;
readonly btn_download: Locator;
readonly btn_checkbox: Locator;
readonly btn_membership_prices: Locator;
readonly btn_adminlogo: Locator;
readonly btn_charityuserlogo: Locator;
readonly btn_accountmanagerlogo: Locator;
readonly btn_eventmanagerlogo: Locator;
readonly btn_partcipantlogo: Locator;
readonly btn_edit: Locator;
readonly btn_delete: Locator;
readonly btn_ok: Locator;
readonly btn_back: Locator;
readonly btn_partnerpackages: Locator;
readonly btn_cancel: Locator;








  
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
    this.txt_username = this.page.locator('#email');
    this.txt_password = this.page.locator('#password');
    this.btn_login = this.page.locator('.button.button-primary');
    this.txt_invalid_Username= this.page.locator("//*[contains(text(),'The email is invalid')]");
    this.txt_invalid_password= this.page.locator("//*[contains(text(),' The password must be at least 8 characters and include at least a lowercase, uppercase, number, and special character. ')]");
    this.wrong_password= this.page.locator("//*[contains(text(),' The password is incorrect. ')]");
    this.Login_Logo= this.page.locator("//div[@class='h2 entry__title']");
    this.btn_finance_management=this.page.locator('//button[normalize-space()="Finance Management"]')
    this.btn_invoices=this.page.locator('//a[normalize-space()="Invoices"]')
    this.txt_pressentertosearch=this.page.locator('//input[@placeholder="Press ENTER to search"]')
    //this.txt_invoicename=this.page.locator('//div[@class="table__description"]')
    this.btn_download=this.page.locator('(//*[contains(text(),"Invoice for Participant Transfer (Hsw Solicitors) on Behalf of Syed Saleem")]/ancestor::tr//button[@class="table__button d-block primary"])[1]')
     
    this.btn_checkbox=this.page.locator('(//span[@class="checkbox__tick"])[2]')
    this.btn_membership_prices=this.page.locator('//a[normalize-space()="Membership Prices"]')
    this.btn_adminlogo=this.page.locator('//img[@alt="Suraj W"]')
    this.btn_eventmanagerlogo=this.page.locator('//img[@alt="Vaishnavi Dange"]')
    this.btn_charityuserlogo=this.page.locator('//img[@alt="Rutuja Mohite"]')
    this.btn_accountmanagerlogo=this.page.locator('//img[@alt="Ayush T"]')
    this.btn_partcipantlogo=this.page.locator('//img[@alt="Shivani Chauhan"]')
    this.btn_edit=this.page.locator('(//*[contains(text(),"Invoice for Participant Transfer (Hsw Solicitors) on Behalf of Syed Saleem")]/ancestor::tr//button[@class="table__button d-block primary"])[2]') 
    this.btn_delete=this.page.locator('(//*[contains(text(),"Invoice for Participant Transfer (Hsw Solicitors) on Behalf of Syed Saleem")]/ancestor::tr//button[@class="table__button d-block danger"]')
    this.btn_ok=this.page.locator('//button[normalize-space()="OK"]') 
    this.btn_back=this.page.locator('//button[@class="button button-secondary"]')
    this.btn_partnerpackages=this.page.locator('//a[normalize-space()="Partner Packages"]')
    this.btn_cancel=this.page.locator('//button[normalize-space()="Cancel"]')
    }

    
    

    /************************************************************************************************************************************/
    
  
  
  async user_launches_application() {
    let url = process.env.APP_URL || "https://rfc-portal.sportsmediaagency.com/auth/login?returnUrl=%2Fdashboard"
    await this.playwrightFactory.launchApplication(url);
  }

  async user_enter_username(strUsername : string){

    await this.playwrightFactory.fill(this.txt_username,strUsername );
  }
  

  async user_enter_password(strPassword : string){
    await this.playwrightFactory.fill(this.txt_password,strPassword );
    
  }

  async user_click_logingbtn(){
    await this.playwrightFactory.click(this.btn_login);
    await this.page.waitForTimeout(5000);
  }
  async user_validate_error_massage(){
    expect(this.txt_invalid_Username).toBeVisible();
    expect(this.txt_invalid_password).toBeVisible();
    expect(this.txt_invalid_Username).toContainText(' The email is invalid ');
    expect(this.txt_invalid_password).toContainText('The password must be at least 8 characters and include at least a lowercase, uppercase, number, and special character.');
  }
  async user_validate_passworderror_massage(){
    expect(this.wrong_password).toBeVisible();
  }
  async user_validate_loginlogo(){
    await expect(this.Login_Logo).toBeVisible();
  }
  
  async user_selects_financemanagement(){
    await this.playwrightFactory.click(this.btn_finance_management);
  }
  async verify_invoices(){
    await expect(this.btn_invoices).toBeVisible();
    await this.playwrightFactory.click(this.btn_invoices);
  }
  /// verifying download functionality in invoices///
  async user_enter_Invoice_searchbox(strname: string){
    await this.playwrightFactory.click(this.txt_pressentertosearch);
    await this.playwrightFactory.fill(this.txt_pressentertosearch,strname);
     await this.page.keyboard.press('Enter');
  }
  async user_click_download(){
    await this.playwrightFactory.click(this.btn_checkbox);
    await this.page.hover
    await this.playwrightFactory.click(this.btn_download);
  }
  // ////verifying edit functionality in Invoices///
  // async user_click_edit(){
  // await this.playwrightFactory.click(this.btn_edit); 
  // await this.playwrightFactory.click(this.btn_back) 
  // } 
  // ///verifying delete functionality in Invoices///
  // async user_click_delete(){
  // await this.playwrightFactory.click(this.btn_delete)
  // await this.playwrightFactory.click(this.btn_ok)  
  //  await this.playwrightFactory.click(this.btn_cancel)
   
  // }
  ///verifying Account manager access in Finance module////
  async account_manager_selects_finace_management(){
  await this.playwrightFactory.click(this.btn_finance_management);
   
  }
   
  async account_manager_selects_invoices(){
  await this.playwrightFactory.click(this.btn_invoices); 
  }
  //async accountmanager_enter_Invoice_searchbox(strname: string){
  // await this.playwrightFactory.click(this.txt_pressentertosearch);
    //await this.playwrightFactory.fill(this.txt_pressentertosearch,strname);
    // await this.page.keyboard.press('Enter');
  //}
  // async accountmanager_click_download(){
  //   await this.playwrightFactory.click(this.btn_checkbox);
  //   await this.page.hover
  //   await this.playwrightFactory.click(this.btn_download);
  // }
  ////verifying charityuser access////
  async charity_user_selects_financemanagement(){
    await this.playwrightFactory.click(this.btn_finance_management);
   
  }
  async charity_user_selects_partnerpackages(){
    await expect(this.btn_partnerpackages).toBeVisible()
  } 
  

 

 




}


