import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
export class  NEW_USER_FORM_PAGE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;
 
  readonly txt_new_user_heading:Locator;
  readonly txt_username:Locator;
  readonly txt_email:Locator;
  readonly txt_first_name:Locator;
  readonly txt_last_name:Locator;
  readonly txt_phone_number:Locator;
  readonly txt_password:Locator;
  readonly btn_role_admin:Locator;
  readonly btn_role_assistant_manager:Locator;
  readonly btn_role_asst_manager:Locator;
  readonly btn_role_QA_manager:Locator;
  readonly btn_save:Locator;
  readonly btn_cancel:Locator;
  readonly txt_sucess_message:Locator;
  readonly btn_ok:Locator;
  readonly txt_invalid_email_error_message:Locator;
  readonly txt_invalid_phone_number_error_message:Locator;
  readonly txt_invalid_password_error_message:Locator;
  readonly btn_close:Locator;


 
  /**
   * @param {any} container
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DatabricksSQLwarehouse} databricks_sqlware
   * @param {DatabricksFactoryDBFS} databricks_dbfs
   */
 
  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');
 
    /******************** Page Objects ************************/
    this.txt_new_user_heading = this.page.locator('//div[h5[contains(text(), "New User")]]');
    this.txt_username = this.page.locator('//input[@formcontrolname="userName"]');
    this.txt_email = this.page.locator('//input[@formcontrolname="email"]');
    this.txt_first_name = this.page.locator('//input[@formcontrolname="name"]');
    this.txt_last_name = this.page.locator('//input[@formcontrolname="surname"]');
    this.txt_phone_number = this.page.locator('//input[@formcontrolname="phoneNumber"]');
    this.txt_password = this.page.locator('//input[@formcontrolname="password"]');
    this.btn_role_admin = this.page.locator("//label[text() ='Roles *']//following::div[text() =' admin ']");
    this.btn_role_assistant_manager = this.page.locator("//label[text() ='Roles *']//following::div[text() =' Assistant Manager ']");
    this.btn_role_asst_manager = this.page.locator("//label[text() ='Roles *']//following::div[text() = ' Asst Manager ']"); 
    this.btn_role_QA_manager = this.page.locator("//label[text() ='Roles *']//following::div[text() = ' QA_Manager ']"); 
    this.btn_save = this.page.locator('//button[contains(text(), "Save")]');
    this.btn_cancel = this.page.locator('//button[contains(text(), "Cancel")]');
    this.txt_sucess_message = this.page.locator('//h3[contains(text(), "User Created Successfully!")]');
    this.btn_ok = this.page.locator('//button[contains(text(), "OK")]');
    this.txt_invalid_email_error_message = this.page.locator("//div[@class='invalid-feedback' and contains(text(), 'Valid email required.')]");
    this.txt_invalid_phone_number_error_message = this.page.locator("//div[@class='invalid-feedback' and contains(text(), 'Phone number must be exactly 10 digits.')]");
    this.txt_invalid_password_error_message = this.page.locator("//div[@class='invalid-feedback' and contains(text(), 'Minimum 6 characters.')]");
    this.btn_close = this.page.locator('//button[@class="btn-close"]');
  }
  

  async user_validates_new_user_form_heading(){
    await expect(this.txt_new_user_heading).toBeVisible();
  }

  async user_enters_username(username: string){
    await expect(this.txt_username).toBeVisible();
    await this.playwrightFactory.fill(this.txt_username, username);
  }

  async user_enters_email(email: string){
    await expect(this.txt_email).toBeVisible();
    await this.playwrightFactory.fill(this.txt_email, email);   
  }

  async user_enters_first_name(firstname: string){
    await expect(this.txt_first_name).toBeVisible();
    await this.playwrightFactory.fill(this.txt_first_name, firstname);   
  }

  async user_enters_last_name(lastname: string){
    await expect(this.txt_last_name).toBeVisible();
    await this.playwrightFactory.fill(this.txt_last_name, lastname);  
  }

  async user_enters_phone_number(phoneNumber: string){
    await expect(this.txt_phone_number).toBeVisible();
    await this.playwrightFactory.fill(this.txt_phone_number, phoneNumber);
  }

  async user_enters_password(password: string){
    await expect(this.txt_password).toBeVisible();
    await this.playwrightFactory.fill(this.txt_password, password);
  }

  async user_selects_admin_role(){
    await expect(this.btn_role_admin).toBeVisible();
    await this.playwrightFactory.click(this.btn_role_admin);
  } 

  async user_selects_assistant_manager_role(){
    await expect(this.btn_role_assistant_manager).toBeVisible();
    await this.playwrightFactory.click(this.btn_role_assistant_manager);
  }

  async user_selects_asst_manager_role(){
    await expect(this.btn_role_asst_manager).toBeVisible();
    await this.playwrightFactory.click(this.btn_role_asst_manager); 
  }

  async user_verifies_QA_manager_role_is_displayed_under_roles_list(){
    await expect(this.btn_role_QA_manager).toBeVisible();
  }

  async user_clicks_on_save_button(){
    await expect(this.btn_save).toBeEnabled();
    await this.playwrightFactory.click(this.btn_save);
  }

  async user_clicks_on_cancel_button(){
    await expect(this.btn_cancel).toBeVisible();
    await this.playwrightFactory.click(this.btn_cancel);
  }

  async user_validates_success_message(){
    await expect(this.txt_sucess_message).toBeVisible();
  }

  async user_clicks_on_ok_button(){
    await expect(this.btn_ok).toBeVisible();
    await this.playwrightFactory.click(this.btn_ok);
  }

  async user_validates_invalid_email_error_message(){ 
    await expect(this.txt_invalid_email_error_message).toBeVisible();
}

  async user_validates_invalid_phone_number_error_message(){ 
    await expect(this.txt_invalid_phone_number_error_message).toBeVisible();
  }

  async user_validates_invalid_password_error_message(){ 
    await expect(this.txt_invalid_password_error_message).toBeVisible();
  }

  async user_clicks_on_close_button(){
    await expect(this.btn_close).toBeVisible();
    await this.playwrightFactory.click(this.btn_close);
  }
}
 
