import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class CREATE_CONTRACT_PAGE {
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

 readonly btn_create: Locator;
     readonly btn_charities: Locator;
     readonly contract_btn:Locator;
     readonly Type_btn:Locator;
     readonly Membership_checkbox:Locator;
     readonly title:Locator;
     readonly state:Locator;
     readonly current_checkbox:Locator;
  readonly Agreement:Locator;
  readonly type_search_bar:Locator;
 readonly txt_SearchBox:Locator;










  
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
  this.btn_create = this.page.locator("//component-button[@label='Create']//button//span");
    this.btn_charities = this.page.locator("//*[contains(text(),'Charities')]/ancestor::div//a[@class='nav__link']");
    this.contract_btn=this.page.locator("//*[contains(text(),' Charity Management ')]/ancestor::component-sidebar//a[@title='Contract']")
    this.Type_btn=this.page.locator("//*[contains(text(),'Type')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.Membership_checkbox=this.page.locator("//*[contains(text(),'Type')]/ancestor::component-select//*[contains(text(),' Membership Agreement ')]")
    this.title=this.page.locator("//*[contains(text(),'Title')]/ancestor::component-input//input[@type='text']")
    this.state=this.page.locator("//*[contains(text(),'State ')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.current_checkbox=this.page.locator("//*[contains(text(),' Current ')]")
    this.Agreement=this.page.locator("//*[contains(text(),'Agreement (Max Size - 4 MB) ')]/ancestor::component-input//input[@placeholder='Select Agreement']")
    this.type_search_bar= this.page.locator("//*[contains(text(),'Type')]/ancestor::component-select//input[@placeholder='Search']");
    this.txt_SearchBox= this.page.locator("//input[@placeholder='Press ENTER to search']");
  }

    
    

    // Login to RFC
    
  async user_click_createbtn(){
    await this.playwrightFactory.click(this.btn_create);
   
  }
  async user_click_charitiesbtn(){
    await this.playwrightFactory.click(this.btn_charities);
    await this.page.waitForTimeout(5000);
  }
    async user_click_contract_btn(){
    await this.playwrightFactory.click(this.contract_btn);
  }
    async user_click_create_contract_type_btn(){
    await this.playwrightFactory.click(this.Type_btn);
  }
    async user_click_create_contract_type_dropdwn(strtype: string){
    await this.playwrightFactory.fill(this.type_search_bar, strtype);
    await this.page.keyboard.press('Enter');
    await expect(this.Membership_checkbox).toBeVisible();
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Type')]/ancestor::component-select//*[contains(text(),'"+strtype+"')]"))
    }
 
    async user_enters_create_contract_title(strtitle: string){
    await this.playwrightFactory.fill(this.title,strtitle);
  }
  async user_clicks_create_contract_state_btn(){
    await this.playwrightFactory.click(this.state);
  }
  async user_click_create_contract_state_dropdwn(strstate: string){
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strstate+"')]"))
  }
 
  async user_clicks_create_contract_aggrement_btn(){
  await this.Agreement.setInputFiles('C:/Users/ayush.tasare/Downloads/AssureIT_Tools_SW_List 1.pdf')
   
  }
 

  

 

 




}


