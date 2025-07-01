import { type TestInfo } from '@playwright/test';
import { type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { PlaywrightFactoryActionsAPI } from '../../utilities/playwright_factory_actions_API';
import DataFactory from '../../utilities/data-factory';
import * as login_payload from "../page_apis/page_payloads/login_payload.json";
import * as fs from 'fs';

export class TrackShipmentAPI {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private playwrightAPIFactory: PlaywrightFactoryActionsAPI;
  private dataFactory: DataFactory;
  private container: any;
  private url_login: any;



  /**
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {PlaywrightFactoryActionsAPI} playwrightAPIFactory
   * @param {DataFactory} dataFactory
   * @param {Mailinator} mailinator;
   * @param {any} container
   */
  
  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.playwrightAPIFactory = container.resolve('playwrightAPIFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.url_login = "/v2/users/login";
  }

  
}
