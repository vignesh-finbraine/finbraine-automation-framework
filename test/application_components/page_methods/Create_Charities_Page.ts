import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class CREATE_CHARITIES {
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


readonly btn_Publish: Locator;
readonly txt_SuccessMaasage: Locator;
 
readonly txt_emailadress: Locator;
readonly txt_CharityName: Locator;
readonly txt_chatagoriesDropdown: Locator;
readonly txt_chatagoriesoption: Locator;
readonly txt_supportemail: Locator;
readonly txt_TCLink: Locator;
readonly txt_website: Locator;
readonly txt_phonenumber: Locator;
readonly txt_adress: Locator;
readonly txt_adressoption: Locator;
readonly txt_postcode: Locator;
readonly txt_city: Locator;
readonly txt_country: Locator;
readonly txt_CharityDiscription: Locator;
readonly SaveDraft: Locator;
readonly SEO_Config:Locator;
readonly Checkbox:Locator;
readonly MetaTitleDiscription:Locator;
readonly MetaDiscriptioncheckbox:Locator;
  readonly meta_discription:Locator;
  readonly Keyword:Locator;
  readonly RobotDropdown:Locator;
  readonly Index: Locator;
  readonly Robotname:Locator;
  readonly CanonicalURL: Locator;
  readonly txt_Facebook: Locator;
 










  
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

    this.btn_Publish = this.page.locator("//component-button[@label='Publish Now']");
    this.txt_SuccessMaasage = this.page.locator("//div[@class='swal-title']");
    this.emt_homepage_reporting = this.page.getByText('Reporting', { exact: true });
    this.link_search_open = this.page.getByRole('link', { name: 'Portal open' });
    this.txt_emailadress = this.page.locator("//input[@placeholder='Email Address']");
    this.txt_CharityName = this.page.locator("//input[@placeholder='e.g ASICS London']");
    this.txt_chatagoriesDropdown = this.page.locator("//*[contains(text(),'Category ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.txt_chatagoriesoption = this.page.locator("//*[contains(text(),' Category three1 ')]");
    this.txt_supportemail = this.page.getByRole('textbox', { name: 'Used for sending emails to' });
    this.txt_TCLink = this.page.locator("//input[@placeholder='T&Cs Link']");
    this.txt_website = this.page.locator("//input[@placeholder='Domain or URL']");
    this.txt_phonenumber = this.page.locator('#phoneNumber');
    this.txt_adress= this.page.locator("//input[@placeholder='Address']");
    this.txt_adressoption= this.page.getByText('London Luton Airport (LTN)');
    this.txt_postcode= this.page.locator("//input[@placeholder='Postcode']");
    this.txt_city= this.page.locator("//input[@placeholder='City']");
    this.txt_country= this.page.locator("//input[@placeholder='Country']");
   this.txt_CharityDiscription= this.page.frameLocator("//*[contains(text(),'Charity Description ')]/ancestor::component-textarea//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
   this.SaveDraft=this.page.locator("//component-button[@lefticon='assets/icons/save-light.svg']//button");
   this.SEO_Config=this.page.locator("//h2[normalize-space()='SEO Configuration']")
   this.Checkbox=this.page.locator("//*[contains(text(),'Meta Title ')]/ancestor::component-input//span[@class='checkbox__tick']")
   this.MetaTitleDiscription=this.page.locator("//input[@placeholder='Preferred search engine title']")
   this.MetaDiscriptioncheckbox=this.page.locator("//*[contains(text(),'Meta Description')]/ancestor::component-textarea//span[@class='checkbox__tick']")
   this.meta_discription=this.page.locator("//component-textarea[@label='Meta Description']//div//div//div//textarea")
   this.Keyword=this.page.locator("//span[@role='textbox']")
   this.RobotDropdown=this.page.locator("//*[contains(text(),'Robots')]/ancestor::component-select//span[@class='dropdown-btn']")
   this.Index=this.page.locator("//div[normalize-space()='Index']")
   this.Robotname=this.page.locator("//span[normalize-space()='Robots']")
   this.CanonicalURL=this.page.locator("//input[@placeholder='Preferred version of the webpage chosen by search engines']")
   this.txt_Facebook=this.page.locator("//component-input[@formcontrolname='facebook']//input[@placeholder='my_charity']");

  
 

    









    
  }
  

  



  // Create Charities
  

  async user_enter_email(striteration: any){
    let Email = await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
    await this.playwrightFactory.fill(this.txt_emailadress,Email);
  }
 
  async user_enter_charity_name(striteration: any){
    let charityname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.txt_CharityName,charityname);
  }
 
  async user_select_catagories_dropdown(strcategory: string){
 
    await this.playwrightFactory.click(this.txt_chatagoriesDropdown);
    await this.playwrightFactory.click(this.page.locator ("//*[contains(text(),'"+strcategory+"')]"));
  }
 
  async user_enter_supportemail(strSupportmail: string){
    await this.playwrightFactory.fill(this.txt_supportemail, strSupportmail);
  }
 
  async user_enter_tc_link(strTCLink: string){
    await this.playwrightFactory.fill(this.txt_TCLink, strTCLink);
  }
 
  async user_enter_website(strWebsite: string){
    await this.playwrightFactory.fill(this.txt_website, strWebsite);
  }
 
  async user_enter_phonenumber(strNumber: string){
    await this.playwrightFactory.fill(this.txt_phonenumber, strNumber);
  }
 
  async user_enter_adress(strAdress: string){
    await this.playwrightFactory.fill(this.txt_adress, strAdress);
    await this.playwrightFactory.click(this.txt_adressoption);
  }
  async user_enter_postcode(strPostcode: string){
    await this.playwrightFactory.fill(this.txt_postcode, strPostcode);
  }
 
  async user_enter_city(strCity: string){
    await this.playwrightFactory.fill(this.txt_city, strCity)
  }
  async user_enter_country(strCountry: string){
    await this.playwrightFactory.fill(this.txt_country, strCountry);
  }
 
  async user_enter_description(strDescription: string){
    await this.page.waitForTimeout(5000);
    await this.playwrightFactory.fill(this.txt_CharityDiscription, strDescription);
  }
  async user_click_publishbtn(){
    await this.playwrightFactory.click(this.btn_Publish);
  }
 
  async verify_success_massage(){
    await this.txt_SuccessMaasage.waitFor();
    await expect(this.txt_SuccessMaasage).toBeVisible();
  }
  async user_view_savedraftbtn(){
await this.playwrightFactory.click(this.SaveDraft);
}
async user_view_seo_configuration(){
  await this.page.evaluate(() => {
window.scrollBy(500, 1000); // Scroll down
});
await expect (this.SEO_Config).toBeVisible();
}
async user_clicks_checkbox(){
await this.playwrightFactory.click(this.Checkbox)
}
async user_enters_title(strtitle: string){
await this.playwrightFactory.fill(this.MetaTitleDiscription,strtitle)
 
}  
async user_clicks_discriptioncheckbox(){
await this.playwrightFactory.click(this.MetaDiscriptioncheckbox)
}
async user_enters_meta_discription(strtitle: string){
await this.playwrightFactory.fill(this.meta_discription,strtitle)
   
}  
async user_enters_text(strtitle: string){
await this.playwrightFactory.fill(this.Keyword,strtitle)
   
}  
async user_clicks_robot(strrobot:string){
await this.playwrightFactory.click(this.RobotDropdown)
await this.playwrightFactory.click(this.page.locator ("//div[normalize-space()='"+strrobot+"']"));
await this.playwrightFactory.click(this.Robotname)
}
async user_enters_url(strtitle: string){
await this.playwrightFactory.fill(this.CanonicalURL,strtitle)
     
}  
async user_enters_facebook_link(strfacebook: string){
    await this.playwrightFactory.fill(this.txt_Facebook, strfacebook);
  }

  

 




}


