import { test, expect } from '@playwright/test';

test('SearchBar renders correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const searchInput = await page.$('input[type="text"]');
  expect(searchInput).toBeTruthy();

  const searchButton = await page.$('button[type="submit"]');
  expect(searchButton).toBeTruthy();
});

test('MovieList handles search correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.fill('input[type="text"]', 'Avengers');

  await page.click('button[type="submit"]');

  await page.waitForURL('http://localhost:5173/search/Avengers');

  await page.waitForSelector('[data-testid="movie-card"]');

  const movieCards = await page.$$('[data-testid="movie-card"]');
  expect(movieCards.length).toBeGreaterThan(0);
});
