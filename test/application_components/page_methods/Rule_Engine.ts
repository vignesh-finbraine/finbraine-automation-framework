import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';

export class Rule_Engine {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;
  
  readonly txt_username: Locator;
  readonly txt_password: Locator;
  readonly btn_login: Locator;
  readonly btn_segmentation: Locator;
  readonly btn_rule_based_segmentation: Locator;
  readonly btn_rule_engine: Locator;
  
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
    this.txt_username = this.page.locator('#username');
    this.txt_password = this.page.locator('#password');
    this.btn_login = this.page.locator('button:has-text("SIGN IN")');
	  this.btn_segmentation = this.page.locator('button:has-text("Segmentation")');
    this.btn_rule_based_segmentation = this.page.locator('button:has-text("Rule Based Segmentation")');
    this.btn_rule_engine = this.page.locator('a.nav-sub-sub-sub-link[href="/rule-engine"]');
  }

  async user_launches_application() {
    let url = process.env.APP_URL || "https://campaignintelligenceqaui.azurewebsites.net/account/login";
    await this.playwrightFactory.launchApplication(url);
  }

  async user_enter_username(username: string) {
    await this.playwrightFactory.fill(this.txt_username, username);
  }

  async user_enter_password(password: string) {
    await this.playwrightFactory.fill(this.txt_password, password);
  }

  async user_click_login_btn() {
    await this.playwrightFactory.click(this.btn_login);
    await this.page.waitForLoadState('networkidle');
  }
  
  async user_click_segmentation_btn() {
    await this.playwrightFactory.click(this.btn_segmentation);
    await this.page.waitForLoadState('networkidle');
  }

  async user_click_rule_based_segmentation_btn() {
    await this.playwrightFactory.click(this.btn_rule_based_segmentation);
    await this.page.waitForLoadState('networkidle');
  }

  async user_click_rule_engine_btn() {
    await this.playwrightFactory.click(this.btn_rule_engine);
    await this.page.waitForLoadState('networkidle');
  }
}
 