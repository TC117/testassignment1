import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

interface MarsAirFixtures {
  homePage: HomePage;
  resultsPage: SearchResultsPage;
}

const test = base.extend<MarsAirFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
});

export { test, expect };
