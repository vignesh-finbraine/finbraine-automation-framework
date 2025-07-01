
import { APIRequest, APIRequestContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'json2csv';

export class AppInsightsKQLExecutor {
  private appId: string;
  private apiKey: string;
  private outputDir: string;
  private apicontext: APIRequest;
  private page: Page;

  constructor(container: any) {
    this.appId = process.env.APPINSIGHTS_APP_ID || '';
    this.apiKey = process.env.APPINSIGHTS_API_KEY || '';
    this.apicontext = container.resolve('apicontext');
    this.page = container.resolve('page');
    this.outputDir = path.join(__dirname, 'results');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }
  }

  // Method to execute a KQL query
  async executeKqlQuery(kqlQuery: string): Promise<any> {
    const queryEndpoint = `https://api.applicationinsights.io/v1/apps/${this.appId}/query`;
    const response = await this.page.request.get(queryEndpoint, {
      params: { query: kqlQuery },
      headers: {
        'x-api-key': this.apiKey,
      },
    });

    if (response.status() !== 200) {
      const errorData = await response.json();
      throw new Error(`Error executing KQL query: ${errorData.error}`);
    }

    return await response.json();
  }

  // Method to save query results to a CSV file
  async saveResultsToCsv(data: any, filename: string): Promise<void> {
    if (!data || !data.tables || data.tables.length === 0) {
      throw new Error('No data available to save.');
    }

    const table = data.tables[0];
    const csvData = table.rows.map((row: any[]) => {
      const record: { [key: string]: any } = {};
      table.columns.forEach((col: any, index: number) => {
        record[col.name] = row[index];
      });
      return record;
    });

    const csv = parse(csvData);
    const filePath = path.join(this.outputDir, filename);
    fs.writeFileSync(filePath, csv);
    console.log(`Results saved to ${filePath}`);
  }

  // Main method to execute a KQL query and save the results
  async executeAndSave(kqlQuery: string, outputFilename: string): Promise<void> {
    try {
      const results = await this.executeKqlQuery(kqlQuery);
      await this.saveResultsToCsv(results, outputFilename);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}