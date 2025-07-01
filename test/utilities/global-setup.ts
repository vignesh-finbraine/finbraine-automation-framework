import ADO_TestCase from '../utilities/azure_devops';

async function globalSetup() {
  const ado_obj = new ADO_TestCase();
  if(process.env.AZURE_ORGANIZATION ){
    const alltestcases = await ado_obj.updateTestCasesId_ADO();
  }  
}

export default globalSetup;
