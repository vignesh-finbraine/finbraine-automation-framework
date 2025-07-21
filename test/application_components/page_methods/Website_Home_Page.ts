import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class WEBSITE_HOME_PAGE {
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


readonly txt_Profile_Icon: Locator;
readonly txt_Login: Locator;
readonly txt_Find_an_Event: Locator;
readonly txt_Regions: Locator;
readonly txt_All_Regions: Locator;
readonly txt_South_East: Locator;
readonly txt_North_West: Locator;
readonly txt_Midlands: Locator;
readonly txt_London: Locator;
readonly tab_Event_Name: Locator;
readonly txt_Event_Search_Bar: Locator;
readonly btn_Search_Button: Locator;
readonly btn_Register_Button: Locator;
readonly tab_Charity_Name_Category: Locator;
readonly txt_Charity_Search_Bar: Locator;
readonly txt_Charity_Category_Baby: Locator;
readonly txt_More_Info: Locator;
readonly btn_Find_a_Charity: Locator;
readonly txt_Charity_Category_Search_Bar: Locator;
readonly txt_Baby: Locator;
readonly txt_Find_a_Charity_Menu: Locator;
readonly txt_Search_Charities_Submenu: Locator;
readonly tab_Search_Bar_Menu: Locator;
readonly txt_Type_Anything_to_Search: Locator;
readonly btn_Search_Button_Type_Anything: Locator;
readonly txt_Baby_Type_Anything_to_Search:Locator;
readonly btn_Partners: Locator;
readonly txt_Register_My_Charity_Submenu: Locator;
readonly btn_Next_Button: Locator;
















  
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
    this.txt_Profile_Icon=this.page.locator("#dropdownMenu")
    this.txt_Login=this.page.locator("//a[normalize-space()='Login']")
    this.txt_Find_an_Event=this.page.locator("//div[@class='header__item']//div[@title='Find an Event']")
    this.txt_Regions=this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Regions')])[1]")
    this.txt_All_Regions=this.page.locator("//div[@class='header__sub-body']//*[contains(text(),' All Regions')]")
    this.txt_South_East=this.page.locator("//div[@class='header__item']//*[contains(text(),'South East')]")
    this.txt_North_West=this.page.locator("//div[@class='header__item']//*[contains(text(),' North West')]")
    this.txt_Midlands=this.page.locator("//div[@class='header__item']//*[contains(text(),' Midlands')]")
    this.txt_London=this.page.locator("//div[@class='header__sub-body']//*[contains(text(),'London')]")
    this.tab_Event_Name=this.page.locator("//a[@id='event_name-tab']")
    this.txt_Event_Search_Bar=this.page.locator("//input[@placeholder='Search your Event ']")
    this.btn_Search_Button=this.page.locator("//span[normalize-space()='Search']")
    this.btn_Register_Button=this.page.locator("//*[contains(text(),'Royal Parks Half Marathon')]/ancestor::component-card8//button[@class='button button-primary button-sm button-primary-rfc']")
    this.tab_Charity_Name_Category=this.page.locator("//a[@id='charityname-tab']")
    this.txt_Charity_Search_Bar=this.page.locator("//input[@placeholder='Search for your charity, or the type of charity']")
    this.txt_Charity_Category_Baby=this.page.locator("//div[normalize-space()='Baby']")
    this.txt_More_Info=this.page.locator("(//*[contains(text(),'More info')])[1]")
    this.btn_Find_a_Charity=this.page.locator("//a[normalize-space()='Find a Charity']")
    this.txt_Charity_Category_Search_Bar=this.page.locator("//input[@placeholder='Search for a Charity Category or Keywords...']")
    this.txt_Baby=this.page.locator("(//*[contains(text(),'Baby')])[1]")
    this.txt_Find_a_Charity_Menu=this.page.locator("//div[@class='header__item']//div[@title='Find a Charity']")
    this.txt_Search_Charities_Submenu=this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Search Charities')])[1]")
    this.tab_Search_Bar_Menu=this.page.locator("//button[@title='Search']")
    this.txt_Type_Anything_to_Search=this.page.locator("//input[@placeholder='Type anything to search...']")
    this.btn_Search_Button_Type_Anything=this.page.locator("//component-button[@label='Search']//span[contains(text(),'Search')]")
    this.txt_Baby_Type_Anything_to_Search=this.page.locator("//h6[normalize-space()='Baby']")
    this.btn_Partners=this.page.locator("//div[@class='header__item']//div[@title='Partners']")
    this.txt_Register_My_Charity_Submenu=this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),' Register My Charity')])[1]")
    this.btn_Next_Button=this.page.locator("//span[normalize-space()='Next']")


    
    








  
    
  }
  

  
// Website home page- Flow
  
 async user_launches_application() {
    let url = process.env.APP_URL || "https://rfc-staging.sportsmediaagency.com/"
    await this.playwrightFactory.launchApplication(url);
  }

  async user_hover_profile_icon(){
    await this.txt_Profile_Icon.hover();
  }

  async user_verify_login(){
    await expect(this.txt_Login).toBeVisible();
  }

  async user_click_on_login(){
    await this.playwrightFactory.click(this.txt_Login)
  }

  async user_verify_find_an_event(){
    await expect(this.txt_Find_an_Event).toBeVisible();
  }

  async user_hover_on_find_an_event(){
    await this.txt_Find_an_Event.hover();
  }

  async user_verify_regions(){
    await expect(this.txt_Regions).toBeVisible();
  }

  async user_click_on_regions(){
    await this.playwrightFactory.click(this.txt_Regions);
  }

  async user_verify_all_regions(){
    await expect(this.txt_All_Regions).toBeVisible();
  }

  async user_click_on_all_regions(){
    await this.playwrightFactory.click(this.txt_All_Regions);
  }

  async user_verify_south_east(){
    await expect(this.txt_South_East).toBeVisible();
  }

  async user_click_south_east(){
    await this.playwrightFactory.click(this.txt_South_East);
  }

  async user_verify_north_west(){
    await expect(this.txt_North_West).toBeVisible();
  }

  async user_click_north_west(){
    await this.playwrightFactory.click(this.txt_North_West);
  }

  async user_verify_midlands(){
    await expect(this.txt_Midlands).toBeVisible();
  }

  async user_click_midlands(){
    await this.playwrightFactory.click(this.txt_Midlands);
  }

   async user_verify_london(){
    await expect(this.txt_London).toBeVisible();
  }

  async user_click_london(){
    await this.playwrightFactory.click(this.txt_London);
  }

  async user_verify_search_event_name_tab(){
    await expect(this.tab_Event_Name).toBeVisible();
  }

  async user_click_on_search_event_name_tab(){
    await this.playwrightFactory.click(this.tab_Event_Name);
  }

  async user_search_for_an_event(strsearchevent: string){
    await this.playwrightFactory.fill(this.txt_Event_Search_Bar, strsearchevent);


  }

  async user_verify_search_button(){
    await expect(this.btn_Search_Button).toBeVisible();
  }

  async user_clicks_search_button(){
    await this.playwrightFactory.click(this.btn_Search_Button);
    await this.page.waitForTimeout(10000);
  }

  async user_verify_register_button(){
    await expect(this.btn_Register_Button).toBeVisible();
    await this.page.waitForTimeout(5000);
  }

  async user_clicks_register_button(){
    await this.playwrightFactory.click(this.btn_Register_Button);
    await this.page.waitForTimeout(5000);
  }

  async user_verify_search_charity_category_name_tab(){
    await expect(this.tab_Charity_Name_Category).toBeVisible();
  }

  async user_search_for_charity_name(strsearchcharity: string){
    await this.playwrightFactory.fill(this.txt_Charity_Search_Bar, strsearchcharity);


  }

  async user_verify_charity_category_baby(){
    await expect(this.txt_Charity_Category_Baby).toBeVisible();
  }

  async user_clicks_charity_category_baby(){
    await this.playwrightFactory.click(this.txt_Charity_Category_Baby);
  }  

  async user_verify_more_info(){
    await expect(this.txt_More_Info).toBeVisible();
  }

  async user_clicks_more_info(){
    await this.playwrightFactory.clickForce(this.txt_More_Info);
  }
  
  async user_verify_find_a_charity(){
    await expect(this.btn_Find_a_Charity).toBeVisible();
  }

  async user_clicks_find_a_charity(){
    await this.playwrightFactory.click(this.btn_Find_a_Charity);
  }  

  async user_verify_search_charity_category(){
    await expect(this.txt_Charity_Category_Search_Bar).toBeVisible();
  }

  async user_search_for_category_name(strsearchcategory: string){
    await this.playwrightFactory.fill(this.txt_Charity_Category_Search_Bar, strsearchcategory);
    await this.page.waitForTimeout(3000);


  }

  async user_verify_find_a_charity_baby(){
    await expect(this.txt_Baby).toBeVisible();
  }

  async user_clicks_find_a_charity_baby(){
    await this.playwrightFactory.click(this.txt_Baby);
  }  

  async user_verify_find_a_charity_menu(){
    await expect(this.txt_Find_a_Charity_Menu).toBeVisible();
  }

  async user_hover_on_find_a_charity(){
    await this.txt_Find_a_Charity_Menu.hover();
  }

  async user_verify_search_charities_submenu(){
    await expect(this.txt_Search_Charities_Submenu).toBeVisible();
  }

  async user_clicks_search_charities_submenu(){
    await this.playwrightFactory.click(this.txt_Search_Charities_Submenu);
  }  

  async user_verify_menu_search_bar(){
    await expect(this.tab_Search_Bar_Menu).toBeVisible();
  }

  async user_clicks_menu_search_bar(){
    await this.playwrightFactory.click(this.tab_Search_Bar_Menu);
  }  

  async user_search_charity_category_in_type_anything_to_search(strtypeanything: string){
    await this.playwrightFactory.fill(this.txt_Type_Anything_to_Search, strtypeanything);
    await this.page.waitForTimeout(3000);
  }

  async user_verify_search_button_for_type_anything(){
    await expect(this.btn_Search_Button_Type_Anything).toBeVisible();
  }

  async user_clicks_search_button_for_type_anything(){
    await this.playwrightFactory.click(this.btn_Search_Button_Type_Anything);
  }  

  async user_verify_baby_for_type_anything_page(){
    await expect(this.txt_Baby_Type_Anything_to_Search).toBeVisible();
    await this.page.waitForTimeout(3000);
  }

  async user_clicks_baby_for_type_anything_page(){
    await this.playwrightFactory.click(this.txt_Baby_Type_Anything_to_Search);
    await this.page.waitForTimeout(5000);
  }  


  async user_verify_partners_menu(){
    await expect(this.btn_Partners).toBeVisible();
  }

  async user_hover_on_partners_menu(){
    await this.btn_Partners.hover();
  }

  async user_verify_register_my_charity_submenu(){
    await expect(this.txt_Register_My_Charity_Submenu).toBeVisible();
  }

  async user_clicks_register_my_charity_submenu(){
    await this.playwrightFactory.click(this.txt_Register_My_Charity_Submenu);
  }  

  async user_clicks_next_button(){
    await this.playwrightFactory.click(this.btn_Next_Button);
  }  

































  

 




















  


}










 
 







