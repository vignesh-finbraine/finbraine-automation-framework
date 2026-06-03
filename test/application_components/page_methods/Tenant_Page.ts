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
  readonly element_TenantManagement: Locator;
  readonly Tenant_Management_Drpdwn: Locator;
  readonly Tenants: Locator;
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
  


  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');


  /******************** Page Objects ************************/

  this.element_TenantManagement = this.page.locator("//span[text()='Tenant Management']");
  this.Tenant_Management_Drpdwn = this.page.locator("//span[text()='Tenant Management']");
  this.Tenants = this.page.locator("//span[text()='Tenants']");
  this.total_tenants = this.page.locator("//div[text()='Total Tenants']");
  this.search_bar = this.page.locator("//input[@placeholder='Search tenants by name…']");
  this.tenant_list = this.page.locator("//h6[text()='Tenant List']");
  this.New_Tenant_btn = this.page.locator("//button[@class='btn-create']");
  this.edit_icon = this.page.locator("//button[@title='Edit tenant']");
  this.Edit_Tenant_Name = this.page.locator("//input[@formcontrolname='name']");
  this.Save_btn1 = this.page.locator("//button[@type='submit']");
  this.Delete_Icon = this.page.locator("//button[@title='Delete tenant']");
  this.New_Tenant_txt = this.page.locator("//input[@formcontrolname='name']");
  this.admin_email_txt = this.page.locator("//input[@type='email']");
  this.password_txt = this.page.locator("//input[@formcontrolname='adminPassword']");
  this.ok_btn = this.page.locator("//button[text()='OK']");

  

  }

  async user_waituntil_tenantmanagementvisible(){
    await this.element_TenantManagement.waitFor();
  }

  async user_clicks_tenantmanagement(){
    await this.playwrightFactory.click(this.Tenant_Management_Drpdwn);
    await expect(this.Tenants).toBeVisible();

  }

  async user_clicks_tenants(){
    await this.playwrightFactory.click(this.Tenants);
  }

//verify Tenant page loading
  async user_verify_tenants_page_loading(){
    
    await expect(this.total_tenants).toBeVisible();
    await expect(this.search_bar).toBeVisible();
    await expect(this.tenant_list).toBeVisible();
    await expect(this.New_Tenant_btn).toBeVisible();

  }

  //verify Search functionality
  async user_verify_search_functionality(strTenantname: string){

    await this.playwrightFactory.click(this.search_bar);
    await this.playwrightFactory.fill(this.search_bar, strTenantname);
    await this.page.keyboard.press('Enter');
    await expect(this.page.locator("//table[@class='etb-table']//td[contains(.,'"+strTenantname+"')]")).toBeVisible();
    await this.page.waitForTimeout(3000);

  }

  //verify Edit functionality
  // async user_verify_edit_functionality(strTenantname1: string){
  // await this.playwrightFactory.click(this.edit_icon);
  // await this.Edit_Tenant_Name.clear();
  // await this.playwrightFactory.fill(this.Edit_Tenant_Name, strTenantname1);
  // await this.page.waitForTimeout(3000);
  // //await this.playwrightFactory.click(this.Save_btn);
  // await expect(this.page.locator("//table[@class='etb-table']//td[contains(.,'"+strTenantname1+"')]")).toBeVisible();

  // }

  async user_verify_Delete_functionality(strTenantname1: string){
    await this.playwrightFactory.click(this.Delete_Icon);
    await expect(this.page.locator("//h3[text()='Delete Tenant?']")).toBeVisible();

  }

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










}
