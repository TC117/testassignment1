const { test, expect } = require('../fixtures/marsair.fixture');
const {
  ALL_MONTH_OPTIONS,
  INVALID_PROMO_CODES,
  INVALID_SCHEDULES,
  VALID_PROMO_CODES,
  VALID_SEARCH_PAIRS,
} = require('../data/testData');
test.describe('MarsAir core flow', () => {
  test('home page loads with the expected fields and links', async ({ homePage }) => {
    await homePage.goto();
    await homePage.expectCoreFormVisible();
  });

  test('departure and return dropdowns show the two-year six-month schedule', async ({ homePage }) => {
    await homePage.goto();

    const departingOptions = await homePage.getDepartingOptions();
    const returningOptions = await homePage.getReturningOptions();

    expect(departingOptions).toEqual(ALL_MONTH_OPTIONS);
    expect(returningOptions).toEqual(ALL_MONTH_OPTIONS);
  });

  test('valid searches resolve to a user-facing result message', async ({ homePage, resultsPage }) => {
    const seenMessages = new Set();

    for (const [departing, returning] of VALID_SEARCH_PAIRS) {
      await homePage.goto();
      await homePage.search({ departing, returning });

      const matchedMessage = await resultsPage.expectAvailabilityMessage();
      seenMessages.add(matchedMessage);
    }

    expect(seenMessages.size).toBeGreaterThanOrEqual(1);
  });

  test.describe('invalid return dates', () => {
    for (const schedule of INVALID_SCHEDULES) {
      test(`rejects ${schedule.departingLabel} to ${schedule.returningLabel}`, async ({ homePage, resultsPage }) => {
        await homePage.goto();
        await homePage.search(schedule);
        await resultsPage.expectInvalidScheduleMessage();
      });
    }
  });

  test.describe('promotional codes', () => {
    for (const promo of VALID_PROMO_CODES) {
      test(`accepts valid code ${promo.code}`, async ({ homePage, resultsPage }) => {
        test.fail();

        await homePage.goto();
        await homePage.search({
          departing: '0',
          returning: '2',
          promotionalCode: promo.code,
        });
        await resultsPage.expectPromoAccepted(promo.code, promo.discount);
      });
    }

    for (const code of INVALID_PROMO_CODES) {
      test(`rejects invalid code ${code}`, async ({ homePage, resultsPage }) => {
        test.fail();

        await homePage.goto();
        await homePage.search({
          departing: '0',
          returning: '2',
          promotionalCode: code,
        });
        await resultsPage.expectPromoRejected(code);
      });
    }
  });

  test('MarsAir logo returns the user to the home page', async ({ page, homePage, resultsPage }) => {
    await homePage.goto();
    await homePage.search({ departing: '0', returning: '2' });
    await resultsPage.clickLogo();

    await expect(page).toHaveURL(/\/BuiKienTin\/?$/);
    await homePage.expectLoaded();
  });

  test('prominent CTA should take the user back to the home page', async ({ page, homePage, resultsPage }) => {
    test.fail();

    await homePage.goto();
    await homePage.search({ departing: '0', returning: '2' });
    await resultsPage.clickProminentCta();

    await expect(page).toHaveURL(/\/BuiKienTin\/?$/);
    await homePage.expectLoaded();
  });
});
