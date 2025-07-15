const fs = require('fs');
const moment = require('moment');
const jp = require('jsonpath');
const { parse } = require('csv-parse/sync');


class DataFactory {
  private container: any;
  /**
   * @param {import('playwright').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   * 
   * 
   */
  constructor(container: any) {
    this.container = container;
  }
  
  async addDaysToCurrentDate(addDays: any) {
    const date = moment().add(addDays,'d').toDate();
    const formattedDate = moment(date).format('DD-MMM-YYYY');
    return formattedDate;
  }

  async generateRandomAplhabets(length: any) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async generateRandomAplhaNumeric(length: any) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async getTestData(testcaseName: any, testcaseId: any) {
    let testdata_sheet = (process.env.TESTDATASHEET || "testdata").trim();
    const recordsJsonFull = parse(fs.readFileSync('./test/data/'+testdata_sheet+'.csv'), {
      columns: true,
      skip_empty_lines: true
    });
    const strQueryToFilterTestCase = '$..[?((@.TestCaseName=="'+testcaseName+'") && (@.TestcaseID=="'+testcaseId+'"))]';
    const records = jp.query(recordsJsonFull, strQueryToFilterTestCase);
    return records;
  }

  async getIterationData(container: any, strFieldName: any, iteration = 0){
    try{
      debugger;
      const testCaseData = container.resolve('testData');
      const data = testCaseData[iteration][strFieldName];
      const caseData = data.toString().split("#")[0];
      let length =5;
      let dateAdd = 0;
      let computedData = "";

      switch (caseData.toUpperCase()) {
        case "RANDOM_ALPHABET":
          if (data.includes("#")) {
            length = data.split("#")[1].trim();
          }
          computedData = await this.generateRandomAplhabets(length);
          break;
        case "RANDOM_NUMBER":
        case "RANDOM_ALPHA_NUMERIC":
          if (data.includes("#")) {
            length = data.split("#")[1].trim();
          }
          computedData = "Automation City Marathon" + await this.generateRandomAplhaNumeric(length);
          break;
        case "RANDOM_EMAIL":
          computedData = "Ayush"+await this.generateRandomAplhabets(length) + "@gmail.com";
          break;
        case "VALID_EMAIL":
          computedData = await this.generateRandomAplhabets(length) + "@guerrillamail.com";
          break;
        case "DATE":
          if (data.includes("#")) {
            dateAdd = data.split("#")[1].trim();
          }
          computedData = await this.addDaysToCurrentDate(dateAdd);
          break;
        default:
          computedData = data;
      }
      
      testCaseData[iteration][strFieldName] = computedData;
      container.register('testData', testCaseData);
      return computedData;
      

    }catch(error){
      throw new Error("Unable Fetch Data "+strFieldName +" Iteration "+iteration + "Error - "+error);
        
    }
        
  }

  async setIterationData(container: any, strFieldName: any, iteration = 0, setData: any){
    const testCaseData = container.resolve('testData');
    testCaseData[iteration][strFieldName] = setData;
    container.register('testData', testCaseData);
  }
       
  static getTestCases(testCaseName: any) {
    let business_process = process.env.BUSINESS_PROCESS || "functional_flow";
    const recordsJsonFull = parse(fs.readFileSync('./test/data/business_transactions/'+business_process.trim()+'.csv'), {
      columns: true,
      skip_empty_lines: true
    });
    const strQueryToFilterTestCase = '$..[?(@.TestCaseName=="'+testCaseName+'")]';
    const records = jp.query(recordsJsonFull, strQueryToFilterTestCase);
    return records;
  }
  
  static getAllTestCases() {
    let business_process = process.env.BUSINESS_PROCESS || "functional_flow";
    const recordsJsonFull = parse(fs.readFileSync('./test/data/business_transactions/'+business_process.trim()+'.csv'), {
      columns: true,
      skip_empty_lines: true
    });
    return recordsJsonFull;
  }

  static frameTestCaseName(jsonData: any) {
    const testCaseName = '[' + jsonData["TestcaseID"] + '] ' + ' - ' + jsonData["TestCaseName"] + ' - ' + jsonData["Tags"];
    return testCaseName;
  }

  static getTestCaseDescription(jsonData: any) {

    const testCaseDesc = jsonData["TestcaseDescription"];

    //const testCaseDesc =  jsonData["TestcaseDescription"] + ' - ' +jsonData["Tags"];

    return testCaseDesc;
  }

  async getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

export default DataFactory;
