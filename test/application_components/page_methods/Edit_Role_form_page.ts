import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
export class  EDIT_ROLE_FORM_PAGE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly txt_edit_role_form_title:Locator;
  readonly txt_sucessfully_updated_role_toast_message:Locator;
  
 
  

 
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

    this.txt_edit_role_form_title = this.page.locator("//h5[contains(text(), 'Edit Role')]");
    this.txt_sucessfully_updated_role_toast_message = this.page.locator('//h3[contains(text(), "Role Updated Successfully!")]');
   


    }

    async user_validates_edit_role_form_title(){
        await expect(this.txt_edit_role_form_title).toBeVisible();
    } 

    async user_validates_role_updated_successfully_toast_message(){
        await expect(this.txt_sucessfully_updated_role_toast_message).toBeVisible();
    }

    
}
