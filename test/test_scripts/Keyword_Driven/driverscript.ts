import Container  from '../../utilities/container'; // Replace with the correct path to your Container class
import  {test, TestInfo } from '@playwright/test';
import {Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { PlaywrightFactoryActionsAPI } from '../../utilities/playwright_factory_actions_API';
import { Create_Charity_Chatagory_Page } from '../../application_components/page_methods/Create_Charity_Catagory_Page';
import { TRAX_TrackShipmentPage } from '../../application_components/page_methods/trax_trackshipment_page';
import { TrackShipmentAPI } from '../../application_components/page_apis/trax_trackshipmet_apis';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { PowerBI_Actions } from '../../utilities/powerbi';
import { PowerBI } from '../../application_components/page_methods/powerbi';
import { AppInsightsKQLExecutor } from '../../utilities/azure_appinsights';
import { AzureAppInsights } from '../../application_components/page_apis/azure_appinsights_apis';
import { LOGIN_PAGE } from '../../application_components/page_methods/Login_Page';
import { HOME_PAGE } from '../../application_components/page_methods/Home_Page';
import { CHARITIES_PAGE } from "../../application_components/page_methods/Charities_Page";
import { CREATE_EVENT_PAGE } from '../../application_components/page_methods/Create_Event_Page';
import { Event_PAGE } from "../../application_components/page_methods/Event_Page";
import { CREATE_CHARITIES } from "../../application_components/page_methods/Create_Charities_Page";
import { LOGOUT_PAGE } from "../../application_components/page_methods/LogOut_Page";
import { MANAGER_PAGE } from '../../application_components/page_methods/Managers_Page';
import { EDIT_CHARITIES } from '../../application_components/page_methods/Edit_Charity_Page';
import { EVENT_PHOTO_VEDIOS } from '../../application_components/page_methods/Event_Photo_Vedio_Page';
import { MARKETING_EVENT } from '../../application_components/page_methods/Create_Marketing_Event';
import { TUTORIALS_PAGE } from '../../application_components/page_methods/Tutorials_Page';
import { REGISTRATION_PAGE } from '../../application_components/page_methods/Registration_Page';
import { CREATE_EVENT_REGISTRATION } from '../../application_components/page_methods/Create_Event_Registration_Page';
import { LANDING_PAGE } from '../../application_components/page_methods/Landing_Page';
import { CREATE_TUTORIALS_PAGE } from '../../application_components/page_methods/Create_Tutorials_Page';
import { PARTICIPENT_PAGE } from '../../application_components/page_methods/Participent_Page';
import { EDIT_EVENT_PAGE } from '../../application_components/page_methods/Edit_Event_Page';
import { MANAGE_REQUIRMENT } from '../../application_components/page_methods/Manage_Requirements_Page';
import { MANAGE_CUSTOM_FIELD } from '../../application_components/page_methods/Manage_Custom_Fields_Page';
import { EDIT_MARKETING_FOLDER } from '../../application_components/page_methods/Edit_Marketing_Folder_Page';
import { ENQUIRY_CHARITIES } from '../../application_components/page_methods/Enquiry_Charities_Page';
import { CREATE_ENQUIRY_CHARITIES } from '../../application_components/page_methods/Create_Charity_Enquiry';
import { partner_charity } from '../../application_components/page_methods/Partner_charity_history_page';

import { Home_page } from '../../application_components/page_methods/Website_Homepage';
import { signup_page } from '../../application_components/page_methods/Website_Signup_page';
import { Participantsignup_page } from '../../application_components/page_methods/Website_Participant_Signup_page';
import { website_register_ascharity_page } from '../../application_components/page_methods/Website_Register_as_charity_page';

import { PARTNER_EVENT_PAGE } from '../../application_components/page_methods/Partner_Event_page';
import { EXTERNAL_ENQUIRY_HOMEPAGE } from '../../application_components/page_methods/External_Enquiry_Create_page';
import { Website_ENQUIRY_HOMEPAGE } from '../../application_components/page_methods/Portal_Website_Enquiry_Create_page';
import { CREATE_EVENT_HUBPAGE } from '../../application_components/page_methods/Create_Event_Hub_page';
import { ENQUIRY_MANAGEMENT_EXTERNAL_PAGE } from '../../application_components/page_methods/Enquiry_Management_External_Page';
import { ENQUIRY_MANAGEMENT_WEBSITE_PAGE } from '../../application_components/page_methods/Enquiry_Management_Website_Page';
import { EVENT_HUB_PAGE } from '../../application_components/page_methods/Event_Hub_Page';
import { INVOICE_PAGE } from '../../application_components/page_methods/Invoice_Page';
import { PARTNER_PACKAGES_PAGE } from '../../application_components/page_methods/Partner_Packages_Page';
import { RENEWALS_PAGE } from '../../application_components/page_methods/Renewals_Page';
import { website_Login_page } from '../../application_components/page_methods/Website_Login_Page';
import { TIMELINE_PAGE } from '../../application_components/page_methods/Timeline_Page';

import { CONTRACT_PAGE } from '../../application_components/page_methods/Contract_Page';
import { CREATE_CONTRACT_PAGE } from '../../application_components/page_methods/Create_Contract_Page';
import { WEBSITE_HOME_PAGE } from '../../application_components/page_methods/Website_Home_Page';
import { Portal_Event_Manager_Dashboard } from '../../application_components/page_methods/Portal_event_manager_dashboard';
import { Website_General_Details_Page } from '../../application_components/page_methods/Website_General_Details_Page';
import { Website_Search_Page } from '../../application_components/page_methods/Website_Search_Page';
import { Payment_details } from '../../application_components/page_methods/Website_payment_details';
import { Setup_account } from '../../application_components/page_methods/Website_setup_your_account';
import { Website_visitors } from '../../application_components/page_methods/Website_user_story_visitors';
import { Contract_in_Charity_Management } from '../../application_components/page_methods/Contract_in_Charity_Management';
import { PORTAL_MARKETING_MANAGEMENT_PAGE } from '../../application_components/page_methods/Portal_Marketing_Management_Page';
import { WEBSITE_CHARITY_REGISTER_NOW_PAGE } from '../../application_components/page_methods/Website_Charity_Register_Now_Page';
import { WEBSITE_LONDON_REGIONS_PAGE } from '../../application_components/page_methods/Website_London_Region_Page';
import { WEBSITE_MIDLANDS_REGIONS_PAGE } from '../../application_components/page_methods/Website_Midlands_Region_Page';
import { WEBSITE_NORTH_WEST_REGIONS_PAGE } from '../../application_components/page_methods/Website_North_West_Region_Page';
import { WEBSITE_REGISTER_MY_CHARITY_PAGE } from '../../application_components/page_methods/Website_Register_My_Charity_Page';
import { WEBSITE_SOUTH_EAST_REGIONS_PAGE } from '../../application_components/page_methods/Website_South_East_Region_Page';
import { REGISTRATION_EVENT_WEBSITE } from '../../application_components/page_methods/Registration_For_Anevent_Page';
import { WEBSITE_ALL_EVENT_PAGE } from '../../application_components/page_methods/Website_All_Event_Page';
import { WEBSITE_ALL_DISTANCES_PAGE } from '../../application_components/page_methods/Website_All_Distances_Page';
import { WEBSITE_EVENT_DETAILS_PAGE } from '../../application_components/page_methods/Website_Event_Details_Page';
import { WEBSITE_ALL_REGIONS_PAGE } from '../../application_components/page_methods/Website_All_Regions_Page';


export class DriverScript {

  async registerContainer(container: Container, testInfo :TestInfo) {
    container.register('testInfo', testInfo);
    container.register('playwrightFactory', new PlaywrightFactoryActions(container));
    container.register('playwrightAPIFactory', new PlaywrightFactoryActionsAPI(container));
    container.register('databricks_sqlware', new DatabricksSQLwarehouse(container));
    container.register('databricks_dbfs', new DatabricksFactoryDBFS(container));
    container.register('powerbi', new PowerBI_Actions(container));
    container.register('azure_appinsights', new AppInsightsKQLExecutor(container));
    container.register('azure_appinsights_apis', new AzureAppInsights(container));
    
    /* UI Page Methods*/
    container.register('Create_Charity_Catagory_Page', new Create_Charity_Chatagory_Page(container));
    container.register('trax_trackshipment_page', new TRAX_TrackShipmentPage(container));
    container.register('powerbi', new PowerBI(container));
    container.register('Login_Page', new LOGIN_PAGE(container));
    container.register('Home_Page', new HOME_PAGE(container));
    container.register('Charities_Page', new CHARITIES_PAGE(container));
    container.register('Create_Event_Page', new CREATE_EVENT_PAGE(container));
    container.register('Event_Page', new Event_PAGE(container));
    container.register('Create_Charities_Page', new CREATE_CHARITIES(container));
    container.register('LogOut_Page', new LOGOUT_PAGE(container));
    container.register('Managers_Page', new MANAGER_PAGE(container));
    container.register('Edit_Charity_Page', new EDIT_CHARITIES(container));
    container.register('Event_Photo_Vedio_Page',new EVENT_PHOTO_VEDIOS(container));
    container.register('Create_Marketing_Event', new MARKETING_EVENT(container));
    container.register('Tutorials_Page', new TUTORIALS_PAGE(container));
    container.register('Registration_Page', new REGISTRATION_PAGE(container));
    container.register('Create_Event_Registration_Page', new CREATE_EVENT_REGISTRATION(container));
    container.register('Landing_Page', new LANDING_PAGE(container));
    container.register('Create_Tutorials_Page', new CREATE_TUTORIALS_PAGE(container));
    container.register('Participent_Page', new PARTICIPENT_PAGE(container));
    container.register('Edit_Event_Page', new EDIT_EVENT_PAGE(container));
    container.register('Manage_Requirements_Page', new MANAGE_REQUIRMENT(container));
    container.register('Manage_Custom_Fields_Page', new MANAGE_CUSTOM_FIELD(container));
    container.register('Edit_Marketing_Folder_Page', new EDIT_MARKETING_FOLDER(container));
    container.register('Enquiry_Charities_Page', new ENQUIRY_CHARITIES(container));
    container.register('Create_Charity_Enquiry', new CREATE_ENQUIRY_CHARITIES(container));
    container.register('Partner_charity_history_page', new  partner_charity(container));
   
    container.register('Website_Homepage', new Home_page(container));
    container.register('Website_Signup_page', new signup_page(container));
    container.register('Website_Participant_Signup_page', new Participantsignup_page(container));
    container.register('Website_Register_as_charity_page', new website_register_ascharity_page(container));
    container.register('Website_Login_page', new website_Login_page(container));
    container.register('Partner_Event_page', new PARTNER_EVENT_PAGE(container));
    container.register('External_Enquiry_Create_page', new EXTERNAL_ENQUIRY_HOMEPAGE(container));
    container.register('Portal_Website_Enquiry_Create_page', new Website_ENQUIRY_HOMEPAGE(container));
    container.register('Create_Event_Hub_page', new CREATE_EVENT_HUBPAGE(container));
    container.register('Enquiry_Management_External_Page', new ENQUIRY_MANAGEMENT_EXTERNAL_PAGE(container));
    container.register('Enquiry_Management_Website_Page', new ENQUIRY_MANAGEMENT_WEBSITE_PAGE(container));
    container.register('Event_Hub_Page', new EVENT_HUB_PAGE(container));
    container.register('Invoice_Page', new INVOICE_PAGE(container));
    container.register('Partner_Packages_Page', new PARTNER_PACKAGES_PAGE(container));
    container.register('Renewals_Page', new RENEWALS_PAGE(container));
    container.register('Timeline_Page', new TIMELINE_PAGE(container)); 
    container.register('Contract_Page', new CONTRACT_PAGE(container));
    container.register('Create_Contract_Page', new CREATE_CONTRACT_PAGE(container));
    container.register('Website_Home_Page', new WEBSITE_HOME_PAGE(container));
    container.register('Website_Login_Page', new website_Login_page(container));
    container.register('Portal_event_manager_dashboard', new Portal_Event_Manager_Dashboard(container));
    container.register('Website_General_Details_Page', new Website_General_Details_Page(container));
    container.register('Website_Search_Page', new Website_Search_Page(container));
    container.register('Website_payment_details', new Payment_details(container));
    container.register('Website_setup_your_account', new Setup_account(container));
    container.register('Website_user_story_visitors', new Website_visitors(container));
    container.register('Contract_in_Charity_Management', new Contract_in_Charity_Management(container));
    container.register('Portal_Marketing_Management_Page', new PORTAL_MARKETING_MANAGEMENT_PAGE(container));
    container.register('Website_Charity_Register_Now_Page', new WEBSITE_CHARITY_REGISTER_NOW_PAGE(container));
    container.register('Website_London_Region_Page', new WEBSITE_LONDON_REGIONS_PAGE(container));
    container.register('Website_Midlands_Region_Page', new WEBSITE_MIDLANDS_REGIONS_PAGE(container));
    container.register('Website_North_West_Region_Page', new WEBSITE_NORTH_WEST_REGIONS_PAGE(container));
    container.register('Website_Register_My_Charity_Page', new WEBSITE_REGISTER_MY_CHARITY_PAGE(container));
    container.register('Website_South_East_Region_Page', new WEBSITE_SOUTH_EAST_REGIONS_PAGE(container));
    container.register('Fianance_Invoice_Page', new INVOICE_PAGE(container));
    container.register('Registration_For_Anevent_Page', new REGISTRATION_EVENT_WEBSITE(container));
    container.register('Website_All_Event_Page', new WEBSITE_ALL_EVENT_PAGE(container));
    container.register('Website_All_Distances_Page', new WEBSITE_ALL_DISTANCES_PAGE(container));
    container.register('Website_Event_Details_Page', new WEBSITE_EVENT_DETAILS_PAGE(container));
    container.register('Website_All_Regions_Page', new WEBSITE_ALL_REGIONS_PAGE(container));
    /* API Page Methods*/
    container.register('trax_trackshipmet_apis', new TrackShipmentAPI(container));
    
    /* Add your New Page Methods Details Here -> Format -> container.register('FILE_NAME', new CLASS_NAME(container)); -> Then import the file by using quick fix*/
  }

  async execute(businessFlow: Record<string, string>, container: Container) {
    const rows: string[] = [];

    for (const key of Object.keys(businessFlow)) {
      if (key.includes("Keyword_")) {
        if (businessFlow[key] != "" && businessFlow[key] != null) {
          rows.push(businessFlow[key]);
        } else {
          break;
        }
      }
    }

    for (const row of rows) {
      const [keyword, ...params] = row.split(',');

      if (keyword) {
        const functionInstance = container.resolve(keyword.split(".")[0]);
        await test.step("Step:- "+keyword.split(".")[1].toUpperCase()+" :"+params.join(', '), async () => {
          container.register('stepname', "Step:- "+keyword.split(".")[1].toUpperCase());
          await this.callMethodOnObject(functionInstance, keyword.split(".")[1].split("${")[0],...params)
        });
      }
    }
  }

  async callMethodOnObject(functionInstance:any , methodName: string, ...params: any[]) {
    if (functionInstance) {
      const method = functionInstance[methodName];
      if (typeof method === "function") {
        await method.apply(functionInstance, params);
      } else {
        throw new Error(`Method '${methodName}' not found on page '${functionInstance}'`);
      }
    } else {
      throw new Error(`Page '${functionInstance}' not found in mapping`);
    }
  }
}

