import type { FullConfig } from '@playwright/test';
import * as fs from 'fs';


async function globalSetup(config: FullConfig) {
  let environment = process.env.ENVIRONMENT || "qa";
  let csvFilePath = `test/data/config/infra.json`;
    let configProps: any = JSON.parse(fs.readFileSync(csvFilePath, 'utf-8'));
    process.env.DATABRICKS_SERVER_HOSTNAME = configProps[environment.toLowerCase().trim()]["DATABRICKS_SERVER_HOSTNAME"];
    process.env.SQLWAREHOUSE_PATH = configProps[environment.toLowerCase().trim()]["SQLWAREHOUSE_PATH"];
    process.env.CLUSTER_ID = configProps[environment.toLowerCase().trim()]["CLUSTER_ID"];
    process.env.CATALOG_ID = configProps[environment.toLowerCase().trim()]["CATALOG_ID"];
    process.env.ENVIRONMENT = environment.toLowerCase().trim();
}

export default globalSetup;

