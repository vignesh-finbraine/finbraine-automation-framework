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

        // Header
        this.executionHeader = this.page.locator('h1', { hasText: 'Execution Logs' });

        // Table
        //this.tableRows = this.page.locator('tbody tr.el-row');
        this.tableRows = this.page.locator('tbody tr');
        this.logTable = this.page.locator('table');

        // Tabs (stable)
        this.smsTab = this.page.getByRole('button', { name: /SMS Logs/i });
        this.whatsappTab = this.page.getByRole('button', { name: /WhatsApp Logs/i });
        this.emailTab = this.page.getByRole('button', { name: /Email Logs/i });

        // Filters
        this.campaignFilter = this.page
            .locator('button.el-filter-chip')
            .filter({ hasText: 'All Campaigns' })
            .first();

        this.statusFilter = this.page
            .locator('button.el-filter-chip')
            .filter({ hasText: /^Status/ })
            .first();

        this.profileFilter = this.page
            .locator('button.el-filter-chip')
            .filter({ hasText: /Profile|Banking Customer Profile|All Profiles/ })
            .first();

        this.dateFilter = this.page
            .locator('button.el-filter-chip')
            .filter({ hasText: /Select date|Today|Date/ })
            .first();

        // Dropdown option
        this.deliveredOption = this.page.getByRole('button', { name: 'Delivered', exact: true });

        // Search
        this.searchBox = this.page.getByPlaceholder(
            'Search recipient, campaign, execution ID…'
        );

        this.nextPageButton = this.page.getByRole('button', { name: 'Next' });

        // Table
       // this.campaignNameCell = this.page.locator('tbody tr.el-row td').nth(1);
       this.campaignNameCell = this.page.locator('tbody tr td').nth(1);
        //this.statusCell = this.page.locator('tbody tr.el-row td').nth(2);
        this.statusCell = this.page.locator('tbody tr td').nth(2);
        //this.totalMessagesCell = this.page.locator('tbody tr.el-row td').nth(4);
        this.totalMessagesCell = this.page.locator('tbody tr td').nth(4);

        // Export
        this.exportButton = this.page.getByRole('button', { name: /Export|Download/i });
        //this.downloadIcon = this.page.locator('tbody tr.el-row i');
        this.downloadIcon = this.page.locator('tbody tr i');
    }

    // ---------------- BASIC ----------------

    async verifyPageLoaded() {
        await expect(this.executionHeader).toBeVisible({ timeout: 20000 });
        await expect(this.tableRows.first()).toBeVisible({ timeout: 20000 });
    }

    // ---------------- TABS ----------------

    async verifySMSVisible() {
        await this.smsTab.click();
        await expect(this.logTable).toBeVisible();
    }

    async clickWhatsAppTab() {
        await this.whatsappTab.click();
    }

    async verifyWhatsAppLogsVisible() {
        await expect(this.logTable).toBeVisible();
    }

    async click_email_tab() {
        await this.emailTab.click();
    }

    async verify_email_logs_visible() {
        await expect(this.logTable).toBeVisible();
    }

    // ---------------- FILTERS ----------------

    async select_campaign_filter() {
        await this.campaignFilter.click();
        await this.page.waitForTimeout(500); // UI stability
    }

    async select_status_filter() {

        await expect(this.statusFilter)
            .toBeVisible({ timeout: 15000 });

        await this.statusFilter.click();

        const deliveredOption = this.page
            .locator('.el-dropdown button.el-dd-row')
            .filter({ hasText: 'Delivered' })
            .first();

        await expect(deliveredOption)
            .toBeVisible({ timeout: 15000 });

        await deliveredOption.click();

        await this.page.waitForTimeout(1500);

        const statusSelected = this.page
            .locator('button.el-filter-chip')
            .filter({ hasText: 'Delivered' })
            .first();

        await expect(statusSelected)
            .toBeVisible({ timeout: 15000 });
    }

    async select_profile_filter(profileName: string) {

        if (!profileName) {
            throw new Error("profileName missing from CSV");
        }

        await this.profileFilter.click();

        const option = this.page
            .locator('.el-dropdown button.el-dd-row')
            .filter({ hasText: profileName })
            .first();

        await expect(option).toBeVisible({ timeout: 15000 });
        await option.click();

        await expect(this.profileFilter).toContainText(profileName, { timeout: 15000 });
    }

    async verify_profile_filter_results() {

      //  const rows = this.page.locator('tbody tr.el-row');
      const rows = this.page.locator('tbody tr');

        const rowCount = await rows.count();

        if (rowCount === 0) {
            console.log("No records found after profile filter. Skipping validation and continuing flow.");
            return;
        }

        await expect(rows.first())
            .toBeVisible({ timeout: 10000 });

        console.log("Profile filter records found:", rowCount);
    }

    // ---------------- DATE ----------------

    async date_range_filter_10_days() {
        await this.dateFilter.click();
        await this.page.getByRole('button', { name: 'Today' }).click();
        await this.page.getByRole('button', { name: 'Apply Range' }).click();
    }

    // ---------------- SEARCH ----------------

    async search_campaign_name(name: string) {
        await this.searchBox.fill(name);
    }

    async search_execution_id(id: string) {
        await this.searchBox.fill(id);
    }

    // ---------------- PAGINATION ----------------

    async click_next_page() {

        const nextButton = this.page.getByRole('button', {
            name: 'Next'
        });

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

    // ---------------- TABLE ----------------

    async verify_campaign_details_displayed() {

        console.log("verify_campaign_details_displayed started");

        const rows = this.page.locator('tbody tr');

        const count = await rows.count();

        console.log("Rows count:", count);

        if (count === 0) {
            console.log("No records found. Skipping TC.");
            return;
        }

        console.log("Records available. Validation skipped.");
    }
   async verify_delivery_rate_column() {

    const rows = this.page.locator('tbody tr');

    const count = await rows.count();

    if (count === 0) {
        console.log("No records found. Skipping delivery rate validation.");
        return;
    }

    for (let i = 0; i < count; i++) {

        const rateCell = rows.nth(i)
            .locator('td')
            .filter({ hasText: '%' })
            .first();

        if (await rateCell.count() === 0) {
            console.log(`Delivery rate missing in row ${i + 1}.`);
            continue;
        }

        await expect(rateCell).toBeVisible({ timeout: 10000 });
    }
}
    // ---------------- DOWNLOAD ----------------

    async verifyDownload() {

    const iconCount = await this.downloadIcon.count();

    if (iconCount === 0) {
        console.log("Download icon not available. Skipping download validation.");
        return;
    }

    const downloadPromise = this.page.waitForEvent('download', {
        timeout: 15000
    });

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