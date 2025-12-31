import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
 
export class Create_Charity_Chatagory_Page {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;
 
  readonly emt_homepage_reporting: Locator;
  readonly link_search_open: Locator;
 
 
  //**Declare */
 
 
 
readonly txt_name: Locator;
 readonly element_dropdown: Locator;
 readonly element_dropdownoption: Locator;
 readonly element_colour: Locator;
 readonly btn_Publish: Locator;
 readonly txt_SuccessMaasage: Locator;
 readonly meta_description: Locator;
 readonly btn_OK: Locator;
 readonly select_site: Locator;
 readonly select_site_run_for_charity: Locator;
  readonly seo_configuration_section: Locator;
  readonly meta_title: Locator;
  readonly meta_title_title: Locator;
  readonly meta_description_title: Locator;
  readonly keywords_txt: Locator;
  readonly keywords_title: Locator;
  readonly select_robot_drpdwn: Locator;
  readonly robot_index: Locator;
  readonly canonical_url_title: Locator;
  readonly canonical_link: Locator;
  readonly save_draft_btn: Locator;
  readonly form_layout: Locator;
 
  /**
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DataFactory} dataFactory
   * @param {any} container
   * @param {DatabricksSQLwarehouse} databricks_sqlware;
   * @param {DatabricksFactoryDBFS} databricks_dbfs;
   */
 
  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');
 
    /******************** Page Objects ************************/
this.emt_homepage_reporting = this.page.getByText('Reporting', { exact: true });
    this.link_search_open = this.page.getByRole('link', { name: 'Portal open' });
    this.txt_name = this.page.locator("//input[@placeholder='Name']");
    this.element_dropdown = this.page.locator("//*[contains(text(),'Status ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.element_dropdownoption = this.page.locator("//div[normalize-space()='Active']");
    this.element_colour = this.page.locator("//input[@type='color']");
    this.btn_Publish = this.page.locator('//span[normalize-space()="Publish Now"]')
    this.txt_SuccessMaasage = this.page.locator("//div[@class='swal-title']");
    this.meta_description= this.page.locator("//*[contains(text(),'Meta Description ')]/ancestor::component-textarea//textarea[@class='editor__textarea ng-untouched ng-pristine ng-valid']");
    this.btn_OK= this.page.locator("//button[@class='swal-button swal-button--confirm']");
    this.select_site = this.page.locator("//*[contains(text(),'Site ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.select_site_run_for_charity = this.page.locator("//input[@aria-label='RunForCharity']");
    this.seo_configuration_section = this.page.locator("//h2[normalize-space()='SEO Configuration']");
    this.meta_title = this.page.locator("//input[@placeholder='Preferred search engine title']");
    this.meta_title_title = this.page.locator("//span[normalize-space()='Meta Title']");
    this.meta_description_title = this.page.locator("//span[normalize-space()='Meta Description']");
    this.keywords_txt = this.page.locator("//span[@role='textbox']");
    this.keywords_title = this.page.locator("//span[normalize-space()='Keywords']");
    this.select_robot_drpdwn = this.page.locator("//*[contains(text(),'Robots ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.robot_index = this.page.locator("//div[normalize-space()='Index']");
    this.canonical_url_title = this.page.locator("//span[normalize-space()='Canonical URL']");
    this.canonical_link = this.page.locator("//input[@placeholder='Preferred version of the webpage chosen by search engines']");
    this.save_draft_btn = this.page.locator("//component-button[@lefticon='assets/icons/save-light.svg']//button");
    this.form_layout = this.page.locator("//form[@id='createEventForm']//component-section[@sectiontitle='Details']/div[1]");
     
  }
 
  async user_enter_name(striteration : any){
let username = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
await this.playwrightFactory.fill(this.txt_name, username);
 
  }
 
 
  async user_select_dropdownoption_active(){
    await this.playwrightFactory.click(this.element_dropdown);
    await this.playwrightFactory.click(this.element_dropdownoption);
   
  }
 
  async user_select_colour(strColour: string){
    await this.playwrightFactory.click(this.element_colour);
    await this.playwrightFactory.fill(this.element_colour, strColour);
  }
 
  async user_click_publishbtn(){
    await this.playwrightFactory.click(this.btn_Publish);
  }
 
  async verify_success_massage(){
    await expect(this.txt_SuccessMaasage).toBeVisible();
   
  }
  async user_click_ok_button(){
   
    await this.playwrightFactory.click(this.btn_OK);
    await this.page.waitForTimeout(5000);
  }
  async user_verifies_and_clicks_site_drpdwn(){
  await expect(this.select_site).toBeVisible();
  await this.playwrightFactory.click(this.select_site);
  await expect(this.select_site_run_for_charity).toBeChecked();
  await this.playwrightFactory.click(this.select_site);
  }
  async user_verifies_seo_configuration_section(){
  await expect(this.seo_configuration_section).toBeVisible();
}
 
async user_verifies_and_fills_meta_title_field(strMetaTitle: string){
  await expect(this.meta_title).toBeVisible();
  await this.playwrightFactory.click(this.meta_title);
  await this.playwrightFactory.fill(this.meta_title, strMetaTitle);
  await this.playwrightFactory.click(this.meta_title_title);
}
 
async user_verifies_and_fills_meta_description_field(strMetaDescription: string){
  await expect(this.meta_description).toBeVisible();
  await expect(this.meta_description).toBeEmpty();
  await this.playwrightFactory.click(this.meta_description);
  await this.playwrightFactory.fill(this.meta_description, strMetaDescription);
  await this.playwrightFactory.click(this.meta_description_title);
}
 
async user_verifies_and_fills_keyword_field(strKeyword: string){
  await expect(this.keywords_txt).toBeVisible();
  await this.playwrightFactory.click(this.keywords_txt);
  await this.playwrightFactory.fill(this.keywords_txt, strKeyword);
  await this.playwrightFactory.click(this.keywords_title);
}
 
async user_verifies_and_selects_robot(){
  await expect(this.select_robot_drpdwn).toBeVisible();
  await this.playwrightFactory.click(this.select_robot_drpdwn);
  await this.playwrightFactory.click(this.robot_index);
  await this.playwrightFactory.click(this.select_robot_drpdwn);
}
 
async user_verifies_and_fills_canonical_link_field(strCanonicalLink: string){
  await expect(this.canonical_link).toBeVisible();
  await this.playwrightFactory.click(this.canonical_link);
  await this.playwrightFactory.fill(this.canonical_link, strCanonicalLink);
  await this.playwrightFactory.click(this.canonical_url_title);
}
 
async user_verifies_save_as_draft(){
  await expect(this.save_draft_btn).toBeEnabled();
}
async user_verifies_image_option_not_available(){
  await expect(this.form_layout).toBeVisible();
}
 
}
 
 
 
 