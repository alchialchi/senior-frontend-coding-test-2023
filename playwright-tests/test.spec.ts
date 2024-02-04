import { test, expect } from '@playwright/test';

test('SearchBar renders correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const searchInput = await page.$(
    'input[type="text"][data-testid="search-input"]',
  );
  expect(searchInput).toBeTruthy();

  const searchButton = await page.$('button[type="submit"]');
  expect(searchButton).toBeTruthy();
});

test('Handles search correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.fill('input[type="text"][data-testid="search-input"]', 'Avengers');
  await page.fill('input[type="text"][data-testid="year-input"]', '1998');
  await page.click('button[type="submit"]');

  await page.waitForSelector('[data-testid="movie-card"]');

  const movieCards = await page.$$('[data-testid="movie-card"]');
  expect(movieCards.length).toBeGreaterThan(0);
});

test('Handles multiword search correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.fill(
    'input[type="text"][data-testid="search-input"]',
    'Harry Potter',
  );
  await page.click('button[type="submit"]');

  await page.waitForSelector('[data-testid="movie-card"]');

  const movieCards = await page.$$('[data-testid="movie-card"]');
  expect(movieCards.length).toBeGreaterThan(0);
});

test('Has no results when nothing found', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.fill('input[type="text"][data-testid="search-input"]', 'Avengers');
  await page.fill('input[type="text"][data-testid="year-input"]', '1700');
  await page.click('button[type="submit"]');

  await page.waitForSelector('[data-testid="nothing-found"]');

  const movieCards = await page.$$('[data-testid="movie-card"]');
  expect(movieCards.length).toBe(0);
});
