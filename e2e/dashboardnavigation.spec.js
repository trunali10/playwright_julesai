import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import loginData from './data/loginData.json';

test.describe('Dashboard Navigation and Note Flow', () => {
  loginData.forEach((creds, index) => {
    if (!creds.valid) return;

    test(`Login Test - ${creds.email}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      // Step 1: Login
      await loginPage.goto();
      await loginPage.login(creds.email, creds.password);

      // Step 2: Verify dashboardß
      // Only if "Demo" is confirmed to appear after login
      await expect(page.getByText('Demo')).toBeVisible();

      // Step 3: Navigate to Sales
      await page.hover("xpath=//div[@permission='OPERATION_TRADING_SELL']//a[contains(@class, 'sc-ftvSup')]");
      await page.locator('a.item:has-text("Sales")').click();

      // Step 4: Go to Hedging Contracts
      await page.hover("div[permission='HEDGING_CONTRACTS,OPEN_POSITION_REPORT'] a[class*='sc-ftvSup']");
      await page.locator('a[href="/hedging-contracts"]').click();

      // Step 5: Go to Logistics → Bookings
      await page.hover("a[title='Logistics']");
      await page.locator('a[href="/bookings"]').click();

      // Step 6: Add New Booking
      await page.waitForTimeout(14000);
      await page.locator("xpath=//span[normalize-space()='Add new booking']").click();

      await page.fill("xpath=(//input[@type='text'])[5]", '4');
      await page.fill('input[type="number"]', '4');

      // Step 7: Select dropdown option (Booking Confirmation Received)
      await page.locator("xpath=//div[@data-test-id='FreightBookingModal.progress']//div[contains(@class, 'MuiAutocomplete-inputRoot')]").click();
      await page.locator('div.MuiAutocomplete-listbox >> li:first-child').click();

      // Step 8: Submit booking form
      await page.locator("button[type='submit']").click();

      await page.locator("button[type='submit']").click();

      // Step 9: Save booking (handle modal/save button)
      
      await expect(page.getByRole('button', { name: 'Save' })).toBeVisible({ timeout: 10000 });

      // Click Save using accessible role & label
      await page.getByRole('button', { name: 'Save' }).click();
      await page.locator("//div[@class='sc-bczRLJ fbmcbp']//div[@class='sc-gsnTZi GJlVl']//button[@type='button']").click();

      // Step 10: Go to Logistics → Bookings
      await page.hover("a[title='Notes & Tasks']");
      await page.locator('a[href="/activities"]').click();
     // await page.waitForTimeout(8000);
      await page.locator("//span[contains(text(),'Add a note')]").click();

    // Step: Add a note and type "Call" in autocomplete
    

      // Use simplified & fixed XPath to fill "Call"
      await page.fill("//div[@class='MuiAutocomplete-root']//input[contains(@class, 'MuiAutocomplete-input')]", 'Call')
      await page.click('li[role="option"]:first-child');


      // Focus and type into the rich text editor
      await page.click('div.rdw-editor-main');
      await page.keyboard.type('Testing Testinng 1');
    


      // Click Save button
      await page.click("div.MuiButtonGroup-root.MuiButtonGroup-contained > button:first-child > span.MuiButton-label");


      // step 11

     // open first note

     
    await page.waitForTimeout(3000);

     await page.locator("//body[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/button[1]").click();
     await page .locator("//span[contains(text(),'Confirm')]").click();
     await page.waitForTimeout(2000);
      // Click on the first note

     

   
    });


  
    });
  });

