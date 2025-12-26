import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class LOGIN_PAGE {
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


    
    

    // Login to RFC
    
  }
  
  async user_launches_application() {
    let url = process.env.APP_URL || "https://rfc2-staging-portal.fororganizers.com/"
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
  

  

 

 




}


