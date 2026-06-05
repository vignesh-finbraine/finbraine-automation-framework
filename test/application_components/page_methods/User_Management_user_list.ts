import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
export class  USER_MANAGEMENT_USER_LIST {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;
 
  readonly txt_user_list:Locator; 
  readonly btn_add_user:Locator;
  readonly txt_search:Locator;
  readonly btn_edit:Locator;
  readonly btn_delete:Locator;
  readonly txt_delete_confirmation_popup:Locator;
  readonly btn_confirm_delete:Locator;
  readonly txt_sucessfully_deleted_message:Locator;
  readonly filter_status:Locator;
  readonly status_active:Locator;
  readonly status_inactive:Locator;
  readonly filter_Roles:Locator;
  readonly role_admin:Locator;
  readonly role_user:Locator;
  readonly role_manager:Locator;
  readonly btn_search:Locator;
  readonly txt_result_from_user_list:Locator;
  readonly txt_no_user_found_message:Locator;
  readonly btn_forward_arrow_for_pagination:Locator;
  readonly btn_backward_arrow_for_pagination:Locator;
  readonly btn_next_for_pagination:Locator;
  readonly btn_last_for_pagination:Locator;
  readonly btn_previous_for_pagination:Locator;
  readonly btn_first_for_pagination:Locator;  


 
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

    this.txt_user_list = this.page.locator('//*[@class="page-title" and contains(text(), "User List")]');
    this.btn_add_user = this.page.locator('//button[contains(text(), "Add User")]');
    this.txt_search = this.page.locator('//input[@placeholder="Search by username, name or email..."]');
    this.btn_edit = this.page.locator('//button[@title="Edit"]');
    this.btn_delete = this.page.locator('//button[@title="Delete"]');
    this.txt_delete_confirmation_popup = this.page.locator('//h3[contains(text(), "Delete User?")]');
    this.btn_confirm_delete = this.page.locator('//button[contains(text(), "Delete")]');
    this.txt_sucessfully_deleted_message = this.page.locator('//h3[contains(text(), "User Deleted Successfully!")]');
    this.filter_status = this.page.locator('//select[option[text()="All Status"]]');
    this.status_active = this.page.locator('//select[option[text()="Active"]]');
    this.status_inactive = this.page.locator('//select[option[text()="Inactive"]]');
    this.filter_Roles = this.page.locator("//select[option[text()='All Roles']]");
    this.role_admin = this.page.locator("//select[option[text()='Admin']]");
    this.role_user = this.page.locator("//select[option[text()='User']]");
    this.role_manager = this.page.locator("//select[option[text()='Manager']]");
    this.btn_search = this.page.locator('//button[@class="ul-btn ul-btn--search"]'); 
    this.txt_result_from_user_list = this.page.locator('//th[contains(text(),"NAME")]//following::td//div/span[@class="ul-user-name" and contains(text(),"admin")]'); 
    this.txt_no_user_found_message = this.page.locator("//*[contains(text(), 'No users found')]");
    this.btn_forward_arrow_for_pagination = this.page.locator('(//button[@class="pg-nav-btn"])[2]');
    this.btn_backward_arrow_for_pagination = this.page.locator('(//button[@class="pg-nav-btn"])[1]');
    this.btn_next_for_pagination = this.page.locator('//button[contains(text(), "Next")]');
    this.btn_last_for_pagination = this.page.locator('//button[contains(text(), "Last")]');
    this.btn_previous_for_pagination = this.page.locator('//button[contains(text(), "Previous")]');
    this.btn_first_for_pagination = this.page.locator('//button[contains(text(), "First")]');
  }

  async validate_user_list_page(){
    await expect(this.txt_user_list).toBeVisible();
  }

  async user_clicks_on_add_user_button(){
    await expect(this.btn_add_user).toBeVisible();
    await this.playwrightFactory.click(this.btn_add_user);
  }

  async user_enters_text_in_search_box(searchValue: string){
    await expect(this.txt_search).toBeVisible();
    await this.playwrightFactory.fill(this.txt_search, searchValue);
    await this.txt_search.press('Enter');
    await this.page.waitForTimeout(2000);
  }

  async user_clicks_on_edit_button(){
    await expect(this.btn_edit).toBeVisible();
    await this.btn_edit.hover();
    await this.playwrightFactory.click(this.btn_edit);
  }

  async user_clicks_on_delete_button(){ 
    await expect(this.btn_delete).toBeVisible();
    await this.btn_delete.hover();
    await this.playwrightFactory.click(this.btn_delete);  
  }

  async user_validates_delete_confirmation_popup(){
    await expect(this.txt_delete_confirmation_popup).toBeVisible();
  }

  async user_confirms_delete_action_and_click_delete_btn(){
    await expect(this.btn_confirm_delete).toBeVisible();
    await this.playwrightFactory.click(this.btn_confirm_delete);
  }

  async user_validates_successfully_deleted_message(){
    await expect(this.txt_sucessfully_deleted_message).toBeVisible();
  }

  async user_validates_all_status__filter_drpdwn(){
    await expect(this.filter_status).toBeVisible();
    await this.playwrightFactory.click(this.filter_status);
    await this.page.waitForTimeout(2000);
    await expect(this.status_active).toBeVisible();
    await expect(this.status_inactive).toBeVisible(); 
  }

  async user_selects_active_status_from_filter_drpdwn(){
    await this.filter_status.selectOption({ label: 'Active' });
}

  async user_validates_all_roles_filter_drpdwn(){   
    await expect(this.filter_Roles).toBeVisible();
    await this.playwrightFactory.click(this.filter_Roles);  
    await this.page.waitForTimeout(2000);
    await expect(this.role_admin).toBeVisible();
    await expect(this.role_user).toBeVisible();
    await expect(this.role_manager).toBeVisible();
  }

async user_selects_admin_role_from_filter_drpdwn(){
    await this.filter_Roles.selectOption({ label: 'Admin' });
}

 async user_clicks_on_search_button(){
  await expect(this.btn_search).toBeVisible();
  await this.playwrightFactory.click(this.btn_search);
 }
 async user_validates_result_from_user_list(searchValue: string){
  await expect(this.page.locator(`//span[@class="ul-user-sub" and contains(text(),'${searchValue}')]`)).toBeVisible();
 }

 async user_validates_no_user_found_message(){  
  await expect(this.txt_no_user_found_message).toBeVisible();
 }

 async user_verify_pagination(){
  // Click on forward arrow for pagination
  await expect(this.btn_forward_arrow_for_pagination).toBeVisible();
  await expect(this.btn_forward_arrow_for_pagination).toBeEnabled();
  await this.playwrightFactory.click(this.btn_forward_arrow_for_pagination);
  await this.page.waitForTimeout(2000);
  // Click on backward arrow for pagination
  await expect(this.btn_backward_arrow_for_pagination).toBeVisible();
  await expect(this.btn_backward_arrow_for_pagination).toBeEnabled(); 
  await this.playwrightFactory.click(this.btn_backward_arrow_for_pagination);
  await this.page.waitForTimeout(2000);
  // Click on Next button for pagination
  await expect(this.btn_next_for_pagination).toBeVisible();
  await expect(this.btn_next_for_pagination).toBeEnabled();
  await this.playwrightFactory.click(this.btn_next_for_pagination);
  await this.page.waitForTimeout(2000);
  // Click on Last button for pagination
  await expect(this.btn_last_for_pagination).toBeVisible();
  await expect(this.btn_last_for_pagination).toBeEnabled();
  await this.playwrightFactory.click(this.btn_last_for_pagination);
  await this.page.waitForTimeout(2000);
  // Click on Previous button for pagination
  await expect(this.btn_previous_for_pagination).toBeVisible();
  await expect(this.btn_previous_for_pagination).toBeEnabled();
  await this.playwrightFactory.click(this.btn_previous_for_pagination);
  await this.page.waitForTimeout(2000);
  // Click on First button for pagination
  await expect(this.btn_first_for_pagination).toBeVisible();
  await expect(this.btn_first_for_pagination).toBeEnabled();  
  await this.playwrightFactory.click(this.btn_first_for_pagination);
  await this.page.waitForTimeout(2000);

}
}
 