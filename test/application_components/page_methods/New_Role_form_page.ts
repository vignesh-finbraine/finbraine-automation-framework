import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
export class  NEW_ROLE_FORM_PAGE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly txt_new_role_form_title:Locator;
  readonly txt_role_name_input_field:Locator;
  readonly default_role_toggle_button:Locator;
  readonly public_toggle_button:Locator;
  readonly btn_cancel:Locator;
  readonly btn_save:Locator;
  readonly txt_role_created_successfully_toast_message:Locator;
 
  

 
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

    this.txt_new_role_form_title = this.page.locator("//h5[contains(text(), 'New Role')]");
    this.txt_role_name_input_field = this.page.locator('//input[@formcontrolname="name"]');
    this.default_role_toggle_button = this.page.locator('//input[@formcontrolname="isDefault"]');
    this.public_toggle_button = this.page.locator('//input[@formcontrolname="isPublic"]');
    this.btn_cancel = this.page.locator('//button[contains(text(), "Cancel")]');
    this.btn_save = this.page.locator('//button[contains(text(), "Save")]');
    this.txt_role_created_successfully_toast_message = this.page.locator('//h3[contains(text(), "Role Created Successfully!")]');


    }

    async user_validates_new_role_form_title(){
        await expect(this.txt_new_role_form_title).toBeVisible();
    } 

    async user_enters_role_name_in_input_field(roleName:string){
        await expect(this.txt_role_name_input_field).toBeVisible();
        await this.playwrightFactory.fill(this.txt_role_name_input_field, roleName);
    }

    async user_clicks_on_default_role_toggle_button(){
        await expect(this.default_role_toggle_button).toBeVisible();
        await this.playwrightFactory.click(this.default_role_toggle_button);
    }

    async user_clicks_on_public_toggle_button(){
        await expect(this.public_toggle_button).toBeVisible();
        await this.playwrightFactory.click(this.public_toggle_button);
    }

    async user_clicks_on_cancel_button(){
        await expect(this.btn_cancel).toBeVisible();
        await this.playwrightFactory.click(this.btn_cancel);
    }

    async user_clicks_on_save_button(){
        await expect(this.btn_save).toBeVisible();
        await this.playwrightFactory.click(this.btn_save);
    }

    async user_validates_role_created_successfully_toast_message(){
        await expect(this.txt_role_created_successfully_toast_message).toBeVisible();
    }
}
