import {type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { Create_Charity_Chatagory_Page } from './Create_Charity_Catagory_Page';


export class TRAX_TrackShipmentPage  {
  private page!: Page;
  private testInfo!: TestInfo;
  private playwrightFactory!: PlaywrightFactoryActions;
  private dataFactory!: DataFactory;
  private container: any; 
  private databricks_sqlware!: DatabricksSQLwarehouse;
  private databricks_dbfs!: DatabricksFactoryDBFS;
 // private trax_base_page!: TRAX_BasePage;

   txt_search_trackid!: Locator;
   btn_track_shipment!: Locator;
   emt_error_messgae!: Locator;

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
    this.initialize();
  }

  private initialize() {
    this.page = this.container.resolve('page');
    this.testInfo = this.container.resolve('testInfo');
    this.playwrightFactory = this.container.resolve('playwrightFactory');
    this.dataFactory = this.container.resolve('dataFactory');
    this.databricks_sqlware = this.container.resolve('databricks_sqlware');
   // this.trax_base_page = this.container.resolve('trax_base_page');

    // Initialize page objects
    this.txt_search_trackid = this.page.getByRole('textbox', { name: 'Enter your TQL PO# or TQL LTL' });
    this.btn_track_shipment = this.page.getByRole('button', { name: 'Track Shipment' });
    this.emt_error_messgae = this.page.getByRole('heading', { name: 'There was an issue handling' });
  }


  async user_clicks_on_track_shipment(){
   let isMobile = await this.container.resolve('trax_base_page').user_clicks_on_hamburger_icon_for_mobile();
   if(isMobile){
    await this.page.locator('#cookie-consent span').nth(1).click();
   }
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'Track Shipment' }).click();
    const page1 = await page1Promise;
    this.page = page1;
    await this.container.register('page', page1);
    this.initialize();
  }

  async user_searches_the_tracking_id() {
    await this.playwrightFactory.fill(this.txt_search_trackid, '1234456465542');
    await this.playwrightFactory.click(this.btn_track_shipment);
  }

  async user_verifies_error_message() {
    //await this.playwrightFactory.verifyVisible(this.emt_error_messgae, "There was an issue handling");
  }
}
