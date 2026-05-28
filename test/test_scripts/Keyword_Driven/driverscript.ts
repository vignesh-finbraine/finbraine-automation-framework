import Container from '../../utilities/container';
import { test, TestInfo } from '@playwright/test';
import { Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { PlaywrightFactoryActionsAPI } from '../../utilities/playwright_factory_actions_API';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
import { PowerBI_Actions } from '../../utilities/powerbi';
import { AppInsightsKQLExecutor } from '../../utilities/azure_appinsights';
import { AzureAppInsights } from '../../application_components/page_apis/azure_appinsights_apis';
import { TrackShipmentAPI } from '../../application_components/page_apis/trax_trackshipmet_apis';

import * as fs from 'fs';
import * as path from 'path';

export class DriverScript {

  async registerContainer(container: Container, testInfo: TestInfo) {

    // ===================== UTILITIES (Do NOT change this section) =====================
    container.register('testInfo', testInfo);
    container.register('playwrightFactory', new PlaywrightFactoryActions(container));
    container.register('playwrightAPIFactory', new PlaywrightFactoryActionsAPI(container));
    container.register('databricks_sqlware', new DatabricksSQLwarehouse(container));
    container.register('databricks_dbfs', new DatabricksFactoryDBFS(container));
    container.register('powerbi', new PowerBI_Actions(container));
    container.register('azure_appinsights', new AppInsightsKQLExecutor(container));
    container.register('azure_appinsights_apis', new AzureAppInsights(container));

    /* API Page Methods */
    container.register('trax_trackshipmet_apis', new TrackShipmentAPI(container));
    // ===================== END UTILITIES =====================


    // ===================== AUTO PAGE REGISTRATION =====================
    // 🔥 No need to manually import or register page files anymore!
    // Just create your page file inside:
    //    application_components/page_methods/
    // It will be auto-detected and registered here.
    // The registration key will be the filename without extension.
    // Example: Users_Page.ts → container.resolve('Users_Page')
    // ===================================================================

    const pagesPath = path.resolve(__dirname, '../../application_components/page_methods');

    const files = fs.readdirSync(pagesPath).filter(
      (file: string) => file.endsWith('.ts') || file.endsWith('.js')
    );

    console.log(`=== AUTO-REGISTERING ${files.length} PAGE(S) FROM page_methods ===`);

    for (const file of files) {
      try {
        const filePath = `${pagesPath}/${file}`;
        const module = require(filePath);

        // Get the first exported class from the file
        const exportedKeys = Object.keys(module);
        if (exportedKeys.length === 0) {
          console.warn(`⚠️  No exports found in ${file}, skipping.`);
          continue;
        }

        const PageClass = module[exportedKeys[0]];

        if (typeof PageClass !== 'function') {
          console.warn(`⚠️  Export in ${file} is not a class/function, skipping.`);
          continue;
        }

        // Register key = filename without extension
        // e.g. "Login_Page.ts" → "Login_Page"
        const registerKey = file.replace(/\.(ts|js)$/, '');

        container.register(registerKey, new PageClass(container));
        console.log(`✅ Registered: ${registerKey}`);

      } catch (error) {
        console.error(`❌ Failed to register page from file: ${file}`, error);
      }
    }

    console.log(`=== AUTO-REGISTRATION COMPLETE ===`);
    // ===================== END AUTO PAGE REGISTRATION =====================
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
        await test.step("Step:- " + keyword.split(".")[1].toUpperCase() + " :" + params.join(', '), async () => {
          container.register('stepname', "Step:- " + keyword.split(".")[1].toUpperCase());
          await this.callMethodOnObject(functionInstance, keyword.split(".")[1].split("${")[0], ...params);
        });
      }
    }
  }


  async callMethodOnObject(functionInstance: any, methodName: string, ...params: any[]) {
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