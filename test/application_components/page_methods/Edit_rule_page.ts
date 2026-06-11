import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
export class EDIT_RULE_PAGE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;
 
  readonly txt_edit_rule_heading:Locator;
  readonly btn_update_rule:Locator;
  readonly txt_success_message:Locator;
  readonly btn_ok:Locator;
  


 
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
    this.txt_edit_rule_heading = this.page.locator('//div[@class="page-title" and contains(text(), "Edit Rule")]');
    this.btn_update_rule = this.page.locator("//button[@class='btn-submit' and contains(text(), ' Update Rule ')]");
    this.txt_success_message = this.page.locator("//h3[contains(text(), 'Rule Updated Successfully!')]");
    this.btn_ok = this.page.locator("//button[contains(text(), 'OK')]");

  
    
  }

  async user_validates_edit_rule_heading(){
    await expect(this.txt_edit_rule_heading).toBeVisible();
  }

  async user_clicks_on_update_rule_button(){
    await expect(this.btn_update_rule).toBeVisible();
    await expect(this.btn_update_rule).toBeEnabled();
    await this.playwrightFactory.click(this.btn_update_rule);
  }

  async user_validates_success_message_after_updating_rule() {
    await expect(this.txt_success_message).toBeVisible();   
  }

  async user_clicks_on_ok_button_on_success_message() {
    await expect(this.btn_ok).toBeVisible();
    await this.playwrightFactory.click(this.btn_ok);  

}
}
 
