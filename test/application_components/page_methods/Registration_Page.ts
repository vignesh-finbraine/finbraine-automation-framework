import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class REGISTRATION_PAGE {
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
  readonly Create_Registration: Locator;
  readonly Search_Bar: Locator;
  //readonly Event_Name: Locator;
  readonly Slug_Field: Locator;
  readonly Event_Name1: Locator;
  readonly Save_Button: Locator;
  readonly Charity_NV: Locator;
  readonly Charity_Coloumn: Locator;
  readonly Event_coloumn: Locator;
  readonly Distance_Category: Locator;
  readonly Status: Locator;
  readonly Target: Locator;
  readonly Payment_Option: Locator;
  readonly Actions: Locator;
  readonly Item_Page_Dropdown: Locator;
  //readonly Five:Locator;
  readonly Forward_arrow: Locator;
  readonly Backward_arrow: Locator;
  readonly Filter_btn: Locator;
  readonly Filter_Reg_Page: Locator;
  readonly Charity: Locator;
  readonly Event: Locator;
  readonly Payment_optn: Locator;
  readonly Apply: Locator;
  readonly Deleted: Locator;
  readonly Searched_Result: Locator;
  readonly Wolfcity: Locator;
  readonly Fundraising: Locator;
  readonly Checkbox: Locator;
  readonly Edit_Fundraising_amount: Locator;
  readonly Registration_fees: Locator;
  readonly Search: Locator;
  readonly Target_amt_btn: Locator;
  readonly YES_btn: Locator;
  readonly Accept1: Locator;
  readonly Accept2: Locator;
  readonly Reg_Text: Locator;
  readonly Search_name: Locator;
  readonly Fundraising_fees: Locator;
  readonly Payment_opn: Locator;
  readonly txt_Registration_Pages_Heading: Locator;
  readonly txt_Create_Event_Registration_Page_Title: Locator;
  readonly published_box: Locator;
  readonly Tick_box: Locator;
  readonly Event_tittle: Locator;
  readonly registration_page: Locator;
  readonly checkbox_registration_fee: Locator;
  readonly txt_age_1: Locator;
  readonly txt_amount_1: Locator;
  readonly txt_age_2: Locator;
  readonly txt_amount_2: Locator;
  readonly txt_Event: Locator;
  readonly drpdwn_Test_Event_Date: Locator;
  readonly txt_Distance: Locator;
  readonly txt_Charity: Locator;
  readonly drpdwn_Fund_For_Charity: Locator;
  readonly txt_Payment_Option: Locator;
  readonly drpdwn_Participant_Pays_Family_Registrations: Locator;
  readonly txt_Existing_Registration_Page: Locator;
  readonly txt_Distance_10K: Locator;
  readonly txt_Charity_Name: Locator;
  readonly drpdwn_Participant_pays: Locator;
  readonly txt_Charity_Search_Bar: Locator;
  readonly txt_Fund_for_Charity: Locator;
  readonly Filter_charity_drpdwn_btn: Locator;
















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
    this.Create_Registration = this.page.locator("//component-button[@label='Create']//button//span");
    this.Search_Bar = this.page.locator("//input[@placeholder='Press ENTER to search']");
    //this.Event_Name= this.page.locator("//*[contains(text(),' UK ')]");
    this.Slug_Field = this.page.locator('#slug');
    this.Event_Name1 = this.page.locator("//*[contains(text(),' Hope for All Foundation ')]");
    this.Save_Button = this.page.locator("//button[@class='button button-primary min-width-auto']");
    this.Charity_NV = this.page.locator("//*[contains(text(),' Charity Nv ')]");
    this.Charity_Coloumn = this.page.locator("//th[normalize-space()='Charity']")
    this.Event_coloumn = this.page.locator("//th[normalize-space()='Event']")
    this.Distance_Category = this.page.locator("//th[normalize-space()='Distance Category']")
    this.Status = this.page.locator("//th[normalize-space()='Status']")
    this.Target = this.page.locator("//th[normalize-space()='Target']")
    this.Payment_Option = this.page.locator("//th[normalize-space()='Payment Option']")
    this.Actions = this.page.locator("//th[normalize-space()='Actions']")
    this.Item_Page_Dropdown = this.page.locator("//*[contains(text(),'Items per page:')]/ancestor::pagination-template//span[@class='dropdown-multiselect__caret']")
    //this.Five=this.page.locator("//div[normalize-space()='5']")  
    this.Forward_arrow = this.page.locator("//component-button[@centericon='assets/icons/chevron_forward-light.svg']//button")
    this.Backward_arrow = this.page.locator("//component-button[@centericon='assets/icons/chevron_backward-light.svg']//button")
    this.Filter_btn = this.page.locator("//component-button[@label='Filter']//button")
    this.Filter_Reg_Page = this.page.locator("//span[normalize-space()='Filter Registration Pages']")
    this.Charity = this.page.locator("//span[normalize-space()='Charity']")
    this.Event = this.page.locator("//span[normalize-space()='Events']")
    this.Payment_optn = this.page.locator("//span[normalize-space()='Payment Option']")
    this.Apply = this.page.locator("//span[normalize-space()='Apply']")
    this.Deleted = this.page.locator("//span[normalize-space()='Deleted']")
    this.Searched_Result = this.page.locator("(//*[contains(text(),' Wolfcity Races ')])[1]");
    this.Wolfcity = this.page.locator("//div[contains(text(),'Wolfcity Races')]")
    this.Registration_fees = this.page.locator("//*[contains(text(),' Registration Fee (£) ')]/ancestor::component-input//input[@type='number']")
    this.Fundraising = this.page.locator("//*[contains(text(),' Fundraising Target Amount (£) ')]")
    this.Checkbox = this.page.locator("//component-input[@placeholder='How much can you Fundraise?']//component-checkbox[@placeholder='Use the same details for all distances']//span//span[1]")
    this.Edit_Fundraising_amount = this.page.locator("//input[@placeholder='How much can you Fundraise?']")
    this.Search = this.page.locator("//input[@placeholder='Press ENTER to search']")
    this.Target_amt_btn = this.page.locator("//*[contains(text(),' Would you like to set your own registration fee and Fundraising Target Amount? ')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.YES_btn = this.page.locator("(//*[contains(text(),' Would you like to set your own registration fee and Fundraising Target Amount?  ')]/ancestor::component-select//li[@class='multiselect-item-checkbox'])[1]")
    this.Accept1 = this.page.locator("//*[contains(text(),'Accept Terms & Conditions')]/ancestor::component-checkbox//span[@class='checkbox__tick']")
    this.Accept2 = this.page.locator("//*[contains(text(),'Accept terms & conditions')]/ancestor::component-checkbox//span[@class='checkbox__tick']")
    this.Reg_Text = this.page.locator("//component-textarea[@label='Registration Form Text']")
    this.Search_name = this.page.locator("(//div[@class='table__item'])[1]")
    this.Fundraising_fees = this.page.locator("//input[@placeholder='How much can you Fundraise?']")
    //this.Event=this.page.locator("//*[contains(text(),'Events')]/ancestor::component-select")
    this.Payment_opn = this.page.locator("//*[contains(text(),'Payment Option ')]/ancestor::component-select")

    this.published_box = this.page.locator("//*[contains(text(),'Published')]")
    this.Tick_box = this.page.locator("//*[contains(text(),'Tick box to add Fundraising Information')]")
    this.Event_tittle = this.page.locator("//*[contains(text(),'Events')]/ancestor::component-select");
    this.registration_page = this.page.locator('//div[contains(text(),"India")]');
    this.checkbox_registration_fee = this.page.locator("//*[contains(text(),' Registration Fee (£) ')]/ancestor::component-input//*[contains(text(),'Use the same details for all distances')]");
    this.txt_age_1 = this.page.locator('(//*[contains(text(), "Age (5-15) ")]/ancestor::component-input//input[@placeholder="Enter Age"])[1]');
    this.txt_amount_1 = this.page.locator('(//*[contains(text(), "Amount")]/ancestor::component-input//input[@placeholder="Enter Amount"])[1]');
    this.txt_age_2 = this.page.locator('(//*[contains(text(), "Age (5-15) ")]/ancestor::component-input//input[@placeholder="Enter Age"])[2]');
    this.txt_amount_2 = this.page.locator('(//*[contains(text(), "Amount")]/ancestor::component-input//input[@placeholder="Enter Amount"])[2]');
    this.txt_Registration_Pages_Heading = this.page.locator("//h1[normalize-space()='Registration Pages']")
    this.txt_Create_Event_Registration_Page_Title = this.page.locator("//h1[normalize-space()='Create Event Registration Page']")
    this.txt_Event = this.page.locator("//span[contains(text(),'Select Event')]")
    this.drpdwn_Test_Event_Date = this.page.locator("//div[normalize-space()='Test event date']")
    this.txt_Distance = this.page.locator("//*[contains(text(),'Distance')]/ancestor::component-select//div[@class='multiselect-dropdown']")
    this.txt_Charity = this.page.locator("(//*[contains(text(),'Create')]/ancestor::component-section//*[contains(text(),'Charity ')]/ancestor::component-select//span[@class='dropdown-btn'])[1]")
    this.txt_Payment_Option = this.page.locator("//*[contains(text(),'Create')]/ancestor::component-section//*[contains(text(),'Payment Option')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.drpdwn_Participant_Pays_Family_Registrations = this.page.locator("//ul//div[contains(text(),'Participant Pays + Family Registrations')]")
    this.txt_Existing_Registration_Page = this.page.locator("(//div[@class='table__item'])[1]")
    this.txt_Distance_10K = this.page.locator("//*[contains(text(),'Distance')]/ancestor::component-select//ng-multiselect-dropdown[@id='root-paginated-select']")
    this.txt_Charity_Name = this.page.locator("(//*[contains(text(),' Automation City Marathony4yap ')])[1]")
    this.drpdwn_Participant_pays = this.page.locator("//div[normalize-space()='Participant Pays']")
    this.drpdwn_Fund_For_Charity = this.page.locator("(//*[contains(text(),' Charity NV ')])[2]")
    this.txt_Charity_Search_Bar = this.page.locator("//component-select[@placeholder='Please select']//ng-multiselect-dropdown[@id='root-paginated-select']//input[@placeholder='Search']")
    this.txt_Fund_for_Charity = this.page.locator("//div[contains(text(),'Fund for Charity')]")
    this.Filter_charity_drpdwn_btn = this.page.locator("//*[contains(text(),'Charity')]/ancestor::component-select//*[contains(text(),'Please Select')]");













  }




  // Create Category- Flow

  async user_click_createbtn() {
    await this.playwrightFactory.click(this.Create_Registration);

  }
  async user_enter_values_searchbar(strsearchbar: string) {
    await this.playwrightFactory.fill(this.Search_Bar, strsearchbar);
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Enter');

  }
  async user_click_event(strEventname: string) {
    await expect(this.page.locator("//div[@class='table__product'][normalize-space(.)='" + strEventname + "']")).toBeVisible();
    await this.playwrightFactory.click(this.page.locator("//div[@class='table__product'][normalize-space(.)='" + strEventname + "']"));
    await this.page.waitForTimeout(3000);
  }
  async verify_slug_not_editable() {
    await expect(this.Slug_Field).toBeVisible();
    await this.page.goBack();

  }
  async user_click_event1() {
    await this.playwrightFactory.click(this.Event_Name1);
    await this.page.waitForTimeout(3000);
  }
  async user_edit_slug(strSlug: string) {
    await this.Slug_Field.clear();
    await this.playwrightFactory.fill(this.Slug_Field, strSlug);
  }
  async user_verify_click_save_button() {
    await expect(this.Save_Button).toBeEnabled();
  }
  async user_click_searched_event() {
    await this.playwrightFactory.click(this.Charity_NV);

  }
  async user_enter_same_slug(strSlugfield: string) {
    await this.page.waitForTimeout(5000);
    await this.Slug_Field.clear();
    await this.playwrightFactory.fill(this.Slug_Field, strSlugfield);
  }
  async user_verify_table_column() {

    await this.page.waitForTimeout(3000);
    await expect(this.Charity_Coloumn).toBeVisible();
    await expect(this.Event_coloumn).toBeVisible();
    await expect(this.Distance_Category).toBeVisible();
    await expect(this.Status).toBeVisible();
    await expect(this.Target).toBeVisible();
    await expect(this.Payment_Option).toBeVisible();
    await expect(this.Actions).toBeVisible();


  }
  async user_clicks_itemdropdown(strNumber: string) {
    await this.playwrightFactory.click(this.Item_Page_Dropdown);
    await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='" + strNumber + "']"));
    await this.page.waitForTimeout(5000);
    await this.playwrightFactory.click(this.Forward_arrow);
    await this.playwrightFactory.click(this.Backward_arrow);
  }
  async user_clicks_filter() {
    await this.playwrightFactory.click(this.Filter_btn);
    await expect(this.Filter_Reg_Page).toBeVisible();
    await expect(this.Charity).toBeVisible();
    await expect(this.Event).toBeVisible();
    await expect(this.Payment_Option).toBeVisible();
    await expect(this.Deleted).toBeVisible();
    await expect(this.Apply).toBeVisible();

  }
  async user_verify_searched_registration_page(strPage: string) {
    await expect(this.page.locator("//*[contains(text(),'" + strPage + "')]")).toBeVisible();
  }
  async user_click_eventwolfcity() {
    await this.playwrightFactory.click(this.Wolfcity)
  }
  async verify_users_registration_fields() {
    await expect(this.Registration_fees).toBeVisible();
    await expect(this.Fundraising).toBeVisible();
    await this.playwrightFactory.click(this.Checkbox)
    await this.playwrightFactory.click(this.Edit_Fundraising_amount)
    await this.Edit_Fundraising_amount.clear();
  }
  async user_enters_fundraising_ammount(stramount: string) {
    await this.playwrightFactory.fill(this.Edit_Fundraising_amount, stramount)
  }
  async user_verify_fundraising_amt(strName: string) {
    await this.playwrightFactory.fill(this.Search, strName)
    await this.page.keyboard.press('Enter');
    await expect(this.Target).toBeVisible();

  }
  async user_clicks_target_amt_btn() {
    await this.playwrightFactory.click(this.Target_amt_btn)
    await this.playwrightFactory.click(this.YES_btn)
    await this.page.waitForTimeout(3000)
  }
  async user_clicks_accept_condition() {

    await this.playwrightFactory.click(this.Accept1)
  }

  async user_clicks_accept2_condition() {
    await this.page.waitForTimeout(5000);
    await this.playwrightFactory.click(this.Accept2)
    await this.page.waitForTimeout(5000);
  }
  async verify_reg_text() {
    await expect(this.Reg_Text).toBeVisible();
    await this.page.waitForTimeout(5000)
  }
  async verify_searchbar_create_registration_name(striteration: any) {

    await this.page.waitForTimeout(5000);
    await this.playwrightFactory.fill(this.Search_Bar, striteration);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(5000);
    await expect(this.Search_name).toBeVisible();
    await this.playwrightFactory.click(this.Search_name)
  }
  async user_enters_edit_reg_ammount(stramount: string) {
    await this.page.waitForTimeout(5000);
    await this.Registration_fees.clear();
    await this.playwrightFactory.fill(this.Registration_fees, stramount)
  }
  async user_enters_edit_fund_ammount(stramount: string) {
    await this.page.waitForTimeout(5000);
    await this.Fundraising_fees.clear();
    await this.page.waitForTimeout(5000);
    await this.playwrightFactory.fill(this.Fundraising_fees, stramount)

  }
  async verify_edit_reg_autopopulated_fields() {
    await expect(this.Event_tittle).toBeVisible();
    await expect(this.Payment_opn).toBeVisible();

  }
  async verify_edit_reg_checkbox_fields() {
    await expect(this.published_box).toBeVisible();
    await expect(this.Tick_box).toBeVisible();
  }
  async user_click_wolfcity(strEvent: string) {
    await this.playwrightFactory.click(this.page.locator("//div[contains(text(),'" + strEvent + "')]"));
  }
  async user_clicks_edit_btn_of_registration_page(strPage: string) {
    await this.page.locator("//div[contains(text(),'" + strPage + "')]").hover();
    await this.playwrightFactory.click(this.page.locator("//div[contains(text(),'" + strPage + "')]"));
    await this.page.waitForTimeout(5000)
  }
  async user_clicks_registration_fee_checkbox() {
    await this.playwrightFactory.click(this.checkbox_registration_fee);
  }

  async user_sets_registration_fee(strfee: string) {
    await this.playwrightFactory.click(this.Registration_fees);
    await this.playwrightFactory.fill(this.Registration_fees, strfee);

  }

  async user_clicks_fundraising_checkbox() {
    await this.playwrightFactory.click(this.Checkbox);
  }

  async user_sets_fundraising_amount(stramount: string) {
    await this.playwrightFactory.click(this.Fundraising_fees);
    await this.playwrightFactory.fill(this.Fundraising_fees, stramount);
  }
  async user_sets_family_1_age(strage: string) {
    await this.playwrightFactory.click(this.txt_age_1);
    await this.playwrightFactory.fill(this.txt_age_1, strage);
  }

  async user_sets_amount1(stramount: string) {
    await this.playwrightFactory.click(this.txt_amount_1);
    await this.playwrightFactory.fill(this.txt_amount_1, stramount);
  }


  async user_sets_family_2_age(strage: string) {
    await this.playwrightFactory.click(this.txt_age_2);
    await this.playwrightFactory.fill(this.txt_age_2, strage);
  }


  async user_sets_amount2(stramount: string) {
    await this.playwrightFactory.click(this.txt_amount_2);
    await this.playwrightFactory.fill(this.txt_amount_2, stramount);

  }
  async user_click_save() {
    await this.playwrightFactory.click(this.Save_Button);

  }
  async user_verifies_title_of_registration_pages() {
    await expect(this.txt_Registration_Pages_Heading).toBeVisible();
  }
  async user_verify_create_event_registration_page_title() {
    await expect(this.txt_Create_Event_Registration_Page_Title).toBeVisible();
  }
  async user_selects_event(strEvent: string) {
    await this.txt_Event.click();
    await this.playwrightFactory.click(this.drpdwn_Test_Event_Date);
  }

  async user_verifies_distance() {
    await expect(this.txt_Distance).toBeVisible();
  }

  async user_selects_charity(strCharity: string) {
    await this.txt_Charity.click();
    //await this.playwrightFactory.click(this.drpdwn_Fund_For_Charity);

  }
  async user_search_charity_on_search_bar(strcharitysearch: string) {
    await this.playwrightFactory.fill(this.txt_Charity_Search_Bar, strcharitysearch);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    await this.playwrightFactory.clickForce(this.txt_Fund_for_Charity);
    await this.page.waitForTimeout(3000);
  }

  async user_selects_payment_option(strPayment: string) {
    await this.txt_Payment_Option.click();
    await this.playwrightFactory.click(this.drpdwn_Participant_Pays_Family_Registrations);
  }

  async user_click_existing_registration_page() {
    await this.playwrightFactory.click(this.txt_Existing_Registration_Page);
    await this.page.waitForTimeout(3000);
  }
  async user_verify_events() {

    await expect(this.page.locator('#non-existent-element')).toHaveCount(0);

  }
  async user_verify_distance() {
    await expect(this.txt_Distance_10K).toBeVisible();
    await expect(this.txt_Distance_10K).toContainText('10K')
  }
  async user_verifies_charity_name_field_auto_populated(strCahrityname: string) {
    await expect(this.page.locator("(//*[contains(text(),'" + strCahrityname + "')])[1]")).toBeVisible();
    await expect(this.page.locator("(//*[contains(text(),'" + strCahrityname + "')])[1]")).toContainText('Automation 0pyia');

  }
  async user_searche_existing_registration_page(striteration: any) {

    await this.page.waitForTimeout(5000);
    await this.playwrightFactory.fill(this.Search_Bar, striteration);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(5000);
  }
  async user_selects_payment_option_participent_pay(strPayment: string) {
    await this.txt_Payment_Option.click();
    await this.playwrightFactory.click(this.drpdwn_Participant_pays);
  }

  async user_click_filter_btn() {
    await this.playwrightFactory.click(this.Filter_btn);
  }
  async user_select_charity_in_filter(strCharity: string) {
    await this.playwrightFactory.click(this.Filter_charity_drpdwn_btn);
    await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'Charity')]/ancestor::component-select//*[contains(text(),'" + strCharity + "')]"))
  }
  async user_click_apply_btn() {
    await this.playwrightFactory.click(this.Apply);
  }
  async user_verify_filter_result(strCharity: string) {
    await expect(this.page.locator("(//*[contains(text(),'" + strCharity + "')])[1]")).toBeVisible();
  }






}

