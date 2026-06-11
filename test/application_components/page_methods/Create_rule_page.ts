import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import DataFactory from '../../utilities/data-factory';
 
export class  CREATE_RULE_PAGE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;
  private dataFactory: DataFactory;

  readonly txt_create_rule_form_title:Locator;
  readonly drpdwn_data_contract:Locator;
  readonly txt_rule_name:Locator;
  readonly txt_rule_description:Locator;
  readonly active_rule_toggle:Locator;
  readonly btn_add_group:Locator;
  readonly btn_remove_group:Locator
  readonly drpdwn_select_filed:Locator;
  readonly drpdwn_operator:Locator;
  readonly txt_value:Locator;
  readonly drpdwn_action:Locator;
  readonly drpdwn_three_dots:Locator;
  readonly btn_add_rows:Locator;
  readonly btn_duplicate:Locator;
  readonly btn_delete:Locator;
  readonly btn_create_rule:Locator;
  readonly btn_cancel:Locator;
  readonly txt_success_message:Locator;
  readonly btn_ok:Locator;
 
  
 
  

 
  /**
   * @param {any} container
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DatabricksSQLwarehouse} databricks_sqlware
   * @param {DatabricksFactoryDBFS} databricks_dbfs
   * @param {DataFactory} dataFactory
   */
 
  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');
    this.dataFactory = container.resolve('dataFactory');
 
    /******************** Page Objects ************************/

    this.txt_create_rule_form_title = this.page.locator("//div[@class='page-title' and contains(text(), 'Create Rule')]");
    this.drpdwn_data_contract = this.page.locator("//select[option[contains(text(), 'Select data contract...')]]");
    this.txt_rule_name = this.page.locator("//input[@placeholder='Enter rule name']");
    this.txt_rule_description = this.page.locator("//input[@placeholder='Describe the rule purpose']");
    this.active_rule_toggle = this.page.locator("//span[@class='toggle-slider']");
    this.btn_add_group = this.page.locator("//button[@class='btn-add-group mt-2' and contains(text(), 'Add Group')]");
    this.btn_remove_group= this.page.locator("(//button[contains(text(), 'Remove Group')])[1]")
    this.drpdwn_select_filed = this.page.locator("//select[@class='crit-select ng-untouched ng-pristine ng-valid'and option[contains(text(), 'Select field')]]");
    this.drpdwn_operator= this.page.locator("//select[contains(@class,'crit-select')]").last();
    this.txt_value = this.page.locator("//input[@placeholder='Enter value' and (@value='' or not(@value))]");
    this.drpdwn_action = this.page.locator("//button[@class='btn btn-secondary btn-action btn-sm dropdown-toggle' and contains(text(), 'Action')]").last();
    this.drpdwn_three_dots = this.page.locator("(//button[i[@class='bi bi-three-dots']])[1]");
    this.btn_add_rows = this.page.locator("//ul[contains(@class,'dropdown-menu')]//li[normalize-space()='Add Row']");
    this.btn_duplicate = this.page.locator("(//ul[contains(@class,'dropdown-menu')]//li[normalize-space()='Duplicate'])[1]");
    this.btn_delete = this.page.locator("(//ul[contains(@class,'dropdown-menu')]//li[normalize-space()='Delete'])[1]");
    this.btn_create_rule = this.page.locator("//button[@class='btn-submit' and contains(text(), ' Create Rule ')]");
    this.btn_cancel = this.page.locator("//button[@class='btn-cancel' and contains(text(), 'Cancel')]");
    this.txt_success_message = this.page.locator("//h3[contains(text(), 'Rule Created Successfully!')]");
    this.btn_ok = this.page.locator("//button[contains(text(), 'OK')]");
    }


    async user_validates_create_rule_form_title(){
        await expect(this.txt_create_rule_form_title).toBeVisible();
    } 

    async user_verify_data_contract_dropdown_is_visible_and_clickable(bankName:string) {
      await expect(this.drpdwn_data_contract).toBeVisible();
      await expect(this.drpdwn_data_contract).toBeEnabled();
      await this.playwrightFactory.click(this.drpdwn_data_contract); 
      await this.drpdwn_data_contract.selectOption({value: bankName});
}

    async user_enters_rule_name_in_input_field(striteration: any){
    let rulename = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.txt_rule_name,rulename);
  }

    async user_enters_rule_description_in_input_field(ruleDescription: string) {
      await this.playwrightFactory.fill(this.txt_rule_description, ruleDescription);
    }

    async user_toggles_active_rule() {
      await this.playwrightFactory.click(this.active_rule_toggle);
    }

    async user_clicks_add_group_button() {
      await this.playwrightFactory.click(this.btn_add_group);
    }

    async user_click_remove_group_btn_to_remove_group(){
        await this.playwrightFactory.click(this.btn_remove_group);
    }

    async user_verify_select_field_dropdown_is_visible_and_clickable_and_select_value(fieldName: string) {
      await expect(this.drpdwn_select_filed).toBeVisible();
      await expect(this.drpdwn_select_filed).toBeEnabled();
      await this.playwrightFactory.click(this.drpdwn_select_filed);
      await this.page.waitForTimeout(1000);
      await this.drpdwn_select_filed.selectOption({label: fieldName});
    }

    async user_verify_operator_dropdown_is_visible_and_clickable_and_select_value(operator: string) {
       await expect(this.drpdwn_operator).toBeVisible();
       await expect(this.drpdwn_operator).toBeEnabled();
       await this.playwrightFactory.click(this.drpdwn_operator);
       await this.page.waitForTimeout(1000);
       await this.drpdwn_operator.selectOption({label:operator});
}

    async user_enters_value_in_input_field(value: string) {
     // await this.playwrightFactory.fill(this.txt_value, value);
     await this.page.locator("//input[@placeholder='Enter value']").last().fill(value);
}
    
    async user_verify_action_dropdown_is_visible_and_clickable_and_select_value(actionValue: string) {
      await expect(this.drpdwn_action).toBeVisible();
      await expect(this.drpdwn_action).toBeEnabled();
      await this.playwrightFactory.click(this.drpdwn_action.last());
      await this.playwrightFactory.click(this.page.locator(`//li[contains(@class,'dropdown-item') and normalize-space()='${actionValue}']`).last());
}

    async user_verify_three_dots_dropdown_is_visible_and_clickable() {
      await expect(this.drpdwn_three_dots).toBeVisible();
      await expect(this.drpdwn_three_dots).toBeEnabled();
      await this.playwrightFactory.click(this.drpdwn_three_dots);
      await this.page.waitForTimeout(2000);
}

    async user_clicks_on_add_row_from_three_dots_dropdown() {
      await this.playwrightFactory.click(this.btn_add_rows);
      await this.page.waitForTimeout(2000);
}

    async user_clicks_on_duplicate_from_three_dots_dropdown() {
      await this.playwrightFactory.click(this.btn_duplicate);
      await this.page.waitForTimeout(2000);
}

    async user_clicks_on_delete_from_three_dots_dropdown() {
      await this.playwrightFactory.click(this.btn_delete);
      await this.page.waitForTimeout(2000);

}

    async user_clicks_on_create_rule_button() {
      await expect(this.btn_create_rule).toBeVisible();
      await expect(this.btn_create_rule).toBeEnabled();
      await this.playwrightFactory.click(this.btn_create_rule);
}

    async user_attempt_to_click_create_rule_btn_without_filling_mandatory_field(){
      await expect(this.btn_create_rule).toBeDisabled();

    }

    async user_clicks_on_cancel_button() {
      await expect(this.btn_cancel).toBeVisible();
      await expect(this.btn_cancel).toBeEnabled();
      await this.playwrightFactory.click(this.btn_cancel);
}

    async user_validates_success_message_after_creating_rule() {
      await expect(this.txt_success_message).toBeVisible();
}

    async user_clicks_on_ok_button_on_success_message() {
      await expect(this.btn_ok).toBeVisible();
      await this.playwrightFactory.click(this.btn_ok);
}

}
