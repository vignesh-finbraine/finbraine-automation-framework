import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class EDIT_MARKETING_FOLDER {
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
readonly txt_Edit_Marketing_Folders_Title: Locator;
readonly txt_Name: Locator;
readonly txt_DropBox_URL: Locator;
readonly btn_Update_Button: Locator;
readonly txt_Store_Event_Folder: Locator;
readonly txt_Store_Event_Folder_Success_Message: Locator;
readonly btn_OK_Button: Locator;
readonly title_Marketing_folder:Locator;
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
     this.txt_Edit_Marketing_Folders_Title=this.page.locator("//*[contains(text(),'Edit Marketing Folders')]")
    this.txt_Name=this.page.locator("//input[@id='name']")
    this.txt_DropBox_URL=this.page.locator("//input[@id='dropbox_url']")
    this.btn_Update_Button=this.page.locator("//span[normalize-space()='Update']")
    this.txt_Store_Event_Folder=this.page.locator("//*[contains(text(),'Create Event Folder')]")
    this.txt_Store_Event_Folder_Success_Message=this.page.locator("//*[contains(text(),'Successfully updated the folder!')]")
    this.btn_OK_Button=this.page.locator("//button[normalize-space()='OK']")
    this.title_Marketing_folder=this.page.locator('//h1[normalize-space()="Marketing Folders"]') 
  }
  async user_verify_edit_marketing_folders_title(){
        await expect(this.txt_Edit_Marketing_Folders_Title).toBeVisible();
      }
 
      async user_edit_marketing_folder(strName: string){
        await this.playwrightFactory.fill(this.txt_Name, strName);
 
       
      }
 
      async user_edit_dropbox_url(strDropboxURL: string){
        await this.playwrightFactory.fill(this.txt_DropBox_URL, strDropboxURL);
      }
 
      async user_verify_and_clicks_on_update_button(){
        await expect(this.btn_Update_Button).toBeVisible();
        await this.btn_Update_Button.click();
      }
 
      async user_verifies_the_success_message(){
        await expect(this.txt_Store_Event_Folder).toBeVisible();
         await expect(this.txt_Store_Event_Folder_Success_Message).toBeVisible();
        await expect(this.txt_Store_Event_Folder_Success_Message).toContainText('Successfully updated the folder!')
 
      }
 
      async user_clicks_on_ok_button(){
        await expect(this.btn_OK_Button).toBeVisible();
        await this.btn_OK_Button.click();
        await this.page.waitForTimeout(5000);
 
      }
  
      async user_verify_Marketing_folder_page(){
        await expect (this.title_Marketing_folder).toBeVisible();
         await this.page.waitForTimeout(5000);
 
      }
}


