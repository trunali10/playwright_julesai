export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator('button[type="submit"] span.MuiButton-label');
  }

  async goto() {
    await this.page.goto('https://demo.haroldwaste.com/');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
