const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Welcome to MarsAir!' });
    this.departingSelect = page.locator('#departing');
    this.returningSelect = page.locator('#returning');
    this.promotionalCodeInput = page.locator('#promotional_code');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.reportIssueLink = page.getByRole('link', { name: 'Report an issue' });
    this.problemDefinitionLink = page.getByRole('link', { name: 'Problem definition' });
  }

  async goto() {
    let lastError;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await this.page.goto('', { waitUntil: 'domcontentloaded' });
        lastError = null;
        break;
      } catch (error) {
        lastError = error;

        if (!String(error).includes('ERR_CONNECTION_CLOSED') || attempt === 3) {
          throw error;
        }

        await this.page.waitForTimeout(attempt * 1000);
      }
    }

    if (lastError) {
      throw lastError;
    }

    await this.expectLoaded();
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async expectCoreFormVisible() {
    await expect(this.departingSelect).toBeVisible();
    await expect(this.returningSelect).toBeVisible();
    await expect(this.promotionalCodeInput).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.reportIssueLink).toBeVisible();
    await expect(this.problemDefinitionLink).toBeVisible();
  }

  async getDepartingOptions() {
    return this.page.locator('#departing option').allTextContents();
  }

  async getReturningOptions() {
    return this.page.locator('#returning option').allTextContents();
  }

  async search({ departing, returning, promotionalCode } = {}) {
    if (departing !== undefined) {
      await this.departingSelect.selectOption(departing);
    }

    if (returning !== undefined) {
      await this.returningSelect.selectOption(returning);
    }

    if (promotionalCode !== undefined) {
      await this.promotionalCodeInput.fill(promotionalCode);
    }

    await this.searchButton.click();
  }
}

module.exports = { HomePage };
