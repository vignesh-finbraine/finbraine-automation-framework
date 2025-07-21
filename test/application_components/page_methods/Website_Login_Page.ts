import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { PassThrough } from 'stream';


export class website_Login_page {
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
  readonly Profile_icon:Locator;
  readonly Login_btn:Locator;
  readonly Email_field:Locator;
  readonly Login_password_field:Locator;
  readonly forgot_password_btn:Locator;
  readonly btn_login:Locator;
  readonly Set_password_reset_code_btn:Locator;
  readonly Request_reset_code_msg:Locator;
 readonly Email_Invalid_msg:Locator;
 readonly reset_enter_code_field:Locator;
 readonly reset_password_btn:Locator;
 readonly Invalid_enter_code_msg:Locator;

 readonly email: Locator;
 readonly Password: Locator;
 readonly Loging_btn: Locator;

 readonly txt_Profile_Icon: Locator;
 readonly txt_Login: Locator;




  
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
    this.Profile_icon=this.page.locator("#dropdownMenu")
    this.Login_btn=this.page.locator("//a[normalize-space()='Login']")                           
    this.Email_field=this.page.locator("#email")                 
    this.Login_password_field=this.page.locator("//*[contains(text(),'Password')]/ancestor::component-input//input[@class='input-primary pr-10 pl-10 ng-untouched ng-pristine ng-valid']")
    this.forgot_password_btn=this.page.locator("//a[@href='/auth/password/forgot']")
    this.btn_login = this.page.locator('.button.button-primary');
    this.Set_password_reset_code_btn = this.page.locator("//*[contains(text(),'Send Password Reset Code')]")
    this.Request_reset_code_msg= this.page.locator("//div[normalize-space()='Request Reset Code']")
    this.Email_Invalid_msg= this.page.locator("//div[contains(text(),'The email is invalid')]")
    this.reset_enter_code_field= this.page.locator("#code")
    this.reset_password_btn= this.page.locator("//span[normalize-space()='Reset Password']")
    this.Invalid_enter_code_msg= this.page.locator("//*[contains(text(),' The code is invalid.')]")
    this.email= this.page.locator("#email");
    this.Password= this.page.locator("#password");
    this.Loging_btn= this.page.locator("//*[contains(text(),'Log In')]/ancestor::component-button//*[contains(text(),'Log In')]");

    this.txt_Profile_Icon=this.page.locator("#dropdownMenu")
    this.txt_Login=this.page.locator("//a[normalize-space()='Login']")








  }
  
  

  
/*********************************************************************************************************************/
  
async user_launches_application() {
  let url = process.env.APP_URL || " https://rfc-staging.sportsmediaagency.com/"
  await this.playwrightFactory.launchApplication(url);
}

async user_clicks_profile_icon(){
  await this.Profile_icon.hover();
  
}

async user_clicks_login_btn(){
  await this.playwrightFactory.click(this.Login_btn)
}

async user_verify_login_email_field(){
  await expect (this.Email_field).toBeVisible();
}
async user_verify_login_password_field(){
  await expect (this.Login_password_field).toBeVisible();
}
async user_verify_btn_login(){
  await expect (this.btn_login).toBeVisible();
}
async user_clicks_forgot_password_btn(){
  await this.playwrightFactory.click(this.forgot_password_btn)
}
async user_clicks_set_password_reset_code_btn(){
  await this.playwrightFactory.click(this.Set_password_reset_code_btn)
}
async user_verify_request_reset_code_msg(){
  await expect (this.Request_reset_code_msg).toBeVisible();
}


async user_enter_login_email(striteration: any){
  await this.playwrightFactory.fill(this.Email_field,striteration);
  }
  async user_verify_invalid_email_msg(){
    await expect (this.Email_Invalid_msg).toBeVisible();
  }
  async user_verify_set_password_reset_code_btn_disabled(){
    await expect (this.Set_password_reset_code_btn).toBeDisabled();
  }
  async user_clear_email(){
    await this.Email_field.clear();
    await this.page.waitForTimeout(3000)
    }

    async user_verify_reset_password_enter_code_field(){
      await expect (this.reset_enter_code_field).toBeVisible();

    }
    async user_verify_resset_password_btn(){
      await expect (this.reset_password_btn).toBeVisible();

    }

    async user_enter_reset_password_code(striteration: any){
      await this.playwrightFactory.fill(this.reset_enter_code_field,striteration);
      }

      async user_clicks_resset_password_btn(){
        await this.playwrightFactory.click(this.reset_password_btn)
      }

      async user_verify_inavlid_enter_code_msg(){
        await expect (this.Invalid_enter_code_msg).toBeVisible();
      }
  
      async user_enter_email(strEmail: string){
        await this.playwrightFactory.fill(this.email, strEmail);
      }
      async user_enter_password(strPass: string){
        await this.playwrightFactory.fill(this.Password, strPass)
      }
      async user_click_login_btn(){
        await this.playwrightFactory.click(this.Loging_btn);
      }

      
     
      async user_hover_profile_icon(){
        await this.txt_Profile_Icon.hover();
      }
     
      async user_verify_login(){
        await expect(this.txt_Login).toBeVisible();
      }
     
      async user_click_on_login(){
        await this.playwrightFactory.click(this.txt_Login)
      }


























}