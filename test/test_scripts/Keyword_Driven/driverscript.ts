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
import { Partner_Charity_History } from '../../application_components/page_methods/Partner_Charity_History';
import { Contract_in_Charity_Management } from '../../application_components/page_methods/Contract_in_Charity_Management';
import { WEBSITE_HOME_PAGE } from '../../application_components/page_methods/Website_Home_Page';
import { WEBSITE_LOGIN_PAGE } from '../../application_components/page_methods/Website_Login_Page';
import { WEBSITE_ALL_REGIONS_PAGE } from '../../application_components/page_methods/Website_All_Regions_Page';
import { WEBSITE_SOUTH_EAST_REGIONS_PAGE } from '../../application_components/page_methods/Website_South_East_Region_Page';
import { WEBSITE_NORTH_WEST_REGIONS_PAGE } from '../../application_components/page_methods/Website_North_West_Region_Page';
import { WEBSITE_MIDLANDS_REGIONS_PAGE } from '../../application_components/page_methods/Website_Midlands_Region_Page';
import { WEBSITE_LONDON_REGIONS_PAGE } from '../../application_components/page_methods/Website_London_Region_Page';
import { WEBSITE_EVENTS_DETAIL_PAGE } from '../../application_components/page_methods/Website_Events_Detail_Page';
import { WEBSITE_REGISTER_MY_CHARITY_PAGE } from '../../application_components/page_methods/Website_Register_My_Charity_Page';
import { WEBSITE_CHARITY_REGISTER_NOW_PAGE } from '../../application_components/page_methods/Website_Charity_Register_Now_Page';
import { PORTAL_MARKETING_MANAGEMENT_PAGE } from '../../application_components/page_methods/Portal_Marketing_Management_Page';








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
    container.register('Partner_Charity_History', new Partner_Charity_History(container));
    container.register('Contract_in_Charity_Management', new Contract_in_Charity_Management(container));
    container.register('Website_Home_Page', new WEBSITE_HOME_PAGE(container));
    container.register('Website_Login_Page', new WEBSITE_LOGIN_PAGE(container));
    container.register('Website_All_Regions_Page', new WEBSITE_ALL_REGIONS_PAGE(container));
    container.register('Website_South_East_Region_Page', new WEBSITE_SOUTH_EAST_REGIONS_PAGE(container));
    container.register('Website_North_West_Region_Page', new WEBSITE_NORTH_WEST_REGIONS_PAGE(container));
    container.register('Website_Midlands_Region_Page', new WEBSITE_MIDLANDS_REGIONS_PAGE(container));
    container.register('Website_London_Region_Page', new WEBSITE_LONDON_REGIONS_PAGE(container));
    container.register('Website_Events_Detail_Page', new WEBSITE_EVENTS_DETAIL_PAGE(container));
    container.register('Website_Register_My_Charity_Page', new WEBSITE_REGISTER_MY_CHARITY_PAGE(container));
    container.register('Website_Charity_Register_Now_Page', new WEBSITE_CHARITY_REGISTER_NOW_PAGE(container));
    container.register('Portal_Marketing_Management_Page', new PORTAL_MARKETING_MANAGEMENT_PAGE(container));







    
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

