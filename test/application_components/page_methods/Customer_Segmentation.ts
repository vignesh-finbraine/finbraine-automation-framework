import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';

export class CUSTOMER_SEGMENTATION {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  // Listing page locators
  readonly btn_create_segment: Locator;
  readonly input_search_segments: Locator;
  readonly card_total_segments: Locator;
  readonly card_active_segments: Locator;
  readonly card_estimated_reach: Locator;
  readonly card_rules_applied: Locator;
  readonly tab_all: Locator;
  readonly tab_active: Locator;
  readonly tab_inactive: Locator;
  readonly segments_rows: Locator;
  readonly pagination: Locator;
  readonly sidebar_customer_segment: Locator;

  // Create Segment (stepper) locators
  readonly stepper: Locator;
  readonly input_segment_name: Locator;
  readonly select_data_contract: Locator;
  readonly bucket_type_select: Locator;
  readonly textarea_segment_description: Locator;
  readonly select_status: Locator;
  readonly btn_next: Locator;
  readonly btn_cancel: Locator;

  // Audience (step 2)
  readonly audience_search_input: Locator;
  readonly audience_rows: Locator;
  readonly audience_selected_badge: Locator;

  // Rules (step 3)
  readonly rules_search_input: Locator;
  readonly rules_rows: Locator;
  readonly selected_config_panel: Locator;

  // Preview (step 4)
  readonly preview_heading: Locator;
  readonly btn_save: Locator;

  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');

    // Prefer role-based locators where available
    this.btn_create_segment = this.page.getByRole('button', { name: /Create Segment/i }).first();
    this.input_search_segments = this.page.getByPlaceholder('Search segments...').or(this.page.locator('input[placeholder*="Search"]'));
    this.card_total_segments = this.page.locator('text=TOTAL SEGMENTS').first();
    this.card_active_segments = this.page.locator('text=ACTIVE SEGMENTS').first();
    this.card_estimated_reach = this.page.locator('text=TOTAL ESTIMATED REACH').first();
    this.card_rules_applied = this.page.locator('text=RULES APPLIED').first();

    this.tab_all = this.page.getByRole('tab', { name: /^All$/i }).first();
    this.tab_active = this.page.getByRole('tab', { name: /Active/i }).first();
    this.tab_inactive = this.page.getByRole('tab', { name: /Inactive/i }).first();
    this.segments_rows = this.page.locator('table tbody tr, .segment-list .segment-row');
    this.pagination = this.page.locator('.pagination, nav[aria-label="Pagination"]').first();
    // Sidebar link for navigation
    this.sidebar_customer_segment = this.page.locator('a[href="/segmentation"], a.nav-sub-sub-sub-link:has-text("Customer Segment")');

    // Stepper
    this.stepper = this.page.locator('.stepper, .wizard-steps');
    this.input_segment_name = this.page.getByLabel('Segment Name').or(this.page.locator('input[name="segmentName"], input[placeholder*="Segment Name"]'));
    this.select_data_contract = this.page.getByLabel('Data Contract').or(this.page.locator('select[name="dataContract"]'));
    this.bucket_type_select = this.page.getByLabel('Bucket Type').or(this.page.locator('select[name="bucketType"]'));
    this.textarea_segment_description = this.page.getByLabel('Description').or(this.page.locator('textarea[name="description"]'));
    this.select_status = this.page.getByLabel('Status').or(this.page.locator('select[name="status"]'));
    this.btn_next = this.page.getByRole('button', { name: /Next|Continue/i }).first();
    this.btn_cancel = this.page.getByRole('button', { name: /Cancel/i }).first();

    // Audience
    this.audience_search_input = this.page.getByPlaceholder('Search audiences').or(this.page.locator('input[placeholder*="Audience"]'));
    this.audience_rows = this.page.locator('.audience-list .audience-row, .audience-table tbody tr');
    this.audience_selected_badge = this.page.locator('.selected-audience-count, .badge.selected-count');

    // Rules
    this.rules_search_input = this.page.getByPlaceholder('Search Rules').or(this.page.locator('input[placeholder*="Search rules"]'));
    this.rules_rows = this.page.locator('.rules-list .rule-row, .rules-table tbody tr');
    this.selected_config_panel = this.page.locator('.selected-config, .right-panel');

    // Preview
    this.preview_heading = this.page.locator('text=Segment Preview').first();
    this.btn_save = this.page.getByRole('button', { name: /Save Segment|Save/i }).first();
  }

  // Navigation
  async navigate() {
    const url = process.env.APP_URL || 'https://campaignintelligenceqaui.azurewebsites.net/segmentation';
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async click_sidebar_customer_segment() {
    await this.playwrightFactory.click(this.sidebar_customer_segment);
    await this.page.waitForLoadState('networkidle');
  }

  // Listing page verifications
  async verify_page_loaded() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.btn_create_segment).toBeVisible();
    await expect(this.input_search_segments).toBeVisible();
  }

  async verify_Customer_Segmentation_page_loads() {
    // Ensure user is logged in and navigated to the segmentation page.
    try {
      // If application shows login page, perform login using Login_Page helper when available
      const currentUrl = this.page.url();
      if (currentUrl.includes('/account/login') || currentUrl.includes('/login')) {
        try {
          const loginPage = this.container.resolve('Login_Page');
          const username = process.env.TEST_USER || process.env.APP_USER || '';
          const password = process.env.TEST_PASS || process.env.APP_PASSWORD || '';
          if (username && password && typeof loginPage.login_with_credentials === 'function') {
            await loginPage.login_with_credentials(username, password);
            await this.page.waitForLoadState('networkidle');
          }
        } catch (e) {
          // ignore if Login_Page not registered or credentials not provided
        }
      }

      // Try clicking the sidebar link if present
      try {
        if (await this.sidebar_customer_segment.isVisible()) {
          await this.click_sidebar_customer_segment();
        } else {
          // fallback: directly navigate to segmentation url
          await this.navigate();
        }
      } catch (e) {
        await this.navigate();
      }

      // final verification
      await this.page.waitForLoadState('networkidle');
      await expect(this.btn_create_segment).toBeVisible();
      await expect(this.input_search_segments).toBeVisible();
    } catch (error) {
      throw new Error('Failed to prepare Customer Segmentation page: ' + error);
    }
  }

  async verify_dashboard_summary_cards() {
    await expect(this.card_total_segments).toBeVisible();
    await expect(this.card_active_segments).toBeVisible();
    await expect(this.card_estimated_reach).toBeVisible();
    await expect(this.card_rules_applied).toBeVisible();
  }

  async verify_dashboard_summary_cards_displayed() {
    return this.verify_dashboard_summary_cards();
  }

  async verify_create_segment_button_visible() {
    await expect(this.btn_create_segment).toBeVisible();
    await expect(this.btn_create_segment).toBeEnabled();
  }

  async verify_search_box_visible() {
    await expect(this.input_search_segments).toBeVisible();
  }

  async search_segment_by_name(name: string) {
    await this.playwrightFactory.fill(this.input_search_segments, name);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async click_all_tab() {
    await this.playwrightFactory.click(this.tab_all);
  }

  async click_active_tab() {
    await this.playwrightFactory.click(this.tab_active);
  }

  async click_inactive_tab() {
    await this.playwrightFactory.click(this.tab_inactive);
  }

  async verify_pagination_visible() {
    await expect(this.pagination).toBeVisible();
  }

  async verify_table_headers_displayed() {
    const headers = ['Segment Name', 'Criteria', 'Estimated reach', 'Status'];
    for (const h of headers) {
      const loc = this.page.getByRole('columnheader', { name: new RegExp(h, 'i') });
      await expect(loc).toBeVisible();
    }
  }

  async verify_status_badge_correct(rowIndex = 0, expectedText: string) {
    const row = this.segments_rows.nth(rowIndex);
    const badge = row.locator('.status-badge, .badge.status');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText(expectedText);
  }

  // Create segment flow - step 1
  async click_create_segment_button() {
    await this.playwrightFactory.click(this.btn_create_segment);
    await this.page.waitForLoadState('networkidle');
  }

  async verify_create_segment_page_loads() {
    await expect(this.stepper).toBeVisible();
    await expect(this.input_segment_name).toBeVisible();
    await expect(this.select_data_contract).toBeVisible();
  }

  async verify_stepper_steps_visible() {
    await expect(this.stepper).toBeVisible();
  }

  async verify_data_contract_dropdown_visible() {
    await expect(this.select_data_contract).toBeVisible();
  }

  async select_data_contract_by_label(label: string) {
    await this.playwrightFactory.selectByVisibleText(this.select_data_contract, label);
  }

  async enter_segment_name(name: string) {
    await this.playwrightFactory.fill(this.input_segment_name, name);
  }

  async verify_segment_name_mandatory_error_displayed() {
    const err = this.page.locator('text=Segment Name is required, text=This field is required').first();
    await expect(err).toBeVisible();
  }

  async verify_bucket_type_field_visible() {
    await expect(this.bucket_type_select).toBeVisible();
  }

  async select_bucket_type(bucket: string) {
    await this.playwrightFactory.selectByVisibleText(this.bucket_type_select, bucket);
  }

  async enter_segment_description(desc: string) {
    await this.playwrightFactory.fill(this.textarea_segment_description, desc);
  }

  async select_segment_status(statusLabel: string) {
    await this.playwrightFactory.selectByVisibleText(this.select_status, statusLabel);
  }

  async click_cancel_segment_creation() {
    await this.playwrightFactory.click(this.btn_cancel);
    await this.page.waitForLoadState('networkidle');
  }

  async verify_next_button_enabled() {
    await expect(this.btn_next).toBeEnabled();
  }

  async verify_next_button_disabled() {
    await expect(this.btn_next).toBeDisabled();
  }

  async click_next_segment_details() {
    await this.playwrightFactory.click(this.btn_next);
    await this.page.waitForLoadState('networkidle');
  }

  // Step 2 - Audience
  async verify_select_audience_page_loads() {
    await expect(this.audience_search_input).toBeVisible();
    await expect(this.audience_rows).toBeVisible();
  }

  async verify_step2_highlighted() {
    const step2 = this.stepper.getByText(/Step 2|Select Audience/i).first();
    await expect(step2).toBeVisible();
  }

  async verify_custom_audiences_section_visible() {
    const sect = this.page.locator('text=Customer Audiences, text=Custom Audiences').first();
    await expect(sect).toBeVisible();
  }

  async verify_audience_search_field_visible() {
    await expect(this.audience_search_input).toBeVisible();
  }

  async search_audience_by_name(name: string) {
    await this.playwrightFactory.fill(this.audience_search_input, name);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async verify_step2_next_button_disabled_on_load() {
    return this.verify_next_button_disabled();
  }

  async verify_step2_next_button_enabled_after_selection() {
    return this.verify_next_button_enabled();
  }

  async verify_audience_pool_section_visible() {
    return this.verify_audience_pool_details_displayed();
  }

  async verify_records_count_displayed() {
    await expect(this.selected_config_panel).toBeVisible();
  }

  async verify_rule_name_displayed(name?: string) {
    if (name) {
      await this.verify_rule_criteria_displayed(name);
    } else {
      await expect(this.selected_config_panel).toBeVisible();
    }
  }

  async verify_audience_name_displayed(name: string) {
    const row = this.audience_rows.filter({ hasText: name }).first();
    await expect(row).toBeVisible();
  }

  async verify_audience_metadata_displayed(name: string) {
    const row = this.audience_rows.filter({ hasText: name }).first();
    const meta = row.locator('.audience-meta, .meta');
    await expect(meta).toBeVisible();
  }

  async select_audience_by_name(name: string) {
    const row = this.audience_rows.filter({ hasText: name }).first();
    await this.playwrightFactory.click(row);
  }

  async verify_selected_audience_badge_displayed() {
    await expect(this.audience_selected_badge).toBeVisible();
  }

  async verify_no_records_message_displayed() {
    const noRec = this.page.locator('text=No records, text=No records found, text=No items').first();
    await expect(noRec).toBeVisible();
  }

  async click_next_select_audience() {
    await this.playwrightFactory.click(this.btn_next);
    await this.page.waitForLoadState('networkidle');
  }

  // Step 3 - Apply Rules
  async verify_apply_rules_page_loads() {
    await expect(this.rules_search_input).toBeVisible();
    await expect(this.rules_rows).toBeVisible();
  }

  async verify_stepper_progress_bar_visible() {
    const bar = this.page.locator('.progress, .stepper-progress');
    await expect(bar).toBeVisible();
  }

  async verify_rule_engine_section_visible() {
    const sect = this.page.locator('text=Rule Engine, text=Choose Rule from Rule Engine').first();
    await expect(sect).toBeVisible();
  }

  async verify_match_count_displayed() {
    const match = this.page.locator('.match-count, .matches').first();
    await expect(match).toBeVisible();
  }

  async verify_rule_criteria_displayed(name: string) {
    const row = this.rules_rows.filter({ hasText: name }).first();
    const criteria = row.locator('.criteria, .rule-criteria');
    await expect(criteria).toBeVisible();
  }

  async verify_search_rules_field_visible() {
    await expect(this.rules_search_input).toBeVisible();
  }

  async search_rule_by_name(name: string) {
    await this.playwrightFactory.fill(this.rules_search_input, name);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async select_rule_by_name(name: string) {
    const row = this.rules_rows.filter({ hasText: name }).first();
    await this.playwrightFactory.click(row);
  }

  async verify_selected_config_panel_updated() {
    await expect(this.selected_config_panel).toBeVisible();
  }

  async click_next_apply_rules() {
    await this.playwrightFactory.click(this.btn_next);
    await this.page.waitForLoadState('networkidle');
  }

  async click_previous_apply_rules() {
    const prev = this.page.getByRole('button', { name: /Previous/i }).first();
    await this.playwrightFactory.click(prev);
    await this.page.waitForLoadState('networkidle');
  }

  // Step 4 - Preview & Save
  async verify_segment_preview_page_loads() {
    await expect(this.preview_heading).toBeVisible();
  }

  async verify_section_headers_displayed() {
    const headers = ['Audience Pool', 'Applied Rules', 'Estimated Reach', 'Consent Verified'];
    for (const h of headers) {
      const loc = this.page.getByText(new RegExp(h, 'i')).first();
      await expect(loc).toBeVisible();
    }
  }

  async verify_segment_name_displayed_in_preview(name: string) {
    const title = this.page.locator('.segment-title, h1:has-text("' + name + '")');
    await expect(title).toBeVisible();
  }

  async verify_segment_description_displayed(desc: string) {
    const d = this.page.locator('.segment-description, p:has-text("' + desc + '")');
    await expect(d).toBeVisible();
  }

  async verify_estimated_reach_badge_displayed() {
    const badge = this.page.locator('.estimated-reach, .reach-badge');
    await expect(badge).toBeVisible();
  }

  async verify_applied_rule_count_badge_displayed() {
    const badge = this.page.locator('.applied-rule-count, .rules-count');
    await expect(badge).toBeVisible();
  }

  async verify_ready_to_save_status_displayed() {
    const status = this.page.locator('text=Ready to Save, text=Ready to save').first();
    await expect(status).toBeVisible();
  }

  async verify_segment_status_displayed(statusLabel: string) {
    const status = this.page.locator('.status-badge, .badge').filter({ hasText: statusLabel }).first();
    await expect(status).toBeVisible();
  }

  async verify_audience_pool_details_displayed() {
    const pool = this.page.locator('.audience-pool, .audience-pool-details');
    await expect(pool).toBeVisible();
  }

  async verify_applied_rules_details_displayed() {
    const rules = this.page.locator('.applied-rules, .rules-panel');
    await expect(rules).toBeVisible();
  }

  async verify_total_estimated_reach_displayed(expected?: string) {
    const val = this.page.locator('.estimated-reach-value, .reach-value');
    await expect(val).toBeVisible();
    if (expected) await expect(val).toContainText(expected);
  }

  async click_edit_segment_details() {
    const edit = this.page.getByRole('button', { name: /Edit/i }).first();
    await this.playwrightFactory.click(edit);
  }

  async click_edit_audience() {
    const edit = this.page.getByRole('button', { name: /Edit in Audience Pool|Edit Audience/i }).first();
    await this.playwrightFactory.click(edit);
  }

  async click_edit_rules() {
    const edit = this.page.getByRole('button', { name: /Edit in Applied Rules|Edit Rules/i }).first();
    await this.playwrightFactory.click(edit);
  }

  async click_previous_segment_preview() {
    const prev = this.page.getByRole('button', { name: /Previous/i }).first();
    await this.playwrightFactory.click(prev);
    await this.page.waitForLoadState('networkidle');
  }

  async click_save_segment() {
    await this.playwrightFactory.click(this.btn_save);
    await this.page.waitForLoadState('networkidle');
  }

  async verify_segment_saved_successfully() {
    const toast = this.page.locator('div[role="alert"]:has-text("saved")').first();
    await expect(toast).toBeVisible();
  }
}
