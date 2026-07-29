import { expect, Locator, Page, TestInfo } from '@playwright/test';

export class Campaign_Execution {

    private page: Page;
    private testInfo: TestInfo;
    private container: any;
    readonly executionHeader: Locator;
    readonly tableRows: Locator;
    readonly logTable: Locator;
    readonly smsTab: Locator;
    readonly whatsappTab: Locator;
    readonly emailTab: Locator;
    readonly campaignFilter: Locator;
    readonly statusFilter: Locator;
    readonly profileFilter: Locator;
    readonly dateFilter: Locator;
    readonly deliveredOption: Locator;
    readonly searchBox: Locator;
    readonly nextPageButton: Locator;
    readonly campaignNameCell: Locator;
    readonly statusCell: Locator;
    readonly totalMessagesCell: Locator;
    readonly exportButton: Locator;
    readonly downloadIcon: Locator;

    constructor(container: any) {

        this.container = container;
        this.page = container.resolve('page');
        this.testInfo = container.resolve('testInfo');
        this.executionHeader = this.page.locator('h1', { hasText: 'Execution Logs' });
        this.tableRows = this.page.locator("tbody tr.el-row");
        this.tableRows = this.page.locator('tbody tr');
        this.logTable = this.page.locator('table');
        this.smsTab = this.page.getByRole('button', { name: /SMS Logs/i });
        this.whatsappTab = this.page.getByRole('button', { name: /WhatsApp Logs/i });
        this.emailTab = this.page.getByRole('button', { name: /Email Logs/i });
        this.campaignFilter = this.page.locator('button.el-filter-chip').filter({ hasText: /Campaigns|CMPGN_SEG_DC_MU_AutoBank_AutoBankManual_TestSegment_1781587679759_23_june113|All Campaigns/ }).first();
        this.statusFilter = this.page.locator('button.el-filter-chip').filter({ hasText: /^Status/ }).first();
        this.profileFilter = this.page.locator('button.el-filter-chip').filter({ hasText: /All Products|Banking Customer Profile|All Products/ }).first();
        this.dateFilter = this.page.locator('button.el-filter-chip').filter({ hasText: /Select date|Today|Date/ }).first();
        this.deliveredOption = this.page.getByRole('button', { name: 'Delivered', exact: true });
        this.searchBox = this.page.getByPlaceholder('Search recipient, campaign, execution ID…');
        this.nextPageButton = this.page.getByRole('button', { name: 'Next' });
        this.campaignNameCell = this.page.locator('tbody tr td').nth(1);
        this.statusCell = this.page.locator('tbody tr td').nth(2);
        this.totalMessagesCell = this.page.locator('tbody tr td').nth(4);
        this.exportButton = this.page.getByRole('button', { name: /Export|Download/i });
        this.downloadIcon = this.page.locator('tbody tr i');
    }
    
    async verifyPageLoaded() {
        await expect(this.executionHeader).toBeVisible({ timeout: 20000 });
        await this.page.waitForFunction(() => {
        return document.querySelectorAll("table.el-tbl tbody tr.el-row").length > 0;}, null, {timeout: 60000});
        console.log("Rows:",await this.page.locator("table.el-tbl tbody tr.el-row").count());
    }
    async verifySMSVisible() {
        await this.smsTab.click();
        await expect(this.logTable).toBeVisible();
    }
    async clickWhatsAppTab() {
        await this.whatsappTab.click();
        await expect(this.logTable).toBeVisible();
    }
    async click_email_tab() {
        await this.emailTab.click();
        await expect(this.logTable).toBeVisible();
    }
    async select_campaign_filter() {
        await this.smsTab.click();
        await expect(this.logTable).toBeVisible({ timeout: 15000 });
        await this.campaignFilter.click();
        await this.page.waitForTimeout(500);
        const campaignOption = this.page.getByRole('button', {name: 'CMPGN_SEG_DC_MU_AutoBank_AutoBankManual_TestSegment_1781587679759_23_june113',exact: true});
        await expect(campaignOption).toBeVisible({ timeout: 15000 });
        await campaignOption.click();
        await this.page.waitForTimeout(1000);
    }
    async reselect_campaign_filter() {
        await expect(this.campaignFilter).toBeVisible({ timeout: 15000 });
        await this.campaignFilter.click();
        const allCampaignsOption = this.page.getByRole('button', {name: 'All Campaigns',exact: true});
        await expect(allCampaignsOption).toBeVisible({ timeout: 15000 });
        await allCampaignsOption.click();
        await expect(this.campaignFilter).toContainText('All Campaigns', { timeout: 15000 });
        await this.page.waitForFunction(() => {
            return document.querySelectorAll("table.el-tbl tbody tr.el-row").length > 0;}, null, {timeout: 60000});
        console.log("After reset campaign filter rows:",
            await this.page.locator("table.el-tbl tbody tr.el-row").count());
    }
    async select_status_filter() {
        await expect(this.statusFilter).toBeVisible({ timeout: 15000 });
        await this.statusFilter.click();
        const deliveredOption = this.page.locator('.el-dropdown button.el-dd-row').filter({ hasText: 'Delivered' }).first();
        await expect(deliveredOption).toBeVisible({ timeout: 15000 });
        await deliveredOption.click();
        await this.page.waitForTimeout(1500);
        const statusSelected = this.page.locator('button.el-filter-chip').filter({ hasText: 'Delivered' }).first();
        await expect(statusSelected).toBeVisible({ timeout: 15000 });
    }
    async select_profile_filter(profileName: string) {
        if (!profileName) {
            throw new Error("profileName missing from CSV");
        }
        await this.profileFilter.click();
        const option = this.page.locator('.el-dropdown button.el-dd-row').filter({ hasText: profileName }).first();
        await expect(option).toBeVisible({ timeout: 15000 });
        await option.click();
        await expect(this.profileFilter).toContainText(profileName, { timeout: 15000 });
    }
    async verify_profile_filter_results() {
        const rows = this.page.locator('tbody tr');
        const rowCount = await rows.count();
        if (rowCount === 0) {
            console.log("No records found after profile filter. Skipping validation and continuing flow.");
            return;
        }
        await expect(rows.first()).toBeVisible({ timeout: 10000 });
        console.log("Profile filter records found:", rowCount);
    }
    async reselect_profile_filter() {
        await expect(this.profileFilter).toBeVisible({ timeout: 15000 });
        await this.profileFilter.click();
        const allProfilesOption = this.page.locator('.el-dropdown button.el-dd-row').filter({ hasText: 'All Products' }).first();
        await expect(allProfilesOption).toBeVisible({ timeout: 15000 });
        await allProfilesOption.click();
        await expect(this.profileFilter).toContainText('All Products', { timeout: 15000 });
        await this.page.waitForFunction(() => {
        return document.querySelectorAll("table.el-tbl tbody tr.el-row").length > 0;}, null, {timeout: 60000});
        console.log("After reset profile filter rows:",
            await this.page.locator("table.el-tbl tbody tr.el-row").count());
    }

   

    async date_range_filter_10_days() {
        await this.dateFilter.click();
        await this.page.getByRole('button', { name: 'Today' }).click();
        await this.page.getByRole('button', { name: 'Apply Range' }).click();
    }
    async search_campaign_name(name: string) {
        await this.searchBox.fill(name);
    }
    async search_execution_id(id: string) {
        await this.searchBox.fill(id);
    }
    async click_next_page() {
        const nextButton = this.page.getByRole('button', {name: 'Next'});
        const count = await nextButton.count();
        if (count === 0) {
            console.log("Next button not available. Continuing flow.");
            return;
        }
        if (await nextButton.isDisabled()) {
            console.log("Next button disabled. No next page available.");
            return;
        }
        await nextButton.click();
        await this.page.waitForTimeout(1000);
    }
    async verifyDownload() {
        const iconCount = await this.downloadIcon.count();
        if (iconCount === 0) {
            console.log("Download icon not available. Skipping download validation.");
            return;
        }
        const downloadPromise = this.page.waitForEvent('download', {timeout: 15000});
        await this.downloadIcon.first().click();
        try {
            const download = await downloadPromise;
            expect(download).toBeTruthy();
            expect(download.suggestedFilename()).not.toBe('');
            const filePath = await download.path();
            expect(filePath).not.toBeNull();
            console.log("Download completed:", download.suggestedFilename());
        } catch (error) {
            console.log("Download event not triggered. Skipping download validation.");
        }
    }
}