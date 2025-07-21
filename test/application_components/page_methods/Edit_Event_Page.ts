import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class EDIT_EVENT_PAGE {
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
readonly btn_Event_Managament: Locator;
 readonly link_Events: Locator;
 readonly btn_Create:Locator;
 readonly txt_Name: Locator;
 readonly drpdwn_Distance:Locator;
 readonly btn_distance_75k:Locator;
 readonly btn_preview_section:Locator;
 readonly txt_local_fee:Locator;
 readonly btn_start_date: Locator;
 readonly btn_next_month:Locator;
 readonly btn_22:Locator;
 readonly btn_close:Locator;
 readonly btn_end_date: Locator;
 readonly btn_29:Locator;
 readonly btn_registration_deadline: Locator;
 readonly btn_10:Locator;
 readonly btn_withdrawl_deadline:Locator;
 readonly btn_9:Locator;
 readonly txt_total_places: Locator;
 readonly txt_Charity_of_The_Year_Membership_Places: Locator;
 readonly txt_classic_membership_places: Locator;
 readonly txt_premium_membership_places: Locator;
 readonly txt_region: Locator;
 readonly btn_scotland:Locator;
 readonly btn_city: Locator;
 readonly btn_london_events:Locator;
 readonly txt_postcode: Locator;
 readonly txt_address: Locator;
 readonly btn_london:Locator;
 readonly btn_reminder: Locator;
 readonly btn_weekly:Locator;
 readonly txt_description: Locator;
 readonly link_video: Locator;
 readonly link_website: Locator;
 readonly link_review_: Locator;
 readonly link_terms_condition: Locator;
 readonly link_privacy_policy:Locator;
 readonly btn_event_managers: Locator;
 readonly btn_suraj_automation:Locator;
 readonly btn_image: Locator;
 readonly img_tri: Locator;
 readonly btn_gallery_img: Locator;
 readonly img_swim:Locator;
 readonly btn_done:Locator;
 readonly btn_edit_meta_title: Locator;
 readonly txt_meta_title: Locator;
 readonly btn_edit_meta_description: Locator;
 readonly txt_meta_description: Locator;
 readonly txt_keywords: Locator;
 readonly btn_robots: Locator;
 readonly btn_follow:Locator;
 readonly txt_Canonical_url: Locator;
 readonly btn_type: Locator;
 readonly btn_route_img: Locator;
 readonly txt_route_description: Locator;
 readonly btn_route_gallery: Locator;
 readonly txt_whats_included_description: Locator;
 readonly btn_whats_included_gallery_img: Locator;
 readonly btn_abtsgs_image: Locator;
 readonly btn_whats_included_done: Locator;
 readonly txt_how_to_get_there_description: Locator;
 readonly txt_event_day_logistics_description:Locator;
 readonly txt_spectator_info_description:Locator;
 readonly txt_kit_list_description:Locator;
 readonly btn_FAQ_add_section:Locator;
 readonly txt_FAQ_title:Locator;
 readonly link_add_question:Locator;
 readonly txt_FAQ_question:Locator;
 readonly txt_FAQ_answer:Locator;
 readonly icon_close:Locator;
 readonly btn_publish_now: Locator;
 readonly btn_ok: Locator;
 readonly txt_success_msg:Locator;
 
readonly txt_Search_field:Locator;

readonly btn_Type:Locator;
readonly btn_Type_standalone:Locator;
readonly btn_Type_rolling:Locator;
readonly btn_partner:Locator;
readonly btn_yes:Locator;
readonly btn_no:Locator;
readonly btn_status:Locator;
readonly btn_active:Locator;
readonly btn_inactive:Locator;
readonly btn_state:Locator;
readonly btn_live:Locator;
readonly btn_expired:Locator;
readonly btn_archived:Locator;
readonly side_section:Locator;
readonly btn_distance:Locator;
readonly btn_10k:Locator;
readonly preview_section:Locator;
readonly txt_international_fee:Locator;
readonly btn_region:Locator;
readonly btn_east_of_england:Locator;
readonly btn_manchesteruk:Locator;
readonly registration_method_website:Locator;
readonly registration_method_portal:Locator;
readonly drpdwn_customize_gender:Locator;
readonly btn_male:Locator;
readonly drpdwn_charities_options:Locator;
readonly btn_included:Locator;
readonly drpdwn_charities:Locator;
readonly btn_green_tree:Locator;
readonly btn_save:Locator;
readonly txt_success_msg_edit_event:Locator;
 
readonly btn_back:Locator;
readonly btn_delete:Locator;
readonly txt_confirmation_msg:Locator;
readonly txt_sucessfully_deleted_msg:Locator;
readonly txt_no_record:Locator;













  
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
     /******************** Create Event ************************/
 
    /******************** Create Event ************************/
 
    this.btn_Event_Managament=this.page.locator('//button[normalize-space()="Event Management"]');
    this.link_Events= this.page.locator( '//a[@title="Events"][normalize-space()="Events"]');
    this.btn_Create=this.page.locator('//span[normalize-space()="Create"]');
    this.txt_Name=this.page.locator('//input[@placeholder="e.g ASICS London"]');
    this.drpdwn_Distance=this.page.locator('//component-select[@label="Distance"]//div//span[contains(text(),"Please Select")]');
    this.btn_distance_75k=this.page.locator('//div[contains(text(),"75k")]');
    this.btn_preview_section=this.page.locator('.preview__section');
    this.txt_local_fee=this.page.locator('//input[@placeholder="For UK residents"]');
    this.btn_start_date=this.page.locator('//*[contains(text(), "Start Date")]/ancestor::component-datetime//button[contains(@class, "datepicker__mask")]');
    this.btn_next_month=this.page.locator('//button[@title="Next month"]//span[@class="ngb-dp-navigation-chevron"]');
    this.btn_22=this.page.locator('//span[normalize-space()="22"]');
    this.btn_close=this.page.locator('//span[normalize-space()="Close"]');
    this.btn_end_date=this.page.locator('//*[contains(text(), "End Date ")]/ancestor::component-datetime//button[contains(@class, "datepicker__mask")]');
    this.btn_29=this.page.locator('//span[normalize-space()="29"]');
    this.btn_registration_deadline=this.page.locator('//*[contains(text(), "Registration Deadline ")]/ancestor::component-datetime//button[contains(@class, "datepicker__mask")]');
    this.btn_10=this.page.locator('//span[normalize-space()="10"]');
    this.btn_withdrawl_deadline=this.page.locator('component-datetime').filter({ hasText: 'Widthdrawal Deadline (' }).getByRole('button')
    this.btn_9=this.page.getByText('9', { exact: true });
    this.txt_total_places=this.page.locator('component-input').filter({ hasText: 'Total Places' }).getByPlaceholder('Number of places');
    this.txt_Charity_of_The_Year_Membership_Places=this.page.locator('component-input').filter({ hasText: 'Charity of The Year' }).getByPlaceholder('Number of places');
    this.txt_classic_membership_places=this.page.locator('component-input').filter({ hasText: 'Classic Membership Places' }).getByPlaceholder('Number of places');
    this.txt_premium_membership_places=this.page.locator('component-input').filter({ hasText: 'Premium Membership Places' }).getByPlaceholder('Number of places');
    this.txt_region=this.page.locator('//component-select[@label="Region"]//div//span[contains(text(),"Please Select")]');
    this.btn_scotland=this.page.locator('//div[normalize-space()="Scotland"]');
    this.btn_city=this.page.locator('//component-select[@label="City"]//div//span[contains(text(),"Please Select")]');
    this.btn_london_events=this.page.locator('//div[normalize-space()="London Running Events"]');
    this.txt_postcode=this.page.locator('//input[@placeholder="postcode"]');
    this.txt_address=this.page.locator('//input[@placeholder="Where is the event taking place?"]');
    this.btn_london=this.page.getByText('LondonUK');
    this.btn_reminder=this.page.locator('//span[contains(text(),"Select Reminder")]');
    this.btn_weekly=this.page.locator('//div[normalize-space()="Weekly"]');
    this.txt_description=this.page.locator('iframe[title="Rich Text Area"]').contentFrame().getByRole('paragraph');
    this.link_video=this.page.locator('//input[@placeholder="Video (YouTube, Vimeo, etc) link"]');
    this.link_website=this.page.locator('//input[@placeholder="Domain or URL"]');
    this.link_review_=this.page.locator('//input[@placeholder="Ratings page link"]');
    this.link_terms_condition=this.page.locator('//input[@placeholder="Terms and conditions page link"]');
    this.link_privacy_policy=this.page.locator('//input[@placeholder="Privacy Policy page link"]');
    this.btn_event_managers=this.page.locator('component-select').filter({ hasText: 'Event Manager(s) Please' }).locator('span').nth(1);
    this.btn_suraj_automation=this.page.locator('//li[@class="multiselect-item-checkbox"]//div[contains(text(),"suraj automation")]');
    this.btn_image=this.page.locator('//span[normalize-space()="Pick a File"]');
    this.img_tri=this.page.locator('//img[@title="tri"]');
    this.btn_gallery_img=this.page.locator('//*[contains(text(),"Details")]/ancestor::component-section//*[contains(text(),"Gallery")]/ancestor::component-file//span[contains(text(),"Pick Files")]');
    this.img_swim=this.page.locator('//img[@title="swim"]');
    this.btn_done=this.page.locator('//span[normalize-space()="Done"]');
    this.btn_edit_meta_title=this. page.locator('//*[contains(text(),"Meta Title ")]/ancestor::component-input//span[@class="checkbox__tick"]');
    this.txt_meta_title=this.page.locator('//input[@placeholder="Preferred search engine title"]');
    this.btn_edit_meta_description=this.page.locator('//*[contains(text(),"Meta Description ")]/ancestor::component-textarea//span[@class="checkbox__tick"]');
    this.txt_meta_description=this.page.locator('//*[contains(text(),"Meta Description")]/ancestor::component-textarea//textarea[@class="editor__textarea ng-untouched ng-pristine ng-valid"]' );
    this.txt_keywords=this.page.locator('//span[@role="textbox"]');
    this.btn_robots=this.page.locator('//component-select[@label="Robots"]//div//ng-multiselect-dropdown//div//div//span//span[contains(text(),"Please Select")]');
    this.btn_follow=this.page.locator('//div[normalize-space()="Follow"]');
    this.txt_Canonical_url=this.page.locator('//input[@placeholder="Preferred version of the webpage chosen by search engines"]');
    this.btn_type=this.page.locator('//component-select[@label="Type"]//div//ng-multiselect-dropdown//div//div//span//span[contains(text(),"Please Select")]');
    this.btn_route_img=this.page.locator('//ul//div[contains(text(),"Route Image")]');
    this.txt_route_description=this.page.frameLocator("//*[contains(text(),'Route Information')]/ancestor::component-section//iframe[contains(@id,'tiny-angular')]").locator("#tinymce");
    this.btn_route_gallery=this.page.locator('//component-section[@sectiontitle="Route Information"]//component-file//span[contains(text(),"Pick Files")]');
    this.txt_whats_included_description=this.page.frameLocator("//*[contains(text(),'Included')]/ancestor::component-section//iframe[contains(@id,'tiny-angular')]").locator("#tinymce");
    this.btn_whats_included_gallery_img=this.page.locator('(//span[contains(text(),"Pick Files")])[3]');  
    this.btn_abtsgs_image=this.page.locator('//img[@title="img"]');
    this.btn_whats_included_done=this.page.locator('//component-button[@label="Done"]//button');
    this.txt_how_to_get_there_description=this.page.frameLocator('//*[contains(text(),"How to Get There")]/ancestor::component-section//iframe[contains(@id,"tiny-angular")]').locator("#tinymce");
    this.txt_event_day_logistics_description=this.page.frameLocator('//*[contains(text(),"Event Day Logistics")]/ancestor::component-section//iframe[contains(@id,"tiny-angular")]').locator("#tinymce");;
    this.txt_spectator_info_description=this.page.frameLocator('//*[contains(text(),"Spectator Info")]/ancestor::component-section//iframe[contains(@id,"tiny-angular")]').locator("#tinymce");
    this.txt_kit_list_description=this.page.frameLocator('//*[contains(text(),"Kit List")]/ancestor::component-section//iframe[contains(@id,"tiny-angular")]').locator("#tinymce");
    this.btn_FAQ_add_section=this.page.locator('//span[normalize-space()="Add Section"]');
    this.txt_FAQ_title=this.page.locator('//input[@placeholder="Title of a FAQs section e.g General"]');
    this.link_add_question=this.page.locator('//button[normalize-space()="Add Questions"]');
    this.txt_FAQ_question=this.page.locator('//input[@placeholder="Question"]');
    this.txt_FAQ_answer=this.page.frameLocator('//*[contains(text(),"Answer")]/ancestor::component-textarea//iframe[@class="tox-edit-area__iframe"]').locator('#tinymce');
    this.icon_close=this.page.locator('//button[@aria-label="Close"]');
    this.btn_publish_now=this.page.locator('//span[normalize-space()="Publish Now"]');
    this.btn_ok=this.page.locator('//button[normalize-space()="OK"]');
    this.txt_success_msg=this.page.locator('//div[normalize-space()="Successfully created the event!"]');
   
 
 /******************** Create Event ************************************/
 
 //********************** Edit Event ********************************** */
 
    this.txt_Search_field=this.page.locator('//input[@placeholder="Press ENTER to search"]');
    this.btn_Type=this.page.locator('//*[contains(text(), "Type")]/ancestor::component-select//span[@class="dropdown-multiselect__caret"]');
    this.btn_Type_standalone=this.page.locator('//ul//div[contains(text(),"Standalone")]');
    this.btn_Type_rolling=this.page.locator('//div[normalize-space()="Rolling"]');
    this.btn_partner=this.page.locator('//*[contains(text(), " Details ")]/ancestor::component-section//*[contains(text(), "Partner ")]/ancestor::component-select//span[@class="dropdown-multiselect__caret"]');
    this.btn_yes=this.page.locator('//ul//div[contains(text(),"Yes")]');
    this.btn_no=this.page.locator('//div[normalize-space()="No"]');
    this.btn_status=this.page.locator('//*[contains(text(), " Details ")]/ancestor::component-section//*[contains(text(), "Status ")]/ancestor::component-select//span[@class="dropdown-multiselect__caret"]');
    this.btn_active=this.page.locator('//component-select[@ngclass="select"]//ul//div[contains(text(),"Active")]');
    this.btn_inactive=this.page.locator('//div[normalize-space()="Inactive"]');
    this.btn_state=this.page.locator('//*[contains(text(), " Details ")]/ancestor::component-section//*[contains(text(), "State ")]/ancestor::component-select//span[@class="dropdown-multiselect__caret"]');
    this.btn_live=this.page.locator('//component-select[@label="State"]//ul//div[contains(text(),"Live")]');
    this.btn_expired=this.page.locator('//input[@aria-label="Expired"]');
    this.btn_archived=this.page.locator('//input[@aria-label="Archived"]');
    this.side_section=this.page.getByRole('heading', { name: 'Top Devices' });
    this.btn_distance=this.page.locator('span').filter({ hasText: '5K x' });
    this.btn_10k=this.page.locator('//div[normalize-space()="10K"]');
    this.preview_section=this.page.getByText('Preview Views: 0 Interactions: 0 Top Countries Top Devices');
    this.txt_international_fee=this.page.locator('//input[@placeholder="For non-UK residents"]');
    this.btn_region=this.page.locator('//*[contains(text(), " Details ")]/ancestor::component-section//*[contains(text(), "Region ")]/ancestor::component-select//span[@class="dropdown-multiselect__caret"]');
    this.btn_east_of_england=this.page.locator('//div[normalize-space()="East of England"]');
    this.btn_preview_section=this.page.locator('.preview__section');
    this.btn_manchesteruk=this.page.getByText('ManchesterUK');
    this.registration_method_website=this.page.locator('span').filter({ hasText: 'Internal x' }).first();
    this.registration_method_portal=this.page.locator('span').filter({ hasText: 'Internal x' }).nth(1);
    this.drpdwn_customize_gender=this.page.locator('//*[contains(text(), " Details ")]/ancestor::component-section//*[contains(text(), "Customize Gender ")]/ancestor::component-select//span[@class="dropdown-multiselect__caret"]');
    this.btn_male=this.page.locator('//ul//div[contains(text(),"Male")]');
    this.drpdwn_charities_options=this.page.locator('//*[contains(text(), " Details ")]/ancestor::component-section//*[contains(text(), "Charity Options ")]/ancestor::component-select//span[@class="dropdown-multiselect__caret"]');
    this.btn_included=this.page.locator('//div[normalize-space()="Included"]');
    this.drpdwn_charities=this.page.locator('//*[contains(text(), " Details ")]/ancestor::component-section//*[contains(text(), "Charities ")]/ancestor::component-select//span[@class="dropdown-multiselect__caret"]');
    this.btn_green_tree=this.page.locator('//div[normalize-space()="Green tree"]');
    this.btn_save=this.page.locator("//*[contains(text(),'Save')]");
    this.txt_success_msg_edit_event=this.page.locator('//div[normalize-space()="Edit Event"]');
    this.btn_ok=this.page.locator('//button[normalize-space()="OK"]');
  this.btn_back=this.page.locator('//span[normalize-space()="Back"]');
  this.btn_delete=this.page.locator('//span[normalize-space()="Delete"]');
  this.txt_confirmation_msg=this.page.locator('//div[normalize-space()="Are you sure?"]');
  this.txt_sucessfully_deleted_msg=this.page.locator('//div[normalize-space()="Successfully deleted the event!"]');
  this.txt_no_record=this.page.locator('//caption[normalize-space()="No records found!"]');
 
 
 
 
 
 
 

    
    









    
    
  }
  
  

  

 
  //**********************  Edit Event  ************************** */
 
    async user_search_event_under_list(striteration: any){
     let search= await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration)
   await this.playwrightFactory.fill(this.txt_Search_field, search );
    await this.txt_Search_field.press('Enter');
  }
 
    
 
  async user_verifies_Type(){
    await this.playwrightFactory.click(this.btn_Type);
    await expect(this.btn_Type_standalone).toBeVisible();
    await expect(this.btn_Type_rolling).toBeVisible();
   
 
  }
 
  async user_verifies_partner(){
    await this.playwrightFactory.click(this.btn_partner);
    await expect(this.btn_yes).toBeVisible();
    await expect(this.btn_no).toBeVisible();
  }
 
  async user_verifies_status(){
    await this.playwrightFactory.click(this.btn_status);
    await expect (this.btn_active).toBeVisible();
    await expect (this.btn_inactive).toBeVisible();
     
  }
 
 
  async user_verifies_state(){
    await this.playwrightFactory.click(this.btn_state);
    await expect (this.btn_live).toBeEnabled();
    await expect (this.btn_expired).toBeDisabled();
    await expect (this.btn_archived).toBeDisabled();
   
  }
 
   async user_edits_distance(){
    await this.playwrightFactory.click(this.btn_distance);
    await this.playwrightFactory.click(this.btn_10k);
    await this.playwrightFactory.click(this.side_section);
   
   
  }
 
 
    async user_edits_local_fee(strlocalfee:string){
    await expect (this.txt_local_fee).toBeEditable();
    await this.playwrightFactory.click(this.txt_local_fee);
    await this.playwrightFactory.fill(this.txt_local_fee,strlocalfee);
   
  }
 
  async user_edits_international_fee(strinternationalfee:string){
    await expect (this.txt_local_fee).toBeEditable();
    await this.playwrightFactory.click(this.txt_international_fee);
    await this.playwrightFactory.fill(this.txt_international_fee,strinternationalfee);
 
  }
 
  async user_edit_start_date(){
    await this.playwrightFactory.click(this.btn_start_date);
    await this.playwrightFactory.click(this.btn_next_month);
    await this.playwrightFactory.click(this.btn_22);
    await this.playwrightFactory.click(this.btn_close);
  }
 
 
  async user_edit_end_date(){
    await this.playwrightFactory.click(this.btn_end_date);
    await this.playwrightFactory.click(this.btn_next_month);
    await this.playwrightFactory.click(this.btn_29);
    await this.playwrightFactory.click(this.btn_close);
  }
 
 
  async user_edits_registration_deadline(){
    await this.playwrightFactory.click(this.btn_registration_deadline);
    await this.playwrightFactory.click(this.btn_10);
    await this.playwrightFactory.click(this.btn_close);
 
  }
 
  async user_edits_widthdrawl_deadline(){
    await this.playwrightFactory.click(this.btn_withdrawl_deadline);
    await this.playwrightFactory.click(this.btn_9);
    await this.playwrightFactory.click(this.btn_close);
   
  }
 
   async user_edit_charity_of_the_yr_membership_places(strmembershipplaces:string){
    await this.playwrightFactory.click(this.txt_Charity_of_The_Year_Membership_Places);
    await this.playwrightFactory.fill(this.txt_Charity_of_The_Year_Membership_Places, strmembershipplaces);
   
  }
 
  async user_edit_classic_membership_places(strclassic:string){
    await this.playwrightFactory.click(this.txt_classic_membership_places);
    await this.playwrightFactory.fill(this.txt_classic_membership_places,strclassic);
  }
 
  async user_edit_premium_membership_places(strcharity:string){
    await this.playwrightFactory.click(this.txt_premium_membership_places);
    await this.playwrightFactory.fill(this.txt_premium_membership_places,strcharity)
   
  }
 
 
  async user_edits_region(){
    await this.playwrightFactory.click(this.btn_region);
    await this.btn_east_of_england.waitFor();
    await this.playwrightFactory.click(this.btn_east_of_england);
    await this.playwrightFactory.click(this.btn_preview_section)
   
  }
 
 
  async user_edits_address(straddesss:string){
    await this.txt_address.waitFor();
    await expect(this.txt_address).toBeEnabled();
    await expect(this.txt_address).toBeEditable();
    await this.playwrightFactory.click(this.txt_address);
    await this.playwrightFactory.fill(this.txt_address,straddesss);
    await this.playwrightFactory.click(this.btn_manchesteruk);
   
   
  }
 
  async user_seletcts_customize_gender(){
  await expect(this.drpdwn_customize_gender).toBeVisible();
  await this.playwrightFactory.click(this.drpdwn_customize_gender);
  await this.playwrightFactory.click(this.btn_male);
  await this.playwrightFactory.click(this.btn_preview_section);
 
  }
 
 
  async user_selects_charities_options(){
  await expect(this.drpdwn_charities_options).toBeVisible();
  await this.playwrightFactory.click(this.drpdwn_charities_options);
  await this.playwrightFactory.click(this.btn_included);
 
}
 
async user_selects_charities(){
  await expect(this.drpdwn_charities).toBeVisible();
  await this.playwrightFactory.click(this.drpdwn_charities);
  await this.playwrightFactory.click(this.btn_green_tree);
  await this.playwrightFactory.click(this.btn_preview_section);
 
}
 
   async user_verifies_website_registration_method(){
  await this.registration_method_website.waitFor();
  await this.playwrightFactory.click(this.registration_method_website);
 
 
 }
 
 async user_verifies_portal_registration_method(){
  await this.playwrightFactory.click(this.registration_method_portal);
 
 
}
 
async user_verifies_meta_title_checkbox(){
  await expect(this.btn_edit_meta_title).toBeVisible();
  await expect(this.btn_edit_meta_title).toBeEditable();
  await this.playwrightFactory.click(this.btn_edit_meta_title);
 
 }
 
 async user_edits_meta_title(strmetatitle: string){
   await this.playwrightFactory.fill(this.txt_meta_title,strmetatitle);
 }
 
 async user_verifies_meta_description_checkbox(){
  await expect(this.btn_edit_meta_description).toBeVisible();
  await expect(this.btn_edit_meta_description).toBeEditable();
  await this.playwrightFactory.click(this.btn_edit_meta_description);
 
 }
 
 async user_edits_meta_description(strmetadescription:string){
  await this.playwrightFactory.fill(this.txt_meta_description,strmetadescription);
 
 
 }
 
 async user_saves_edited_event(){
  await expect(this.btn_save).toBeEnabled();
  await this.playwrightFactory.click(this.btn_save);
}
 
async user_verifie_success_msg(){
  await expect(this.txt_success_msg_edit_event).toBeVisible();
  await this.playwrightFactory.click(this.btn_ok);
}
 
 
 
//********************* Delete Event ********************************** */
 
async user_clicks_back(){
  await this.playwrightFactory.click(this.btn_back);
}
 
 
  async user_search_event(striteration: any){
    let search= await this.dataFactory.getIterationData(this.container,"USER_NAME",striteration)
   await this.playwrightFactory.fill(this.txt_Search_field, search );
    await this.txt_Search_field.press('Enter');
  }
 
    
 
  async user_delete_event(){
    await this.playwrightFactory.click(this.btn_delete);
  }
 
  async user_verifies_confirmation_msg(){
    await expect (this.txt_confirmation_msg).toBeVisible();
 
  }
 
    async user_click_ok(){
    await this.playwrightFactory.click(this.btn_ok);
   
  }
 
  async user_verifies_successfully_deleted_event(){
    await expect(this.txt_sucessfully_deleted_msg).toBeVisible();
    await this.playwrightFactory.click(this.btn_ok);
  }
 
  async user_verifies_no_record_found_msg(){
    await expect (this.txt_no_record).toBeVisible();
  }
   async user_enters_video_link(strvideo:string){
    await this.playwrightFactory.fill(this.link_video,strvideo);
  }
  async user_enters_website_link(strwebsite:string){
    await this.playwrightFactory.fill(this.link_website,strwebsite);
  }
 
  async user_enters_review_link(strreview:string){
    await this.playwrightFactory.fill(this.link_review_,strreview);
  }
 
 async user_enters_terms_and_cond_link(strtermsandcondn:string){
  await this.playwrightFactory.fill(this.link_terms_condition,strtermsandcondn);
 
 }
 
 
 async user_enters_Privacy_policy_link(strpplink:string){
  await this.playwrightFactory.fill(this.link_privacy_policy,strpplink);
 }


 
 
 
 
  




}


