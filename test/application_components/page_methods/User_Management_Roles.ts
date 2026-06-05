import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
export class  USER_MANAGEMENT_ROLES {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly txt_roles_page_title:Locator;
  readonly btn_new_role:Locator;
  readonly txt_QA_manager_role_in_roles_list:Locator;
  readonly edit_icon_for_QA_manager_role:Locator;
  readonly delete_icon_for_QA_manager_role:Locator;
  readonly txt_delete_role_confirmation_popup:Locator;
  readonly txt_successfully_deleted_role_toast_message:Locator;
  readonly btn_confirm_delete:Locator;
  

 
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

    this.txt_roles_page_title = this.page.locator('//h4[@class="page-title" and contains(text(), "Roles")]');
    this.btn_new_role = this.page.locator('//button[contains(text(), "New Role")]');
    this.txt_QA_manager_role_in_roles_list = this.page.locator('//td[strong[text()="QA_Manager"]]');
    this.edit_icon_for_QA_manager_role = this.page.locator('//strong[text()="QA_Manager"]/ancestor::tr//button[@class="btn btn-sm btn-outline-primary me-1"]');
    this.delete_icon_for_QA_manager_role = this.page.locator('//strong[text()="QA_Manager"]/ancestor::tr//button[@class="btn btn-sm btn-outline-danger"]');
    this.txt_delete_role_confirmation_popup = this.page.locator("//h3[contains(text(), 'Delete Role?')]");
    this.txt_successfully_deleted_role_toast_message = this.page.locator('//h3[contains(text(), "Role Deleted Successfully!")]');
    this.btn_confirm_delete = this.page.locator('//button[contains(text(), "Delete")]');
  }

  async user_validates_roles_page_title(){
    await expect(this.txt_roles_page_title).toBeVisible();
  }

  async user_clicks_on_new_role_button(){
    await expect(this.btn_new_role).toBeVisible();
    await this.playwrightFactory.click(this.btn_new_role);
  }

  async user_validates_QA_manager_role_in_roles_list(){
    await expect(this.txt_QA_manager_role_in_roles_list).toBeVisible();
  }

  async user_clicks_on_edit_icon_for_QA_manager_role(){
    await expect(this.edit_icon_for_QA_manager_role).toBeVisible();
    await this.playwrightFactory.click(this.edit_icon_for_QA_manager_role);
  }

  async user_clicks_on_delete_icon_for_QA_manager_role(){
    await expect(this.delete_icon_for_QA_manager_role).toBeVisible();
    await this.playwrightFactory.click(this.delete_icon_for_QA_manager_role);
  }

  async user_validates_delete_role_confirmation_popup(){
    await expect(this.txt_delete_role_confirmation_popup).toBeVisible();
  }

  async user_validates_successfully_deleted_role_toast_message(){
    await expect(this.txt_successfully_deleted_role_toast_message).toBeVisible();
  }

  async user_clicks_on_confirm_delete_button_in_delete_role_confirmation_popup(){
    await expect(this.btn_confirm_delete).toBeVisible();
    await this.playwrightFactory.click(this.btn_confirm_delete);
  }

}