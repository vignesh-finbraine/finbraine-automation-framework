import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';

export class DATA_CONTRACT_PAGE {
private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly emt_homepage_reporting!: Locator;
  readonly link_search_open!: Locator;


  readonly  Tenant_Management_Drpdwn: Locator;
  readonly  Data_Contract: Locator;
  readonly page_title: Locator;
  readonly source_type_drpdwn: Locator;
  readonly all_btn: Locator
  readonly active_btn: Locator;
  readonly draft_btn: Locator;
  readonly apply_filter_btn: Locator;
  readonly data_contract_btn: Locator;
  readonly data_contract_list: Locator;
  readonly pagination: Locator;



  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');


  /******************** Page Objects ************************/
this.Tenant_Management_Drpdwn = this.page.locator("//span[text()='Tenant Management']");
this.Data_Contract = this.page.locator("//span[text()='Data Contract']");
this.page_title = this.page.locator("//div[@class='page-title']");
this.source_type_drpdwn = this.page.locator("//select[@name='selectedSourceType']");
this.all_btn = this.page.locator("//div[@class='status-group']//button[text()=' All ']");
this.active_btn = this.page.locator("//div[@class='status-group']//button[text()=' Active ']");
this.draft_btn = this.page.locator("//div[@class='status-group']//button[text()=' Draft ']");
this.apply_filter_btn = this.page.locator("//button[text()='Apply']");
this.data_contract_btn = this.page.locator("//button[@class='btn-create']");
this.data_contract_list = this.page.locator("//table[@class='etb-table']");
this.pagination = this.page.locator("//ul[@class='pagination dark-pagination mb-0']");

  }

 async user_clicks_tenantmanagement(){
    await this.playwrightFactory.click(this.Tenant_Management_Drpdwn);
    await expect(this.Data_Contract).toBeVisible();
  }

  async user_clicks_datacontact(){
    await this.playwrightFactory.click(this.Data_Contract);
    await expect(this.page_title).toHaveText("Data Contracts");
  }

  async user_verify_ui_elements(){
    await expect(this.source_type_drpdwn).toBeVisible();
    await expect(this.all_btn).toBeVisible();
    await expect(this.active_btn).toBeVisible();
    await expect(this.draft_btn).toBeVisible();
    await expect(this.apply_filter_btn).toBeVisible();  
    await expect(this.data_contract_btn).toBeVisible();
    await expect(this.data_contract_list).toBeVisible();
    await expect(this.pagination).toBeVisible();
  }






}
