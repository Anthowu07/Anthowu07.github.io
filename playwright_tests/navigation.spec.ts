import { test, expect } from '@playwright/test';

test.describe('Tests navigation of all navbar links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://anthowu07.github.io/');
  });

  test('Should click the Board Games link in the navbar and verify Add Board Game button is visible', async ({ page }) => {
    await page.getByRole('link', { name: 'Board Games' }).click();

    const result = await page.getByText('Add Board Game');
    await expect(result).toBeVisible();
  });

  test('Should click the Warehouses link in the navbar and verify Add Warehouse button is visible', async ({ page }) => {
    await page.getByRole('link', { name: 'Warehouses' }).click();

    const result = await page.getByText('Add Warehouse');
    await expect(result).toBeVisible();
  });

  test('Should click the Inventory link in the navbar and verify Inventory Data header is visible', async ({ page }) => {
    await page.getByRole('link', { name: 'Inventory' }).click();

    const result = await page.getByText('Inventory Data');
    await expect(result).toBeVisible();
  });

  test('Should click the Place Order link in the navbar and verify Place Order header is visible', async ({ page }) => {
    await page.getByRole('link', { name: 'Place Order' }).click();

    const result = await page.getByRole('heading').getByText('Place Order');
    await expect(result).toBeVisible();
  });

  test('Should go to home page and verify Recent Orders header is visible', async ({ page }) => {
    const result = await page.getByRole('heading').getByText('Recent Orders');
    await expect(result).toBeVisible();
  });
})

