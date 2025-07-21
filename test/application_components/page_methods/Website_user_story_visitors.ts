import {expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import DataFactory from '../../utilities/data-factory';
import * as fs from 'fs';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';


export class Website_visitors{
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private dataFactory: DataFactory;
  private container: any; 
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;

 
  

  //**Declare */


  readonly drpdwn_fundraising: Locator;
  readonly link_fundraising_ideas:Locator;
  readonly txt_fundraising:Locator;
  //************* Partner ************ */
  readonly txt_our_partner:Locator;
  readonly link_london_marathon:Locator;
  readonly txt_london_marathon_title:Locator;
 
  /**************** Blogs ***********************/
  readonly drpdwn_partners:Locator;
  readonly blog_runthrough:Locator;
  readonly txt_runthrough:Locator;
  readonly blog_greatrun:Locator;
  readonly txt_greatrun:Locator;







  
  /**
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DataFactory} dataFactory
   * @param {any} container
   * @param {DatabricksSQLwarehouse} databricks_sqlware;
   * @param {DatabricksFactoryDBFS} databricks_dbfs;
   */

  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.dataFactory = container.resolve('dataFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');

    /******************** Page Objects ************************/
    
    this.drpdwn_fundraising=this.page.locator('(//*[@class="header__link linkdropdown"]//*/ancestor::component-header/header/div//*[contains(text(), " Fundraising")])[1]');
    this.link_fundraising_ideas=this.page.locator('header').getByRole('link', { name: 'Fundraising Ideas' });
    this.txt_fundraising=this.page.locator('//h1[normalize-space()="Fundraising"]');
    /********************** Partner ***********************************/
    this.txt_our_partner=this.page.locator('//h2[normalize-space()="Our Partners"]');
    this.link_london_marathon=this.page.locator('//*[@href="https://www.londonmarathonevents.co.uk/"]');
    this.txt_london_marathon_title=this.page.locator('//*[@class="hero-group-full-width__eyebrow"]/ancestor::main/div//*[contains(text(), "London Marathon Events")]');
    /********************* Blogs *******************************************/
    this.drpdwn_partners=this.page.locator('(//*[@class="header__link linkdropdown"]/ancestor::header/div/div//*[@class="header__link linkdropdown"][contains(text(), " Partners")])[1]');
    this.blog_runthrough=this.page.locator('//div[@class="header__sub-item"]//a[@title="RunThrough"]');
    this.txt_runthrough=this.page.locator('//h2[normalize-space()="Official Hydration Partner of Run for Charity"]');
    this.blog_greatrun=this.page.locator('//div[@class="header__sub-item"]//a[@title="Great Run"]');
    this.txt_greatrun=this.page.locator('//h2[normalize-space()="Official Partner of Run for Charity"]');
 
  }
    

    // Login to RFC
    
    async user_click_fundraising_dropdown(){
      await this.drpdwn_fundraising.hover();
    }
   
    async user_click_fundraising_ideas(){
      await this.playwrightFactory.click(this.link_fundraising_ideas);
    }
   
    async user_verify_displayed_page(){
      await expect (this.txt_fundraising).toBeVisible();
    }
   
    /******************** Partner *******************************************/
    async user_verify_our_partners_displayed_on_homepage(){
      await expect (this.txt_our_partner).toBeVisible();
    }
   
    async user_click_london_marathon_partner(){
      await this.playwrightFactory.click(this.link_london_marathon);
    }
   
    async user_verify_title(){
      await expect (this.txt_london_marathon_title).toBeVisible();
    }
   
    async user_redirect_to_homepage(){
      await this.page.close();
    }
    /********************** Blogs ***********************/
    async user_click_partners_dropdown(){
      await this.drpdwn_partners.hover();
      await this.page.waitForTimeout(2000);
  }
   
    async user_click_blog_runthrough(){
      await this.blog_runthrough.hover();
      await this.page.waitForTimeout(2000);
      await this.playwrightFactory.click(this.blog_runthrough);
    }
   
    async user_verify_runthrought_page_title(){
      await expect (this.txt_runthrough).toBeVisible();
   
    }
   
    async user_click_blog_greatrun(){
      await this.blog_greatrun.hover();
      await this.page.waitForTimeout(2000);
      await this.playwrightFactory.click(this.blog_greatrun);
    }
   
    async user_verify_greatrun_page_title(){
      await expect (this.txt_greatrun).toBeVisible();
    }
  
    
   
  
    


















  
  
 

  

 

 




}


