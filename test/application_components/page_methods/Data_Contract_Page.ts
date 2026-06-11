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

  readonly  Data_Contract: Locator;
  readonly page_title: Locator;
  readonly source_type_drpdwn: Locator;
  readonly all_btn: Locator
  readonly active_btn: Locator;
  readonly draft_btn: Locator;
  readonly apply_filter_btn: Locator;
  readonly data_contract_btn: Locator;
  readonly data_contract_btn1: Locator;
  readonly data_contract_list: Locator;
  readonly pagination: Locator;
  readonly data_contract_file_list: Locator;
  readonly sorting_by_bank_btn: Locator;
  readonly datacontractname_header: Locator;
  readonly action_menu: Locator;
  readonly view_details_option: Locator;


  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');


  /******************** Page Objects ************************/

this.Data_Contract = this.page.locator("//span[text()='Data Contract']");
this.page_title = this.page.locator("//div[@class='page-title']");
this.source_type_drpdwn = this.page.locator("//select[@name='selectedSourceType']");
this.all_btn = this.page.locator("//div[@class='status-group']//button[text()=' All ']");
this.active_btn = this.page.locator("//div[@class='status-group']//button[text()=' Active ']");
this.draft_btn = this.page.locator("//div[@class='status-group']//button[text()=' Draft ']");
this.apply_filter_btn = this.page.locator("//button[text()='Apply']");
this.data_contract_btn = this.page.locator("//button[@class='btn-create']");
this.data_contract_btn1 = this.page.locator("//button[@class='btn-create']");
this.data_contract_list = this.page.locator("//table[@class='etb-table']");
this.pagination = this.page.locator("//ul[@class='pagination dark-pagination mb-0']");
this.data_contract_file_list = this.page.locator("//table[@class='etb-table']//tbody//tr//td[3][text()='File']");
this.sorting_by_bank_btn = this.page.locator("//th[text()='Bank ']");
this.datacontractname_header = this.page.locator("//th[text()='Contract Name ']");
this.action_menu = this.page.locator("//tr[1]//button[@class='dot-menu-btn']");
this.view_details_option = this.page.locator("//a[text()=' View Details ']");

  }

//**Page Methods */

//user verify UI elements on Data Contract page
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

  //user verify Data Contract listing
  async user_verify_data_contract_list(){
    const rowCount = await this.data_contract_list.locator('tbody tr').count();
    if(rowCount > 0){
      console.log(`Data Contract list has ${rowCount} entries.`);
    } else {
      console.log("Data Contract list is empty.");
    } 

  }

  //user clicks on Data Contract create button and verifies the create Data Contract page is displayed
  async user_clicks_data_contract_btn(){
    await this.playwrightFactory.click(this.data_contract_btn1);
    await expect(this.page.locator("//div[@class='page-title' and text()='Contract Details']")).toBeVisible();
  }
 
  //user verify filter by Source Type functionality
  async user_verify_filter_by_source_type(){
    await this.playwrightFactory.selectByVisibleText(this.source_type_drpdwn,"File");
    await expect(this.data_contract_file_list.first()).toBeVisible();
    await this.page.waitForTimeout(3000);

  }

  //user verify filter by Status functionality
  async user_verify_filter_by_status(strStatus: string){
    await this.playwrightFactory.click(this.active_btn);
    await this.playwrightFactory.click(this.apply_filter_btn);
    await expect(this.page.locator("//tbody/tr[1]//span[@class='badge-active']")).toBeVisible();
    
  }

  //user verify multiple conditions for filtering
  async user_verify_multiple_conditions(){
    await this.playwrightFactory.selectByVisibleText(this.source_type_drpdwn,"File");
    await this.playwrightFactory.click(this.active_btn);
    await this.playwrightFactory.click(this.apply_filter_btn);
    await expect(this.data_contract_file_list.first()).toBeVisible();
    await expect(this.page.locator("//tbody/tr[1]//span[@class='badge-active']")).toBeVisible();
  
  }

  //user verify no records found for filter criteria
  async user_verify_no_records_found(){
    await this.playwrightFactory.selectByVisibleText(this.source_type_drpdwn,"SFTP");
    await this.playwrightFactory.click(this.draft_btn);
    await this.playwrightFactory.click(this.apply_filter_btn);
    await expect(this.page.locator("//td[text()='No contracts found matching the filters']")).toBeVisible();
  }

  //user verify sorting by bank
  async user_verify_sorting_by_bank(){
    await this.playwrightFactory.click(this.sorting_by_bank_btn);
    const cells = await this.page.locator("//table[@class='etb-table']//tbody//tr//td[2]").allTextContents();
    const sortedCells = [...cells].sort();
    expect(cells).toEqual(sortedCells);
  }

  //user verify sorting by datacontract name
  async user_verify_sorting_by_datacontractname(){
  
    await this.playwrightFactory.click(this.datacontractname_header);
    const cells = await this.page.locator("//table[@class='etb-table']//tbody//tr//td[1]").allTextContents();
    const sortedCells = [...cells].sort();
    expect(cells).toEqual(sortedCells);
  }

//user verify action menu options three dots
 async user_verify_action_menu(){
  await this.playwrightFactory.click(this.action_menu);
  await expect(this.view_details_option).toBeVisible();
 }






}
