import { defineConfig, devices} from '@playwright/test';
//import globalTeardown from './utils/CommonUtilities.js';


const ENV = process.env.ENV || 'uat';
 
const ENV_URLS = {
  dev: '',
  prod: '',
  uat:''
};

const config = ({
  testDir: './tests',
  timeout:  30*10000,
  expect : { 
    timeout: 50*1000,

  },

  

  
  reporter: [
     ['json',{ outputFile:'test-result.json'}],
      ['html']
    
],
 

   fullyParallel: false,
  
  use: {

    browserName : 'chromium',
    headless : true,
    screenshot : 'On',
    video: 'On',
    ignoreHttpsErrors:true,
   permissions:['geolocation'],
   baseURL: ENV_URLS[ENV],
    
    trace : 'on',//off,on
    ...devices['Galaxy S24'],
    launchOptions: {
      args: ['--start-maximized'],
    }

   
   
  },

  /* Configure projects for major browsers */





});
module.exports = config

