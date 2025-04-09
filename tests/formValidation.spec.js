import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import validationData from './data/formValidationData.json';

test.describe('Form Validation Tests', () => {
  validationData.forEach((data, index) => {
    test(`Validation Test #${index + 1}: Email="${data.email}"`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      await loginPage.login(data.email, data.password);

      // Wait a bit for error to show (external wait optional)
      await page.waitForTimeout(2000);

      // Assert the expected validation message
      await expect(page.locator(`text=${data.expectedError}`)).toBeVisible();
    });
  });
});
