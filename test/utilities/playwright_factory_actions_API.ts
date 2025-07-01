import { Page, APIRequest } from 'playwright';
import { TestInfo } from '@playwright/test';

export class PlaywrightFactoryActionsAPI {
  private container: any; // Define the container type accordingly
  private page: Page;
  private testInfo: TestInfo;
  private testData: any; // Define the type of testData
  private apicontext: APIRequest; // Define the type of playwrightapicontext
  private baseUrl: string;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {import('@playwright/test').APIRequest} apicontext
   * @param {Container} container // Define the type of container
   */
  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.testData = container.resolve('testData');
    this.apicontext = container.resolve('apicontext');
    this.baseUrl = process.env.API_URL || "https://ldatalensapi.aaps.deloitte.com/";
  }

  /*###################    BASIC API ACTIONS     ####################*/

 

  async createBaseapicontext_stripe() {
    const apicontext = await this.apicontext.newContext({
      baseURL: 'https://api.stripe.com',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    this.container.register('apinewcontext', apicontext);
  }

  async createBaseapicontext_withCookie(cookie: string) {
    const originalURL = process.env.API_URL||"";
    const baseURL = originalURL.endsWith('/') ? originalURL.slice(0, -1) : originalURL;
    const baseURL_API = baseURL.replace(".arena",".api.arena").trim();
    const apicontext = await this.apicontext.newContext({
      baseURL: baseURL_API,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Cookie': `${cookie}`,
      },
    });
    this.container.register('apinewcontext', apicontext);
  }

  async doGet(url: string) {
    const apicontextRequest = this.container.resolve('apinewcontext');
    const response = await apicontextRequest.get(`${url}`);
    return await response;
  }

  async doGetWithParams(url: string, jsonQueryParams: any) {
    const apicontextRequest = this.container.resolve('apinewcontext');
    const response = await apicontextRequest.get(`${url}`, {
      params: jsonQueryParams,
    });
    return await response;
  }

  async doPost(url: string, jsonDataPayload: any, bearerToken: any) {
    const response = await this.page.request.post(`${this.baseUrl}/${url}`, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'User-Agent': 'Playwright'
      },
      data: jsonDataPayload
    });
    return response;
  }

  async doPostExtendedTimeout(url: string, jsonDataPayload: any) {
    const apicontextRequest = this.container.resolve('apinewcontext');
    const response = await apicontextRequest.post(`${url}`, {
      data: jsonDataPayload,
      timeout: 120000
    });
    return await response;
  }

  async doPatch(url: string, jsonDataPayload: any) {
    const apicontextRequest = this.container.resolve('apinewcontext');
    const response = await apicontextRequest.patch(`${url}`, {
      data: jsonDataPayload
    });
    return await response;
  }

  async doPut(url: string, jsonDataPayload: any) {
    const apicontextRequest = this.container.resolve('apinewcontext');
    const response = await apicontextRequest.put(`${url}`, {
      jsonDataPayload,
    });
    return await response;
  }

}
