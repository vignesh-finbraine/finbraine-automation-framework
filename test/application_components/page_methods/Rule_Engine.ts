import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import DataFactory from '../../utilities/data-factory';
 
export class  RULE_ENGINE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;
  private DataFactory :DataFactory

  readonly txt__rule_engine_title:Locator;
  readonly tab_total_rules:Locator;
  readonly tab_active_rules:Locator;
  readonly tab_inactive_rules:Locator;
  readonly list_all_rules:Locator;  
  readonly list_active_rules:Locator;
  readonly list_inactive_rules:Locator;
  readonly drpdwn_data_contract:Locator;
  readonly btn_create_rule:Locator;
  readonly txt_search_bar:Locator;
  readonly txt_searched_result:Locator;
  readonly btn_action:Locator;
  readonly btn_edit:Locator
  
 
  

 
  /**
   * @param {any} container
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DatabricksSQLwarehouse} databricks_sqlware
   * @param {DatabricksFactoryDBFS} databricks_dbfs
   * @param {DataFactory} DataFactory
   */
 
  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');
    this.DataFactory = container.resolve('dataFactory')
    
 

  
    /******************** Page Objects ************************/

    this.txt__rule_engine_title = this.page.locator("//h4[@class='page-title' and contains(text(), 'Rule Engine')]");
    this.tab_total_rules = this.page.locator("//div[contains(text(), 'Total Rules')]");
    this.tab_active_rules = this.page.locator("//div[contains(text(), 'Active Rules')]");
    this.tab_inactive_rules = this.page.locator("//div[contains(text(), 'Inactive Rules')]");
    this.list_all_rules = this.page.locator("//button[contains(text(), 'All')]");
    this.list_active_rules = this.page.locator("//button[contains(text(), 'Active')]");
    this.list_inactive_rules = this.page.locator("//button[contains(text(), 'Inactive')]");
    this.drpdwn_data_contract = this.page.locator("//div[@class='dc-select' and span[contains(text(), 'All Data Contracts')]]");
    this.btn_create_rule = this.page.locator("//button[contains(text(), 'Create Rule')]");
    this.txt_search_bar = this.page.locator('//input[@placeholder="Search rule..."]');
    this.txt_searched_result = this.page.locator(`//div[@class="dt-name"]`);
    this.btn_action = this.page.locator("//button[contains(text(), 'Actions')]");
    this.btn_edit = this.page.locator("(//a[@class='dropdown-item rounded-2'])[1]");


    }

    async user_waits_for_rule_engine_to_load(){
    await this.playwrightFactory.waitForDomLoad();
    await this.playwrightFactory.waitForSpinnerToDisappear();
  }

    async user_verify_rule_engine_page_is_displayed() {
      await expect(this.txt__rule_engine_title).toBeVisible();
    }

    async user_verify_total_rules_tab_is_displayed() {
      await expect(this.tab_total_rules).toBeVisible();
      await this.tab_total_rules.hover();
    }

    async user_verify_active_rules_tab_is_displayed() {
      await expect(this.tab_active_rules).toBeVisible();
      await this.tab_active_rules.hover();
    }

    async user_verify_inactive_rules_tab_is_displayed() {
      await expect(this.tab_inactive_rules).toBeVisible();
      await this.tab_inactive_rules.hover();
    }

    async user_verify_all_rule_list_btn_is_visible_and_clickable() {
      await expect(this.list_all_rules).toBeVisible();
      await expect(this.list_all_rules).toBeEnabled();
      await this.playwrightFactory.click(this.list_all_rules);
    }

    async user_verify_active_rule_list_btn_is_visible_and_clickable() {
      await expect(this.list_active_rules).toBeVisible();
      await expect(this.list_active_rules).toBeEnabled();
      await this.playwrightFactory.click(this.list_active_rules);
    }

    async user_verify_inactive_rule_list_btn_is_visible_and_clickable() {
      await expect(this.list_inactive_rules).toBeVisible();
      await expect(this.list_inactive_rules).toBeEnabled();
      await this.playwrightFactory.click(this.list_inactive_rules);
    }

    async user_verify_data_contract_dropdown_is_visible_and_clickable() {
      await expect(this.drpdwn_data_contract).toBeVisible();
      await expect(this.drpdwn_data_contract).toBeEnabled();
      await this.playwrightFactory.click(this.drpdwn_data_contract);
    }

    async user_verify_create_rule_button_is_visible_and_clickable() {
      await expect(this.btn_create_rule).toBeVisible();
      await expect(this.btn_create_rule).toBeEnabled();
      await this.playwrightFactory.click(this.btn_create_rule);
    }

//     async user_enters_text_in_search_bar(searchValue: string) {
//       await expect(this.txt_search_bar).toBeEnabled();
//       await this.playwrightFactory.fill(this.txt_search_bar, searchValue);
//       await this.txt_search_bar.press('Enter');
//       await this.page.waitForTimeout(2000);
// }

    
    async user_enters_text_in_search_bar(striteration: any){
     let search= await this.DataFactory.getIterationData(this.container,"USER_NAME",striteration)
     await this.playwrightFactory.fill(this.txt_search_bar, search );
     await this.txt_search_bar.press('Enter');
     await this.page.waitForTimeout(2000);
  }

    async user_validates_searched_result() {
        await expect(this.txt_searched_result).toBeVisible();
    }

    async user_clicks_on_action_button() {
      await expect(this.btn_action).toBeVisible();
      await expect(this.btn_action).toBeEnabled();
      await this.playwrightFactory.click(this.btn_action);
    }

    async user_clicks_on_edit_button() {
      await expect(this.btn_edit).toBeVisible();
      await this.playwrightFactory.click(this.btn_edit);
    }

}
