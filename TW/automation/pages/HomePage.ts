import { expect, type Locator, type Page } from '@playwright/test';

interface SearchOptions {
  departing?: string;
  returning?: string;
  promotionalCode?: string;
}

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly departingSelect: Locator;
  readonly returningSelect: Locator;
  readonly promotionalCodeInput: Locator;
  readonly searchButton: Locator;
  readonly reportIssueLink: Locator;
  readonly problemDefinitionLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Welcome to MarsAir!' });
    this.departingSelect = page.locator('#departing');
    this.returningSelect = page.locator('#returning');
    this.promotionalCodeInput = page.locator('#promotional_code');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.reportIssueLink = page.getByRole('link', { name: 'Report an issue' });
    this.problemDefinitionLink = page.getByRole('link', { name: 'Problem definition' });
  }

  async goto(): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await this.page.goto('', { waitUntil: 'domcontentloaded' });
        lastError = null;
        break;
      } catch (error) {
        lastError = error as Error;

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

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async expectCoreFormVisible(): Promise<void> {
    await expect(this.departingSelect).toBeVisible();
    await expect(this.returningSelect).toBeVisible();
    await expect(this.promotionalCodeInput).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.reportIssueLink).toBeVisible();
    await expect(this.problemDefinitionLink).toBeVisible();
  }

  async getDepartingOptions(): Promise<string[]> {
    return this.page.locator('#departing option').allTextContents();
  }

  async getReturningOptions(): Promise<string[]> {
    return this.page.locator('#returning option').allTextContents();
  }

  async search({ departing, returning, promotionalCode }: SearchOptions = {}): Promise<void> {
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
