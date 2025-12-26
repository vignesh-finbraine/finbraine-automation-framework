import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
 
export class CREATE_EVENT_PAGE {
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
readonly txt_Distance: Locator;
//readonly txt_DistanceOption: Locator;
readonly btn_DistanceTittle: Locator;
readonly txt_LocalFee: Locator;
readonly btn_StartDate: Locator;
//readonly btn_StartDay: Locator;
readonly btn_CloseCalender: Locator;
readonly btn_EndDate: Locator;
//readonly btn_EndDay: Locator;
readonly txt_reagion: Locator;
//readonly btn_regionOption: Locator;
readonly txt_eventAdress: Locator;
readonly btn_eventAdressOption: Locator;
readonly EventDescription: Locator;
readonly EventCity: Locator;
readonly CityOption: Locator;
readonly ticker: Locator;
readonly SelectRemainder: Locator;
readonly RemainderOption: Locator;
readonly SelectMode: Locator;
readonly ModeOption: Locator;
readonly EventPostcode: Locator;
readonly meta_description: Locator;
readonly meta_edit_checkbox: Locator;
readonly Create_Event_Tittle: Locator;
readonly City_Dropdown_list: Locator;
readonly Vedio_Field: Locator;
readonly Website_Field: Locator;
readonly Reviews_Field: Locator;
readonly TC_Field: Locator;
readonly Pick_File: Locator;
readonly Gallary_Pick_File: Locator;
readonly Gallery_Load_More: Locator;
readonly Gallary_Image1: Locator;
readonly btn_Done: Locator;
readonly method_drpdwn_btn1: Locator;
readonly Internal_Checkbox1: Locator;
readonly method_drpdwn_btn2: Locator;
readonly Internal_Checkbox2: Locator;
readonly Save_Button: Locator;
readonly Meta_Tittle_Box: Locator;
readonly Meta_Tittle_Editcheckbox: Locator;
readonly Keywords: Locator;
readonly Robot_Fields: Locator;
readonly No_Index: Locator;
readonly Coronical_URL: Locator;
readonly Type_Field: Locator;
readonly Route_Image: Locator;
readonly Embed_Code: Locator;
readonly route_Information: Locator;
readonly what_included: Locator;
readonly Whats_Included_PickFile_btn: Locator;
readonly How_to_get_there: Locator;
readonly Event_day_logistics: Locator;
readonly Spectetor_Info: Locator;
readonly Kit_List: Locator;
readonly FAQ_Addsection: Locator;
readonly FAQ_Tittle: Locator;
readonly Add_Questions: Locator;
readonly Question: Locator;
readonly Answer: Locator;
readonly close_btn: Locator;
readonly Registration_Deadline: Locator;
readonly Withdrawel_Deadline: Locator;
//readonly Registration_Date: Locator;
//readonly Withdrawal_Date: Locator;
readonly Event_List: Locator;
readonly Total_Places: Locator;
readonly SEO_Configuration: Locator;
readonly Gallery:Locator;
 readonly Reminder:Locator;
  readonly FundraisingEmail:Locator;
  readonly EstimateDate:Locator;
  readonly Withdrawal:Locator;
readonly VirualEvent:Locator;
 
readonly RankingEvent:Locator;
readonly WaitlistEvent:Locator;
readonly ExcludefromCharities: Locator;
readonly ExcludefromWeb:Locator;
readonly Excludefromparticipant:Locator;
readonly Rolling:Locator;
readonly Membership_Places:Locator;
readonly Membership:Locator;
readonly Premium_places:Locator;
readonly SlugName:Locator;
readonly Standalone:Locator;
readonly Yes:Locator;
readonly CountryUK:Locator;
readonly Error_Msg:Locator;
readonly TypeDropdownbtn:Locator;
 //readonly past_start_date: Locator;
  readonly past_end_date: Locator;
 // readonly datee1: Locator;
     readonly txt_name: Locator;
  readonly txt_slug: Locator;
  readonly txt_type: Locator;
  readonly ddl_partner: Locator;
  readonly ddl_status: Locator;
  readonly ddl_state: Locator;
  readonly ddl_distance: Locator;
  readonly ddl_country: Locator;
  readonly ddl_region: Locator;
  readonly ddl_city: Locator;
  readonly txt_address: Locator;
  readonly txt_description: Locator;
  readonly lbl_video: Locator;
  readonly txt_video: Locator;
  readonly lbl_website: Locator  
  readonly lbl_reviews: Locator;
  readonly txt_reviews: Locator;
  readonly lbl_terms: Locator;
  readonly txt_terms: Locator;
  readonly btn_imagepickfile: Locator;
  readonly btn_gallerypickfile: Locator;
  readonly btn_regwebsite: Locator;
   readonly btn_regportal: Locator;
   readonly Select_Month:Locator;
   readonly Select_Year:Locator;
<<<<<<< HEAD
 
=======

>>>>>>> 3403859e2f763a88bde93a4d483d0800a0c67721
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
    this.btn_Publish = this.page.locator("//span[normalize-space()='Publish Now']");
    this.txt_SuccessMaasage = this.page.locator("//*[contains(text(),'Successfully created the event!')]");
    this.txt_emailadress = this.page.locator("//input[@placeholder='Email Address']");
    this.txt_CharityName = this.page.locator("//input[@placeholder='e.g ASICS London']");
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
    this.txt_Distance= this.page.locator("//*[contains(text(),'Distance')]/ancestor::component-select//span[@class='dropdown-btn']");
    //this.txt_DistanceOption= this.page.locator("//div[normalize-space()='10K']");
    this.btn_DistanceTittle= this.page.locator("//*[contains(text(),'Distance ')]");
    this.txt_LocalFee= this.page.locator("//input[@placeholder='For UK residents']");
    this.btn_StartDate= this.page.locator("//*[contains(text(),'Start Date ')]/ancestor::component-datetime//button[@class='datepicker__mask']");
    //this.btn_StartDay= this.page.locator("(//span[@class='custom-day'])[15]");
    this.btn_CloseCalender= this.page.locator("//component-button[contains(@classname,'button button-primary button-sm')]//button//span");
    this.btn_EndDate= this.page.locator("//*[contains(text(),'End Date ')]/ancestor::component-datetime//button[@class='datepicker__mask']")
    //this.btn_EndDay= this.page.locator("(//span[@class='custom-day'])[25]");
    this.txt_reagion= this.page.locator("//*[contains(text(),'Region ')]/ancestor::component-select//span[@class='dropdown-btn']");
    //this.btn_regionOption= this.page.locator("//*[contains(text(),' Charity Runs East of England ')]");
    this.txt_eventAdress= this.page.locator("//input[contains(@placeholder,'Where is the event taking place?')]");
    this.btn_eventAdressOption= this.page.getByText('London Luton Airport (LTN)');
    this.EventDescription= this.page.frameLocator("//*[contains(text(),'Description ')]/ancestor::component-textarea//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
    this.EventCity= this.page.locator("//*[contains(text(),'City')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.CityOption= this.page.locator("//div[normalize-space()='Bedford Running Events']");
    this.ticker= this.page.locator("//*[contains(text(),'Ticker ')]/ancestor::component-input//input[@placeholder='Number of places']");
    this.SelectRemainder= this.page.locator("//*[contains(text(),'Reminder ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.RemainderOption= this.page.locator("//*[contains(text(),'Reminder')]/ancestor::component-select//*[contains(text(),'Weekly')]");
    this.SelectMode= this.page.locator("//*[contains(text(),'Mode ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.ModeOption= this.page.locator("//*[contains(text(),'Mode')]/ancestor::component-select//input[@type='checkbox' and @aria-label='Express Interest']");
    this.EventPostcode= this.page.locator("//*[contains(text(),'Postcode ')]/ancestor::component-input//input[@placeholder='postcode']");
    this.meta_edit_checkbox= this.page.locator("//*[contains(text(),'Meta Description ')]/ancestor::component-textarea//span[@class='checkbox__tick']")
    this.meta_description= this.page.locator("//*[contains(text(),'Meta Description ')]/ancestor::component-textarea//textarea[@class='editor__textarea ng-untouched ng-pristine ng-valid']");
    this.Create_Event_Tittle= this.page.locator("//*[contains(text(),'Create Event')]");
    this.City_Dropdown_list= this.page.locator("//*[contains(text(),'City')]/ancestor::component-select//div[@class='dropdown-list']");
    //this.Vedio_Field= this.page.locator("//input[@placeholder='Video (YouTube, Vimeo, etc) link']");
    this.Vedio_Field= this.page.locator("//input[@placeholder='https://wwww.youtube.com/watch?v=abc']");
    //this.Website_Field= this.page.locator("//input[@placeholder='Domain or URL']");
    this.Website_Field= this.page.locator("//input[@placeholder='https://www.mywebsite.com']");
    //this.Reviews_Field= this.page.locator("//input[@placeholder='Ratings page link']");
    this.Reviews_Field= this.page.locator("//input[@placeholder='https://www.mywebsite.com/reviews']");
    this.TC_Field= this.page.locator("//input[@placeholder='https://www.mywebsite.com/terms']");
    this.Pick_File= this.page.locator("//*[contains(text(),'Pick a File')]");
    this.Gallary_Pick_File= this.page.locator("//component-section[@sectiontitle='Details']//div[@class='section section__background']//component-file-editor//div//div//div[@class='py-4']//component-file//span[contains(text(),'Pick Files')]");
    this.Gallery_Load_More = this.page.locator("//span[text()='Load More']")
    this.Gallary_Image1= this.page.locator("//*[contains(text(),'Images')]/ancestor::component-section//*[contains(text(),'Test Event')]");
    this.btn_Done= this.page.locator("//component-button[@label='Done']");
    this.method_drpdwn_btn1= this.page.locator("//*[contains(text(),' Website ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Internal_Checkbox1= this.page.locator("//*[contains(text(),' Website ')]/ancestor::component-select//input[@aria-label='Internal']");
    this.method_drpdwn_btn2= this.page.locator("//*[contains(text(),' Portal ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.Internal_Checkbox2= this.page.locator("//*[contains(text(),' Portal ')]/ancestor::component-select//input[@aria-label='Internal']");
    this.Save_Button= this.page.locator("//*[contains(text(),'Save Draft')]");
    this.Meta_Tittle_Box= this.page.locator("//input[@placeholder='Preferred search engine title']");
    this.Meta_Tittle_Editcheckbox= this.page.locator("//*[contains(text(),'Meta Title ')]/ancestor::component-input//span[@class='checkbox__tick']");
    this.Keywords= this.page.locator("//span[@role='textbox']");
    this.Robot_Fields= this.page.locator("//*[contains(text(),'Robots ')]/ancestor::component-select//span[@class='dropdown-btn']");
    this.No_Index= this.page.locator("//*[contains(text(),'Robots ')]/ancestor::component-select//*[contains(text(),'No Index')]");
    this.Coronical_URL= this.page.locator("//input[@placeholder='Preferred version of the webpage chosen by search engines']");
    this.Type_Field= this.page.locator("//*[contains(text(),' Route Information ')]/ancestor::component-section//span[@class='dropdown-btn']");
    this.Route_Image= this.page.locator("//*[contains(text(),'Type ')]/ancestor::component-select//*[contains(text(),' Route Image ')]");
    this.Embed_Code= this.page.locator("//*[contains(text(),'Type ')]/ancestor::component-select//*[contains(text(),' Embed Code ')]");
    this.route_Information= this.page.frameLocator("//*[contains(text(),' Route Information ')]/ancestor::component-section//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
    this.what_included= this.page.frameLocator("//*[contains(text(),' What')]/ancestor::component-section//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
    this.Whats_Included_PickFile_btn= this.page.locator("//*[contains(text(),' What')]/ancestor::component-section//button[@tabindex='0']");
    this.How_to_get_there= this.page.frameLocator("//*[contains(text(),' How to Get There ')]/ancestor::component-section//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
    this.Event_day_logistics= this.page.frameLocator("//*[contains(text(),' Event Day Logistics ')]/ancestor::component-section//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
    this.Spectetor_Info=this.page.frameLocator("//*[contains(text(),' Spectator Info ')]/ancestor::component-section//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
    this.Kit_List= this.page.frameLocator("//*[contains(text(),' Kit List ')]/ancestor::component-section//iframe[contains(@id,'tiny-angular')]").locator('#tinymce');
    this.FAQ_Addsection= this.page.locator("//*[contains(text(),'Add Section')]");
    this.FAQ_Tittle=this.page.locator("//input[@placeholder='Title of a FAQs section e.g General']");
    this.Add_Questions= this.page.locator("//*[contains(text(),' FAQs ')]/ancestor::component-section//button[@class='input__action-btn']");
    this.Question= this.page.locator("//input[@placeholder='Question']");
    this.Answer= this.page.frameLocator("//*[contains(text(),'Answer ')]/ancestor::component-textarea//iframe[contains(@id,'tiny-angular')]").locator("#tinymce");
    this.close_btn= this.page.locator("//button[@aria-label='Close']");
    this.Registration_Deadline= this.page.locator("//*[contains(text(),'Registration Deadline ')]/ancestor::component-datetime//button[@class='datepicker__mask']");
    this.Withdrawel_Deadline= this.page.locator("//*[contains(text(),'Withdrawal Deadline ')]/ancestor::component-datetime//button[@class='datepicker__mask']");
   // this.Registration_Date= this.page.locator("(//span[@class='custom-day'])[15]");
    //this.Withdrawal_Date= this.page.locator("(//span[@class='custom-day'])[11]");
    this.Event_List= this.page.locator("//*[contains(text(),'Events')]/ancestor::component-table//table[@class='table table-borderless local-table']");
    this.Total_Places= this.page.locator("//component-input[@labelinfo[contains(.,'Total number of charity places available')]]//input[@placeholder='Number of places']");
    this.SEO_Configuration=this.page.locator('//*[contains(text()," SEO Configuration ")]');
    this.Gallery=this.page.locator("//*[contains(text(),'Details')]/ancestor::component-section//*[contains(text(),'Gallery')]");
    this.Reminder=this.page.locator("//*[contains(text(),'Reminder ')]/ancestor::component-select//div[@class='select__dropdown']");
    this.FundraisingEmail=this.page.locator(" //*[contains(text(),'Fundraising Email')]/ancestor::component-checkbox//input[@type='checkbox']");
    this.ExcludefromWeb=this.page.locator(" //*[contains(text(),'Exclude from Website')]/ancestor::component-checkbox//span[@class='checkbox__text']")
    this.Withdrawal=this.page.locator (" //*[contains(text(),'Withdrawals')]/ancestor::component-checkbox//input[@type='checkbox']")
    this.VirualEvent=this.page.locator(" //*[contains(text(),'Virtual Event')]/ancestor::component-checkbox//input[@type='checkbox']")
    this.RankingEvent=this.page.locator(" //*[contains(text(),'Ranking Event')]");  
    this.WaitlistEvent=this.page.locator(" //*[contains(text(),'Waitlist Event')]")
this.EstimateDate=this.page.locator(" //*[contains(text(),'Estimated Date')]/ancestor::component-checkbox//input[@type='checkbox']")
this.ExcludefromCharities=this.page.locator("//*[contains(text(),'Exclude from Charities')]")
    this.Excludefromparticipant=this.page.locator("//*[contains(text(),'Exclude from Participants')]/ancestor::component-checkbox//span[@class='checkbox__text']")
    this.Rolling=this.page.locator(" //*[contains(text(),' Rolling')]")
    this.Membership_Places=this.page.locator("//span[normalize-space()='Charity of The Year Membership Places']")
    this.Membership=this.page.locator("//span[normalize-space()='Classic Membership Places']")
    this.Premium_places=this.page.locator("//span[normalize-space()='Premium Membership Places']")
    this.SlugName=this.page.locator("//input[@placeholder='Slug']")
    this.Standalone=this.page.locator("//*[contains(text(),'Details')]/ancestor::component-section//*[contains(text(),'Type')]/ancestor::component-select//span[@class='dropdown-btn']")
    this.Yes=this.page.locator("//*[contains(text(),'Details')]/ancestor::component-section//*[contains(text(),'Partner')]/ancestor::component-select//span[@class='dropdown-btn']")
 this.CountryUK=this.page.locator("//*[contains(text(),'Country')]/ancestor::component-i18n-selector//span[@class='dropdown-btn']")
 this.Error_Msg=this.page.locator("//div[contains(text(),' The withdrawal deadline must be a date before registration deadline. ')]")
 this.TypeDropdownbtn=this.page.locator("//*[contains(text(),'Type ')]/ancestor::component-select//span[@class='dropdown-btn']")
 //this.past_start_date=this.page.locator('//span[normalize-space()="17"]')
    this.past_end_date=this.page.locator('//*[contains(text(),"End Date ")]/ancestor::component-datetime//button[@class="datepicker__mask"]')
   // this.datee1=this.page.locator('//span[normalize-space()="17"]')
    this.txt_name=this.page.locator('//input[@placeholder="e.g ASICS London"]');
   this.txt_slug=this.page.locator('//input[@placeholder="Slug"]');
   this.txt_type=this.page.locator('//*[contains(text(),"Type")]/ancestor::component-select//*[@class= "selected-item"]')
   this.ddl_partner=this.page.locator('//component-select[@label="Partner"]//div[@class="select__dropdown"]//ng-multiselect-dropdown[@class="multi-select ng-untouched ng-valid ng-dirty"]//div[@class="multiselect-dropdown"]//div//span[@class="dropdown-btn"]');
    this.ddl_status=this.page.locator('//component-select[@label="Status"]//div[@class="select__dropdown"]//ng-multiselect-dropdown[@class="multi-select ng-untouched ng-valid ng-dirty"]//div[@class="multiselect-dropdown"]//div//span[@class="dropdown-btn"]')
    this.ddl_state=this.page.locator("//*[contains(text(),'State')]/ancestor::component-select//div[@class='multiselect-dropdown']")
   this.ddl_distance=this.page.locator('//component-select[@label="Distance"]//div//span[contains(text(),"Please Select")]')
   this.ddl_country=this.page.locator('//ng-multiselect-dropdown[@id="country"]//div[@class="multiselect-dropdown"]//div//span[@class="dropdown-btn"]')
   this.ddl_region=this.page.locator('//component-select[@label="Region"]//div//span[contains(text(),"Please Select")]')
   this.ddl_city=this.page.locator('//component-select[@label="City"]//div//span[contains(text(),"Please Select")]')
   this.txt_address=this.page.locator('//input[@placeholder="Where is the event taking place?"]')
   this.txt_description=this.page.locator("//*[contains(text(),'Description')]")
   this.lbl_video=this.page.locator("//*[contains(text(),'Video ')]")
   this.txt_video=this.page.locator('//*[@placeholder="https://wwww.youtube.com/watch?v=abc" and @label="Video"]')
   this.lbl_website=this.page.locator("//*[contains(text(),'Details')]/ancestor::component-section//*[contains(text(),'Website')]/ancestor::component-input")
   this.txt_website=this.page.locator('//input[@placeholder="Domain or URL"]')
   this.lbl_reviews=this.page.locator("//*[contains(text(),'Details')]/ancestor::component-section//*[contains(text(),'Reviews')]")
   this.txt_reviews=this.page.locator('//input[@placeholder="Ratings page link"]')
   this.lbl_terms=this.page.locator("//*[contains(text(),'Details')]/ancestor::component-section//*[contains(text(),'Terms & Conditions ')]")
   this.txt_terms=this.page.locator('//*[@placeholder="https://www.mywebsite.com/terms" and  @label="Terms & Conditions"]')
   this.btn_imagepickfile=this.page.locator('//span[normalize-space()="Pick a File"]')
   this.btn_gallerypickfile=this.page.locator("//*[contains(text(),'Details')]/ancestor::component-section//*[contains(text(),'Gallery')]/ancestor::component-file//span[contains(text(),'Pick Files')]")
   this.btn_regwebsite=this.page.locator("//input[@placeholder='Domain or URL']");
   this.btn_regportal=this.page.locator('("span").filter({ hasText: "Internal x" }).nth(1);')
   this.Select_Month=this.page.locator("//select[@title='Select month']")
   this.Select_Year=this.page.locator("//select[@aria-label='Select year']")
<<<<<<< HEAD
     
=======
>>>>>>> 3403859e2f763a88bde93a4d483d0800a0c67721
  }
 
 
//Event Management
async user_enter_charity_name(striteration: any){
    let charityname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.txt_CharityName,charityname);
  }
 
 
  async user_select_distance(strDistance: string){
    await this.playwrightFactory.click(this.txt_Distance);
    await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strDistance+"']"));
    await this.playwrightFactory.click(this.btn_DistanceTittle);
  }
 
async user_enter_localfee(strfee: string){
  await this.playwrightFactory.fill(this.txt_LocalFee, strfee);
}
 
async user_select_startdate(strStartdate: string){
  await this.playwrightFactory.click(this.btn_StartDate);
  await this.Select_Month.selectOption({label:'Sep'})
  await this.Select_Year.selectOption({ label: '2026'})
  await this.playwrightFactory.click(this.page.locator("(//span[@class='custom-day'])["+strStartdate+"]"));
  await this.playwrightFactory.click(this.btn_CloseCalender);
}
 
async user_select_enddate(strEnddate: string){
  await this.playwrightFactory.click(this.btn_EndDate);
  await this.Select_Month.selectOption({label:'Sep'})
  await this.Select_Year.selectOption({ label: '2026'})
  await this.playwrightFactory.click(this.page.locator("(//span[@class='custom-day'])["+strEnddate+"]"));
  await this.playwrightFactory.click(this.btn_CloseCalender);
}
 
async user_select_region(strRegion: string){
  await this.playwrightFactory.click(this.txt_reagion);
  await this.playwrightFactory.click(this.page.locator("//*[contains(text(),'"+strRegion+"')]"));
  await this.playwrightFactory.click(this.btn_DistanceTittle);
}
 
async user_enter_eventadress(strEventAdress: string){
  await this.playwrightFactory.fill(this.txt_eventAdress, strEventAdress);
  await this.playwrightFactory.click(this.btn_eventAdressOption);
}
 
async user_enter_event_description(strDescription: string){
  await this.playwrightFactory.fill(this.EventDescription, strDescription);
}
 
async user_select_event_city(){
  await this.playwrightFactory.click(this.EventCity);
  await this.playwrightFactory.click(this.CityOption);
  await this.playwrightFactory.click(this.btn_DistanceTittle);
}
 
async user_enter_ticker(strTicker: string){
  await this.playwrightFactory.fill(this.ticker, strTicker);
}
 
async user_set_remainder(){
  await this.playwrightFactory.click(this.SelectRemainder);
  await this.playwrightFactory.click(this.RemainderOption);
}
 
async user_select_mode(){
  await this.playwrightFactory.click(this.SelectMode);
  await this.playwrightFactory.clickForce(this.ModeOption);
}
 
async user_enter_postCode(strEventPostCode: string){
  await this.playwrightFactory.fill(this.EventPostcode, strEventPostCode);
}
 
async user_enter_metadescription(strMeta: string){
  await this.playwrightFactory.click(this.meta_edit_checkbox);
  await this.playwrightFactory.fill(this.meta_description, strMeta);
}
 
async user_click_publishbtn(){
    await this.playwrightFactory.click(this.btn_Publish);
 
 
}
 
  async verify_success_massage(){
    await expect(this.txt_SuccessMaasage).toBeVisible();
   
  }
  async verify_create_eventpage_visible(){
    await expect(this.Create_Event_Tittle).toBeVisible();
  }
  async verify_citydropdown_visible(){
    await this.playwrightFactory.click(this.EventCity);
    await expect(this.City_Dropdown_list).toBeVisible();
  }
  async verify_vediofield_accessible(strVedio: string){
    await this.playwrightFactory.fill(this.Vedio_Field, strVedio);
 
  }
  async verify_website_field_accessible(strWebsite: string){
    await this.playwrightFactory.fill(this.Website_Field, strWebsite);
  }
  async verify_review_field_accessible(strReviews: string){
    await this.playwrightFactory.fill(this.Reviews_Field, strReviews);
  }
  async verify_tc_field_accessible(strTC: string){
    await this.playwrightFactory.fill(this.TC_Field, strTC);
  }
  async user_click_andselect_gallaryimage(){
    await this.playwrightFactory.click(this.Gallary_Pick_File);
    await this.playwrightFactory.click(this.Gallery_Load_More);
    await this.playwrightFactory.click(this.Gallary_Image1);
     await this.playwrightFactory.click(this.btn_Done);
   
  }
  async user_clickandselect_image(){
    await this.playwrightFactory.click(this.Pick_File);
    await this.playwrightFactory.click(this.Gallery_Load_More);
    await this.playwrightFactory.click(this.Gallary_Image1);
  }
  async user_verify_defaultmethodsetto_internal(){
    this.playwrightFactory.click(this.method_drpdwn_btn1);
    await expect(this.Internal_Checkbox1).toBeChecked();
    this.playwrightFactory.click(this.method_drpdwn_btn2);
    await expect(this.Internal_Checkbox2).toBeChecked();
  }
  async user_verify_saveandpublish_buttonenabled(){
    await expect(this.btn_Publish).toBeEnabled();
    await expect(this.Save_Button).toBeEnabled();
  }
  async user_verify_visibilityof_metatittlebox_metadescriptionbox(strMeta: string){
    await this.page.evaluate(() => {
window.scrollBy(2500, 3000); // Scroll down
});
   
    await this.playwrightFactory.click(this.Meta_Tittle_Editcheckbox);
    await expect(this.Meta_Tittle_Box).toBeVisible();
    await this.playwrightFactory.fill(this.Meta_Tittle_Box, strMeta);
    await this.playwrightFactory.click(this.meta_edit_checkbox);
    await expect(this.meta_description).toBeVisible();
    await this.playwrightFactory.fill(this.meta_description, strMeta);
 
  }
  async verify_the_keyword_field_accessible(strKeyword: string){
   
    await this.playwrightFactory.fill(this.Keywords, strKeyword);
 
  }
  async verify_robotfield_accesible(){
    await this.playwrightFactory.click(this.Robot_Fields);
    await this.playwrightFactory.click(this.No_Index);
    await this.playwrightFactory.click(this.Robot_Fields);
  }
  async user_enter_coronical_url(strCoronical: string){
    await this.playwrightFactory.fill(this.Coronical_URL, strCoronical);
  }
  // async user_check_routeinformation_field_accesible(strRouteInfo: string){
  //   await this.playwrightFactory.click(this.Type_Field);
  //   await this.playwrightFactory.click(this.Route_Image);
  //   await this.playwrightFactory.click(this.Type_Field);
  //   await this.playwrightFactory.click(this.Embed_Code);
  //   await this.playwrightFactory.fill(this.route_Information, strRouteInfo);
  // }
  async user_check_whtatsincludedfield_accessible(strWhat: string){
    await this.playwrightFactory.fill(this.what_included, strWhat);
  }
  async user_verify_gallary_enabled(){
    await expect(this.Whats_Included_PickFile_btn).toBeEnabled();
  }
  async user_enter_howtogetthere_desription(strHow: string){
    await this.playwrightFactory.fill(this.How_to_get_there, strHow);
  }
  async user_enter_eventdaylogistics_description(strLogistics: string){
    await this.playwrightFactory.fill(this.Event_day_logistics, strLogistics);
  }
  async user_enter_spectetor_info(strSpectetor: string){
    await this.playwrightFactory.fill(this.Spectetor_Info, strSpectetor);
  }
  async user_enter_kitlist(strKitList: string){
    await this.playwrightFactory.fill(this.Kit_List, strKitList);
  }
  async verify_faq_field(strFAQ: string){
    await this.playwrightFactory.click(this.FAQ_Addsection);
    await this.playwrightFactory.fill(this.FAQ_Tittle, strFAQ);
  }
  async user_add_question(strQuestion: string){
    await this.playwrightFactory.click(this.Add_Questions);
    await this.playwrightFactory.fill(this.Question,strQuestion);
    await this.playwrightFactory.fill(this.Answer,strQuestion);
    await this.playwrightFactory.click(this.close_btn);
 
  }
  async user_sees_registration_deadline_field(){
    await expect(this.Registration_Deadline).toBeVisible();
  }
  async user_sees_withdrawl_deadline(){
    await expect(this.Withdrawel_Deadline).toBeVisible();
  }
  async user_select_registration_date(strDate: string){
    await this.playwrightFactory.click(this.Registration_Deadline);
    await this.Select_Month.selectOption({label:'Sep'})
    await this.playwrightFactory.click(this.page.locator("(//span[@class='custom-day'])["+strDate+"]"));
    await this.playwrightFactory.click(this.btn_CloseCalender);
  }
  async user_select_widrawaldate(strDate: string){
    await this.playwrightFactory.click(this.Withdrawel_Deadline);
    await this.Select_Month.selectOption({label:'Sep'})
    await this.playwrightFactory.click(this.page.locator("(//span[@class='custom-day'])["+strDate+"]"));
    await this.playwrightFactory.click(this.btn_CloseCalender);
  }
  async user_sees_event_list(){
    await expect(this.Event_List).toBeVisible();
  }
  async user_enter_total_places(strPlace: string){
    await this.playwrightFactory.click(this.Total_Places);
   await this.playwrightFactory.fill(this.Total_Places,strPlace);
};
  

  async user_view_seo_configuration(){
await this.page.evaluate(() => {
window.scrollBy(2000, 2500); // Scroll down
});
 
await expect (this.SEO_Configuration).toBeVisible();
 
await expect(this.Meta_Tittle_Box).toBeVisible();
await this.playwrightFactory.click(this.meta_edit_checkbox);
await expect(this.meta_description).toBeVisible();
await expect(this.Keywords).toBeVisible();
await expect(this.Robot_Fields).toBeVisible();
await expect(this.Coronical_URL).toBeVisible();
}
async user_view_route_info_wats_include_How_to_get_there_event_day_logistics_spectator_info_kit_list_faq(){
await this.page.waitForTimeout(5000);
await this.page.evaluate(() => {
  window.scrollBy(3000, 3500); // Scroll down
  });
 
await expect (this.route_Information).toBeVisible();
await expect (this.Type_Field).toBeVisible();
await expect (this.what_included).toBeVisible();
await expect (this.Gallery).toBeVisible();
await expect (this.How_to_get_there).toBeVisible();
await expect (this.Event_day_logistics).toBeVisible();
await expect (this.Spectetor_Info).toBeVisible();
await expect (this.Kit_List).toBeVisible();
await expect (this.FAQ_Tittle).toBeVisible();
}
async user_view_reminder_dropdown_opn(){
await this.page.waitForTimeout(5000);
await expect (this.Reminder).toBeVisible();
await expect (this.FundraisingEmail).toBeVisible();
await expect (this.ExcludefromWeb).toBeVisible();
await expect (this.Withdrawal).toBeVisible();
await expect (this.VirualEvent).toBeVisible();
await expect (this.RankingEvent).toBeVisible();
}
async user_view_mode_dropdown_opn(){
  await this.page.waitForTimeout(5000);
  await expect (this.WaitlistEvent).toBeVisible();
  await expect (this.EstimateDate).toBeVisible()
  }
async user_clicks_type_dropdown_btn(){
  await this.playwrightFactory.click(this.TypeDropdownbtn);
await expect (this.Rolling).toBeVisible();
await this.playwrightFactory.click(this.Rolling);
}
async user_verify_other_fields(strDistance: string){
await expect (this.btn_DistanceTittle).toBeVisible();
await this.playwrightFactory.click(this.txt_Distance);
await this.playwrightFactory.click(this.page.locator("//div[normalize-space()='"+strDistance+"']"))
await this.playwrightFactory.click(this.btn_DistanceTittle)
await expect (this.Registration_Deadline).toBeVisible();
await expect (this.Withdrawel_Deadline).toBeVisible();
await expect (this.Total_Places).toBeVisible();
await expect (this.Membership_Places).toBeVisible();
await expect (this.Membership).toBeVisible();
await expect (this.Premium_places).toBeVisible();
}
async user_enters_slugname(strSlugName: string){
await this.playwrightFactory.fill(this.SlugName,strSlugName)
}
 
async user_cleartext(){
await this.SlugName.clear();
   
}
async verify_event_default_opn(){
await expect (this.Standalone).toBeVisible();
await expect (this.Yes).toBeVisible();
await expect (this.CountryUK).toContainText("🇬🇧 United Kingdom");
await this.page.evaluate(() => {
window.scrollBy(3000, 3500); // Scroll down
});
}
async verify_error_msg(){
await expect (this.Error_Msg).toBeVisible();
}
async user_clicks_startdate(strPastdate: string){
  await this.playwrightFactory.click(this.btn_StartDate);
await this.playwrightFactory.click(this.page.locator("//span[normalize-space()='"+strPastdate+"']"))
 }
async user_clicks_enddate(strDatee: string){
await this.playwrightFactory.click(this.past_end_date)
await this.playwrightFactory.click(this.page.locator("//span[normalize-space()='"+strDatee+"']"))
await this.playwrightFactory.click(this.btn_DistanceTittle)
}
async verify_name(){  
 await expect(this.txt_name).toBeVisible();
await expect(this.txt_name).toBeEnabled();
 
}
async verify_slug(){
  await expect(this.txt_slug).toBeVisible();
  await expect(this.txt_slug).toBeEnabled();
}
async verify_type(){
  await expect( this.page.getByText('Type')).toBeVisible();
await expect(this.txt_type).toBeVisible();
}
async verify_partner(){
  await expect(this.ddl_partner).toBeVisible();
  await expect(this.ddl_partner).toBeVisible();
}
 async verify_status(){
  await expect(this.page.getByText('Status')).toBeVisible();
  await expect(this.ddl_status).toBeVisible()
 }
 async verify_state(){
  await expect(this.ddl_state).toBeVisible();
  await expect(this.ddl_state).toBeVisible();
 
 }
async verify_distance(){
  await expect(this.ddl_distance).toBeVisible();
  await expect(this.ddl_distance).toBeVisible();
}
async verify_country(){
  await expect(this.ddl_country).toBeVisible();
  await expect(this.ddl_country).toBeVisible();
}
async verify_region(){
  await expect(this.ddl_region).toBeVisible();
  await expect(this.ddl_region).toBeVisible();
 
}
async verify_city(){
await expect(this.ddl_city).toBeVisible();
await expect(this.ddl_city).toBeVisible();
}
async verify_address(){
await expect(this.txt_address).toBeVisible();
await expect(this.txt_address).toBeVisible();
}
async verify_description(){
  await expect(this.txt_description).toBeVisible();
  await expect(this.txt_description).toBeEnabled();
}
async verify_video(){
  await expect(this.lbl_video).toBeVisible();
  await expect(this.txt_video).toBeEnabled();
 
}
async verify_reviews(){
  await expect(this.lbl_reviews).toBeVisible();
  await expect(this.txt_video).toBeVisible();
}
async verify_terms(){
await expect(this.lbl_terms).toBeVisible();
await expect(this.txt_terms).toBeVisible();
}
async verify_image(){
await expect(this.btn_imagepickfile).toBeVisible();
await expect(this.btn_imagepickfile).toBeVisible();
}
async verify_gallery(){
await expect(this.btn_gallerypickfile).toBeVisible();
await expect(this.btn_gallerypickfile).toBeVisible();
}
async verify_regwebsite(){
await expect(this.btn_regwebsite).toBeVisible();
await expect(this.btn_regwebsite).toBeEnabled();
}
async verify_portal(){
  await expect(this.btn_regportal).toBeVisible();
  await expect(this.btn_regportal).toBeEnabled();
 
}
 
}
 
 
 
 