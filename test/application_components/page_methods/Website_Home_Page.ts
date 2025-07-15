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
readonly Profile_icon: Locator;
readonly Login_btn: Locator;
readonly RFC_logo: Locator;
readonly Find_Event_Header: Locator;
readonly All_Event_Header: Locator;
readonly Distances: Locator;
readonly All_Distances: Locator;
readonly Home_Header: Locator;
readonly Find_a_Charity_Header: Locator;
readonly Search_Charity: Locator;
readonly Search_Events: Locator;
readonly Register_My_Charity_Find_Charity: Locator;
readonly Kit_for_charity: Locator;
readonly Runner_Support: Locator;
readonly Get_of_that_Couch: Locator;
readonly Training_Plans: Locator;
readonly Diet_and_Nutritions: Locator;
readonly Injury_Help: Locator;
readonly Pacing_Charts: Locator;
readonly Fundraising_Header: Locator;
readonly Easy_Fundraising: Locator;
readonly Fundraising_Ideas: Locator;
readonly How_to_Fundraise: Locator;
readonly Why_Run_for_Charity: Locator;
readonly Partners_Header: Locator;
readonly Become_Partner: Locator;
readonly Register_My_Charity_Partner: Locator;
readonly London_Marathon_Events: Locator;
readonly RunThrough: Locator;
readonly GreateRun: Locator;
readonly ASOUK: Locator;
readonly Motiv_Sports: Locator;
readonly Landon_Landmark: Locator;
readonly Royal_Park: Locator;
readonly Contact_Us_Header: Locator;
readonly Get_in_Tuch: Locator;
readonly Register_My_Charity_Contact_us: Locator;
readonly Meet_the_Team: Locator;
readonly Become_Partner_contact_us: Locator;
readonly Careers: Locator;
readonly Upcoming_events_tittle: Locator;
readonly Event_1: Locator;
readonly Event_2: Locator;
readonly Event_3: Locator;
readonly Event_4: Locator;
readonly Event_5: Locator;
readonly Event_6: Locator;
readonly Event_7: Locator;
readonly Event_8: Locator;
readonly Event_9: Locator;
readonly Event_10: Locator;
readonly Event_11: Locator;
readonly Event_12: Locator;
readonly Event_13: Locator;
readonly Event_14: Locator;
readonly Event_15: Locator;
readonly Event_16: Locator;
readonly Event_17: Locator;
readonly Load_More_btn: Locator;
readonly Discover_events_by_distance_tittle: Locator;
readonly Event_5K_under_Discover_by_distance: Locator;
readonly Event_Count_for_5K: Locator;
readonly Event_Count_for_10K: Locator;
readonly Event_10K_under_Discover_by_distance: Locator;
readonly Event_Count_for_HalfMarathon: Locator;
readonly Event_HalfMarathon_under_Discover_by_distance: Locator;
readonly Event_Count_for_20mile: Locator;
readonly Event_20mile_under_Discover_by_distance: Locator;
readonly Event_Count_for_TrailRaces: Locator;
readonly Event_TrailRaces_under_Discover_by_distance: Locator;
readonly Events_Local_to_you_tittle: Locator;
readonly Event_CharityEastEngland_under_local_to_you: Locator;
readonly Event_CharityEastEngland_Count: Locator;
readonly Event_CharityRunsNorth_under_local_to_you: Locator;
readonly Event_CharityRunsNorth_Count: Locator;
readonly Forward_btn: Locator;
readonly Backword_btn: Locator;
readonly Event_EastofEngland_under_local_to_you: Locator;
readonly Event_EastofEngland_Count: Locator;
readonly charity_partner_tittle: Locator;
readonly Search_bar: Locator;
readonly Search_btn: Locator;
readonly Initial_A: Locator;
readonly Initial_B: Locator;
readonly Initial_C: Locator;
readonly Catagories_under_A: Locator;
readonly Catagories_under_B: Locator;
readonly Catagories_under_C: Locator;
readonly Charity_Event_tittle: Locator;
readonly Dynamic_number_under_uk_charity_members: Locator;
readonly Join_the_Run_for_charity_NewsLetter_tittle: Locator;
readonly Sub_Heading_News_letter: Locator;
readonly Select_Catagory_drpdwn: Locator;
readonly email_adress: Locator;
readonly First_name: Locator;
readonly Last_Name: Locator;
readonly News_ltter_subscribe_btn: Locator;
readonly News_letter_play_btn: Locator;
readonly Stay_update_tittle: Locator;
readonly Follow_Us_btn: Locator;
readonly Our_Partners_tittle: Locator;
readonly Our_Partners_sub_heading: Locator;
readonly Partner1: Locator;
readonly partner2: Locator;
readonly partner3: Locator;
readonly partner4: Locator;
readonly partner5: Locator;
readonly partner6: Locator;
readonly partner7: Locator;
readonly RFC_Logo_Footer: Locator;
readonly Home_Footer: Locator;
readonly Partner_footer: Locator;
readonly About_us_footer: Locator;
readonly Contact_us_footer: Locator;
readonly Charitees_footer: Locator;
readonly Search_charity_footer: Locator;
readonly Search_Event_footer: Locator;
readonly Register_your_charity_footer: Locator;
readonly Kit_for_charity_footer: Locator;
readonly Runner_Support_Footer: Locator;
readonly Get_out_that_couch_footer: Locator;
readonly Training_plans_footer: Locator;
readonly Diet_and_Nutritions_footer: Locator;
readonly Injury_Help_footer: Locator;
readonly Pacing_Charts_footer: Locator;
readonly Fundraising_Footer: Locator;
readonly Easy_Fundraising_footer: Locator;
readonly Fundraising_Idias_footer: Locator;
readonly How_to_Fundrais_footer: Locator;
readonly Why_RFC_Footer: Locator;
readonly Facebook_icon: Locator;
readonly Linkdin_Icon: Locator;
readonly X_Icon: Locator;
readonly You_tube_icon: Locator;
readonly Event_Name_tab: Locator;
readonly Event_Search_bar: Locator;
readonly Search_button: Locator;
readonly Registor_btn: Locator;
readonly Find_an_Event_btn: Locator;
readonly Start_an_Event_btn: Locator;
readonly Region_Header: Locator;
readonly All_Region: Locator;






















  
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
    this.Profile_icon= this.page.locator("#dropdownMenu");
    this.Login_btn= this.page.locator("//*[contains(text(),' Login ')]");
    this.RFC_logo= this.page.locator("//img[@alt='Run For Charity']");
    this.Find_Event_Header= this.page.locator("//div[@class='header__item']//div[@title='Find an Event']");
    this.All_Event_Header= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'All Events')]");
    this.Distances= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Distances')])[1]");
    this.All_Distances= this.page.locator("//div[@class='header__sub-body']//*[contains(text(),'All Distances')]");
    this.Home_Header= this.page.locator("//div[@class='header__item']//*[contains(text(),'Home')]");
    this.Find_a_Charity_Header= this.page.locator("//div[@class='header__item']//div[@title='Find a Charity']");
    this.Search_Charity= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Search Charities')])[1]");
    this.Search_Events= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),' Search Events')])[1]");
    this.Register_My_Charity_Find_Charity= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Register My Charity')])[1]");
    this.Kit_for_charity= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),' Kit for Charity')]");
    this.Runner_Support= this.page.locator("//div[@class='header__item']//div[@title='Runner Support']");
    this.Get_of_that_Couch= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'Get off that Couch')]");
    this.Training_Plans= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Training Plans')])[1]");
    this.Diet_and_Nutritions= this.page.locator("(//*[contains(text(),'Diet and Nutrition') and @class='header__link'])[1]");
    this.Injury_Help= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Injury Help')])[1]");
    this.Pacing_Charts= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Pacing Charts')])[1]");
    this.Fundraising_Header= this.page.locator("//div[@class='header__item']//div[@title='Fundraising']");
    this.Easy_Fundraising= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Easy Fundraising')])[1]");
    this.Fundraising_Ideas= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Fundraising Ideas')])[1]");
    this.How_to_Fundraise= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'How to Fundraise')]");
    this.Why_Run_for_Charity= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Why Run for Charity')])[1]");
    this.Partners_Header= this.page.locator("//div[@class='header__item']//div[@title='Partners']");
    this.Become_Partner= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Become a Partner')])[1]");
    this.Register_My_Charity_Partner= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Register My Charity')])[2]");
    this.London_Marathon_Events= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'London Marathon Events')]");
    this.RunThrough= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'RunThrough')]");
    this.GreateRun= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'Great Run')]");
    this.ASOUK= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'ASO-UK')]");
    this.Motiv_Sports= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'Motiv Sports')]");
    this.Landon_Landmark= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'London Landmarks')]");
    this.Royal_Park= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'The Royal Parks')]");
    this.Contact_Us_Header= this.page.locator("//div[@class='header__item']//div[@title='Contact Us']");
    this.Get_in_Tuch= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'Get in Touch')]");
    this.Register_My_Charity_Contact_us= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Register My Charity')])[3]");
    this.Meet_the_Team= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'Meet the Team')]");
    this.Become_Partner_contact_us= this.page.locator("(//div[@class='header__sub-item']//*[contains(text(),'Become a Partner')])[2]");
    this.Careers= this.page.locator("//div[@class='header__sub-item']//*[contains(text(),'Careers')]");
    this.Upcoming_events_tittle= this.page.locator("//*[contains(text(),'Upcoming Events')]");
    this.Event_1= this.page.locator("(//div[@class='card8__container'])[1]");
    this.Event_2= this.page.locator("(//div[@class='card8__container'])[2]");
    this.Event_3= this.page.locator("(//div[@class='card8__container'])[3]");
    this.Event_4= this.page.locator("(//div[@class='card8__container'])[4]");
    this.Event_5= this.page.locator("(//div[@class='card8__container'])[5]");
    this.Event_6= this.page.locator("(//div[@class='card8__container'])[6]");
    this.Event_7= this.page.locator("(//div[@class='card8__container'])[7]");
    this.Event_8= this.page.locator("(//div[@class='card8__container'])[8]");
    this.Event_9= this.page.locator("(//div[@class='card8__container'])[9]");
    this.Event_10= this.page.locator("(//div[@class='card8__container'])[10]");
    this.Event_11= this.page.locator("(//div[@class='card8__container'])[11]");
    this.Event_12= this.page.locator("(//div[@class='card8__container'])[12]");
    this.Event_13= this.page.locator("(//div[@class='card8__container'])[13]");
    this.Event_14= this.page.locator("(//div[@class='card8__container'])[14]");
    this.Event_15= this.page.locator("(//div[@class='card8__container'])[15]");
    this.Event_16= this.page.locator("(//div[@class='card8__container'])[16]");
    this.Event_17= this.page.locator("(//div[@class='card8__container'])[17]");
    this.Load_More_btn= this.page.locator("//*[contains(text(),'Load More')]");
    this.Discover_events_by_distance_tittle= this.page.locator("//*[contains(text(),'Discover Events by Distance')]");
    this.Event_5K_under_Discover_by_distance= this.page.locator("//h3[@class='event_Distance_section__title']/ancestor::event-by-distance//*[contains(text(),'5K')]");
    this.Event_Count_for_5K= this.page.locator("//*[contains(text(),'5K')]/ancestor::event-by-distance//span[@class='event_Distance_section__details']");
    this.Event_Count_for_10K= this.page.locator("//*[contains(text(),'10K')]/ancestor::event-by-distance//span[@class='event_Distance_section__details']");
    this.Event_10K_under_Discover_by_distance= this.page.locator("//h3[@class='event_Distance_section__title']/ancestor::event-by-distance//*[contains(text(),'10K')]");
    this.Event_HalfMarathon_under_Discover_by_distance= this.page.locator("//h3[@class='event_Distance_section__title']/ancestor::event-by-distance//*[contains(text(),'Half Marathon')]");
    this.Event_Count_for_HalfMarathon= this.page.locator("//*[contains(text(),'Half Marathon')]/ancestor::event-by-distance//span[@class='event_Distance_section__details']");
    this.Event_Count_for_20mile= this.page.locator("//*[contains(text(),'20 Mile')]/ancestor::event-by-distance//span[@class='event_Distance_section__details']");
    this.Event_20mile_under_Discover_by_distance= this.page.locator("//h3[@class='event_Distance_section__title']/ancestor::event-by-distance//*[contains(text(),'20 Mile')]");
    this.Event_TrailRaces_under_Discover_by_distance=this.page.locator("//h3[@class='event_Distance_section__title']/ancestor::event-by-distance//*[contains(text(),'Trail Races')]");
    this.Event_Count_for_TrailRaces= this.page.locator("//*[contains(text(),'Trail Races')]/ancestor::event-by-distance//span[@class='event_Distance_section__details']")
    this.Events_Local_to_you_tittle= this.page.locator("//*[contains(text(),'Events Local To You')]");
    this.Event_CharityEastEngland_under_local_to_you= this.page.locator("(//*[contains(text(),'Events Local To You')]/ancestor::div//div[@class='card10__title_wrapper']/ancestor::component-card10//*[contains(text(),'Charity Runs East of England')])[1]");
    this.Event_CharityEastEngland_Count= this.page.locator("(//*[contains(text(),'Events Local To You')]/ancestor::div//div[@class='card10__title_wrapper']/ancestor::component-card10//div[@class='card10__subtitle'])[1]");
    this.Event_CharityRunsNorth_under_local_to_you= this.page.locator("//*[contains(text(),'Events Local To You')]/ancestor::div//*[contains(text(),'Charity Runs North East')]/ancestor::component-card10//*[contains(text(),'Charity Runs North East')]");
    this.Event_CharityRunsNorth_Count= this.page.locator("//*[contains(text(),'Events Local To You')]/ancestor::div//*[contains(text(),'Charity Runs North East')]/ancestor::component-card10//div[@class='card10__subtitle']");
    this.Forward_btn= this.page.locator("//component-button[@centericon='assets/icons/arrow_forward-light.svg']");
    this.Backword_btn= this.page.locator("//component-button[@centericon='assets/icons/arrow_backward-light.svg']");
    this.Event_EastofEngland_under_local_to_you= this.page.locator("(//*[contains(text(),'Events Local To You')]/ancestor::div//*[contains(text(),'East of England')]/ancestor::component-card10//*[contains(text(),'East of England')])[3]");
    this.Event_EastofEngland_Count= this.page.locator("(//*[contains(text(),'Events Local To You')]/ancestor::div//*[contains(text(),'East of England')]/ancestor::component-card10//div[@class='card10__subtitle'])[3]");
    this.charity_partner_tittle= this.page.locator("//*[contains(text(),'Look through our amazing charity partners')]");
    this.Search_bar= this.page.locator("//input[@placeholder='Search for a Charity Category or Keywords...']");
    this.Search_btn= this.page.locator("//*[contains(text(),'Look through our amazing charity partners')]/ancestor::app-charity-filter//*[contains(text(),'Search')]");
    this.Initial_A= this.page.locator("//*[contains(text(),'A') and @class='charityfilter-category-letter']");
    this.Initial_B= this.page.locator("//*[contains(text(),'B') and @class='charityfilter-category-letter']")
    this.Initial_C= this.page.locator("//*[contains(text(),'C') and @class='charityfilter-category-letter']")
    this.Catagories_under_A= this.page.locator("(//*[contains(text(),'A') and @class='charityfilter-category-letter']/ancestor::div//*[contains(text(),'Animal')])[2]");
    this.Catagories_under_B= this.page.locator("//*[contains(text(),'B') and @class='charityfilter-category-letter']/ancestor::div//*[contains(text(),'Baby')]");
    this.Catagories_under_C= this.page.locator("//*[contains(text(),'B') and @class='charityfilter-category-letter']/ancestor::div//*[contains(text(),'Category three1')]");
    this.Charity_Event_tittle= this.page.locator("//*[contains(text(),'Charity Events')]");
    this.Dynamic_number_under_uk_charity_members= this.page.locator("(//div[@class='countIn text-center'])[3]")
    this.Join_the_Run_for_charity_NewsLetter_tittle= this.page.locator("//*[contains(text(),'Join the Run For Charity Newsletter')]");
    this.Sub_Heading_News_letter= this.page.locator("//*[contains(text(),'Be a Part of the Run for Charity Community')]");
    this.Select_Catagory_drpdwn= this.page.locator("//*[contains(text(),'Select your category')]/ancestor::div//select[@id='mce-group[30622]']");
    this.email_adress= this.page.locator('#mce-EMAIL');
    this.First_name= this.page.locator('#mce-FNAME');
    this.Last_Name= this.page.locator('#mce-LNAME');
    this.News_ltter_subscribe_btn= this.page.locator("#mc-embedded-subscribe");
    this.News_letter_play_btn= this.page.locator("//button[@class='newsletter__play_btn']")
    this.Stay_update_tittle= this.page.locator("//*[contains(text(),'Stay updated with our latest races and events')]");
    this.Follow_Us_btn= this.page.locator("//*[contains(text(),'Follow Us')]");
    this.Our_Partners_tittle= this.page.locator("//*[contains(text(),'Our Partners ')]")
    this.Our_Partners_sub_heading= this.page.locator("//*[contains(text(),'Our Partners')]/ancestor::app-section-title//*[contains(text(),'What')]");
    this.Partner1= this.page.locator("//a[@href='https://www.greatrun.org']");
    this.partner2= this.page.locator("//a[@href='https://www.londonmarathonevents.co.uk/']");
    this.partner3= this.page.locator("//a[@href='https://www.aso.fr/en/']");
    this.partner4= this.page.locator("//a[@href='https://www.motivsports.com/']");
    this.partner5= this.page.locator("//a[@href='https://www.runthrough.co.uk/']");
    this.partner6= this.page.locator("//a[@href='https://www.royalparkshalf.com/']");
    this.partner7= this.page.locator("//a[@href='https://llhm.co.uk/']");
    this.RFC_Logo_Footer= this.page.locator("//img[@src='assets/images/logo_white.svg']");
    this.About_us_footer= this.page.locator("//*[contains(text(),'About Us') and @class='footer__title pb-2 pb-sm-2']");
    this.Home_Footer= this.page.locator("//*[contains(text(),'About Us') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Home') and @class='footer__link']");
    this.Partner_footer= this.page.locator("//*[contains(text(),'About Us') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Partners') and @class='footer__link']");
    this.Contact_us_footer= this.page.locator("//*[contains(text(),'About Us') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Contact Us') and @class='footer__link']");
    this.Charitees_footer= this.page.locator("//*[contains(text(),'Charities') and @class='footer__title pb-2 pb-sm-2']");
    this.Search_charity_footer= this.page.locator("//*[contains(text(),'Charities') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Search Charities') and @class='footer__link']");
    this.Search_Event_footer= this.page.locator("//*[contains(text(),'Charities') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Search Events') and @class='footer__link']");
    this.Register_your_charity_footer= this.page.locator("//*[contains(text(),'Charities') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Register Your Charity') and @class='footer__link']")
    this.Kit_for_charity_footer= this.page.locator("//*[contains(text(),'Charities') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Kit for Chaity') and @class='footer__link']");
    this.Runner_Support_Footer= this.page.locator("//*[contains(text(),'Runner Support') and @class='footer__title pb-2 pb-sm-2']");
    this.Get_out_that_couch_footer= this.page.locator("//*[contains(text(),'Runner Support') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Get of that Couch') and @class='footer__link']");
    this.Training_plans_footer= this.page.locator("//*[contains(text(),'Runner Support') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Training Plans') and @class='footer__link']");
    this.Diet_and_Nutritions_footer= this.page.getByRole('link', { name: 'Diet and Nutrition' });
    this.Injury_Help_footer= this.page.locator("//*[contains(text(),'Runner Support') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Injury Help') and @class='footer__link']");
    this.Pacing_Charts_footer= this.page.locator("//*[contains(text(),'Runner Support') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Pacing Charts') and @class='footer__link']");
    this.Fundraising_Footer= this.page.locator("//*[contains(text(),'Fundraising') and @class='footer__title pb-2 pb-sm-2']");
    this.Easy_Fundraising_footer= this.page.locator("//*[contains(text(),'Fundraising') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Easy Fundraising') and @class='footer__link']");
    this.Fundraising_Idias_footer= this.page.locator("//*[contains(text(),'Fundraising') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Fundraising Ideas') and @class='footer__link']");
    this.How_to_Fundrais_footer= this.page.locator("//*[contains(text(),'Fundraising') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'How to Fundraising') and @class='footer__link']");
    this.Why_RFC_Footer= this.page.locator("//*[contains(text(),'Fundraising') and @class='footer__title pb-2 pb-sm-2']/ancestor::div//div[@class='row flex-sm-column align-items-center align-items-sm-start']//*[contains(text(),'Why Run for Charity') and @class='footer__link']");
    this.Facebook_icon= this.page.locator("//a[@class='facebook footer__link media']");
    this.Linkdin_Icon= this.page.locator("//a[@class='footer__link linkedin media']");
    this.X_Icon= this.page.locator("//a[@class='footer__link media twitter']");
    this.You_tube_icon= this.page.locator("//a[@class='footer__link google media']");
    this.Event_Name_tab= this.page.locator("#event_name-tab");
    this.Event_Search_bar= this.page.locator("//input[@placeholder='Search your Event ']");
    this.Search_button= this.page.locator("//*[contains(text(),'Search')]/ancestor::button");
    this.Registor_btn= this.page.locator("//*[contains(text(),'Register')]/ancestor::button")
    this.Find_an_Event_btn= this.page.locator("//*[contains(text(),'Find an Event') and @class='button main__button']");
    this.Start_an_Event_btn= this.page.locator("//*[contains(text(),'Start an event') and @class='button main__button']");
    this.Region_Header= this.page.locator("//div[@class='header__sub-body']//*[contains(text(),'Regions')]");
    this.All_Region= this.page.locator("//div[@class='header__sub-body']//*[contains(text(),'All Regions')]");
    








    
    

   
    
  }
  
  async user_launches_website() {
    let url = process.env.APP_URL || "https://rfc-staging.sportsmediaagency.com/"
    await this.playwrightFactory.launchApplication(url);
  }
  async user_click_profile_icon(){
    await this.Profile_icon.hover();
  }
  async user_click_loging_btn(){
    await this.playwrightFactory.click(this.Login_btn);
  }
  async user_wait_until_logo_visible(){
    await this.RFC_logo.waitFor();
    await expect(this.RFC_logo).toBeVisible();
  }
  async user_click_find_an_event(){
    await this.Find_Event_Header.hover();
  }
  async user_click_all_event(){
    await this.playwrightFactory.click(this.All_Event_Header);
  }
  async user_click_distances(){
    await this.playwrightFactory.click(this.Distances);
  }
  async user_click_all_distances(){
    await this.playwrightFactory.click(this.All_Distances);
  }
  async user_click_home_tab(){
    await this.playwrightFactory.click(this.Home_Header);
  }
  async user_click_find_a_charity(){
    await this.Find_a_Charity_Header.hover();
  }
  async user_verify_search_charity(){
    await expect(this.Search_Charity).toBeVisible();
  }
  async user_verify_search_events(){
    await expect(this.Search_Events).toBeVisible();
  }
  async user_verify_register_my_charity(){
    await expect(this.Register_My_Charity_Find_Charity).toBeVisible();
  }
  async user_verify_kit_for_charity(){
    await expect(this.Kit_for_charity).toBeVisible();
  }
  async user_click_runner_support(){
    await this.Runner_Support.hover();
  }
  async user_verify_get_off_that_couch(){
await expect(this.Get_of_that_Couch).toBeVisible();
  }
  async user_verify_training_plans(){
    await expect(this.Training_Plans).toBeVisible();
  }
  async user_verify_Diet_and_nutritions(){
    await expect(this.Diet_and_Nutritions).toBeVisible();
  }
  async user_verify_injury_help(){
    await expect(this.Injury_Help).toBeVisible();
  }
  async user_verify_pacing_chrts(){
    await expect(this.Pacing_Charts).toBeVisible();
  }
  async user_click_fundraising(){
    await this.Fundraising_Header.hover();
  }
  async user_verify_easy_fundraising(){
    await expect(this.Easy_Fundraising).toBeVisible();
  }
  async user_verify_fundraising_ideas(){
    await expect(this.Fundraising_Ideas).toBeVisible();
  }
  async user_verify_how_to_fundraise(){
    await expect(this.How_to_Fundraise).toBeVisible();
  }
  async user_verify_why_RFC(){
    await expect(this.Why_Run_for_Charity).toBeVisible();
  }
  async user_click_partners(){
    await this.Partners_Header.hover();
  }
  async user_verify_become_partner(){
    await expect(this.Become_Partner).toBeVisible();
  }
  async user_verify_register_for_charity(){
    await expect(this.Register_My_Charity_Partner).toBeVisible();
  }
  async user_verify_london_marathon(){
    await expect(this.London_Marathon_Events).toBeVisible();
  }
  async user_verify_runthrough(){
    await expect(this.RunThrough).toBeVisible();
  }
  async user_verify_greatrun(){
    await expect(this.GreateRun).toBeVisible();
  }
  async user_verify_aso(){
    await expect(this.ASOUK).toBeVisible();
  }
  async user_verify_motiv_sport(){
    await expect(this.Motiv_Sports).toBeVisible();
  }
  async user_verify_landon_landmarks(){
    await expect(this.Landon_Landmark).toBeVisible();
  }
  async user_verify_royal_park(){
    await expect(this.Royal_Park).toBeVisible();
  }
  async user_click_contact_us(){
    await this.Contact_Us_Header.hover();
  }
  async user_verify_get_in_touch(){
    await expect(this.Get_in_Tuch).toBeVisible();
  }
  async user_verify_register_my_chrity_from_contact_us(){
    await expect(this.Register_My_Charity_Contact_us).toBeVisible();
  }
  async user_verify_meet_the_team(){
    await expect(this.Meet_the_Team).toBeVisible();
  }
  async user_veirify_become_partner_from_contact_us(){
    await expect(this.Become_Partner_contact_us).toBeVisible();
  }
  async user_verify_careers(){
    await expect(this.Careers).toBeVisible();
  }
  async user_scroll_down(){
    await this.page.evaluate(() => {
window.scrollBy(1000, 1500); // Scroll down
});
  }
  async user_verify_upcaming_event_tittle(){
    await expect(this.Upcoming_events_tittle).toBeVisible();
  }
  async user_verify_16_event_present(){
    await expect(this.Event_1).toBeVisible();
    await expect(this.Event_2).toBeVisible();
    await expect(this.Event_3).toBeVisible();
    await expect(this.Event_4).toBeVisible();
    await expect(this.Event_5).toBeVisible();
    await expect(this.Event_6).toBeVisible();
    await expect(this.Event_7).toBeVisible();
    await expect(this.Event_8).toBeVisible();
    await expect(this.Event_9).toBeVisible();
    await expect(this.Event_10).toBeVisible();
    await expect(this.Event_11).toBeVisible();
    await expect(this.Event_12).toBeVisible();
    await expect(this.Event_13).toBeVisible();
    await expect(this.Event_14).toBeVisible();
    await expect(this.Event_15).toBeVisible();
    await expect(this.Event_16).toBeVisible();

  }
  async user_verify_load_more_btn(){
    await expect(this.Load_More_btn).toBeVisible();
  }
  async user_click_load_more_btn(){
    await this.playwrightFactory.click(this.Load_More_btn);
  }
  async user_verify_17th_event(){
    await expect(this.Event_17).toBeVisible();
  }
  async user_verify_doscover_events_by_distance_tittle(){
    await expect(this.Discover_events_by_distance_tittle).toBeVisible();
  }
  async user_verify_5K_event_and_count_under_discover_by_distance(){
    await expect(this.Event_5K_under_Discover_by_distance).toBeVisible();
    await expect(this.Event_Count_for_5K).toBeVisible();
  }
  async user_verify_10K_event_and_count_under_discover_by_distance(){
    await expect(this.Event_10K_under_Discover_by_distance).toBeVisible();
    await expect(this.Event_Count_for_10K).toBeVisible();
  }
  async user_verify_HalfMarathon_event_and_count_under_discover_by_distance(){
    await expect(this.Event_HalfMarathon_under_Discover_by_distance).toBeVisible();
    await expect(this.Event_Count_for_HalfMarathon).toBeVisible();
  } 
  async user_verify_20mile_event_and_count_under_discover_by_distance(){
    await expect(this.Event_20mile_under_Discover_by_distance).toBeVisible();
    await expect(this.Event_Count_for_20mile).toBeVisible();

  }
  async user_verify_TrailRaces_event_and_count_under_discover_by_distance(){
    await expect(this.Event_TrailRaces_under_Discover_by_distance).toBeVisible();
    await expect(this.Event_Count_for_TrailRaces).toBeVisible();
  }
  async user_verify_event_local_to_you_tittle(){
    await expect(this.Events_Local_to_you_tittle).toBeVisible();
  }
  async user_verify_event_under_local_to_you(){
    await expect(this.Event_CharityEastEngland_under_local_to_you).toBeVisible();
  await expect(this.Event_CharityEastEngland_Count).toBeVisible();
  await expect(this.Event_CharityRunsNorth_under_local_to_you).toBeVisible();
  await expect(this.Event_CharityRunsNorth_Count).toBeVisible();
  }
  async user_check_backword_and_forword_btns(){
    await this.playwrightFactory.click(this.Forward_btn);
    await expect(this.Event_EastofEngland_under_local_to_you).toBeVisible();
    await this.playwrightFactory.click(this.Backword_btn)
    await expect(this.Event_CharityEastEngland_under_local_to_you).toBeVisible();
  }
  async user_verify_charity_partners_tittle(){
    await expect(this.charity_partner_tittle).toBeVisible();
  }
  async user_verify_searchbar(){
    await expect(this.Search_bar).toBeVisible();
  }
  async user_verify_search_btn(){
    await expect(this.Search_btn).toBeVisible();
  }
  async user_verify_list_catagorier_according_to_initials(){
    //await this.page.evaluate(() => {
//window.scrollBy(500, 1000); // Scroll down
//});
    await expect(this.Initial_A).toBeVisible();
    await expect(this.Catagories_under_A).toBeVisible();
    await expect(this.Initial_B).toBeVisible();
    await expect(this.Catagories_under_B).toBeVisible();
    await expect(this.Initial_C).toBeVisible();
    //await expect(this.Catagories_under_C).toBeVisible();
  }
  async user_verify_charity_event_tittle(){
    await expect(this.Charity_Event_tittle).toBeVisible();
  }
  async user_verify_dynamic_number_under_of_the_biggest_running(strNumber: string){
    await expect(this.page.locator("//*[contains(text(),'Of the biggest running')]/ancestor::div//*[contains(text(),'"+strNumber+"')]")).toBeVisible();
  }
   async user_verify_dynamic_number_under_potential_fundraiser_per_year(strNumber: string){
    await expect(this.page.locator("//*[contains(text(),'Of the biggest running')]/ancestor::div//*[contains(text(),'"+strNumber+"')]")).toBeVisible();
  }
  async user_verify_dynamic_number_under_uk_charity_members(){
    await expect(this.Dynamic_number_under_uk_charity_members).toBeVisible();
  }
  async user_verify_news_letter_tittle(){
    await expect(this.Join_the_Run_for_charity_NewsLetter_tittle).toContainText('Join the Run For Charity Newsletter');
  }
  async user_verify_sub_heading(){
    await expect(this.Sub_Heading_News_letter).toContainText('Be a Part of the Run for Charity Community');
  }
  async user_verify_select_catagory_drpdwn(){
    await expect(this.Select_Catagory_drpdwn).toBeVisible();
  }
  async user_select_option_from_catagory_drpdwn(){
    await this.Select_Catagory_drpdwn.selectOption({label:'Charity'})

  }
  async user_enter_email(striteration: any){
     let Email = await this.dataFactory.getIterationData(this.container,'EMAIL',striteration);
    await this.playwrightFactory.fill(this.email_adress,Email);
  }
  async user_verify_email_field(){
    await expect(this.email_adress).toBeVisible();
  }
  async user_verify_first_name_field(){
    await expect(this.First_name).toBeVisible();
  }
  async user_enter_first_name(striteration: any){
    let firstname = await this.dataFactory.getIterationData(this.container,'USER_NAME',striteration);
    await this.playwrightFactory.fill(this.First_name,firstname);
  }
  async user_verify_last_name(){
    await expect(this.Last_Name).toBeVisible();
  }
  async user_enter_last_name(strLname: string){
    await this.playwrightFactory.fill(this.Last_Name, strLname);
  }
  async user_verify_subscribe_btn(){
    await expect(this.News_ltter_subscribe_btn).toBeVisible();
    await expect(this.News_ltter_subscribe_btn).toBeEnabled();
  }
  async user_verify_news_letter_play_button(){
    await expect(this.News_letter_play_btn).toBeVisible();
    await expect(this.News_letter_play_btn).toBeEnabled();
  }
  async user_verify_stay_update_tittle(){
    await expect(this.Stay_update_tittle).toContainText('Stay updated with our latest races and events');
  }
  async user_verify_follow_us_btn(){
    await expect(this.Follow_Us_btn).toBeVisible();
    await expect(this.Follow_Us_btn).toBeEnabled();
  }
  async user_verify_our_partner_tittle(){
    await expect(this.Our_Partners_tittle).toContainText('Our Partners ');
  }
  async user_verify_our_partners_sub_heading(){
    await expect(this.Our_Partners_sub_heading).toContainText("What's coming up in the run for charity events calendar? It’s never too late to join one of these great events.");
  }
  async user_verify_partners(){
    await expect(this.Partner1).toBeVisible();
    await expect(this.partner2).toBeVisible();
    await expect(this.partner3).toBeVisible();
    await expect(this.partner4).toBeVisible();
    await expect(this.partner5).toBeVisible();
    await expect(this.partner6).toBeVisible();
    await expect(this.partner7).toBeVisible();
  }
  async user_verify_footer_rfc_logo(){
    await this.page.evaluate(() => {
window.scrollBy(500, 1000); // Scroll down
});
    await expect(this.RFC_Logo_Footer).toBeVisible();
  }
  async user_verify_about_us_menu(){
    await expect(this.About_us_footer).toBeVisible();
    await expect(this.Home_Footer).toBeVisible();
    await expect(this.Partner_footer).toBeVisible();
    await expect(this.Contact_us_footer).toBeVisible();
  }
  async user_verify_charities_menu_footer(){
    await expect(this.Search_Event_footer).toBeVisible();
    await expect(this.Search_charity_footer).toBeVisible();
    await expect(this.Register_your_charity_footer).toBeVisible();
    await expect(this.Kit_for_charity_footer).toBeVisible();
  }
  async user_verify_runner_support_menu_footer(){
    await expect(this.Runner_Support_Footer).toBeVisible();
    await expect(this.Diet_and_Nutritions_footer).toBeVisible();
    
    await expect(this.Pacing_Charts_footer).toBeVisible();
    await expect(this.Get_out_that_couch_footer).toBeVisible();
    await expect(this.Training_plans_footer).toBeVisible();
    await expect(this.Injury_Help_footer).toBeVisible();
  }
  async user_verify_Fundraising_menu_footer(){
    await expect(this.Fundraising_Footer).toBeVisible();
    await expect(this.Easy_Fundraising_footer).toBeVisible();
    await expect(this.Fundraising_Idias_footer).toBeVisible();
    await expect(this.How_to_Fundrais_footer).toBeVisible();
    await expect(this.Why_RFC_Footer).toBeVisible();
  }
  async user_verify_fb_linkding_x_and_youtube_icon(){
    await expect(this.Facebook_icon).toBeVisible();
    await expect(this.Linkdin_Icon).toBeVisible();
    await expect(this.X_Icon).toBeVisible();
    await expect(this.You_tube_icon).toBeVisible();
  }
  async user_click_event_name_tab(){
    await this.playwrightFactory.click(this.Event_Name_tab);
  }
  async user_search_event(strEvent: string){
    await this.playwrightFactory.fill(this.Event_Search_bar, strEvent);
    await this.playwrightFactory.click(this.Search_button);
    await this.page.waitForTimeout(5000);
  }
  async user_click_register_button_of_event(){
    await this.playwrightFactory.click(this.Registor_btn);
  }
  async user_click_find_an_event_btn(){
    await this.playwrightFactory.click(this.Find_an_Event_btn);
  }
  async user_click_start_an_event_btn(){
    await this.playwrightFactory.click(this.Start_an_Event_btn);
  }
  async user_click_regions(){
    await this.playwrightFactory.click(this.Region_Header);
  }
  async user_click_all_regions(){
    await this.playwrightFactory.click(this.All_Region);
  }
  async user_click_10k_event_from_distance_section(){
    await this.playwrightFactory.click(this.Event_10K_under_Discover_by_distance);
  }
  async user_click_charity_east_england(){
    await this.playwrightFactory.click(this.Event_CharityEastEngland_under_local_to_you);
  }
  async user_click_search_events(){
    await this.playwrightFactory.click(this.Search_Events);
  }
  





}


