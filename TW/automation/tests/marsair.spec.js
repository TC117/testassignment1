const { test, expect } = require('../fixtures/marsair.fixture');
const {
  ALL_MONTH_OPTIONS,
  EDGE_CASE_PROMO_CODES,
  INVALID_PROMO_CODES,
  INVALID_SCHEDULES,
  REVERSE_SCHEDULES,
  SAME_DATE_SCHEDULES,
  VALID_PROMO_CODES,
  VALID_SEARCH_PAIRS,
} = require('../data/testData');

/**
 * Valid search context reused for promo-code and navigation tests.
 * July → July (next year) = exactly 1-year gap, satisfying Story #4.
 */
const PROMO_SEARCH = { departing: '0', returning: '2' };

// ─── Story #1 – Basic Search flow ──────────────────────────────────
test.describe('Story #1 – Basic Search flow', () => {
  test('MA-001: home page loads with expected form fields and links', async ({ homePage }) => {
    await homePage.goto();
    await homePage.expectCoreFormVisible();
  });

  test('MA-002: dropdowns show July/December for the next two years', async ({ homePage }) => {
    await homePage.goto();

    const dep = await homePage.getDepartingOptions();
    const ret = await homePage.getReturningOptions();

    expect(dep).toEqual(ALL_MONTH_OPTIONS);
    expect(ret).toEqual(ALL_MONTH_OPTIONS);
  });

  for (const pair of VALID_SEARCH_PAIRS) {
    test(`MA-003: ${pair.label} → shows seat availability`, async ({ homePage, resultsPage }) => {
      await homePage.goto();
      await homePage.search({ departing: pair.departing, returning: pair.returning });
      await resultsPage.expectAvailabilityMessage();
    });
  }

  test('MA-004: search with default "Select…" values handles gracefully', async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.searchButton.click();

    // The application should not crash or show a server error
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('500');
    expect(bodyText).not.toContain('Internal Server Error');
  });
});

// ─── Story #4 – Invalid Return Dates ───────────────────────────────
test.describe('Story #4 – Invalid Return Dates', () => {
  for (const s of INVALID_SCHEDULES) {
    test(`MA-005: ${s.label} → invalid schedule message`, async ({ homePage, resultsPage }) => {
      await homePage.goto();
      await homePage.search({ departing: s.departing, returning: s.returning });
      await resultsPage.expectInvalidScheduleMessage();
    });
  }

  test.describe('edge: same departure and return date', () => {
    for (const s of SAME_DATE_SCHEDULES) {
      test(`MA-006: ${s.label} → invalid schedule message`, async ({ homePage, resultsPage }) => {
        await homePage.goto();
        await homePage.search({ departing: s.departing, returning: s.returning });
        await resultsPage.expectInvalidScheduleMessage();
      });
    }
  });

  test.describe('edge: return before departure', () => {
    for (const s of REVERSE_SCHEDULES) {
      test(`MA-007: ${s.label} → invalid schedule message`, async ({ homePage, resultsPage }) => {
        await homePage.goto();
        await homePage.search({ departing: s.departing, returning: s.returning });
        await resultsPage.expectInvalidScheduleMessage();
      });
    }
  });
});

// ─── Story #2 – Promotional Codes ──────────────────────────────────
test.describe('Story #2 – Promotional Codes', () => {
  for (const promo of VALID_PROMO_CODES) {
    test(`MA-008: valid code ${promo.code} → ${promo.discount}% discount`, async ({ homePage, resultsPage }) => {
      await homePage.goto();
      await homePage.search({ ...PROMO_SEARCH, promotionalCode: promo.code });
      await resultsPage.expectPromoAccepted(promo.code, promo.discount);
    });
  }

  for (const promo of INVALID_PROMO_CODES) {
    test(`MA-009: invalid code "${promo.code}" (${promo.label}) → rejected`, async ({ homePage, resultsPage }) => {
      await homePage.goto();
      await homePage.search({ ...PROMO_SEARCH, promotionalCode: promo.code });
      await resultsPage.expectPromoRejected(promo.code);
    });
  }

  test.describe('edge-case promo input', () => {
    for (const edge of EDGE_CASE_PROMO_CODES) {
      test(`MA-010: ${edge.label}`, async ({ homePage, resultsPage }) => {
        await homePage.goto();
        await homePage.search({ ...PROMO_SEARCH, promotionalCode: edge.code });

        if (edge.code.trim() === '') {
          // Empty or whitespace-only input should be ignored – show normal availability
          await resultsPage.expectAvailabilityMessage();
        } else {
          // Non-empty invalid input should be explicitly rejected
          await resultsPage.expectPromoRejected(edge.code);
        }
      });
    }
  });
});

// ─── Story #3 – Link to Home Page ──────────────────────────────────
test.describe('Story #3 – Link to Home Page', () => {
  test('MA-011: MarsAir logo navigates back to home', async ({ page, homePage, resultsPage }) => {
    await homePage.goto();
    await homePage.search(PROMO_SEARCH);
    await resultsPage.clickLogo();

    await expect(page).toHaveURL(/\/BuiKienTin\/?$/);
    await homePage.expectLoaded();
  });

  test('MA-012: CTA text is visible on the results page', async ({ homePage, resultsPage }) => {
    await homePage.goto();
    await homePage.search(PROMO_SEARCH);
    await resultsPage.expectCtaTextVisible();
  });

  test('MA-013: CTA should navigate back to home (BUG-001: not a link)', async ({ page, homePage, resultsPage }) => {
    // BUG-001: The CTA is rendered as <h3> text, not <a>, so it cannot be clicked.
    test.fail();

    await homePage.goto();
    await homePage.search(PROMO_SEARCH);
    await resultsPage.clickProminentCta();

    await expect(page).toHaveURL(/\/BuiKienTin\/?$/);
    await homePage.expectLoaded();
  });
});
