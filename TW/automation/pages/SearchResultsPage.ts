import { expect, type Locator, type Page } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly body: Locator;
  readonly resultsHeading: Locator;
  readonly logoLink: Locator;
  readonly backLink: Locator;
  readonly prominentCtaLink: Locator;
  readonly prominentCtaText: Locator;
  readonly availabilityMessages: string[];
  readonly invalidScheduleMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.body = page.locator('body');
    this.resultsHeading = page.getByRole('heading', { name: 'Search Results' });
    this.logoLink = page.getByRole('link', { name: 'MarsAir' });
    this.backLink = page.getByRole('link', { name: 'Back' });
    this.prominentCtaLink = page.getByRole('link', { name: 'Book a ticket to the red planet now!' });
    this.prominentCtaText = page.getByText('Book a ticket to the red planet now!');
    this.availabilityMessages = [
      'Seats available!',
      'Sorry, there are no more seats available.',
    ];
    this.invalidScheduleMessage = 'Unfortunately, this schedule is not possible. Please try again.';
  }

  async expectLoaded(): Promise<void> {
    await expect(this.resultsHeading).toBeVisible();
    await expect(this.backLink).toBeVisible();
  }

  async getBodyText(): Promise<string> {
    return this.body.innerText();
  }

  async expectAvailabilityMessage(): Promise<string | undefined> {
    await this.expectLoaded();

    const bodyText = await this.getBodyText();
    const matchedMessage = this.availabilityMessages.find((message) => bodyText.includes(message));

    expect(matchedMessage, 'Expected one of the customer-facing seat availability messages').toBeTruthy();

    return matchedMessage;
  }

  async expectInvalidScheduleMessage(): Promise<void> {
    await this.expectLoaded();
    await expect(this.body).toContainText(this.invalidScheduleMessage);
  }

  async expectPromoAccepted(code: string, discount: number): Promise<void> {
    await this.expectLoaded();
    await expect(this.body).toContainText(`Promotional code ${code} used: ${discount}% discount!`);
  }

  async expectPromoRejected(code: string): Promise<void> {
    await this.expectLoaded();
    await expect(this.body).toContainText(`Sorry, code ${code} is not valid`);
  }

  async clickLogo(): Promise<void> {
    await this.logoLink.click();
  }

  async expectCtaTextVisible(): Promise<void> {
    await expect(this.prominentCtaText).toBeVisible();
  }

  async clickProminentCta(): Promise<void> {
    await this.prominentCtaLink.click();
  }
}
