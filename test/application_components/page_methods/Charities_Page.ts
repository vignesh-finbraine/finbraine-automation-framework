import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
 
export class CHARITIES_PAGE {
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
readonly btn_create: Locator;
readonly btn_charities: Locator;
readonly txt_SearchBox: Locator;
readonly btn_Catagories: Locator;
readonly List_Catagories: Locator;
readonly Catagory_Name: Locator;
readonly No_of_Charities: Locator;
//readonly Delete_Catgories_btn: Locator;
readonly Delete_Massage: Locator;
readonly OK_btn: Locator;
//readonly Edit_btn: Locator;
readonly Charity_Name: Locator;
readonly Name:Locator;
  readonly Status:Locator;
  readonly Categorypage: Locator;
  readonly Membership:Locator;
  readonly AccountManager:Locator;
  readonly ExpireDate:Locator;
  readonly Itemperpage:Locator;
  readonly ForwardBtn:Locator;
  readonly coloumn_one: Locator;
  readonly coloumn_two: Locator;
  readonly coloumn_three: Locator;
  //readonly items_per_page: Locator;
  readonly items_per_page_drpdwn: Locator;
  readonly items_per_page_number: Locator;
  readonly page_number_2:Locator;
  readonly page_backward_btn: Locator;
  readonly page_number_1 : Locator;
  readonly navigate_to_charity: Locator;
  readonly btn_Filter: Locator;
  readonly txt_Filter_Charities_Title: Locator;
readonly txt_Category_Title: Locator;
readonly txt_Category: Locator;
readonly drpdwn_Baby: Locator;
readonly txt_Status_Title: Locator;
readonly txt_Status: Locator;
readonly drpdwn_Active: Locator;
readonly txt_Membership_Type_Title: Locator;
readonly txt_Membership_Type: Locator;
readonly drpdwn_Classic: Locator;
readonly txt_Deleted_Title: Locator;
readonly txt_Deleted: Locator;
readonly drpdwn_With: Locator;
readonly btn_Apply: Locator;
readonly txt_Filtered_Charity_Category_Baby: Locator;
readonly catagories_list: Locator;
readonly Charity_list: Locator;
readonly Order_by_btn: Locator;
readonly Asceding: Locator;
readonly Apply_btn: Locator;
readonly Export_btn: Locator;
readonly Export_denied_msg: Locator;
readonly Filter_catagory_search_box: Locator;
 
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
    this.btn_create = this.page.locator("//component-button[@label='Create']//button//span");
    this.btn_charities = this.page.locator("//*[contains(text(),'Charities')]/ancestor::div//a[@class='nav__link']");
    this.txt_SearchBox= this.page.locator("//input[@placeholder='Press ENTER to search']");
    this.btn_Catagories= this.page.locator('a').filter({ hasText: 'Categories' });;
    this.List_Catagories= this.page.locator("//div[text()='Categories']/ancestor::component-table");
    this.Catagory_Name= this.page.locator("(//div[@class='table__details'])[1]");
    this.No_of_Charities= this.page.locator("//div[text()='Categories']/ancestor::component-table//td[normalize-space()='Abcd']/ancestor::tr[1]/td[2]");
   // this.Delete_Catgories_btn= this.page.locator("(//button[@class='table__button danger d-block'])[1]");
    this.Delete_Massage= this.page.locator("//*[contains(text(),'Are you sure?')]");
    this.OK_btn= this.page.locator("//button[normalize-space()='OK']");
    //this.Edit_btn= this.page.locator("(//button[@class='table__button primary d-block'])[1]");
    this.Charity_Name= this.page.locator("(//div[@class='table__item'])[1]");
      this.Name=this.page.locator("//th[normalize-space()='Name']")
      this.Status=this.page.locator("//th[normalize-space()='Status']")
      this.Categorypage=this.page.locator("//th[normalize-space()='Category']")
      this.Membership=this.page.locator("//th[normalize-space()='Membership']")
      this.AccountManager=this.page.locator("//th[normalize-space()='Account Manager']")
      this.ExpireDate=this.page.locator("//th[normalize-space()='Expiry Date']")
      this.Itemperpage=this.page.locator("//span[normalize-space()='Items per page:']")
      this.ForwardBtn=this.page.locator("//*[contains(text(),'Page')]/ancestor::div//component-button[@centericon='assets/icons/chevron_forward-light.svg']")
      this.coloumn_one = this.page.locator("//div[text()='Categories']/ancestor::component-table//td[normalize-space()='Automation Using Playwright']/ancestor::tr[1]/td[1]");
    this.coloumn_two = this.page.locator("//div[text()='Categories']/ancestor::component-table//td[normalize-space()='Automation Using Playwright123']/ancestor::tr[1]/td[1]");
    this.coloumn_three = this.page.locator("//div[text()='Categories']/ancestor::component-table//td[normalize-space()='Automation Xeeju']/ancestor::tr[1]/td[1]");
    //this.items_per_page = this.page.locator("//ul//div[contains(text(),'20')]");
    this.items_per_page_drpdwn = this.page.locator("//*[contains(text(),'Items per page:')]/ancestor::pagination-template//span[@class='dropdown-multiselect__caret']");
    this.items_per_page_number = this.page.locator("//*[contains(text(),'Items per page:')]/parent::div//*[contains(@class,'selected-item')]");
    this.page_number_2 = this.page.locator("//span[normalize-space()='2']");
    this.page_backward_btn = this.page.locator("//component-button[@centericon='assets/icons/chevron_backward-light.svg']//button");
    this.page_number_1 = this.page.locator("//span[normalize-space()='1']");
    this.navigate_to_charity = this.page.locator("//div[contains(text(),'National Trust Charity')]");
    this.btn_Filter=this.page.locator("//span[normalize-space()='Filter']");
    this.txt_Filter_Charities_Title=this.page.locator("//span[normalize-space()='Filter Charities']");
    this.txt_Category_Title=this.page.locator("//span[normalize-space()='Category']");
    this.txt_Category=this.page.getByText('Please Select').first();
    this.drpdwn_Baby=this.page.locator('#filterEventForm').getByText('Baby');
    this.txt_Status_Title=this.page.locator("//span[normalize-space()='Status']");
    this.txt_Status=this.page.getByText('Please Select').first();
    this.drpdwn_Active=this.page.locator("//ng-multiselect-dropdown[@id='root-paginated-select']//div[contains(text(),'Active')]")
    this.drpdwn_Baby=this.page.locator("//div[normalize-space()='Baby']")
    this.txt_Membership_Type_Title=this.page.locator("//span[normalize-space()='Membership Type']");
    this.txt_Membership_Type=this.page.getByText('Please Select').first()
    this.drpdwn_Classic=this.page.locator("//li[@class='multiselect-item-checkbox']//div[contains(text(),'Classic')]")
    this.txt_Deleted_Title=this.page.locator("//span[normalize-space()='Deleted']");
    this.txt_Deleted=this.page.getByText('Please Select');
    this.drpdwn_With=this.page.getByText('With', { exact: true });
    this.btn_Apply=this.page.locator("//component-button[@label='Apply']//button");
    this.txt_Filtered_Charity_Category_Baby=this.page.locator("//div[contains(text(),'Baby')]")
  this.catagories_list= this.page.locator("//*[contains(text(),'Categories')]/ancestor::component-table");
    this.Charity_list= this.page.locator("//*[contains(text(),'Charities')]/ancestor::component-table");
    this.Order_by_btn= this.page.locator("//*[contains(text(),'Order By')]/ancestor::component-button");
    this.Asceding= this.page.locator("(//*[contains(text(),' Ascending')]/ancestor::component-sort//button[@class='entity__btn'])[1]");
    this.Apply_btn= this.page.locator("//*[contains(text(),'Apply')]/ancestor::component-button");
    this.Export_btn= this.page.locator("//*[contains(text(),'Export')]/ancestor::component-button");
    this.Export_denied_msg= this.page.locator("//*[contains(text(),'You do not have permission to access this resource!')]");
    this.Filter_catagory_search_box= this.page.locator("//component-select[@placeholder='Please Select']//input[@placeholder='Press ENTER to search']");
 
  }
 
async user_click_createbtn(){
    await this.playwrightFactory.click(this.btn_create);
   
  }
  async user_click_charitiesbtn(){
    await this.playwrightFactory.click(this.btn_charities);
    await this.page.waitForTimeout(5000);
  }
 
  async user_click_category_btn(){
    await this.btn_Catagories.hover();
    await this.playwrightFactory.click(this.btn_Catagories)
  }
  async user_enter_charityname_searchbox(striteration : any){
    await this.txt_SearchBox.waitFor();
    let username1 = await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
    await this.playwrightFactory.fill(this.txt_SearchBox, username1);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
 
  }
  async user_sees_createbtn(){
    await expect(this.btn_create).toBeVisible();
  }
  async user_sees_charities_catagories_btn(){
    await expect(this.btn_charities).toBeVisible();
    await expect(this.btn_Catagories).toBeVisible();
 
  }
  async user_sees_cagories_listwith_name_number(){
    await expect(this.List_Catagories).toBeVisible();
    await expect(this.Catagory_Name).toBeVisible();
    await expect(this.No_of_Charities).toBeVisible();
  }
  async user_click_delete_button(striteration : any){
    let strusername= await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
    await this.page.locator("//div[text()='Categories']/ancestor::component-table//td[normalize-space()='"+strusername+"']/ancestor::tr[1]/td[1]").hover();
    //await this.Catagory_Name.hover();
    await expect(this.page.locator("//*[contains(text(),'"+strusername+"')]/ancestor::tr//button[@class='table__button danger d-block']")).toBeVisible();
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strusername+"')]/ancestor::tr//button[@class='table__button danger d-block']"));
  }
  async user_verify_delete_msg(){
    await expect(this.Delete_Massage).toBeVisible();
    await this.playwrightFactory.click(this.OK_btn);
  }
  async user_search_charity(strSearch: string){
    await this.playwrightFactory.fill(this.txt_SearchBox, strSearch);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
  }
  async user_click_edit_btn(striteration : any){
     let strusername= await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration);
    await this.page.locator("//div[text()='Charities']/ancestor::component-table//td[normalize-space()='"+strusername+"']/ancestor::tr[1]/td[1]").waitFor();
    await this.page.locator("//div[text()='Charities']/ancestor::component-table//td[normalize-space()='"+strusername+"']/ancestor::tr[1]/td[1]").hover();
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strusername+"')]/ancestor::tr//button[@class='table__button primary d-block']"));
  }
  async user_view_pagination_options(){
await expect (this.Name).toBeVisible();
await expect (this.Status).toBeVisible();
await expect (this.Categorypage).toBeVisible();
await expect (this.Membership).toBeVisible();
await expect (this.AccountManager).toBeVisible();
await expect (this.ExpireDate).toBeVisible();
await expect (this.Itemperpage).toBeVisible();
await expect (this.ForwardBtn).toBeVisible();
await this.page.evaluate(() => {
window.scrollBy(500, 1000); // Scroll down
});
await this.playwrightFactory.click(this.ForwardBtn)
}
async verify_search_created_charityname() {
  await expect(this.Charity_Name).toBeVisible();
}
async user_verifies_associated_charity_field_one(){
  await expect(this.coloumn_one).toBeVisible();
  await expect(this.coloumn_one).toHaveText('Automation Using Playwright');
}
 
async user_verifies_associated_charity_field_two(){
  await expect(this.coloumn_two).toBeVisible();
  await expect(this.coloumn_two).toHaveText('Automation Using Playwright123');
}
 
async user_verifies_associated_charity_field_three(){
  await expect(this.coloumn_three).toBeVisible();
  await expect(this.coloumn_three).toHaveText('Automation Xeeju');
}
 
async user_verifies_items_per_page_pagination(strPagenumber: string){
  await this.playwrightFactory.click(this.items_per_page_drpdwn);
  await this.playwrightFactory.clickForce(this.page.locator("//*[contains(text(),'Items per page:')]/parent::div//*[contains(@type,'checkbox') and contains(@aria-label,'"+strPagenumber+"')]"));
  await expect(this.items_per_page_number).toContainText(strPagenumber);
}
async user_verifies_and_clicks_page_forward_btn(){
  await expect(this.ForwardBtn).toBeEnabled();
  await this.playwrightFactory.click(this.ForwardBtn);
}
async user_verifies_page_number_after_clicking_forward_btn(){
  await expect(this.page_number_2).toBeVisible();
}
async user_verifies_and_clicks_page_backward_btn(){
  await expect(this.page_backward_btn).toBeEnabled();
  await this.playwrightFactory.click(this.page_backward_btn);
}
async user_verifies_page_number_after_clicking_backward_btn(){
  await expect(this.page_number_1).toBeVisible();
}
async user_verifies_coloumn_title_name_to_be_visible(){
  await expect(this.Name).toBeVisible();
}
 
async user_verifies_coloumn_title_status_to_be_visible(){
  await this.Status.waitFor();
  await expect(this.Status).toBeVisible();
}
 
async user_verifies_coloumn_title_category_to_be_visible(){
  await expect(this.Categorypage).toBeVisible();
}
 
async user_verifies_coloumn_title_membership_to_be_visible(){
  await expect(this.Membership).toBeVisible();
}
 
async user_verifies_coloumn_title_account_manager_to_be_visible(){
  await expect(this.AccountManager).toBeVisible();
}
 
async user_verifies_coloumn_title_expiry_date_to_be_visible(){
  await expect(this.ExpireDate).toBeVisible();
}
async user_navigates_to_national_trust_charity(){
  await this.playwrightFactory.click(this.navigate_to_charity);
}
async user_clicks_filter_button(){
      await this.page.waitForTimeout(5000);
      await expect(this.btn_Filter).toBeEnabled();
      await this.btn_Filter.click();
    }
async user_verify_filter_charities_title(){
      await expect(this.txt_Filter_Charities_Title).toBeVisible();
 
    }
 
    async user_verify_category_title(){
      await expect(this.txt_Category_Title).toBeVisible();
      //await this.page.pause()
 
    }
 
    async user_selects_category(strCatagory: string){
 
      await this.playwrightFactory.click(this.txt_Category);
 
      //await this.playwrightFactory.fill(this.Filter_catagory_search_box, strCatagory);
 
      await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Category')]/ancestor::component-select//div[normalize-space()='"+strCatagory+"']"));
 
    }
    async user_verify_status_title(){
      await expect(this.txt_Status_Title).toBeVisible();
      //await this.page.pause()
    }
 
    async user_selects_status(){
      await this.playwrightFactory.click(this.txt_Status);
      await this.playwrightFactory.click(this.drpdwn_Active);
    }
 
    async user_selects_membership_type(){
      await expect(this.txt_Membership_Type_Title).toBeVisible();
      await this.playwrightFactory.click(this.txt_Membership_Type);
      await this.playwrightFactory.click(this.drpdwn_Classic);
      //await this.page.pause()
    }
 
    async user_selects_deleted(){
      await expect(this.txt_Deleted_Title).toBeVisible();
      await this.playwrightFactory.click(this.txt_Deleted);
      await this.playwrightFactory.click(this.drpdwn_With);
 
    }
 
    async user_clicks_apply_button(){
      await expect(this.btn_Apply).toBeVisible();
      await this.btn_Apply.click();
    }
 
    async user_verify_filtered_charity_category_baby(strCharity: string){
      await this.page.waitForTimeout(5000);
      await expect(this.page.locator("(//div[contains(text(),'"+strCharity+"')])[1]")).toBeVisible();
 
    }
 
    async user_sees_created_charity_list(){
      await expect (this.Name).toBeVisible();
      await expect (this.Status).toBeVisible();
      await expect (this.Categorypage).toBeVisible();
      await expect (this.Membership).toBeVisible();
      await expect (this.AccountManager).toBeVisible();
      await expect (this.ExpireDate).toBeVisible();
    }
 
    async user_click_catagories_btn(){
 
      await this.playwrightFactory.click(this.btn_Catagories);
      await this.page.waitForTimeout(3000);
    }
 
    async user_verify_catagories_listing(){
      await expect(this.catagories_list).toBeVisible();
    }
    async user_verify_charity_list(){
      await expect(this.Charity_list).toBeVisible();
    }
    async user_click_order_by_btn(){
      await this.playwrightFactory.click(this.Order_by_btn);
    }
    async user_click_asceding(){
      await this.playwrightFactory.click(this.Asceding);
    }
    async user_click_apply_btn(){
      await this.playwrightFactory.click(this.Apply_btn);
    }
    async user_click_export_btn(){
      await this.playwrightFactory.click(this.Export_btn);
    }
    async verify_export_denied_for_account_manager(){
      await expect(this.Export_denied_msg).toContainText('You do not have permission to access this resource!');
    }
    async verify_filter_list(){
      await expect(this.Charity_list).toBeVisible();
    }
 
}
 
 
 
 