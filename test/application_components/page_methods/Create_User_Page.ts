import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import * as path from 'path';


export class CREATE_USER_PAGE {
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
readonly First_Name: Locator;
readonly Last_Name: Locator;
readonly Gender: Locator;
readonly DOB: Locator;
readonly Email: Locator;
readonly PhoneNumber: Locator;
readonly Roles: Locator;
readonly Male: Locator;
readonly Date: Locator;
readonly Select_Month: Locator;
readonly Select_Year: Locator;
readonly Role_Tittle: Locator;
readonly Save_Button: Locator;
readonly Success_msg: Locator;
readonly btn_OK: Locator;
readonly Set_Profile_picture: Locator;
readonly Add_Button: Locator;
readonly Profile_tab_close_btn: Locator;

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
   this.First_Name= this.page.locator("//input[@placeholder='Their first name']");
   this.Last_Name= this.page.locator("//input[@placeholder='Their last name']");
   this.Gender= this.page.locator("//*[contains(text(),'Gender')]/ancestor::component-select//span[@class='dropdown-btn']");
   this.Male= this.page.locator("//*[contains(text(),'Gender')]/ancestor::component-select//*[contains(text(),'Male')]");
   this.DOB= this.page.locator("//*[contains(text(),'Date of Birth ')]/ancestor::component-datetime//button[@class='datepicker__mask']")
   this.Select_Month= this.page.locator("//select[@title='Select month']");
   this.Select_Year=this.page.locator("//select[@title='Select year']");
   this.Date= this.page.locator("(//span[@class='custom-day'])[8]");
   this.Email= this.page.locator("//input[@placeholder='Their email address']");
   this.PhoneNumber= this.page.locator("//*[contains(text(),'Phone Number')]/ancestor::component-i18n-selector//input[@id='phoneNumber']");
   this.Roles= this.page.locator("//*[contains(text(),'Roles ')]/ancestor::component-select//span[@class='dropdown-btn']");
   this.Role_Tittle= this.page.locator("//*[contains(text(),'Roles ')]");
   this.Save_Button= this.page.locator("//*[contains(text(),'Save')]");
   this.Success_msg= this.page.locator("//*[contains(text(),'The user was successfully created!')]");
   this.btn_OK= this.page.locator("//button[@class='swal-button swal-button--confirm']");
   this.Set_Profile_picture= this.page.locator("//*[contains(text(),'Set Profile Picture')]");
   this.Add_Button=this.page.locator("//*[contains(text(),'Profile Photo')]/ancestor::div//*[contains(text(),'Add')]");
   this.Profile_tab_close_btn= this.page.locator("//*[contains(text(),'Profile Photo')]/ancestor::div//button[@class='modal__close']");
  
  }
  async user_enter_first_name(striteration: any){
     let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.First_Name,firstname);
  }
  async user_enter_last_name(strLastname: string){
    await this.playwrightFactory.fill(this.Last_Name, strLastname);
  }
  async user_select_gender(){
    await this.playwrightFactory.click(this.Gender);
    await this.playwrightFactory.click(this.Male);

  }
  async user_select_dob_month(strMonth: string){
    await this.playwrightFactory.click(this.DOB);
    await this.Select_Month.selectOption({label:'Apr'})
    //await this.playwrightFactory.clickForce(this.page.locator("//*[contains(text(),'"+strMonth+"')]"))

  }
  async user_select_dob_year_and_date(strYear: string){
   await this.Select_Year.selectOption({label:'2000'})
   //await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strYear+"')]/ancestor::select//*[contains(text(),'"+strYear+"')]"))
   await this.playwrightFactory.click(this.Date); 
  }
  async user_select_dob_date(strDate: string){
    await this.playwrightFactory.click(this.page.locator(""))
  }
  async user_enter_email(striteration: any){
    let Email = await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
    await this.playwrightFactory.fill(this.Email,Email); 
  }
  async user_enter_phonenumber(strPhonenumber: string){
    await this.playwrightFactory.fill(this.PhoneNumber, strPhonenumber);
  }
  async user_select_role(strRole: string){
    await this.playwrightFactory.click(this.Roles);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Roles ')]/ancestor::component-select//*[contains(text(),'"+strRole+"')]"));
    await this.playwrightFactory.click(this.Role_Tittle);
  }
  async user_click_save(){
    await this.playwrightFactory.click(this.Save_Button);
  }
  async user_verify_success_msg(){
    await expect(this.Success_msg).toContainText('The user was successfully created!');
  }
  async user_click_ok_button(){
    await this.playwrightFactory.click(this.btn_OK);
  }
  async user_click_set_profile_button(){
    await this.playwrightFactory.click(this.Set_Profile_picture);
  }
  async user_upload_photo(){
   // await this.playwrightFactory.click(this.Add_Button);
   // await this.Add_Button.setInputFiles('C:/RFC_TestAutomationframework/test/dmeeting bg7 - Copy 1  1 copy.jpg')
   // await this.page.waitForTimeout(3000);
   await this.page.getByRole('button', { name: 'Add' }).click();
  await this.page.getByRole('button', { name: 'Add' }).setInputFiles('bird.jpg');
  await this.page.getByRole('button', { name: 'Apply' }).click();
    await this.playwrightFactory.click(this.Profile_tab_close_btn);

  }
  async uploadImage(locator: Locator, filePath:string) {
      const rootPath = path.join(__dirname, '..', '..');
      const filePath1: string = path.join(rootPath, 'bird.jpg');
      const fileChooserPromise = this.page.waitForEvent('filechooser');
      await this.page.locator("//*[contains(text(),'Profile Photo')]/ancestor::div//*[contains(text(),'Add')]").click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(filePath1);
      await this.page.getByRole('button', { name: 'Apply' }).click();
    await this.playwrightFactory.click(this.Profile_tab_close_btn);    
    }
}


