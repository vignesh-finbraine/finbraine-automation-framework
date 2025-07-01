import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class TUTORIALS_PAGE {
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
readonly Tutorials_Tittle: Locator;
readonly Column_Tittle: Locator;
readonly Column_Platform: Locator;
readonly Column_Action: Locator;
readonly Tutorial_Search_Bar: Locator;
//readonly Tutorial_Name: Locator;
readonly txt_instructions: Locator;
readonly btn_save: Locator;

readonly btn_delete: Locator;
readonly dbox_delete: Locator;
readonly btn_deleteok: Locator;
readonly btn_successdeleteok: Locator
 

readonly btn_filter: Locator;
readonly txt_platform_filter: Locator;
//readonly ddl_platform_filter: Locator;
readonly btn_apply: Locator;
//readonly btn_runthroughhub: Locator;

readonly btn_edit: Locator;
readonly txt_paltform_edit: Locator;
readonly ddl_platform_edit: Locator;
readonly btn_update: Locator;
readonly dbox_edit: Locator;
readonly btn_editok: Locator;
readonly txt_searchbox: Locator;
readonly ddl_itpage: Locator;
//readonly ddl_itpp: Locator;
readonly txt_ssp: Locator;
readonly btn_nextpage: Locator;
readonly btn_previouspage: Locator;
 
readonly btn_ok: Locator;













  
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
    this.Tutorials_Tittle= this.page.locator("//*[contains(text(),' Tutorials ')]");
    this.Column_Tittle= this.page.locator("//*[contains(text(),'Title')]");
    this.Column_Platform= this.page.locator("//*[contains(text(),'Platform')]");
    this.Column_Action= this.page.locator("//*[contains(text(),'Tutorials')]/ancestor::component-table//*[contains(text(),'Action')]/ancestor::tr[1]/th[3]");
    this.Tutorial_Search_Bar= this.page.locator("//input[@placeholder='Press ENTER to search']");
   // this.Tutorial_Name= this.page.locator("//div[@class='table__details']");
    this.txt_instructions=this.page.locator('iframe[title="Rich Text Area"]').contentFrame().getByRole('paragraph'),
 this.btn_save=this.page.locator('//component-button[@label="Save"]');
 this.btn_delete=this.page.locator('(//span[contains(text(),"Delete")])[1]')
 this.ddl_itpage=this.page.locator('//*[contains(text(), "Items per page:")]/ancestor::pagination-template//*[@class="dropdown-btn"]')
 
this.btn_edit=this.page.locator('(//div[contains(text(),"Automation Charity")])[1]')
this.btn_filter=this.page.locator('//span[normalize-space()="Filter"]');
this.txt_platform_filter=this.page.locator('//span[contains(text(),"Please select")]')
//this.ddl_platform_filter=this.page.locator('//div[normalize-space()="Run For Charity"]');
this.btn_apply=this.page.locator('//span[normalize-space()="Apply"]');
this.dbox_delete=this.page.locator("//*[contains(text(),'You want to delete this tutorial.')]");
this.btn_deleteok=this.page.locator('//button[normalize-space()="OK"]');
this.btn_successdeleteok=this.page.locator('//button[normalize-space()="OK"]')
//this.btn_runthroughhub=this.page.locator('//form//li[3]//div[1]');
this.btn_update=this.page.locator('//component-button[@label="Update"]');
//this.ddl_itpp=this.page.locator('//component-pagination[@position="center"]//li[1]//div[1]');
this.txt_ssp=this.page.locator('//input[@type="number"]');
this.btn_nextpage=this.page.locator("//*[contains(text(),'Page')]/ancestor::div//component-button[@centericon='assets/icons/chevron_forward-light.svg']");
this.btn_previouspage=this.page.locator("//component-button[@centericon='assets/icons/chevron_backward-light.svg']//button");
this.btn_ok=this.page.locator("//div[@class='swal-modal']//*[contains(text(),'OK')]");
this.txt_paltform_edit=this.page.locator("//*[contains(text(),'Platform ')]/ancestor::component-select//span[@class='dropdown-btn']");
this.ddl_platform_edit=this.page.locator('//div[normalize-space()="All"]');
this.dbox_edit=this.page.locator('//div[@role="dialog"]');
this.btn_editok=this.page.locator('//button[normalize-space()="OK"]');
this.txt_searchbox=this.page.locator('//input[@placeholder="Press ENTER to search"]')
    
    
    
 }
  
 async user_verify_tutorials_tittle(){
  await this.Tutorials_Tittle.waitFor();
  await expect(this.Tutorials_Tittle).toBeVisible()
 } 
 async user_verify_action_platform_tittle_coloumn(){
  await expect(this.Column_Tittle).toBeVisible();
  await expect(this.Column_Platform).toBeVisible();
  await expect(this.Column_Action).toBeVisible();
 }
 async user_enter_values_searchbar(striteration: any){
  let tutorialsearch = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
await this.playwrightFactory.fill(this.Tutorial_Search_Bar, tutorialsearch);
  await this.page.keyboard.press('Enter');
  await this.page.waitForTimeout(3000);
 }
 async user_verify_search_result(striteration: any){
  let tutorialsearch = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
  await expect(this.page.locator("//*[contains(text(),'"+tutorialsearch+"')]")).toBeVisible();
 }
 async user_enters_instructions(strinstructons:string){
    await this.txt_instructions.click();
  await this.playwrightFactory.fill(this.txt_instructions,strinstructons);
  await this.playwrightFactory.click(this.btn_save);
  await this.playwrightFactory.click(this.btn_ok);
}
///// verifying Delete functionality//
async verify_delete(strpage:string){
await this.playwrightFactory.click(this.txt_searchbox);
await this.playwrightFactory.fill(this.txt_searchbox,strpage);
await this.txt_searchbox.press('Enter')
 
await this.playwrightFactory.click(this.btn_delete);
await expect(this.dbox_delete).toBeVisible();
await this.playwrightFactory.click(this.btn_deleteok);
}
/// verifying Filter functionality//
async verify_filter(){
await expect(this.btn_filter).toBeVisible();
await expect(this.btn_filter).toBeEnabled();
await this.playwrightFactory.click(this.btn_filter);
}
async user_selects_platform_filter(strFilterCharity: string){
  await this.playwrightFactory.click(this.txt_platform_filter);
await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strFilterCharity+"']"));
}
async user_clicks_apply(){
  await this.playwrightFactory.click(this.btn_apply);
}
///verifying edit functionality///
async verify_edit(strpage:string){
await this.playwrightFactory.click(this.txt_searchbox);
await this.playwrightFactory.fill(this.txt_searchbox,strpage);
await this.txt_searchbox.press('Enter')
await this.playwrightFactory.click(this.btn_edit);
 
}
 
 async user_edits_platform(){
    await this.playwrightFactory.click(this.txt_paltform_edit);
     await this.playwrightFactory.click(this.ddl_platform_edit);
 }
 
 async user_clicks_update(){
   await this.playwrightFactory.click(this.btn_update);
 
  await expect(this.dbox_edit).toBeVisible();
   await this.btn_editok.waitFor();
   await this.playwrightFactory.click(this.btn_editok);
}
 
 
 
 
///****  verifying pagination ****//
async verify_itemsperpage(strNumber: string){
await expect(this.ddl_itpage).toBeVisible();
await expect(this.ddl_itpage).toBeEnabled();
await this.playwrightFactory.click(this.ddl_itpage);
await this.playwrightFactory.clickForce(this.page.locator("(//*[contains(text(),'Items per page:')]/parent::div//*[contains(@type,'checkbox') and contains(@aria-label,'"+strNumber+"')])[1]"));
}
async user_selects_aspecific_page(strno:string){
  await expect(this.txt_ssp).toBeVisible();
  await this.playwrightFactory.click(this.txt_ssp);
await this.playwrightFactory.fill(this.txt_ssp,strno);
}
async verify_pagination(){
 
 
  await expect(this.btn_nextpage).toBeVisible();
  await this.playwrightFactory.click(this.btn_nextpage);
  await this.playwrightFactory.click(this.btn_previouspage);
 
}
 

  

  

  




}


