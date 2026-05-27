import Container from '../../utilities/container'; 
import { test, TestInfo } from '@playwright/test'; 

import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { PlaywrightFactoryActionsAPI } from '../../utilities/playwright_factory_actions_API';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlwarehouse';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';

import { LOGIN_PAGE } from '../../application_components/page_methods/Login_Page';

export class DriverScript { 
 
  async registerContainer(container: Container, testInfo: TestInfo) { 
 
    container.register('testInfo', testInfo); 
 
    container.register( 
      'playwrightFactory', 
      new PlaywrightFactoryActions(container) 
    ); 
 
    container.register( 
      'playwrightAPIFactory', 
      new PlaywrightFactoryActionsAPI(container) 
    ); 

    container.register(
      'databricks_sqlwarehouse',
      new DatabricksSQLwarehouse(container)
    );

    container.register(
      'databricks_dbfs',
      new DatabricksFactoryDBFS(container)
    );
 
    /* UI Page Methods */ 
    container.register( 
      'Login_Page', 
      new LOGIN_PAGE(container) 
    ); 
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
              this.normalizeMethodName(keyword.split(".")[1].split("${")[0]), 
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

      if (typeof method === 'function') {
        await method.apply(functionInstance, params);
      } else {
        const availableMethods = Object.keys(functionInstance).filter(
          (key) => typeof functionInstance[key] === 'function'
        );
        throw new Error(
          `Method '${methodName}' not found on page '${functionInstance.constructor?.name || 'Unknown'}'. Available methods: ${availableMethods.join(', ')}`
        );
      }
    } else {
      throw new Error(
        `Page instance not found in mapping for method '${methodName}'`
      );
    }
  }

  normalizeMethodName(methodName: string) {
    const methodAliases: Record<string, string> = {
      'password-toggle-btn': 'click_show_password_icon',
      'click_pwdtogglebtn': 'click_show_password_icon',
      'user_validate_error_massage': 'user_validate_error_message',
      'user_click_logingbtn': 'user_click_login_btn',
    };

    if (methodAliases[methodName]) {
      return methodAliases[methodName];
    }

    let normalized = methodName.replace(/[-\s]+/g, '_');
    normalized = normalized.replace(/loging/g, 'login').replace(/massage/g, 'message');
    return normalized;
  }
}