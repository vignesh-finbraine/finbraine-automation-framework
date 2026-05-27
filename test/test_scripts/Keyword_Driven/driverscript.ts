import Container from '../../utilities/container'; 
import { test, TestInfo } from '@playwright/test'; 
 
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI'; 
import { PlaywrightFactoryActionsAPI } from '../../utilities/playwright_factory_actions_API'; 
 
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';

import { LOGIN_PAGE } from '../../application_components/page_methods/Login_Page'; 
import { TENANT_MANAGEMENT } from '../../application_components/page_methods/Tenant_Management';
 
export class DriverScript { 
 
  async registerContainer(container: Container, testInfo: TestInfo) { 
 
    container.register('testInfo', testInfo); 
 
    container.register('playwrightFactory', new PlaywrightFactoryActions(container)); 
    container.register('playwrightAPIFactory', new PlaywrightFactoryActionsAPI(container)); 
    container.register('databricks_sqlware', new DatabricksSQLwarehouse(container));
    container.register('databricks_dbfs', new DatabricksFactoryDBFS(container));

    /* UI Page Methods */ 
    container.register('Login_Page', new LOGIN_PAGE(container));
    container.register('Tenant_Management', new TENANT_MANAGEMENT(container));
     
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
 
        const functionInstance = container.resolve( 
          keyword.split(".")[0] 
        ); 
 
        await test.step( 
          "Step:- " + keyword.split(".")[1].toUpperCase() + " :" + params.join(', '), 
 
          async () => { 
 
            container.register( 
              'stepname', 
              "Step:- " + keyword.split(".")[1].toUpperCase() 
            ); 
 
            await this.callMethodOnObject( 
              functionInstance, 
              keyword.split(".")[1].split("${")[0], 
              ...params 
            ); 
          } 
        ); 
      } 
    } 
  } 
 
  async callMethodOnObject( 
    functionInstance: any, 
    methodName: string, 
    ...params: any[] 
  ) { 
 
    if (functionInstance) { 
 
      const method = functionInstance[methodName]; 
 
      if (typeof method === "function") { 
 
        await method.apply(functionInstance, params); 
 
      } else { 
 
        throw new Error( 
          `Method '${methodName}' not found on page '${functionInstance}'` 
        ); 
      } 
 
    } else { 
 
      throw new Error( 
        `Page '${functionInstance}' not found in mapping` 
      ); 
    } 
  } 
} 

 