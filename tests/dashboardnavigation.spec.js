import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import loginData from './loginData.json';

test.describe('Dashboard Navigation and Note Flow', () => {


  loginData.forEach((creds, index) => {
    if (!creds.valid) return; // Skip 
    test(`Login`, async ({ page }) => {
      const loginPage = new LoginPage(page);
       // Step 1: Login
       await loginPage.goto();
       await loginPage.login(creds.email, creds.password);

        // Step 3: Assert dashboard is visible
      await expect(page.locator("//div[contains(text(),'Demo')]")).toBeVisible();
    });
  });
})