import { expect, type TestInfo } from '@playwright/test';
import { type Locator, type Page } from 'playwright';
import { PlaywrightFactoryActions } from '../../utilities/playwright_factory_actions_UI';
import { DatabricksSQLwarehouse } from '../../utilities/databricks_sqlware';
import { DatabricksFactoryDBFS } from '../../utilities/databricks_dbfs';
 
export class LOGIN_PAGE {
  private page: Page;
  private testInfo: TestInfo;
  private playwrightFactory: PlaywrightFactoryActions;
  private container: any;
  private databricks_sqlware: DatabricksSQLwarehouse;
  private databricks_dbfs: DatabricksFactoryDBFS;
 
  readonly txt_username: Locator;
  readonly txt_password: Locator;
  readonly btn_login: Locator;
  readonly txt_invalid_Username: Locator;
  readonly Login_Logo: Locator;
  readonly btn_show_password: Locator;
  readonly lnk_forgot_password: Locator;
  readonly tenant_selector: Locator;
  readonly error_message: Locator;
  readonly alert_warning: Locator;
  readonly alert_success: Locator;
  readonly alert_info: Locator;
  readonly alert_danger: Locator;
  readonly alert_close_btn: Locator;
  readonly alert_text: Locator;
 
  /**
   * @param {any} container
   * @param {Page} page
   * @param {TestInfo} testInfo
   * @param {PlaywrightFactoryActions} playwrightFactory
   * @param {DatabricksSQLwarehouse} databricks_sqlware
   * @param {DatabricksFactoryDBFS} databricks_dbfs
   */
 
  constructor(container: any) {
    this.container = container;
    this.page = container.resolve('page');
    this.testInfo = container.resolve('testInfo');
    this.playwrightFactory = container.resolve('playwrightFactory');
    this.databricks_sqlware = container.resolve('databricks_sqlware');
    this.databricks_dbfs = container.resolve('databricks_dbfs');
 
    /******************** Page Objects ************************/
    this.txt_username = this.page.locator('#username');
    this.txt_password = this.page.locator('#password');
    this.btn_login = this.page.locator('button:has-text("SIGN IN")');
    this.txt_invalid_Username = this.page.locator("//*[contains(text(),'Invalid username or password!')]");
    this.Login_Logo = this.page.locator("//img[@class='login-logo-img']");
    this.btn_show_password = this.page.locator('button.input-suffix-btn');
    this.lnk_forgot_password = this.page.locator('text=Forgot Password?');
    this.tenant_selector = this.page.locator('[data-testid="tenant-selector"]');
    this.error_message = this.page.locator('[class*="error-message"]');
    this.alert_warning = this.page.locator('div.alert.alert-warning[role="alert"]');
    this.alert_success = this.page.locator('div.alert.alert-success[role="alert"]');
    this.alert_info = this.page.locator('div.alert.alert-info[role="alert"]');
    this.alert_danger = this.page.locator('div.alert.alert-danger[role="alert"]');
    this.alert_close_btn = this.page.locator('div.alert button, div.alert .close, div.alert .btn-close');
    this.alert_text = this.page.locator('div[role="alert"], div.alert');
  }
 
  async user_launches_application() {
    let url = process.env.APP_URL || "https://campaignintelligenceqaui.azurewebsites.net/account/login";
    await this.playwrightFactory.launchApplication(url);
  }
 
  async user_enter_username(username: string) {
    await this.playwrightFactory.fill(this.txt_username, username);
  }
 
  async user_enter_password(password: string) {
    await this.playwrightFactory.fill(this.txt_password, password);
  }
 
  async user_click_login_btn() {
    await this.playwrightFactory.click(this.btn_login);
    await this.page.waitForLoadState('networkidle');
  }
 
  async user_validate_error_message() {
    await expect(this.txt_invalid_Username).toBeVisible();
    await expect(this.txt_invalid_Username).toContainText('Invalid username or password!');
  }
 
  async user_validate_login_logo() {
    await expect(this.Login_Logo).toBeVisible();
  }
 
  async verify_login_page_loaded() {
    await expect(this.Login_Logo).toBeVisible();
    await expect(this.txt_username).toBeVisible();
    await expect(this.txt_password).toBeVisible();
    await expect(this.btn_login).toBeVisible();
    await expect(this.lnk_forgot_password).toBeVisible();
  }
 
  async verify_password_field_visible() {
    await expect(this.txt_password).toHaveAttribute('type', 'password');
  }
 
  async click_show_password_icon() {
    await expect(this.btn_show_password).toBeVisible();
    await this.playwrightFactory.click(this.btn_show_password);
  }
 
  async verify_password_field_visible_as_text() {
    await expect(this.txt_password).toHaveAttribute('type', 'text');
  }
 
  async verify_sign_in_button_enabled() {
    await expect(this.btn_login).toBeEnabled();
  }
 
  async click_forgot_password_link() {
    await this.playwrightFactory.click(this.lnk_forgot_password);
    await this.page.waitForLoadState('networkidle');
  }
 
  async verify_password_recovery_page_loaded() {
    const passwordRecoveryHeading = this.page.locator('text=/Password Recovery|Reset Password/i');
    await expect(passwordRecoveryHeading).toBeVisible();
  }
 
  async verify_super_admin_dashboard() {
    await this.page.waitForLoadState('networkidle');
    const sidebarDashboard = this.page.getByRole('link', { name: 'Dashboard' });
    const misHeading = this.page.getByText('MIS Dashboard', { exact: false });
    await expect(sidebarDashboard).toBeVisible();
    await expect(misHeading).toBeVisible();
  }
 
  async verify_invalid_credentials_error() {
    await expect(this.txt_invalid_Username).toBeVisible();
    await expect(this.txt_invalid_Username).toContainText('Invalid username or password!');
  }
 
  async click_switch_tenant() {
  const switchTenantButton = this.page.getByRole('button', { name: 'Switch tenant' });
  await this.playwrightFactory.click(switchTenantButton);
  }
 
  async enter_tenant_name(tenantName: string) {
  const tenantInput = this.page.getByPlaceholder('Tenant name (leave empty for host)');
  await this.playwrightFactory.fill(tenantInput, tenantName);
  }
 
  async click_use_button() {
  const useButton = this.page.getByRole('button', { name: 'Use' });
  await this.playwrightFactory.click(useButton);
  }
 
  async select_tenant(tenantName: string) {
    const tenantOption = this.page.locator(`text="${tenantName}"`);
    await this.playwrightFactory.click(tenantOption);
  }
 
  async verify_tenant_selected(tenantName: string) {
  const tenantLabel = this.page.locator('.tenant-label strong');
  await expect(tenantLabel).toHaveText(tenantName);
  }
 
  /*async verify_tenant_switched() {
    const tenantDisplay = this.page.locator('[data-testid="current-tenant"]');
    await expect(tenantDisplay).toBeVisible();
  }*/
 
  async login_with_credentials(username: string, password: string) {
    await this.user_launches_application();
    await this.user_enter_username(username);
    await this.user_enter_password(password);
    await this.user_click_login_btn();
  }
 
  async verify_page_ready() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.txt_username).toBeVisible();
  }
 
  async wait_for_alert() {
    await this.page.waitForSelector('div[role="alert"], div.alert', { state: 'visible' });
  }
 
  async get_alert_text(): Promise<string | null> {
    await this.wait_for_alert();
    const txt = await this.alert_text.first().textContent();
    return txt ? txt.trim() : null;
  }
 
  async close_alert() {
    const count = await this.alert_close_btn.count();
    if (count > 0) {
      await this.playwrightFactory.click(this.alert_close_btn);
      await this.page.waitForLoadState('networkidle');
    }
  }
 
  async verify_session_expired_warning() {
    await expect(this.alert_warning).toBeVisible();
    await expect(this.alert_warning).toContainText('Your session has expired');
  }
 
  async verify_warning_contains(expectedText: string) {
    await this.wait_for_alert();
    await expect(this.alert_text.first()).toContainText(expectedText);
  }
}
 