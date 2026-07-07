import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';

export class CAMPAIGN_MANAGEMENT {
    private page: Page;
    private testInfo: TestInfo;
    private playwrightFactory: PlaywrightFactoryActions;
    private container: any;
    readonly txt_username: Locator;
    readonly txt_password: Locator;
    readonly btn_login: Locator;
    readonly nav_campaigns_link: Locator;
    readonly campaign_listing_heading: Locator;
    readonly campaign_listing_table: Locator;
    readonly btn_create_campaign: Locator;
    readonly campaign_creation_heading: Locator;
    readonly txt_campaign_name: Locator;
    readonly from_date: Locator;
    readonly to_date: Locator;
    readonly description: Locator;
    readonly btn_next: Locator;
    readonly target_segment_heading: Locator;
    readonly drp_target_segment: Locator;
    readonly option_target_segment: Locator;
    readonly audience_insights: Locator;
    readonly total_records: Locator;
    readonly segment_size: Locator;
    readonly match_rate: Locator;
    readonly btn_target_segment_next: Locator;
    readonly define_workflow_heading: Locator;
    readonly btn_filter: Locator;
    readonly chip_single_channel: Locator;
    readonly btn_workflow_next: Locator;
    readonly schedule_launch_heading: Locator;
    readonly one_time_radio: Locator;
    readonly launch_campaign_button: Locator;
    readonly campaign_launch_success_heading: Locator;
    readonly campaign_launch_success_message: Locator;
    readonly campaign_launch_ok_button: Locator;
    readonly launched_campaign: Locator;
    readonly launched_campaign_status: Locator;
    readonly action_button: Locator;
    readonly view_details_option: Locator;
    readonly campaign_details_popup: Locator;
    readonly campaign_details_close_btn: Locator;
    readonly campaign_details_title: Locator;
    readonly edit_campaign_option: Locator;
    readonly edit_campaign_heading: Locator;
    readonly cancel_btn: Locator;
    readonly pause_campaign_option: Locator;
    readonly pause_campaign_popup: Locator;
    readonly pause_confirm_ok_btn: Locator;
    readonly campaign_paused_popup: Locator;
    readonly pause_success_ok_btn: Locator;
    readonly paused_btn: Locator;
    readonly unpause: Locator;
    readonly unpause_popup: Locator;
    readonly Campaign_Resumed_ok_btn: Locator;
    readonly duplicate_campaign_option: Locator;
    readonly duplicated_campaign_popup: Locator;
    readonly search_campaign_input: Locator;
    readonly searched_campaign_name: Locator;
    readonly all_tab: Locator;
    readonly active_tab: Locator;
    readonly scheduled_tab: Locator;
    readonly completed_tab: Locator;
    readonly draft_tab: Locator;
    readonly paused_tab: Locator;
    readonly campaign_name_label: Locator;
    readonly status_label: Locator;
    readonly duration_label: Locator;
    readonly workflow_label: Locator;
    readonly close_details_btn: Locator;


    /**
     * @param {any} container
     */
    constructor(container: any) {
        this.container = container;
        this.page = container.resolve('page');
        this.testInfo = container.resolve('testInfo');
        this.playwrightFactory = container.resolve('playwrightFactory');

        this.txt_username = this.page.locator('#username');
        this.txt_password = this.page.locator('#password');
        this.btn_login = this.page.locator('button:has-text("SIGN IN")');
        this.nav_campaigns_link = this.page.locator('a[href="/campaign-management"]');
        this.campaign_listing_heading = this.page.getByRole('heading', { name: /Campaign/i });
        this.campaign_listing_table = this.page.locator('table');
        this.btn_create_campaign = this.page.getByRole('button', { name: 'Create Campaign' });
        this.campaign_creation_heading = this.page.getByRole('heading', { name: /Create Campaign|Campaign Creation/i });
        this.txt_campaign_name = this.page.getByRole('textbox', { name: 'Enter name...' });
        this.from_date = this.page.locator('.date-field').first();
        this.to_date = this.page.locator('.date-field').nth(1);
        this.description = this.page.locator('textarea');
        this.btn_next = this.page.getByRole('button', { name: 'Next' });
        this.target_segment_heading = this.page.getByRole('heading', { name: /Target Segment/i });
        this.drp_target_segment = this.page.locator('div').filter({ hasText: /^Select a segment$/ }).nth(1);
        this.option_target_segment = this.page.getByText('Active users campaign');
        this.audience_insights = this.page.locator('.ta-insights-card');
        this.total_records = this.page.locator('.insight-item').nth(0).locator('.insight-value');
        this.segment_size = this.page.locator('.insight-item').nth(1).locator('.insight-value');
        this.match_rate = this.page.locator('.insight-item').nth(2).locator('.insight-value');
        this.btn_target_segment_next = this.page.locator('app-target-audience button.btn-next');
        this.define_workflow_heading = this.page.getByRole('heading', { name: 'Communication Workflows' });
        this.btn_filter = this.page.locator('button.btn-filter-toggle');
        this.chip_single_channel = this.page.getByRole('button', { name: 'Select', exact: true }).first();
        this.btn_workflow_next = this.page.locator('button.p-button-primary:has-text("Next")');
        this.schedule_launch_heading = this.page.locator('h3.sl-section-title', { hasText: 'Schedule & Launch' });
        this.one_time_radio = this.page.locator("//span[normalize-space()='One-time']/preceding-sibling::div");
        this.launch_campaign_button = this.page.locator("button:has-text('Launch Campaign')");
        this.campaign_launch_success_heading = this.page.getByRole('heading', { name: 'Campaign Launched' });
        this.campaign_launch_success_message = this.page.locator("p.ul-modal-message");
        this.campaign_launch_ok_button = this.page.getByRole('button', { name: 'OK' });
        this.launched_campaign = this.page.locator("div.card-name-block",{hasText: "AutoCampaign_Test"});
        this.launched_campaign_status = this.page.locator(".campaign-card").filter({has: this.page.locator("h3", {hasText: "CMPGN_Active users campaign_AutoCampaign_Test"})}).first();
        this.action_button = this.page.locator("button.btn-action").first();
        this.view_details_option = this.page.locator("//ul/li[normalize-space()='View Details']");
        this.campaign_details_popup = this.page.locator(".cd-modal");
        this.campaign_details_close_btn = this.page.locator("button.cd-btn-close");
        this.campaign_details_title = this.page.getByRole("heading", { name: "Campaign Details" });
        this.edit_campaign_option =  this.page.getByText("Edit Campaign", { exact: true });
        this.edit_campaign_heading = this.page.getByRole("heading", { name: "Edit Campaign", });
        this.cancel_btn = this.page.getByRole("button", { name: "Cancel", });
        this.pause_campaign_option = this.page.locator("div.action-dropdown li").filter({ hasText: "Pause" });
        this.pause_campaign_popup = this.page.getByRole("heading", { name: "Pause Campaign?", });
        this.pause_confirm_ok_btn = this.page.getByRole("button", { name: "OK" });
        this.campaign_paused_popup = this.page.getByRole("heading", { name: "Campaign Paused", });
        this.pause_success_ok_btn = this.page.getByRole("button", { name: "OK" });
        this.paused_btn = this.page.getByRole("button", { name: "Paused" });
        this.unpause = this.page.locator("button.btn-unpause-campaign").first();
        this.unpause_popup = this.page.getByRole("button", { name: "OK" });
        this.Campaign_Resumed_ok_btn = this.page.locator("//button[@class='ul-modal-btn ul-modal-btn--ok']");
        this.duplicate_campaign_option =  this.page.locator("//ul/li[normalize-space()='Duplicate']");
        this.duplicated_campaign_popup = this.page.getByRole("button", { name: "OK" });
        this.search_campaign_input = this.page.getByPlaceholder("Search campaigns...");
        this.searched_campaign_name = this.page.locator(".card-name-block").first();
        this.all_tab = this.page.locator("button.cl-tab", { hasText: "All" });
        this.active_tab = this.page.locator("button.cl-tab", { hasText: "Active" });
        this.scheduled_tab = this.page.locator("button.cl-tab", { hasText: "Scheduled" });
        this.completed_tab = this.page.locator("button.cl-tab", { hasText: "Completed" });
        this.draft_tab = this.page.locator("button.cl-tab", { hasText: "Draft" });
        this.paused_tab = this.page.locator("button.cl-tab", { hasText: "Paused" });
        this.campaign_details_popup = this.page.locator("h2.cd-modal-title");
        this.campaign_name_label = this.page.locator(".cd-field:has(.cd-label:text-is('CAMPAIGN NAME')) .cd-value");
        this.status_label = this.page.locator(".cd-field:has(.cd-label:text-is('STATUS')) .status-badge");
        this.duration_label = this.page.locator(".cd-field:has(.cd-label:text-is('CAMPAIGN DURATION')) .cd-value");
        this.workflow_label = this.page.locator(".cd-section-title:text-is('WORKFLOW')");
        this.close_details_btn = this.page.locator("button.cd-btn-close");





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
        console.log(await this.page.title());
        console.log(await this.page.url());
        await this.page.screenshot({ path: "after_login.png", fullPage: true });

    }

    async user_navigates_to_campaigns_page() {

        await expect(this.nav_campaigns_link).toBeVisible();
        await this.nav_campaigns_link.click();
        await this.page.waitForURL(/campaign-management/);
        await expect(this.btn_create_campaign).toBeVisible();
    }

    async verify_campaigns_page_loaded() {

        await expect(this.page).toHaveURL(/campaign-management/);
        await expect(this.btn_create_campaign).toBeVisible();
        await expect(this.campaign_listing_heading).toContainText("Campaigns");
    }

    async click_create_campaign_button() {

        await this.playwrightFactory.click(this.btn_create_campaign);
        await expect(this.campaign_creation_heading).toBeVisible();
        await expect(this.txt_campaign_name).toBeVisible();
    }

    async verify_navigated_to_campaign_creation_page() {

        await expect(this.campaign_creation_heading).toBeVisible();
    }

    async enter_campaign_name(campaignName: string) {

        await this.playwrightFactory.fill(this.txt_campaign_name, campaignName);
    }

    async enter_campaign_duration(duration: string) {

        await this.from_date.click();

        let dates = this.page.locator('button.cal-day:not([disabled])');
        await dates.first().waitFor({ state: 'visible', timeout: 10000 });
        await dates.first().click();
        await this.to_date.click();
        dates = this.page.locator('button.cal-day:not([disabled])');

        if (await dates.count() > 1) {
            await dates.nth(1).click();
        } else {
            await dates.first().click();
        }

    }
    async enter_campaign_description(description: string) {

        await this.playwrightFactory.fill(this.description, description);

    }

    async enter_campaign_details(campaignName: string, duration: string, description: string) {
        await this.enter_campaign_name(campaignName);
        await this.enter_campaign_duration(duration);
        await this.enter_campaign_description(description);
    }

    async verify_campaign_info_accepted() {
        await expect(this.txt_campaign_name).toHaveValue(/.+/);
        await expect(this.btn_next).toBeEnabled();
    }

    async click_next_button() {
        await this.playwrightFactory.click(this.btn_next);
        await this.page.waitForLoadState('networkidle');
    }

    async verify_navigated_to_target_segment_step() {
        await expect(this.target_segment_heading).toBeVisible();
    }

    async select_target_segment(segment: string) {

        await this.playwrightFactory.click(this.drp_target_segment);
        await this.page.getByText(segment, { exact: true }).click();
    }

    async verify_target_segment_selected(segment: string) {
        const selected = this.page.getByText(segment, { exact: true });
        await expect(selected).toBeVisible();
    }

    async verify_audience_insights_displayed() {

        await expect(this.audience_insights).toBeVisible();
        await expect(this.total_records).toBeVisible();
        await expect(this.total_records).not.toHaveText('');
        await expect(this.segment_size).toBeVisible();
        await expect(this.segment_size).not.toHaveText('');
        await expect(this.match_rate).toBeVisible();
        await expect(this.match_rate).toContainText('%');
        await this.click_next_button();

    }

    async click_target_segment_next() {
        await this.btn_target_segment_next.waitFor({ state: 'visible' });
        await this.btn_target_segment_next.click();
    }

    async verify_define_workflow_page_loaded() {
        await expect(this.define_workflow_heading).toBeVisible();

    }

    async navigate_to_define_workflow(
        campaignName: string,
        duration: string,
        description: string,
        segment: string
    ) {

        await this.user_navigates_to_campaigns_page();
        await this.click_create_campaign_button();
        await this.enter_campaign_details(campaignName, duration, description);
        await this.click_next_button();
        await this.select_target_segment(segment);
        await this.click_target_segment_next();
        await this.verify_define_workflow_page_loaded();
    }

    async click_filter() {

        await expect(this.btn_filter).toBeVisible({ timeout: 60000 });
        await this.btn_filter.click();
    }

    async select_single_channel_filter() {

        await expect(this.chip_single_channel).toBeVisible({ timeout: 60000 });
        await this.chip_single_channel.click();

    }

    async click_workflow_next() {

        await expect(this.btn_workflow_next).toBeVisible();
        await expect(this.btn_workflow_next).toBeEnabled();
        await this.btn_workflow_next.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verify_schedule_launch_page_loaded() {

        await expect(this.schedule_launch_heading).toBeVisible();
        await expect(this.schedule_launch_heading).toHaveText('Schedule & Launch');
    }

    async select_one_time_schedule() {

        await expect(this.one_time_radio).toBeVisible();
        await this.one_time_radio.click();
    }

    async click_launch_campaign_button() {

        await expect(this.launch_campaign_button).toBeVisible();
        await expect(this.launch_campaign_button).toBeEnabled();
        await this.launch_campaign_button.click();
    }

    async verify_campaign_launched_successfully() {

        await expect(this.campaign_launch_success_heading).toBeVisible();
        await expect(this.campaign_launch_success_message).toContainText("has been launched successfully");
    }

    async click_campaign_launch_ok_button() {

        await expect(this.campaign_launch_ok_button).toBeVisible();
        await this.campaign_launch_ok_button.click({ force: true });    
        await this.page.waitForLoadState('networkidle');
        await expect(this.action_button).toBeVisible();
    }

    async verify_newly_launched_campaign_in_list() {

    await expect(this.launched_campaign.first()).toBeVisible();

    }

    async verify_scheduled_campaign_displayed() {

         await expect(this.launched_campaign_status).toBeVisible();
         await expect(this.launched_campaign_status.first()).toHaveText(/Active/);
         await this.action_button.click();
         await this.view_details_option.click();
         await expect(this.campaign_details_popup).toBeVisible();
         await this.close_details_btn.click();

    }

    async click_edit_campaign() {

        await this.action_button.first().click();
        await expect(this.edit_campaign_option).toBeVisible();
        await this.edit_campaign_option.click();
        await this.cancel_btn.waitFor({ state: 'visible' });
        await this.cancel_btn.click();
        

    }

    async pause_campaign() {

        await this.action_button.first().click();
        await this.pause_campaign_option.click();
        await expect(this.pause_campaign_popup).toBeVisible();
        await this.pause_confirm_ok_btn.click();
        await expect(this.campaign_paused_popup).toBeVisible();
        await this.pause_success_ok_btn.click();
        await expect(this.campaign_paused_popup).toBeHidden();
    }

    async Unpause_Campaign() {

        await this.paused_btn.click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.unpause).toBeVisible();
        await this.unpause.click();
        await expect(this.unpause_popup).toBeVisible();
        await this.unpause_popup.click();
        await expect(this.Campaign_Resumed_ok_btn).toBeVisible();
        await this.Campaign_Resumed_ok_btn.click();

    }

    async duplicate_campaign() {

        await this.action_button.click();
        await this.duplicate_campaign_option.click();
        await expect(this.duplicated_campaign_popup).toBeVisible();
        await this.duplicated_campaign_popup.click();

    }

    async search_campaign() {

    const campaignName = "CMPGN";
    await this.search_campaign_input.fill(campaignName);
    await expect(this.searched_campaign_name).toContainText(campaignName);

   }

    async verify_campaign_status_tabs() {

        await this.active_tab.click();
        await expect(this.active_tab).toHaveClass(/active/);
        await this.draft_tab.click();
        await expect(this.draft_tab).toHaveClass(/active/);
        await this.scheduled_tab.click();
        await expect(this.scheduled_tab).toHaveClass(/active/);
        await this.completed_tab.click();
        await expect(this.completed_tab).toHaveClass(/active/);
        await this.paused_tab.click();
        await expect(this.paused_tab).toHaveClass(/active/);
        await this.all_tab.click();
        await expect(this.all_tab).toHaveClass(/active/);
    }

    async verify_campaign_details_displayed() {
        await this.action_button.click();
        await this.view_details_option.click();
        await expect(this.campaign_details_popup).toBeVisible();
        await expect(this.campaign_name_label).not.toHaveText("");
        await expect(this.status_label).toBeVisible();
        await expect(this.duration_label).not.toHaveText("");
        //await expect(this.workflow_label).not.toHaveText("");
        await this.close_details_btn.click();
        await expect(this.campaign_details_popup).toBeHidden();
    }


}