import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import * as fs from 'fs';
//import path from 'path';
import * as path from 'path';


export class DATA_INGESTION_FORM {

    private page: Page;
    private testInfo: TestInfo;
    private playwrightFactory: PlaywrightFactoryActions;
    private dataFactory: DataFactory;
    private container: any;
    private databricks_sqlware: DatabricksSQLwarehouse;
    private databricks_dbfs: DatabricksFactoryDBFS;

    //**Declare */
    readonly txt_data_ingestion_title: Locator;
    readonly txt_data_ingestion_subtitle: Locator;
    readonly drp_data_contract: Locator;
    readonly drp_data_source: Locator;
    readonly drp_dataContractOptions: Locator;
    readonly btn_data_fetch: Locator;
    readonly btn_back: Locator;
    readonly btn_download_schema: Locator;
    readonly txt_upload_data: Locator;
    readonly input_upload_file: Locator;
    readonly btn_proceed_anyway: Locator;
    readonly btn_next_after_upload: Locator;
    readonly btn_finish: Locator;
    readonly tbl_data_ingestion_grid: Locator;
    readonly tbl_data_ingestion_governance: Locator;


    constructor(container: any) {

        this.container = container;
        this.page = container.resolve('page');
        this.testInfo = container.resolve('testInfo');
        this.playwrightFactory = container.resolve('playwrightFactory');
        this.dataFactory = container.resolve('dataFactory');
        this.databricks_sqlware = container.resolve('databricks_sqlware');
        this.databricks_dbfs = container.resolve('databricks_dbfs');

    /******************** Page Objects ************************/
    this.txt_data_ingestion_title = this.page.locator("//div[@class='page-title']");
    this.txt_data_ingestion_subtitle = this.page.locator("//div[@class='page-subtitle']");
    this.drp_dataContractOptions = this.page.locator("//select[@name='selectedContract']/option");
    this.drp_data_contract = this.page.locator("//select[@name='selectedContract']");
    this.drp_data_source = this.page.locator("//select[@name='selectedDataSource']");
    this.btn_data_fetch = this.page.locator("//button[contains(@class,'btn-fetch')]");
    this.btn_back = this.page.locator("//button[contains(@class,'btn-back-footer')]");
    this.btn_download_schema = this.page.locator("//button[contains(.,'Download Schema')]");    
    this.txt_upload_data =this.page.locator("//*[contains(text(),'Upload Data')]");
    this.input_upload_file = this.page.locator("//input[@type='file']");
    this.btn_proceed_anyway = this.page.locator("//button[contains(.,'Proceed Anyway')]");
    this.btn_next_after_upload = this.page.locator("//button[contains(.,'Next')]");
    this.btn_finish = this.page.locator("//button[contains(.,'Finish')]");
    this.tbl_data_ingestion_grid = this.page.locator("//table");    
    this.tbl_data_ingestion_governance = this.page.locator("//table");

    }


    async user_validate_data_ingestion_form_loaded() {
        await expect(this.txt_data_ingestion_title).toBeVisible();
        await expect(this.drp_data_contract).toBeVisible();
        await expect(this.drp_data_source).toBeVisible();
        await expect(this.btn_data_fetch).toBeVisible();
    }
    
    async user_click_data_contract_dropdown_display_all_options() {
        await expect(this.drp_data_contract).toBeVisible();

        // Click dropdown to display options
        await this.drp_data_contract.click();
        await this.page.waitForTimeout(4000);
        // await this.playwrightFactory.click(this.)

        // Read all displayed options
        // const options =await this.drp_data_contract.locator("option").allTextContents();
        // console.log("Displayed Data Contract Options:", options);
        // expect(options.length).toBeGreaterThan(1);
        // expect(options).toContain('DC_MU_AutoBank_Auto Bank Manual');
        // expect(options).toContain('DC_API_AutoBank_Auto Bank API');
        // expect(options).toContain('DC_MU_AutoBank_Auto Credit');
        // expect(options).toContain('DC_MU_AutoBank_Auto Banking');
    }

    async user_select_data_contract(contractName: string) {
        await expect(this.drp_data_contract).toBeVisible();
        await this.drp_data_contract.selectOption({
            label: contractName
        });
        await this.page.waitForTimeout(2000);
    }

    async user_click_data_fetch_button() {
        await expect(this.btn_data_fetch).toBeVisible();
        await expect(this.btn_data_fetch).toBeEnabled();
        await this.btn_data_fetch.click();
        await this.page.waitForTimeout(2000);
    }

   async user_validate_download_schema_successfully() {
        await expect(this.btn_download_schema).toBeVisible();
        await expect(this.btn_download_schema).toBeEnabled();
        await this.btn_download_schema.click();
    }

    async user_validate_upload_page_loaded() {
        await expect(this.txt_upload_data).toBeVisible();
        await expect(this.input_upload_file).toBeAttached();
    }

    // Uploading file
    async user_upload_file() {
         const creditCardCustomerFile = path.join(
            process.cwd(),
            'test',
            'data',
            'Upload_Auto_Credit_File',
            'Credit Card Customers (200).xlsx'
        );
        await this.input_upload_file.setInputFiles(creditCardCustomerFile);
        await this.page.waitForTimeout(5000);
    }

    // Uploading file with exctention: CSV or XLSX
    async user_validate_only_csv_xlsx_allowed() {
        await expect(this.input_upload_file).toBeAttached();
        const acceptedFormats = await this.input_upload_file.getAttribute('accept');
        expect(acceptedFormats).not.toBeNull();
        expect(acceptedFormats!).toContain('.csv');
        expect(acceptedFormats!).toContain('.xlsx');
    }

    async user_click_proceed_anyway_button() {
        if (await this.btn_proceed_anyway.isVisible()) {
            await this.btn_proceed_anyway.click();
            await this.page.waitForTimeout(3000);
        }
    }

    async user_wait_for_upload_summary_to_load() {
        await expect(this.page.getByText("Total Records", { exact: true })).toBeVisible({ timeout: 30000 });
        await expect(this.page.getByText("Valid Records", { exact: true })).toBeVisible({ timeout: 30000 });
        await expect(this.page.getByText("Duplicate Records", { exact: true })).toBeVisible({ timeout: 30000 });
        await expect(this.page.getByText("Invalid Records", { exact: true })).toBeVisible({ timeout: 30000 });
    }

    async user_click_next_after_upload() {
        await expect(this.btn_next_after_upload).toBeVisible({ timeout: 15000 });
        await expect(this.btn_next_after_upload).toBeEnabled({ timeout: 15000 });
        await this.btn_next_after_upload.scrollIntoViewIfNeeded();
        await this.btn_next_after_upload.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }

    async user_validate_mapping_screen_loaded() {
        await expect(this.page.locator("//table")).toBeVisible({ timeout: 15000 });
    }

    async user_click_finish_button() {
        await expect(this.btn_finish).toBeVisible({ timeout: 30000 });
        await expect(this.btn_finish).toBeEnabled({ timeout: 30000 });
        await this.btn_finish.click();
        await this.page.waitForLoadState('networkidle');
    }

    async user_validate_latest_uploaded_file_visible() {
        await expect(this.tbl_data_ingestion_governance).toBeVisible({ timeout: 30000 });
        await expect(this.page.locator("//*[contains(text(),'Credit Card Customers')]").first()).toBeVisible({ timeout: 30000 });

    }
    
}