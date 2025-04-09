import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import loginData from './data/loginData.json';

test.describe('Login Tests', () => {
  loginData.forEach((creds, index) => {
    const scenario = creds.valid ? 'valid' : 'invalid';

    test(`(${scenario}) Login with ${creds.email} - Test #${index + 1}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      // Step 1: Navigate to login page
      await loginPage.goto();

      // Step 2: Perform login action
      await loginPage.login(creds.email, creds.password);

      if (creds.valid) {
        // ✅ Validate successful login

        // validated the crediatal
        //creds.iseql(expected_Creds)

        // Step 3: Assert dashboard is visible
        await expect(page.locator("//div[contains(text(),'Demo')]")).toBeVisible();

        // Step 4: Assert logged-in user's name/email is visible
        await expect(page.locator('text=Qa JULES')).toBeVisible();

        // Step 5: (Optional) Validate URL contains 'purchases'
        await expect(page).toHaveURL(/.*purchases/);
        

        // Step 6: Perform logout
        await page.locator('//*[@id="root"]/div/div[1]/div/div/div[7]/div/div/div/div[1]/div').click();
        await page.locator("//div[normalize-space()='Log out']").click();
     



        // ✅ Validate successful logout
        await expect(page).toHaveURL(/.*authentication/);

      } else {
        // ❌ Validate error message for invalid login
        await expect(page.locator('.error')).toBeVisible();
      }
    });
  });
});
