import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';

export class DATA_INGESTION_AND_VALIDATION {

    private page: Page;
    private testInfo: TestInfo;
    private playwrightFactory: PlaywrightFactoryActions;
    private dataFactory: DataFactory;
    private container: any;
    private databricks_sqlware: DatabricksSQLwarehouse;
    private databricks_dbfs: DatabricksFactoryDBFS;

   //**Declare */
    readonly txt_pageTitle: Locator;
    readonly txt_pageSubTitle: Locator;
    readonly drp_sourceType: Locator;
    readonly tbl_sourceTypeColumn: Locator;
    readonly btn_statusAll: Locator;
    readonly btn_statusActive: Locator;
    readonly btn_statusInactive: Locator;
    readonly btn_statusArchived: Locator;
    readonly btn_apply: Locator;
    readonly tbl_statusColumn: Locator;
    readonly btn_dataIngestion: Locator;
    readonly txt_dataIngestionTitle: Locator;
    readonly txt_dataIngestionSubTitle: Locator;
    readonly btn_threeDots: Locator;
    readonly lnk_editStatus: Locator;
    readonly txt_editStatusTitle: Locator;
    readonly rdo_inactiveStatus: Locator;
    readonly btn_saveStatus: Locator;
    readonly txt_statusUpdatedSuccessfully: Locator;
    readonly btn_okStatusPopup: Locator;
    readonly lnk_viewDetails: Locator;
    readonly txt_ingestionDetailsTitle: Locator;
    readonly btn_ingestionDetailsCloseIcon: Locator;
    readonly btn_ingestionDetailsClose: Locator;
    readonly btn_headerPrevious: Locator;
    readonly btn_headerNext: Locator;
    readonly btn_firstPage: Locator;
    readonly btn_previousPage: Locator;
    readonly btn_nextPage: Locator;
    readonly btn_lastPage: Locator;


    constructor(container: any) {

        this.container = container;
        this.page = container.resolve('page');
        this.testInfo = container.resolve('testInfo');
        this.playwrightFactory = container.resolve('playwrightFactory');
        this.dataFactory = container.resolve('dataFactory');
        this.databricks_sqlware = container.resolve('databricks_sqlware');
        this.databricks_dbfs = container.resolve('databricks_dbfs');


    /******************** Page Objects ************************/
        this.drp_sourceType = this.page.locator("//select[@name='selectedSourceType']");
        this.tbl_sourceTypeColumn = this.page.locator("//table//tbody//tr//td[3]");
        this.txt_pageTitle = this.page.locator("//div[@class='page-title' and contains(text(),'Data Ingestion & Validation')]");
        this.txt_pageSubTitle = this.page.locator("//div[contains(@class,'page-subtitle')]");
        this.btn_dataIngestion = this.page.locator("//button[contains(@class,'btn-create')]");
        this.btn_statusAll = this.page.locator("//button[contains(@class,'status-btn') and normalize-space()='All']");
        this.btn_statusActive = this.page.locator("//button[contains(@class,'status-btn') and normalize-space()='Active']");
        this.btn_statusInactive = this.page.locator("//button[contains(@class,'status-btn') and normalize-space()='Inactive']");
        this.btn_statusArchived = this.page.locator("//button[contains(@class,'status-btn') and normalize-space()='Archived']");
        this.btn_apply = this.page.locator("//button[contains(@class,'btn-apply')]");
        this.tbl_statusColumn = this.page.locator("//table//tbody//tr//td[contains(@class,'status')]");
        this.btn_dataIngestion = this.page.locator("//button[contains(@class,'btn-create')]");
        this.txt_dataIngestionTitle = this.page.locator("//div[@class='page-title' and contains(text(),'Data Ingestion')]");
        this.txt_dataIngestionSubTitle = this.page.locator("//div[contains(@class,'page-subtitle')]");
        this.btn_threeDots = this.page.locator("(//button[contains(@class,'dot-menu-btn')])[1]");
        this.lnk_editStatus = this.page.locator("//a[contains(@class,'action-item') and contains(.,'Edit Status')]");
        this.txt_editStatusTitle = this.page.locator("//div[contains(@class,'detail-modal-title') and contains(.,'Edit Status')]");
        this.rdo_inactiveStatus = this.page.locator("(//input[@name='editStatusValue'])[2]");
        this.btn_saveStatus = this.page.locator("//button[contains(@class,'btn-save-modal')]");
        this.txt_statusUpdatedSuccessfully = this.page.locator("//h3[contains(@class,'ul-modal-title') and contains(.,'Status Updated Successfully')]");
        this.btn_okStatusPopup = this.page.locator("//button[normalize-space()='OK']");
        this.lnk_viewDetails = this.page.locator("//a[contains(@class,'action-item') and contains(.,'View Details')]");
        this.txt_ingestionDetailsTitle = this.page.locator("//div[contains(@class,'detail-modal-title') and contains(.,'Ingestion Details')]");
        this.btn_ingestionDetailsCloseIcon = this.page.locator("//button[contains(@class,'detail-modal-close')]");
        this.btn_ingestionDetailsClose = this.page.locator("//button[normalize-space()='Close']");
        this.btn_headerPrevious = this.page.locator("(//button[contains(@class,'page-nav-btn')])[1]");
        this.btn_headerNext = this.page.locator("(//button[contains(@class,'page-nav-btn')])[2]");
        this.btn_firstPage = this.page.locator("//button[normalize-space()='First']");
        this.btn_previousPage = this.page.locator("//button[normalize-space()='Previous']");
        this.btn_nextPage = this.page.locator("//button[normalize-space()='Next']");
        this.btn_lastPage = this.page.locator("//button[normalize-space()='Last']");

    }

  
    async user_validate_data_ingestion_validation_page_loaded() {
        await expect(this.txt_pageTitle).toBeVisible();
        await expect(this.txt_pageTitle).toContainText('Data Ingestion & Validation');
        await expect(this.txt_pageSubTitle).toBeVisible();
        await expect(this.btn_dataIngestion).toBeVisible();
    }

    async user_validate_source_type_options() {
    await expect(this.drp_sourceType).toBeVisible();
    const options = await this.drp_sourceType.locator('option').allTextContents();
    expect(options).toEqual([
        'All',
        'Manual Upload',
        'API',
        'SFTP'
    ]);
    }

    async user_select_manual_upload_and_validate_results() {
        await this.drp_sourceType.selectOption('ManualUpload');
        await this.page.waitForTimeout(3000);
        const sourceTypes = await this.tbl_sourceTypeColumn.allTextContents();
        for (const sourceType of sourceTypes) {
            expect(sourceType.trim()).toContain('Manual Upload');
        }
    }

    async user_select_api_and_validate_results() {
        await this.drp_sourceType.selectOption('API');
        await this.page.waitForTimeout(3000);
        const sourceTypes = await this.tbl_sourceTypeColumn.allTextContents();
        for (const sourceType of sourceTypes) {
            expect(sourceType.trim()).toContain('API');
        }
    }

    async user_select_sftp_and_validate_results() {
        await this.drp_sourceType.selectOption('SFTP');
        await this.page.waitForTimeout(3000);
        const sourceTypes = await this.tbl_sourceTypeColumn.allTextContents();
        for (const sourceType of sourceTypes) {
            expect(sourceType.trim()).toContain('SFTP');
        }
    } 

    async user_select_active_status_and_validate_records() {
        await this.playwrightFactory.click(this.btn_statusActive);
        await this.playwrightFactory.click(this.btn_apply);
        await this.page.waitForLoadState('networkidle');
        const statuses = await this.page.locator("//tbody//tr//td[contains(.,'Active')]").allTextContents();
        for (const status of statuses) {
            expect(status.trim()).toContain('Active');
        }
    }

    async user_select_inactive_status_and_validate_records() {
        await this.playwrightFactory.click(this.btn_statusInactive);
        await this.playwrightFactory.click(this.btn_apply);
        await this.page.waitForLoadState('networkidle');
        const statuses = await this.page.locator("//tbody//tr//td[contains(.,'Inactive')]").allTextContents();
        for (const status of statuses) {
            expect(status.trim()).toContain('Inactive');
        }
    }

    async user_select_archived_status_and_validate_records() {
        await this.playwrightFactory.click(this.btn_statusArchived);
        await this.playwrightFactory.click(this.btn_apply);
        await this.page.waitForLoadState('networkidle');
        const statuses = await this.page.locator("//tbody//tr//td[contains(.,'Archived')]").allTextContents();
        for (const status of statuses) {
            expect(status.trim()).toContain('Archived');
        }
    }

    async user_select_all_status_and_validate_records() {
        await this.playwrightFactory.click(this.btn_statusAll);
        await this.playwrightFactory.click(this.btn_apply);
        await this.page.waitForLoadState('networkidle');
        const totalRows = await this.page.locator("//tbody//tr").count();
        expect(totalRows).toBeGreaterThan(0);
    }

    async user_click_data_ingestion_button() {
        await this.playwrightFactory.click(this.btn_dataIngestion);
        await this.page.waitForLoadState('networkidle');
    }

    async user_validate_data_ingestion_form_is_visible_and_clickable() {
        await expect(this.txt_dataIngestionTitle).toBeVisible();
        await expect(this.txt_dataIngestionTitle).toContainText('Data Ingestion');
        await expect(this.txt_dataIngestionSubTitle).toBeVisible();
        await expect(this.txt_dataIngestionSubTitle).toContainText('Select a contract and data source');
    }

    async user_click_first_record_three_dots() {
        await expect(this.btn_threeDots).toBeVisible();
        await this.btn_threeDots.click();
    }

    async user_click_edit_status_option() {
        await expect(this.lnk_editStatus).toBeVisible();
        await this.lnk_editStatus.click();
    }

    async user_validate_edit_status_popup_opened() {
        await expect(this.txt_editStatusTitle).toBeVisible();
        await expect(this.txt_editStatusTitle).toContainText('Edit Status');
    }

    async user_change_status_to_inactive() {
        await expect(this.rdo_inactiveStatus).toBeVisible();
        await this.rdo_inactiveStatus.check();
    }

    async user_click_save_status_button() {
        await expect(this.btn_saveStatus).toBeVisible();
        await expect(this.btn_saveStatus).toBeEnabled();
        await this.btn_saveStatus.click();
    }

    async user_validate_status_updated_successfully_popup() {
        await expect(this.txt_statusUpdatedSuccessfully).toBeVisible();
        await expect(this.txt_statusUpdatedSuccessfully).toContainText('Status Updated Successfully');
    }

    async user_click_ok_on_status_success_popup() {
        await expect(this.btn_okStatusPopup).toBeVisible();
        await this.btn_okStatusPopup.click();
        await this.page.waitForLoadState('networkidle');
    }

    async user_validate_redirected_to_data_ingestion_validation_page() {
        await expect(this.txt_pageTitle).toBeVisible();
        await expect(this.txt_pageTitle).toContainText('Data Ingestion & Validation');
    }

    async user_click_view_details_option() {
            await expect(this.lnk_viewDetails).toBeVisible();
            await this.lnk_viewDetails.click();
    }

    async user_validate_ingestion_details_popup_opened() {
            await expect(this.txt_ingestionDetailsTitle).toBeVisible({timeout:15000});
            await expect(this.txt_ingestionDetailsTitle).toContainText('Ingestion Details');
        }
    
    async user_close_ingestion_details_popup_using_x(waitTime: number = 5000) {
        await expect(this.txt_ingestionDetailsTitle).toBeVisible();
        await this.page.waitForTimeout(waitTime);
        await this.btn_ingestionDetailsCloseIcon.click();
        await expect(this.txt_ingestionDetailsTitle).not.toBeVisible();
    }

    async user_close_ingestion_details_popup_using_close_button(waitTime: number = 5000) {
        await expect(this.txt_ingestionDetailsTitle).toBeVisible();
        await this.page.waitForTimeout(waitTime);
        await this.btn_ingestionDetailsClose.click();
        await expect(this.txt_ingestionDetailsTitle).not.toBeVisible();
    }

    async user_verify_pagination() {
        // Header Right Arrow (>)
        await expect(this.btn_headerNext).toBeVisible();
        await expect(this.btn_headerNext).toBeEnabled();
        await this.playwrightFactory.click(this.btn_headerNext);
        await this.page.waitForTimeout(2000);

        // Header Left Arrow (<)
        await expect(this.btn_headerPrevious).toBeVisible();
        await expect(this.btn_headerPrevious).toBeEnabled();
        await this.playwrightFactory.click(this.btn_headerPrevious);
        await this.page.waitForTimeout(2000);

        // Footer Next
        await expect(this.btn_nextPage).toBeVisible();
        await expect(this.btn_nextPage).toBeEnabled();
        await this.playwrightFactory.click(this.btn_nextPage);
        await this.page.waitForTimeout(2000);

        // Footer Last
        await expect(this.btn_lastPage).toBeVisible();
        await expect(this.btn_lastPage).toBeEnabled();
        await this.playwrightFactory.click(this.btn_lastPage);
        await this.page.waitForTimeout(2000);

        // Footer Previous
        await expect(this.btn_previousPage).toBeVisible();
        await expect(this.btn_previousPage).toBeEnabled();
        await this.playwrightFactory.click(this.btn_previousPage);
        await this.page.waitForTimeout(2000);

        // Footer First
        await expect(this.btn_firstPage).toBeVisible();
        await expect(this.btn_firstPage).toBeEnabled();
        await this.playwrightFactory.click(this.btn_firstPage);
        await this.page.waitForTimeout(2000);
    }


}