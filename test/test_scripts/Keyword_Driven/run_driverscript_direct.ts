import { chromium } from 'playwright';
import Container from '../../utilities/container';
import DataFactory from '../../utilities/data-factory';
import Azure_DevOps from '../../utilities/azure_devops';
import { DriverScript } from './driverscript';

async function main() {
  const records = DataFactory.getAllTestCases();
  const targetId = process.env.TESTCASE_ID || process.env.TESTCASE || '';
  const targetName = process.env.TESTCASE_NAME || '';

  let selectedRecords = records;
  if (targetId) {
    selectedRecords = records.filter(r => (r.TestcaseID || r.TestCaseID || '').toString() === targetId);
  } else if (targetName) {
    selectedRecords = records.filter(r => (r.TestCaseName || '').includes(targetName));
  }

  if (selectedRecords.length === 0) {
    console.error('No matching test cases found for', targetId || targetName);
    process.exit(1);
  }

  for (const record of selectedRecords) {
    const container = new Container();
    const dataFactory = new DataFactory(container);
    const azure_devops = new Azure_DevOps(container);

    const testcaseId = record['TestcaseID'] || record['TestCaseID'] || '';
    const uniqueTitle = `${DataFactory.frameTestCaseName(record)} [${testcaseId}]`;

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      const testData = await dataFactory.getTestData(record['TestCaseName'], record['TestcaseID']);

      container.register('dataFactory', dataFactory);
      container.register('testData', testData);
      container.register('page', page);
      container.register('azure_devops', azure_devops);

      const fakeTestInfo: any = {
        title: uniqueTitle,
        status: 'passed',
        errors: [],
        attach: async () => {
          return undefined;
        }
      };

      const driverScript = new DriverScript();
      await driverScript.registerContainer(container, fakeTestInfo);
      await driverScript.executeDirect(record, container);

      console.log('Test finished:', uniqueTitle);
    } catch (err) {
      console.error('Error running test', err);
    } finally {
      await page.close();
      await context.close();
      await browser.close();
    }
  }
}

main().catch(err => {
  console.error('Fatal error running direct driver:', err);
  process.exit(1);
});
