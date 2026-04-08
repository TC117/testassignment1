const base = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');

const test = base.test.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
});

module.exports = {
  test,
  expect: base.expect,
};
