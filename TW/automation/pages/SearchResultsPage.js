const { expect } = require('@playwright/test');

class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.body = page.locator('body');
    this.resultsHeading = page.getByRole('heading', { name: 'Search Results' });
    this.logoLink = page.getByRole('link', { name: 'MarsAir' });
    this.backLink = page.getByRole('link', { name: 'Back' });
    this.prominentCtaLink = page.getByRole('link', { name: 'Book a ticket to the red planet now!' });
    this.prominentCtaText = page.getByText('Book a ticket to the red planet now!');
    this.availabilityMessages = [
      'Seats available! Call 0800 MARSAIR to book!',
      'Sorry, there are no more seats available.',
    ];
    this.invalidScheduleMessage = 'Unfortunately, this schedule is not possible. Please try again.';
  }

  async expectLoaded() {
    await expect(this.resultsHeading).toBeVisible();
    await expect(this.backLink).toBeVisible();
  }

  async getBodyText() {
    return this.body.innerText();
  }

  async expectAvailabilityMessage() {
    await this.expectLoaded();

    const bodyText = await this.getBodyText();
    const matchedMessage = this.availabilityMessages.find((message) => bodyText.includes(message));

    expect(matchedMessage, 'Expected one of the customer-facing seat availability messages').toBeTruthy();

    return matchedMessage;
  }

  async expectInvalidScheduleMessage() {
    await this.expectLoaded();
    await expect(this.body).toContainText(this.invalidScheduleMessage);
  }

  async expectPromoAccepted(code, discount) {
    await this.expectLoaded();
    await expect(this.body).toContainText(`Promotional code ${code} used: ${discount}% discount!`);
  }

  async expectPromoRejected(code) {
    await this.expectLoaded();
    await expect(this.body).toContainText(`Sorry, code ${code} is not valid`);
  }

  async clickLogo() {
    await this.logoLink.click();
  }

  async expectCtaTextVisible() {
    await expect(this.prominentCtaText).toBeVisible();
  }

  async clickProminentCta() {
    await this.prominentCtaLink.click();
  }
}

module.exports = { SearchResultsPage };
