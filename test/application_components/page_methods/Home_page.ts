import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class HOME_PAGE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;


  //**Declare */

readonly tab_user_management: Locator;
readonly tab_users: Locator;
readonly tab_roles: Locator;
readonly tab_tenant_management: Locator;
readonly tab_tenants: Locator;
readonly tab_data_contract: Locator;
readonly tab_campaign_intelligence: Locator;
readonly tab_dashboard: Locator;
readonly tab_segmentation: Locator;
readonly tab_rules_based_segmentation: Locator;
readonly tab_data_injection_and_validation: Locator;
readonly tab_rule_engine: Locator;
readonly tab_customer_segment: Locator;
readonly tab_agentic_segmentation: Locator;
readonly tab_campaign_management: Locator;
readonly tab_campaign_execution: Locator;
readonly tab_analytics: Locator;
readonly tab_campaign_analytics: Locator;
readonly tab_copilot: Locator;
readonly tab_campaign_insights: Locator;
readonly tab_agent_health:Locator;
readonly tab_query_history:Locator;
readonly tab_data_uplooad:Locator;
readonly tab_events: Locator;
readonly tab_event_dashboard: Locator;
readonly tab_rpa_connections: Locator;


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
    this.tab_user_management = this.page.locator("//button[span[contains(text(), 'User Management')]]");
    this.tab_users = this.page.locator("//a[span[contains(text(), 'Users')]]");
    this.tab_roles = this.page.locator("//a[span[contains(text(), 'Roles')]]");
    this.tab_tenant_management = this.page.locator("//button[span[contains(text(), 'Tenant Management')]]");
    this.tab_tenants = this.page.locator("//a[span[contains(text(), 'Tenants')]]");
    this.tab_data_contract = this.page.locator("//a[span[contains(text(), 'Data Contract')]]");
    this.tab_campaign_intelligence = this.page.locator("//button[span[contains(text(), 'Campaign Intelligence')]]");
    this.tab_dashboard = this.page.locator("//a[span[contains(text(), 'Dashboard')]]");
    this.tab_segmentation = this.page.locator("//button[span[normalize-space()='Segmentation']]");
    this.tab_rules_based_segmentation = this.page.locator("//button[span[normalize-space()='Rule Based Segmentation']]");
    this.tab_data_injection_and_validation = this.page.locator("//a[span[normalize-space()='Data Ingestion & Validation']]"); 
    this.tab_rule_engine = this.page.locator("//a[span[normalize-space()='Rule Engine']]");
    this.tab_customer_segment = this.page.locator("//a[span[normalize-space()='Customer Segment']]");
    this.tab_agentic_segmentation = this.page.locator("//a[span[normalize-space()='Agentic Segmentation']]"); 
    this.tab_campaign_management = this.page.locator("//a[span[normalize-space()='Campaign Management']]");
    this.tab_campaign_execution = this.page.locator("//a[span[normalize-space()='Campaign Execution']]");
    this.tab_analytics = this.page.locator("//button[span[normalize-space()='Analytics']]");  
    this.tab_campaign_analytics = this.page.locator("//button[span[normalize-space()='Campaign Analytics']]");
    this.tab_copilot = this.page.locator("//a[span[normalize-space()='Copilot']]");
    this.tab_campaign_insights = this.page.locator("//a[span[normalize-space()='Campaign Insights']]");
    this.tab_agent_health = this.page.locator("//a[span[normalize-space()='Agent Health']]");
    this.tab_query_history = this.page.locator("//a[span[normalize-space()='Query History']]");
    this.tab_data_uplooad = this.page.locator("//a[span[normalize-space()='Data Upload']]");
    this.tab_events = this.page.locator("//button[span[normalize-space()='Events']]"); 
    this.tab_event_dashboard = this.page.locator("//a[span[normalize-space()='Event Dashboard']]");
    this.tab_rpa_connections = this.page.locator("//a[span[normalize-space()='RPA Connections']]");


    // Home to Finbraine

  }

  async user_waits_for_homepage_to_load(){
    await this.playwrightFactory.waitForDomLoad();
    await this.playwrightFactory.waitForSpinnerToDisappear();
  }
  
async user_verify_user_management_tab_is_visible_and_clickable(){
  await expect(this.tab_user_management).toBeVisible();
  await this.playwrightFactory.click(this.tab_user_management);
}

async user_verify_users_subtab_is_visible_and_clickable(){
  await expect(this.tab_users).toBeVisible();
  await this.playwrightFactory.click(this.tab_users);
}

async user_verify_roles_subtab_is_visible_and_clickable(){
  await expect(this.tab_roles).toBeVisible();
  await this.playwrightFactory.click(this.tab_roles);
}

async user_verify_tenant_management_tab_is_visible_and_clickable(){
  await expect(this.tab_tenant_management).toBeVisible();
  await this.playwrightFactory.click(this.tab_tenant_management);
}

async user_verify_tenants_subtab_is_visible_and_clickable(){
  await expect(this.tab_tenants).toBeVisible();
  await this.playwrightFactory.click(this.tab_tenants);
}

async user_verify_data_contract_subtab_is_visible_and_clickable(){
  await expect(this.tab_data_contract).toBeVisible();
  await this.playwrightFactory.click(this.tab_data_contract);
}

async user_verify_campaign_intelligence_tab_is_visible(){
  await expect(this.tab_campaign_intelligence).toBeVisible();
  
}

async user_verify_dashboard_subtab_is_visible(){
  await expect(this.tab_dashboard).toBeVisible();
}

async user_verify_segmentation_tab_is_visible_and_clickable(){
  await expect(this.tab_segmentation).toBeVisible();
  await this.playwrightFactory.click(this.tab_segmentation);
}

async user_verify_rules_based_segmentation_subtab_is_visible_and_clickable(){
  await expect(this.tab_rules_based_segmentation).toBeVisible();
  await this.playwrightFactory.click(this.tab_rules_based_segmentation);
}

async user_verify_data_injection_and_validation_subtab_is_visible_and_clickable(){
  await expect(this.tab_data_injection_and_validation).toBeVisible();
  await this.playwrightFactory.click(this.tab_data_injection_and_validation);
}

async user_verify_rule_engine_subtab_is_visible_and_clickable(){
  await expect(this.tab_rule_engine).toBeVisible();
  await this.playwrightFactory.click(this.tab_rule_engine);
}

async user_verify_customer_segment_subtab_is_visible_and_clickable(){
  await expect(this.tab_customer_segment).toBeVisible();
  await this.playwrightFactory.click(this.tab_customer_segment);
}

async user_verify_agentic_segmentation_subtab_is_visible_and_clickable(){
  await expect(this.tab_agentic_segmentation).toBeVisible();
  await this.playwrightFactory.click(this.tab_agentic_segmentation);
}

async user_verify_campaign_management_tab_is_visible_and_clickable(){
  await expect(this.tab_campaign_management).toBeVisible();
  await this.playwrightFactory.click(this.tab_campaign_management);
}

async user_verify_campaign_execution_tab_is_visible_and_clickable(){
  await expect(this.tab_campaign_execution).toBeVisible();
  await this.playwrightFactory.click(this.tab_campaign_execution);
}

async user_verify_analytics_tab_is_visible_and_clickable(){
  await expect(this.tab_analytics).toBeVisible();
  await this.playwrightFactory.click(this.tab_analytics);
}

async user_verify_campaign_analytics_tab_is_visible_and_clickable(){
  await expect(this.tab_campaign_analytics).toBeVisible();
  await this.playwrightFactory.click(this.tab_campaign_analytics);
}

async user_verify_copilot_subtab_is_visible_and_clickable(){
  await expect(this.tab_copilot).toBeVisible();
  await this.playwrightFactory.click(this.tab_copilot);
}

async user_verify_campaign_insights_subtab_is_visible_and_clickable(){
  await expect(this.tab_campaign_insights).toBeVisible();
  await this.playwrightFactory.click(this.tab_campaign_insights);
}

async user_verify_agent_health_subtab_is_visible_and_clickable(){
  await expect(this.tab_agent_health).toBeVisible();
  await this.playwrightFactory.click(this.tab_agent_health);
}

async user_verify_query_history_subtab_is_visible_and_clickable(){
  await expect(this.tab_query_history).toBeVisible();
  await this.playwrightFactory.click(this.tab_query_history); 
}

async user_verify_data_upload_subtab_is_visible_and_clickable(){
  await expect(this.tab_data_uplooad).toBeVisible();
  await this.playwrightFactory.click(this.tab_data_uplooad);  
}

async user_verify_events_tab_is_visible_and_clickable(){
  await expect(this.tab_events).toBeVisible();
  await this.playwrightFactory.click(this.tab_events);  
}

async user_verify_event_dashboard_subtab_is_visible_and_clickable(){
  await expect(this.tab_event_dashboard).toBeVisible();
  await this.playwrightFactory.click(this.tab_event_dashboard);  
}

async user_verify_rpa_connections_subtab_is_visible_and_clickable(){
  await expect(this.tab_rpa_connections).toBeVisible();
  await this.playwrightFactory.click(this.tab_rpa_connections);   
}
}