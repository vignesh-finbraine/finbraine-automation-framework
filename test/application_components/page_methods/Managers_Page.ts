import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class MANAGER_PAGE {
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

readonly Manager_List: Locator;
//readonly Manager_Name: Locator;
readonly Manager_Email: Locator;
readonly Charities: Locator;
readonly Action: Locator;
readonly Manager_SearchBar: Locator;
readonly Item_Per_Page: Locator;
readonly Select_Specific_Page: Locator;
readonly Previous_btn: Locator;
readonly Next_btn: Locator;
readonly Page_Number: Locator;
//readonly Five_Page: Locator;
readonly View_Charities_btn: Locator;
readonly Charities_Tittle: Locator;
readonly lbl_accountmanagers: Locator;
readonly btn_viewcharities: Locator;
    readonly col_charityname: Locator;
   
    readonly col_charitycategory: Locator;
    readonly col_charityaction: Locator;
    readonly btn_edit: Locator;













  
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

    this.Manager_List= this.page.locator("//table[@class='table table-borderless local-table']");
   // this.Manager_Name= this.page.locator("//*[contains(text(),' Suraj W ')]");
    this.Manager_Email= this.page.locator("//*[contains(text(),' suraj.testtemp@gmail.com ')]");
    this.Charities= this.page.locator("//div[text()='Account Managers']/ancestor::component-table//td[normalize-space()='Suraj W']/ancestor::tr[1]/td[3]");
    this.Action= this.page.locator("//div[text()='Account Managers']/ancestor::component-table//td[normalize-space()='Suraj W']/ancestor::tr[1]/td[4]");
    this.Manager_SearchBar= this.page.locator("//input[@placeholder='Press ENTER to search']");
    this.Item_Per_Page= this.page.locator("//*[contains(text(),'Items per page:')]/ancestor::pagination-template//span[@class='dropdown-multiselect__caret']");
    this.Select_Specific_Page= this.page.locator("//input[@type='number']");
    this.Previous_btn= this.page.locator("//component-button[@centericon='assets/icons/chevron_backward-light.svg']//button");
    this.Next_btn= this.page.locator("//*[contains(text(),'Page')]/ancestor::div//component-button[@centericon='assets/icons/chevron_forward-light.svg']")
    this.Page_Number= this.page.locator("//component-pagination[@position='center']//div[3]//div[1]//span[1]");
    //this.Five_Page= this.page.locator("//*[contains(text(),' 5 ')]/ancestor::li");
    this.View_Charities_btn= this.page.locator("//div[text()='Account Managers']/ancestor::component-table//td[normalize-space()='Suraj W']/ancestor::tr[1]/td[4]");
    this.Charities_Tittle= this.page.locator("//*[contains(text(),'Charities')]/ancestor::component-table//div[@class='title-purple card__title']");
    this.lbl_accountmanagers=this.page.locator('text="Account Managers"');
    this.btn_viewcharities=this.page.locator("//div[text()='Account Managers']/ancestor::component-table//td[normalize-space()='Suraj W']/ancestor::tr[1]/td[4]");
this.col_charityname=this.page.locator('//th[normalize-space()="Name"]');
this.col_charitycategory=this.page.locator('//th[normalize-space()="Category"]');
this.col_charityaction=this.page.locator('//th[normalize-space()="Action"]');
this.btn_edit=this.page.locator("(//button[@class='button button-primary min-width-auto'])[1]")
 
  
    









  
    
  }
  

  async user_verify_manager_list(){
    await expect(this.Manager_List).toBeVisible();
  }
  async user_verify_name_email_charities_action_btn(strManager: string){
    await expect(this.page.locator("//*[contains(text(),'"+strManager+"')]")).toBeVisible();
    await expect(this.Manager_Email).toBeVisible();
    await expect(this.Charities).toBeVisible();
    await expect(this.Action).toBeVisible();
  }
  async user_search_manager(strSearchManager: string){
    await this.playwrightFactory.fill(this.Manager_SearchBar, strSearchManager);
    await this.page.keyboard.press('Enter');

  }
  async user_verify_search_result(strManager: string){
    await this.page.locator("//*[contains(text(),'"+strManager+"')]").waitFor();
    await expect(this.page.locator("//*[contains(text(),'"+strManager+"')]")).toBeVisible();
  }
  async user_sees_pagination(){
    await expect(this.Item_Per_Page).toBeVisible();
    await expect(this.Select_Specific_Page).toBeVisible();
    await expect(this.Previous_btn).toBeVisible();
    await expect(this.Next_btn).toBeVisible();
  }
  async user_select_item_per_page(strPagenumber: string){
    await this.playwrightFactory.click(this.Item_Per_Page);
    await this.playwrightFactory.clickForce(this.page.locator("(//*[contains(text(),'Items per page:')]/parent::div//*[contains(@type,'checkbox') and contains(@aria-label,'"+strPagenumber+"')])[1]"));
    await this.page.waitForTimeout(3000);
  }
  async user_select_specific_page(strPage: string){
    await this.Select_Specific_Page.clear();
    await this.playwrightFactory.fill(this.Select_Specific_Page, strPage);
    await this.page.waitForTimeout(3000);
    await expect(this.Page_Number).toContainText('2');
  }
  async user_navigate_forward_backward(){
    await this.playwrightFactory.click(this.Previous_btn);
    await this.page.waitForTimeout(3000);
    await expect(this.Page_Number).toContainText('1');
    await this.playwrightFactory.click(this.Next_btn);
    await this.page.waitForTimeout(3000);
    await expect(this.Page_Number).toContainText('2');

  }
  async user_sees_view_charities_btn(){
    await expect(this.View_Charities_btn).toBeVisible();
    await this.View_Charities_btn.hover();
  }
  async user_clicks_view_charities_btn(){
    await this.playwrightFactory.click(this.View_Charities_btn);
    await this.Charities_Tittle.waitFor();
    await expect(this.Charities_Tittle).toBeVisible();
  }
  async verify_account_managers(){
await expect (this.lbl_accountmanagers).toBeVisible()
}
async verify_view_charities(){
await expect (this.btn_viewcharities).toBeEnabled();
await expect (this.btn_viewcharities).toBeVisible();
await this.playwrightFactory.click(this.btn_viewcharities);
}
async verify_viewcharities_page(){
await expect(this.col_charityname).toBeVisible();
 
//await expect(this.col_charitycategory).toBeVisible();
await expect(this.col_charityaction).toBeVisible();
}
async verify_edit_btn(){
await expect(this.btn_edit).toBeVisible();
await this.playwrightFactory.click(this.btn_edit);
}

  




}


