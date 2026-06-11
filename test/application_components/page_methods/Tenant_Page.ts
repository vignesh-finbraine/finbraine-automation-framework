import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class TENANT_PAGE {

  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

  readonly emt_homepage_reporting!: Locator;
  readonly link_search_open!: Locator;


  //**Declare */
 
  readonly total_tenants: Locator;
  readonly search_bar: Locator;
  readonly tenant_list: Locator;
  readonly New_Tenant_btn: Locator;
  readonly edit_icon: Locator;
  readonly Edit_Tenant_Name: Locator;
  readonly Save_btn1: Locator;
  readonly Delete_Icon: Locator;
  readonly New_Tenant_txt: Locator;
  readonly admin_email_txt: Locator;
  readonly password_txt: Locator;
  readonly ok_btn: Locator;
  readonly delete_btn: Locator;
  


  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');


  /******************** Page Objects ************************/

  
  this.total_tenants = this.page.locator("//div[text()='Total Tenants']");
  this.search_bar = this.page.locator("//input[@placeholder='Search tenants by name…']");
  this.tenant_list = this.page.locator("//h6[text()='Tenant List']");
  this.New_Tenant_btn = this.page.locator("//button[@class='btn-create']");
  this.edit_icon = this.page.locator("//button[@title='Edit tenant']");
  this.Edit_Tenant_Name = this.page.locator("//input[@formcontrolname='name']");
  this.Save_btn1 = this.page.locator("//button[@type='submit']");
  this.Delete_Icon = this.page.locator("//button[@title='Delete tenant']");
  this.delete_btn = this.page.locator("//button[text()='Delete']");
  this.New_Tenant_txt = this.page.locator("//input[@formcontrolname='name']");
  this.admin_email_txt = this.page.locator("//input[@type='email']");
  this.password_txt = this.page.locator("//input[@formcontrolname='adminPassword']");
  this.ok_btn = this.page.locator("//button[text()='OK']");

  
  }


//verify Tenant page loading and UI elements are visible
  async user_verify_tenants_page_loading(){
    
    await expect(this.total_tenants).toBeVisible();
    await expect(this.search_bar).toBeVisible();
    await expect(this.tenant_list).toBeVisible();
    await expect(this.New_Tenant_btn).toBeVisible();

  }

  //verify Tenant creation functionality
async user_verify_tenant_creation(strTenantname: string, strAdminEmail: string, strPassword: string){

    await expect(this.New_Tenant_btn).toBeVisible();
    await this.playwrightFactory.click(this.New_Tenant_btn);
    await expect(this.page.locator("//h5[text()='New Tenant']")).toBeVisible();
    await this.playwrightFactory.click(this.New_Tenant_txt);
    await this.playwrightFactory.fill(this.New_Tenant_txt, strTenantname);
    await this.playwrightFactory.click(this.admin_email_txt);
    await this.playwrightFactory.fill(this.admin_email_txt, strAdminEmail);
    await this.playwrightFactory.click(this.password_txt);
    await this.playwrightFactory.fill(this.password_txt, strPassword);
    await this.playwrightFactory.click(this.Save_btn1);
    await expect(this.page.locator("//h3[text()='Tenant Created Successfully!']")).toBeVisible();
    await this.playwrightFactory.click(this.ok_btn);

 }

  //verify Search functionality
  async user_verify_search_functionality(strTenantname: string){

    await this.playwrightFactory.click(this.search_bar);
    await this.playwrightFactory.fill(this.search_bar, strTenantname);
    await this.page.keyboard.press('Enter');
    await expect(this.page.locator("//table[@class='etb-table']//td[contains(.,'"+strTenantname+"')]")).toBeVisible();
    await this.page.waitForTimeout(3000);

  }

  //verify Delete functionality
  async user_verify_Delete_functionality(strTenantname1: string){
    await this.playwrightFactory.click(this.Delete_Icon);
    await expect(this.page.locator("//h3[text()='Delete Tenant?']")).toBeVisible();
    await this.playwrightFactory.click(this.delete_btn);
    await expect(this.page.locator("//h3[text()='Tenant Deleted Successfully!']")).toBeVisible();
    await this.playwrightFactory.click(this.page.locator("//button[text()='OK']"));

  }

 


}
