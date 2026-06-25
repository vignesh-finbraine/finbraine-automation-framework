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
  readonly sidebar_segmentation: Locator;
  readonly sidebar_rule_based_segmentation: Locator;
  readonly sidebar_customer_segment: Locator;

  // Create Segment (stepper) locators
  readonly stepper: Locator;
  readonly active_step: Locator;
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
  readonly no_batches_found_message: Locator;
  readonly audience_row: Locator;

  // Rules (step 3)
  readonly rules_search_input: Locator;
  readonly rules_rows: Locator;
  readonly ruleCards: Locator;
  readonly selected_config_panel: Locator;
  readonly rule_name: Locator;
  readonly no_strategies_found_message: Locator;

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

    this.tab_all = this.page.locator('button.tab:has-text("All"), button:has-text("All")').first();
    this.tab_active = this.page.locator('button.tab:has-text("Active"), button:has-text("Active")').first();
    this.tab_inactive = this.page.locator('button.tab:has-text("Inactive"), button:has-text("Inactive")').first();
    this.segments_rows = this.page.locator('table tbody tr, .segment-list .segment-row');
    this.pagination = this.page.locator('.pagination-row, .pagination, nav[aria-label="Pagination"], .pg-records-info, div.d-flex.gap-1').first();
    // Sidebar navigation
    this.sidebar_segmentation = this.page.getByRole('button', { name: /Segmentation/i }).first();
    this.sidebar_rule_based_segmentation = this.page.getByRole('button', { name: /Rule Based Segmentation/i }).first();
    this.sidebar_customer_segment = this.page.getByRole('link', { name: /Customer Segment/i }).first();

    // Stepper
    this.stepper = this.page.locator('div.stepper-step').first();
    this.active_step = this.page.locator('div.stepper-step.active');
    this.input_segment_name = this.page.locator('.seg-name-group').getByPlaceholder('Enter name...');
    this.select_data_contract = this.page.getByRole('combobox').first();
    this.bucket_type_select = this.page.getByLabel('Bucket Type').or(this.page.locator('input[placeholder*="bucket type"], input[aria-label*="Bucket Type"], select[name="bucketType"], .bucket-type input'));
    this.textarea_segment_description = this.page.locator('textarea[formcontrolname="description"]');
    this.select_status = this.page.getByRole('button', { name: /Active|Inactive/i });
    this.btn_next = this.page.getByRole('button', { name: /Next|Continue|Next: Select Audience/i }).first();
    this.btn_cancel = this.page.getByRole('button', { name: /Cancel/i }).first();

    // Audience
    this.audience_search_input = this.page.getByPlaceholder('Search audiences...');
    this.audience_rows = this.page.locator('//div[@class="ai d-flex align-items-center"][1]');
    this.audience_selected_badge = this.page.locator('span.ai-ct');
    this.no_batches_found_message = this.page.getByText('No batches found for this data contract.');
this.audience_row = this.page.locator('//div[@class="ai d-flex align-items-center"][1]')
    // Rules
    this.rules_search_input = this.page.getByPlaceholder('Search Rules').or(this.page.locator('input[placeholder*="Search rules"]'));
    this.rules_rows = this.page.locator('.rcard, .rule-row');
    this.ruleCards = this.page.locator('.rcard').filter({has: this.page.locator('.rdesc')});
    this.selected_config_panel = this.page.locator('.sc2').filter({hasText: 'Selected Config'});
    this.rule_name = this.page.locator('//div[@class="rcard d-flex align-items-start"][1]')
    this.no_strategies_found_message = this.page.getByText('No strategies found for this data contract.');
    
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

  // Navigate using Home page shortcuts (Home -> Segmentation -> Customer Segment)
  async navigate_from_home() {
    await this.page.waitForLoadState('networkidle');
    await this.playwrightFactory.waitForDomLoad();

    await expect(this.sidebar_segmentation).toBeVisible();
    await this.playwrightFactory.click(this.sidebar_segmentation);
    await this.page.waitForLoadState('networkidle');

    await expect(this.sidebar_rule_based_segmentation).toBeVisible();
    await this.playwrightFactory.click(this.sidebar_rule_based_segmentation);
    await this.page.waitForLoadState('networkidle');

    await expect(this.sidebar_customer_segment).toBeVisible();
    await this.playwrightFactory.click(this.sidebar_customer_segment);
    await this.page.waitForLoadState('networkidle');

    await this.verify_page_loaded();
  }

  // Listing page verifications
  async verify_page_loaded() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.btn_create_segment).toBeVisible();
    await expect(this.input_search_segments).toBeVisible();
  }

  async verify_Customer_Segmentation_page_loads() {
    try {
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
        }
      }

      try {
        if (await this.sidebar_customer_segment.isVisible()) {
          await this.click_sidebar_customer_segment();
        } else {
          await this.navigate();
        }
      } catch (e) {
        await this.navigate();
      }

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

  async search_segment_by_name(name = 'a') {
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
    await expect(this.pagination).toBeVisible({ timeout: 10000 });
  }

  async verify_table_headers_displayed() {
    const headers = ['Segment Name', 'Criteria', 'Estimated reach', 'Status'];
    for (const h of headers) {
      const loc = this.page.getByRole('columnheader', { name: new RegExp(h, 'i') });
      await expect(loc).toBeVisible();
    }
  }

  async verify_status_badge_correct(rowIndex = 0, expectedText: string = 'Active') {
  const row = this.page.locator('table tbody tr').nth(rowIndex);
  await expect(row.getByText(expectedText, { exact: true })).toBeVisible();
  }

  // Create segment flow - step 1
  async click_create_segment_button() {
    await this.playwrightFactory.click(this.btn_create_segment);
    await expect(this.stepper).toBeVisible({ timeout: 20000 });
  }

  async verify_create_segment_page_loads() {
    await expect(this.stepper).toBeVisible({ timeout: 20000 });
    await expect(this.input_segment_name).toBeVisible({ timeout: 10000 });
    await expect(this.select_data_contract).toBeVisible({ timeout: 10000 });
    await expect(this.btn_next).toBeVisible({ timeout: 10000 });
  }

  async verify_stepper_steps_visible() {
    await expect(this.stepper).toBeVisible({ timeout: 20000 });
  }

  async verify_data_contract_dropdown_visible() {
  await expect(this.select_data_contract).toBeVisible();
  await expect(this.select_data_contract).toBeEnabled();

  await expect.poll(async () => await this.select_data_contract.locator('option').count(),
      {
        timeout: 15000,
        message: 'Waiting for Data Contract options to load'
      }
    )
    .toBeGreaterThan(1);
  }

  async select_data_contract_by_label(label = 'Auto Bank') {

  await expect(this.select_data_contract).toBeVisible();
  await expect(this.select_data_contract).toBeEnabled();

  await expect
    .poll(
      async () => await this.select_data_contract.locator('option').count(),
      {
        timeout: 15000
      }
    )
    .toBeGreaterThan(1);

  const options = await this.select_data_contract.locator('option').allTextContents();

  const optionText = options.find(opt => opt.toLowerCase().includes(label.toLowerCase())
  );

  if (!optionText) {
    throw new Error(
      `Data Contract '${label}' not found. Available: ${options.join(', ')}`
    );
  }

  await this.select_data_contract.selectOption({label: optionText.trim(),});

  await expect(this.select_data_contract.locator('option:checked')).toContainText(optionText.trim());
  }

  async enter_segment_name(name = 'TestSegment') {
  const uniqueName = `${name}_${Date.now()}`;
  await this.input_segment_name.clear();
  await this.input_segment_name.fill(uniqueName);
  }

  async trigger_segment_name_validation() {
  await expect(this.input_segment_name).toBeVisible();
  await this.input_segment_name.click();
  await this.input_segment_name.press('Tab');
  }

  async verify_segment_name_mandatory_error_displayed() {
  const err = this.page.locator('.seg-name-error');
  await expect(err).toBeVisible();
  await expect(err).toHaveText('Please enter a name after the prefix');
  }

  async verify_bucket_type_field_visible() {
    await expect(this.bucket_type_select).toBeVisible();
  }

  async enter_bucket_type(bucket = 'TestBucket') {
  await expect(this.bucket_type_select).toBeVisible({ timeout: 10000 });

  await this.bucket_type_select.clear();
  await this.bucket_type_select.fill(bucket);

  await expect(this.bucket_type_select).toHaveValue(bucket);
  }

  async enter_segment_description( desc = 'Customer segmentation for Auto Bank marketing campaign.' ) {
  await expect(this.textarea_segment_description).toBeVisible({
  timeout: 10000
  });
  await this.textarea_segment_description.clear();
  await this.textarea_segment_description.fill(desc);
  await expect(this.textarea_segment_description).toHaveValue(desc);
  }

  async select_segment_status(statusLabel = 'Active') {
    const button = this.page.getByRole('button', { name: new RegExp(`^${statusLabel}$`, 'i') }).first();
    await this.playwrightFactory.click(button);
  }

  async click_cancel_segment_creation() {
  await this.playwrightFactory.click(this.btn_cancel);
  }

  async verify_next_button_enabled() {
  await expect(this.btn_next).toBeEnabled();
  }

  async verify_next_button_disabled() {
  await expect(this.btn_next).toBeDisabled();
  }

  async click_next_segment_details() {
  await this.btn_next.click();
  await expect(this.page.getByPlaceholder('Search audiences...')).toBeVisible({ timeout: 20000 });
  await expect(this.page.getByText(/Choose Audience Pool/i)).toBeVisible();
  }

  // Step 2 - Audience
  async verify_select_audience_page_loads() {
    await this.audience_row.click();
  }
  // await expect(
  //   this.page.getByPlaceholder('Search audiences...')
  // ).toBeVisible();

  // await expect(
  //   this.page.getByText('Choose Audience Pool')
  // ).toBeVisible();

  // await expect(
  //   this.page.getByRole('button', { name: /Previous/i })
  // ).toBeVisible();
  // }

  async verify_step2_highlighted() {
  await expect(this.active_step).toBeVisible();
  await expect(this.active_step.locator('.step-label')).toHaveText('Select Audience');
  await expect(this.active_step.locator('.step-circle span')).toHaveText('2');
  }

  async verify_custom_audiences_section_visible() {
  const audienceSection = this.page.locator('.fb').filter({
    has: this.page.getByPlaceholder('Search audiences...')
  });
  await expect(audienceSection).toBeVisible();
  }

  async verify_audience_search_field_visible() {
  await expect(this.audience_search_input).toBeVisible();
  }

  async search_audience_by_name(name: string) {
  await this.audience_search_input.fill(name);
  await this.page.keyboard.press('Enter');
  await this.page.waitForLoadState('networkidle');
  }

  async verify_step2_next_button_disabled_on_load() {
  const nextButton = this.page.getByRole('button', {name: /Next.*Apply Rules/i});
  await expect(nextButton).toHaveCount(0);
  }

  async verify_step2_next_button_enabled_after_selection() {
    return this.verify_next_button_enabled();
  }

  async verify_audience_pool_section_visible() {
    return this.verify_audience_pool_details_displayed();
  }

  async verify_records_count_displayed() {
    const recordsRow = this.selected_config_panel.locator('.cfg-r').filter({ hasText: 'Records' });
    await expect(recordsRow).toBeVisible();
    const recordsValue = recordsRow.locator('.cfg-v');
    await expect(recordsValue).toBeVisible();
    await expect(recordsValue).toHaveText(/\d+/);
  }

  async verify_rule_name_displayed(name?: string) {
    await expect(this.rule_name).toBeVisible();
    const ruleText = (await this.rule_name.textContent())?.trim();
    expect(ruleText).toBeTruthy();
    expect(ruleText).not.toBe('—');
    if (name) {
        expect(ruleText).toContain(name);
    }
  }

  async verify_audience_name_displayed(name?: string) {
  if (name) {
    await expect(this.page.getByText(name, { exact: false })).toBeVisible();
  } else {
    await expect(this.audience_rows.first()).toBeVisible();
  }
  }

  async verify_audience_metadata_displayed(name?: string) {
  const metadataPattern = /\d+\s+total,\s+\d+\s+valid,\s+\d+\s+rejected/i;
  if (name) {
    const row = this.audience_rows.filter({ hasText: name }).first();
    await expect(row).toBeVisible();
    await expect(row.getByText(metadataPattern)).toBeVisible();
  } else {
    await expect(this.page.getByText(metadataPattern)).toBeVisible();
  }
  }

  async select_audience_by_name(name?: string) {
    const row = name ? this.audience_rows.filter({ hasText: name }).first() : this.audience_rows.first();
    await this.playwrightFactory.click(row);
  }

  async verify_selected_audience_badge_displayed() {
  const badge = this.page.locator('div.ai.sel span.ai-ct');
  await expect(badge).toBeVisible();
  await expect(badge).toHaveText(/\d+/);
  }

  async verify_no_batches_found_message_displayed() {
  await expect(this.no_batches_found_message).toBeVisible();
  }

  async verify_no_strategies_found_message_displayed() {
  await expect(this.no_strategies_found_message).toBeVisible();
  }

  async click_next_select_audience() {
    await this.playwrightFactory.click(this.btn_next);
    await this.page.waitForLoadState('networkidle');
  }

  // Step 3 - Apply Rules
  async verify_apply_rules_page_loads() {
  await expect(this.rules_search_input).toBeVisible();
  await expect(this.page.getByRole('textbox', { name: /search rules/i }).or(this.page.getByPlaceholder('Search rules...'))).toBeVisible();
  await expect(this.page.getByText(/Choose Rule from Rule Engine/i)).toBeVisible();
  await expect(this.page.getByRole('button', { name: /Previous/i })).toBeVisible();
  }

  async verify_stepper_progress_bar_visible() {
  const stepper = this.page.locator('app-stepper');
  await expect(stepper.getByText('Segment Details', { exact: true })).toBeVisible();
  await expect(stepper.getByText('Select Audience', { exact: true })).toBeVisible();
  await expect(stepper.getByText('Apply Rules', { exact: true })).toBeVisible();
  await expect(stepper.getByText('Segment Preview', { exact: true })).toBeVisible();
  }

  async verify_rule_engine_section_visible() {
  await expect(this.page.getByText('Choose Rule from Rule Engine', { exact: true })).toBeVisible();
  }

  async verify_match_count_displayed() {
  const recordsRow = this.page.locator('.cfg-r', {has: this.page.getByText('Records', { exact: true })});
  await expect(recordsRow).toBeVisible();
  await expect(recordsRow.locator('span').last()).toHaveText(/\d+/);
  }

  async verify_rule_criteria_displayed() {
  const criteria = this.page.locator('.rdesc');
  await expect(criteria).toBeVisible();
  await expect(criteria).not.toBeEmpty();
  }

  async verify_search_rules_field_visible() {
    await expect(this.rules_search_input).toBeVisible();
  }

  async search_rule_by_name(name = 'a') {
    await this.playwrightFactory.fill(this.rules_search_input, name);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async select_rule_by_name(name?: string) {
    // const row = name ? this.rules_rows.filter({ hasText: name }).first() : this.rules_rows.first();
    // await this.playwrightFactory.click(row);
    await this.rule_name.click();
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
  await expect(this.page.getByText('Audience Pool', { exact: true }).last()).toBeVisible();
  await expect(this.page.getByText('Applied Rules', { exact: true }).last()).toBeVisible();
  await expect(this.page.getByText('Total Estimated Reach', { exact: true })).toBeVisible();
  }

  async verify_segment_name_displayed_in_preview(name?: string) {
  const previewCard = this.page.locator('.hero-c');
  if (name?.trim()) {
    await expect(previewCard.getByText(name.trim(), { exact: true })).toBeVisible();
  } else {
    await expect(previewCard).toContainText(/.+/);
  }
  }

  async verify_segment_description_displayed(desc?: string) {
  const previewCard = this.page.locator('.hero-c');
  if (desc?.trim()) {
    await expect(
      previewCard.getByText(desc.trim(), { exact: true })
    ).toBeVisible();
  } else {
    await expect(previewCard).toContainText(/.+/);
  }
  }

  async verify_estimated_reach_badge_displayed() {
  const badge = this.page.locator('.hc-tags .hc-tag').filter({ hasText: /estimated reach/i });
  await expect(badge).toBeVisible({timeout: 10000});
  }

  async verify_applied_rule_count_badge_displayed() {
  const badge = this.page.locator('.hc-tags .hc-tag').filter({ hasText: /rule/i });
  await expect(badge).toBeVisible({timeout: 10000});
  }

  async verify_ready_to_save_status_displayed() {
  const status = this.page.locator('.hc-tags .hc-tag').filter({ hasText: /ready to save/i });
  await expect(status).toBeVisible({timeout: 10000});
  }

  async verify_segment_status_displayed(statusLabel: string = 'Active') {
  const status = this.page.locator('.hc-tags .hc-tag').filter({ hasText: new RegExp(statusLabel, 'i') });
  await expect(status).toBeVisible({timeout: 10000});
  }

  async verify_audience_pool_details_displayed() {
  const isStep4 = await this.page.locator('.hero-c').isVisible().catch(() => false);
  if (isStep4) {
    const audiencePoolCard = this.page.locator('.prr').first();
    await expect(audiencePoolCard).toBeVisible({ timeout: 15000 });
    await expect(audiencePoolCard.locator('.prname')).toBeVisible();
    await expect(audiencePoolCard.locator('.prdesc')).toBeVisible();
    await expect(audiencePoolCard.getByRole('button', { name: /edit/i })).toBeVisible();
  } else {
    const audienceRow = this.page.locator('.sc2 .cfg-r').filter({
      has: this.page.locator('.cfg-k', { hasText: 'Audience Pool' })
    });
    await expect(audienceRow).toBeVisible({ timeout: 15000 });
    await expect(audienceRow.locator('.cfg-v')).not.toBeEmpty();
  }
  }

  async verify_applied_rules_details_displayed() {
  const appliedRuleCard = this.page.locator('.prr').nth(1);
  await expect(appliedRuleCard).toBeVisible({ timeout: 15000 });
  await expect(appliedRuleCard.locator('.prname')).toBeVisible();
  await expect(appliedRuleCard.locator('.prdesc')).toBeVisible();
  await expect(appliedRuleCard.getByRole('button', { name: /edit/i })).toBeVisible();
  }

  async verify_total_estimated_reach_displayed(expected?: string) {
  const reachCard = this.page.locator('.mc');
  await expect(reachCard).toBeVisible();
  await expect(reachCard.locator('.mc-lbl')).toContainText('Total Estimated Reach');
  await expect(reachCard.locator('.mc-val')).toBeVisible();
  await expect(reachCard.locator('.mc-ico')).toBeVisible();
  await expect(reachCard.locator('.mc-sub')).toContainText('From selected audience');
  if (expected) {
  await expect(reachCard.locator('.mc-val')).toContainText(expected);
  }
  }

  async click_edit_segment_details() {
    const edit = this.page.getByRole('button', { name: /Edit/i }).first();
    await this.playwrightFactory.click(edit);
  }

  async click_edit_audience() {
  const audiencePoolCard = this.page.locator('.prr').first();
  await this.playwrightFactory.click(audiencePoolCard.locator('.pr-btn'));
  }

  async click_edit_rules() {
  const ruleCard = this.page.locator('.prr').last();
  await this.playwrightFactory.click(ruleCard.locator('.pr-btn'));
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
  await expect(this.page.getByRole('heading', {name: /segment saved successfully/i})).toBeVisible();
  await this.page.getByRole('button', {name: /^OK$/i}).click();
  await this.page.waitForURL(/\/segmentation$/, {timeout: 30000});
  await expect(this.page.getByText('All Segments', { exact: true })).toBeVisible();
  }

}