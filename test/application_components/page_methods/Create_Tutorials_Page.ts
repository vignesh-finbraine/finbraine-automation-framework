import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class CREATE_TUTORIALS_PAGE {
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
readonly Create_btn: Locator;
readonly Tutorial_Tittle: Locator;
readonly Platform_select_field: Locator;
//readonly Run_For_Charity: Locator;
readonly Tutorial_Link: Locator;
readonly Save_btn: Locator;
readonly Ok_btn: Locator;













  
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
    this.Create_btn= this.page.locator("//component-button[@label='Create']//button//span");
    this.Tutorial_Tittle= this.page.locator("//input[@placeholder='Name']");
    this.Platform_select_field= this.page.locator("//*[contains(text(),'Platform ')]/ancestor::component-select//span[@class='dropdown-btn']");
    //this.Run_For_Charity= this.page.locator("//*[contains(text(),'Platform ')]/ancestor::component-select//*[contains(text(),' Run For Charity ')]");
    this.Tutorial_Link= this.page.locator("//input[@placeholder='Enter Tutorials Link']");
    this.Save_btn= this.page.locator("//*[contains(text(),'Save')]");
    this.Ok_btn= this.page.locator("//button[@class='swal-button swal-button--confirm']");
    
 
    
    
 }
  
 async user_click_create_button(){
  await this.playwrightFactory.click(this.Create_btn);
 }
 async user_enter_tutorial_tittle(striteration: any){
  let tutorialtittle = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
await this.playwrightFactory.fill(this.Tutorial_Tittle, tutorialtittle);

 }
 async user_select_platform(strplatform: string){
  await this.playwrightFactory.click(this.Platform_select_field);
  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Platform ')]/ancestor::component-select//*[contains(text(),'"+strplatform+"')]"));
 }
 async user_enter_link(strLink: string){
  await this.playwrightFactory.fill(this.Tutorial_Link, strLink);
 }
 async user_click_save_btn(){
  await this.playwrightFactory.click(this.Save_btn);
 }
 async user_click_ok_btn(){
  await this.playwrightFactory.click(this.Ok_btn);
 }
 async user_enter_tittle(strTittle: string){
  await this.playwrightFactory.fill(this.Tutorial_Tittle, strTittle);
 }
 
  

  

  




}


