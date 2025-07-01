import { type TestInfo } from '@playwright/test';
import { type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { PlaywrightFactoryActionsAPI } from '../../utilities/playwright_factory_actions_API';
import DataFactory from '../../utilities/data-factory';
import { AppInsightsKQLExecutor } from '../../utilities/azure_appinsights';

export class AzureAppInsights {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private playwrightAPIFactory: PlaywrightFactoryActionsAPI;
  private dataFactory: DataFactory;
  private container: any;
  private url_login: any;
  private appInsights: AppInsightsKQLExecutor;



  /**
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {PlaywrightFactoryActionsAPI} playwrightAPIFactory
   * @param {AppInsightsKQLExecutor} appInsights
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
    this.appInsights = container.resolve('azure_appinsights');
    this.url_login = "";
  }

  async user_runs_the_KQL_Query(){
    let response = await this.appInsights.executeKqlQuery('requests | where resultCode != 200 and timestamp > ago(24h)')
    console.log(JSON.stringify(response));
  }
  
}
