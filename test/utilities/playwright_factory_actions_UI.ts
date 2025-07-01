import { expect, TestInfo} from '@playwright/test';
import { Page, Locator } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import Azure_DevOps from './azure_devops';

export class PlaywrightFactoryActions {
  private page: Page;
  private testInfo: TestInfo;
  private container: any;
  private azure_devops: Azure_DevOps

  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.azure_devops = container.resolve('azure_devops');
  }

  async launchApplication(url : string) {
    await this.page.goto(url);
  }

  /*###################    BASIC ACTIONS     ####################*/

  async click(locator: Locator ) {
    await locator.click();
    await this.waitForSpinnerToDisappear();
  }

  async clickForce(locator : Locator) {
    await locator.click({force:true});
  }

  async clickOpensNewTab(locator : Locator) {
    const page1Promise = this.page.waitForEvent('popup');
    await locator.click();
    const page1 = await page1Promise;
    return page1;
  }

  async clickIfPresent(locator : Locator){
    if(await locator.isVisible()){
      await locator.click();
      return true;
    }else{
      return false;
    }

  }

  async clickIfPresentInSeconds(locator : Locator){
    try{
      await locator.click({timeout:2000});
    }catch(error){
    /**Do Nothing*/
    }
  }
  
  async clickWithText(locator: Locator, text: any) {
    await locator.filter({ hasText: text }).nth(0).click();
  }

  async fill(locator: Locator, strValue:string) {
    await locator.fill(strValue);
  }

  async press(locator: Locator, strValue:string) {
    await locator.press(strValue);
  }

  async checkByLabel(strLabel:string) {
    await this.page.getByLabel(strLabel).check();
  }

  async verifyCheckedByLabel(strLabel:string) {
    await expect(this.page.getByLabel(strLabel)).toBeChecked()
  }
  
  async selectMultiple(locator: Locator, arrayOptionsValue:any) {
    await locator.selectOption(arrayOptionsValue);
  }

  async selectByVisibleText(locator: Locator, strValue:string) {
    await locator.selectOption({ label: strValue });
  }

  async selectByValue(locator: Locator, strValue:string) {
    await locator.selectOption(strValue);
  }

  async uploadImage(locator: Locator, filePath:string) {
    const rootPath = path.join(__dirname, '..', '..');
    const filePath1: string = path.join(rootPath, filePath);
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await locator.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath1);    
  }

  async uploadByDragAndDrop(selector: string, filePath:string, fileName:string, fileType:string ) {
    const rootPath = path.join(__dirname, '..', '..');
    const filePath1: string = path.join(rootPath, filePath);
    const buffer = fs.readFileSync(filePath1).toString('base64');
    const dataTransfer = await this.page.evaluateHandle(
      async ({ bufferData, localFileName, localFileType }) => {
        const dt = new DataTransfer();
    
        const blobData = await fetch(bufferData).then((res) => res.blob());
    
        const file = new File([blobData], localFileName, { type: localFileType });
        dt.items.add(file);
        return dt;
      },
      {
        bufferData: `data:application/octet-stream;base64,${buffer}`,
        localFileName: fileName,
        localFileType: fileType,
      }
    );
    await this.page.dispatchEvent(selector, 'drop', { dataTransfer });
  }

  async navigateBack() {
    await this.page.goBack();
  }

  async download(locator: Locator, filePath:string) {
    const downloadPromise = this.page.waitForEvent('download');
    await locator.click();
    const download = await downloadPromise;
    await download.saveAs('./test/test-results/'+filePath);
  }

  /*###################    SORT     ####################*/

  async verifyHighToLowSort(locator: Locator) {
    const priceAmounts =  await locator.allInnerTexts();
    for (let index = 1; index < priceAmounts.length; index++) {
      const pricePrevious = parseInt(priceAmounts[index - 1].replace('$', ''));
      const priceCurrent = parseInt(priceAmounts[index].replace('$', ''));
      expect(pricePrevious).toBeGreaterThanOrEqual(priceCurrent)
    }
  }

  async verifyLowToHighSort(locator: Locator) {
    const priceAmounts =  await locator.allInnerTexts();
    for (let index = 1; index < priceAmounts.length; index++) {
      const pricePrevious = parseInt(priceAmounts[index - 1].replace('$', ''));
      const priceCurrent = parseInt(priceAmounts[index].replace('$', ''));
      expect.soft(pricePrevious).toBeLessThanOrEqual(priceCurrent);
    }
  }

  /*###################    EXPLICIT WAITING COMPONENTS     ####################*/


  async waitMinimalDelay() {
    await this.page.waitForTimeout(2000);
  }

  async waitForDomLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForSpinnerDiv() {
    const spinner = this.page.locator('//*[contains(@class,"animate-spin")]/parent::div[contains(@class,"fJFUhH")]');
    const count = await spinner.count();
    for (let index = 0; index < count; index++) {
      await spinner.nth(index).waitFor({state:'detached'})
    }
  }

  async waitForSpinnerButton() {
    const spinner = this.page.locator('//*[contains(@class,"animate-spin")]/parent::button[@disabled]');
    const count = await spinner.count();
    for (let index = 0; index < count; index++) {
      await spinner.nth(index).waitFor({state:'detached'})
    }
  }

  async waitForSpinnerToDisappear() {
    await this.waitForSpinnerDiv();
    await this.waitForSpinnerButton();
    await this.waitForSpinnerDiv();
    await this.waitForSpinnerButton();
  }

  /*###################     VERIFICATION COMPONENETS     ####################*/

  async verifyVisibleWithText(locator: Locator, text:any, description:string) {
    await expect.soft(locator.filter({ hasText: text }).first()).toBeVisible();
    await this.embedScreenshotLocator(locator.filter({ hasText: text }).first(), description + " VERIFY VISIBLE - VALIDATION SCREENSHOT");
  }

  async verifyVisible(locator: Locator, description:string) {
    await expect.soft(locator.first()).toBeVisible();
    await this.embedScreenshotLocator(locator.first(), description + " VERIFY VISIBLE - VALIDATION SCREENSHOT");
  }

  async verifyNotVisible(locator: Locator, description:string) {
    await this.embedScreenshot(description + " VERIFY NOT VISIBLE - VALIDATION SCREENSHOT");
    await expect(locator).toBeHidden();    
  }

  async verifyHidden(locator: Locator, description:string) {
    await this.embedScreenshot(description + " VERIFY HIDDEN - VALIDATION SCREENSHOT");
    await expect(locator).toBeHidden();    
  }

  async verifyValue(locator: Locator, strExpectedValue:string, description:string) {
    await this.embedScreenshot(description + " VERIFY VALUE - VALIDATION SCREENSHOT");
    await expect(locator).toHaveValue(strExpectedValue);
  }

  async verifyDisabled(locator: Locator, description:string) {
    await this.embedScreenshot(description + " VERIFY DISABLED - VALIDATION SCREENSHOT");
    await expect.soft(locator).toBeDisabled();
  }

  async verifyDisabled_CSS(locator: Locator, description:string) {
    await this.embedScreenshot(description + " VERIFY DISABLED - VALIDATION SCREENSHOT");
    await expect.soft(locator).toHaveCSS("cursor","not-allowed");
  }

  async verifyDisabled_Class(locator: Locator, description:string) {
    await this.embedScreenshot(description + " VERIFY DISABLED - VALIDATION SCREENSHOT");
    expect.soft(await locator.getAttribute("class")).toContain("cursor-not-allowed");
  }

  async verifyNotEditable(locator: Locator, description:string) {
    await this.embedScreenshot(description + " VERIFY NOT EDITABLE - VALIDATION SCREENSHOT");
    await expect(locator).not.toBeEditable();
  }
  
  async verifyEnabled(locator: Locator, description:string) {
    await this.embedScreenshot(description + " VERIFY ENABLED - VALIDATION SCREENSHOT");
    await expect(locator).toBeEditable();
  }

  async verifyLocatorText(locator: Locator, strExpectedText: string, description:string) {
    await expect.soft(locator).toContainText(strExpectedText,{ignoreCase:true, timeout:3000});
    await this.embedScreenshotLocator(locator, strExpectedText + " - "+ description +" VERIFY TEXT - VALIDATION SCREENSHOT");
  }

  async verifyLocatorTextEqual(locator: Locator, strExpectedText: string, description:string) {
    await expect.soft(locator).toHaveText(strExpectedText,{ignoreCase:true, timeout:3000});
    await this.embedScreenshotLocator(locator, strExpectedText + " - "+ description +" VERIFY TEXT - VALIDATION SCREENSHOT");
  }

  async verifyLocatorTextNumberEqual(locator: Locator, strExpectedText: string, description:string) {
    await expect.soft(locator).toHaveText(strExpectedText,{ignoreCase:true});
    await this.embedScreenshotLocator(locator, strExpectedText + " - "+ description +" VERIFY TEXT - VALIDATION SCREENSHOT");
  }

  async verifyLocatorText_WithPageRefresh(locator: Locator, strExpectedText: string, description:string) {
    for (let index = 0; index < 10; index++) {
      const actalText = await locator.innerText();
      if(actalText.toLowerCase().includes(strExpectedText)){
        break;
      }else{
        await this.waitMinimalDelay();
        await this.page.reload();
      }
    }
    await expect.soft(locator).toContainText(strExpectedText,{ignoreCase:true});
    await this.embedScreenshotLocator(locator, strExpectedText + " - "+ description +" VERIFY TEXT - VALIDATION SCREENSHOT");
  }

  async verifyLocatorValue(locator: Locator, strExpectedText: string, description:string) {
    await expect.soft(locator).toHaveValue(strExpectedText);
    await this.embedScreenshotLocator(locator, strExpectedText + " - "+ description +" VALUE - VALIDATION SCREENSHOT");
  }

  async verifyURL(strExpectedValue:string) {
    const url = this.page.url();
    expect.soft(url).toContain(strExpectedValue);
    await this.embedScreenshot(strExpectedValue + " VERIFY URL - VALIDATION SCREENSHOT");
  }

  async verifyURLNewPage(strExpectedValue:string, newPage: Page) {
    const url = newPage.url();
    expect.soft(url).toContain(strExpectedValue);
    await this.embedScreenshotNewPage(strExpectedValue + " VERIFY URL - VALIDATION SCREENSHOT", newPage);
  }

  async verifyChecked(locator: Locator, description:string) {
    await expect.soft(locator).toBeChecked();
    await this.embedScreenshot(description + " VERIFY CHECKED - VALIDATION SCREENSHOT");
  }

  async verifyNotChecked(locator: Locator, description:string) {
    await expect.soft(locator).not.toBeChecked();
    await this.embedScreenshot(description + " VERIFY NOT CHECKED - VALIDATION SCREENSHOT");
  }

  async verifyVisibleWithOpacity(locator: Locator, description:string) {
    const opacity = await locator.evaluate((element) =>
      window.getComputedStyle(element).getPropertyValue("opacity")
    );
    expect.soft(parseFloat(opacity)).toBeGreaterThan(0);
    await this.embedScreenshot(description + "  VISIBILITY- VALIDATION SCREENSHOT");
  }

  async verifyAttributeValue(locator: Locator, attribute:string, value:string,  description:string) {
    const attributeActualValue = await locator.getAttribute(attribute);
    expect.soft(attributeActualValue).toContain(value);
    await this.embedScreenshot(description + "  VISIBILITY- VALIDATION SCREENSHOT");
  }

  async compareDollarValuesGreaterThan(locator: Locator, minimalValue: number, description:string) {
    const actualDollarValue = await locator.innerText();
    const actualValue = parseFloat(actualDollarValue.replace('$', ''));
    expect.soft(actualValue).toBeGreaterThan(minimalValue);
    await this.embedScreenshot(description + " should be greater than "+minimalValue+ " - Actual :"+actualValue);
  }

  async compareDollarValuesEquals(locator: Locator, expValue: number, description:string) {
    const actualDollarValue = await locator.innerText();
    const actualValue = parseFloat(actualDollarValue.replace('$', ''));
    expect.soft(actualValue).toEqual(expValue);
    await this.embedScreenshot(description + " should be equal to "+expValue+ " - Actual :"+actualValue);
  }

  /*/*###################     SCREEN SHOTS    ####################*/
  
  async embedScreenshotLocator(locator: Locator, description:string) {
    const screenshot = await locator.screenshot();
    await this.testInfo.attach(this.container.resolve('stepname').toString(), { body: screenshot, contentType: 'image/png' }); 
    return screenshot.toString('base64'); 
  }

  async embedScreenshot(description:string) {
    const screenshot = await this.page.screenshot({fullPage: true });
    await this.testInfo.attach(this.container.resolve('stepname').toString(), { body: screenshot, contentType: 'image/png' });  
    return screenshot.toString('base64');
  }

  async embedScreenshotNewPage(description:string, newPage: Page) {
    const screenshot = await newPage.screenshot({fullPage: true });
    await this.testInfo.attach(this.container.resolve('stepname').toString(), { body: screenshot, contentType: 'image/png' });  
    return screenshot.toString('base64');
  }

  async embedTextContent(description:string, content: string) {
    await this.testInfo.attach(this.container.resolve('stepname').toString(), { body: content, contentType: 'text/plain' }); 
  }

  /*###################     TEXT VERIFICATIONS    ####################*/

  async verifyTextPresent(strExpectedValue:string, strActualValue: string, description:string) {
    expect.soft(strActualValue.toLowerCase(), description).toContain(strExpectedValue.toLowerCase());
  }

  async verifyTextEqual(strExpectedValue:string, strActualValue: string, description:string) {
    expect.soft(strActualValue, description).toEqual(strExpectedValue);
    // if(strActualValue !== strExpectedValue){
    //   await this.testInfo.attach(description, { body: strActualValue, contentType: 'text/plain' });  
    // }
  }


  /*###################     VISUAL VALIDATION    ####################*/

  async verifySnapshot(locator: Locator) {
    await expect(locator).toHaveScreenshot();
    const screenshot = await locator.screenshot();
    await this.testInfo.attach("ACTUAL SCREENSHOT - Visual Validation", { body: screenshot, contentType: 'image/png' }); 
  }

  /*###################     MOCKING    ####################*/

  async mockApi(endpointURL:string, jsonPayload:any) {
    await this.page.route(endpointURL, async route => {
      await route.fulfill(jsonPayload);
    });
  }


  /*###################     UPDATE AZURE DEVOPS    ####################*/
  async updateTestStatus(strTestCaseID:string, strTestStatus:string) {
    let strSuiteID = await this.azure_devops.getSuiteIdByTestPlanAndTestCase(strTestCaseID);
    let strTestPointID = await this.azure_devops.getTestPointId(strSuiteID, strTestCaseID)
    let results = await this.azure_devops.updateTestCaseStatusInRun(strSuiteID,strTestPointID,strTestStatus.toLowerCase())
    return results;
  }

  async uploadTestEvidence(results:any, screenshot:string){
    await this.azure_devops.uploadAttachmentToTestCase(results.lastTestRunId, results.lastResultId,screenshot,"attachment.png" )
  }

}
