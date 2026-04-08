# MarsAir Notes

## Working Assumptions

- The assignment is a UI-focused QA exercise against a hosted site – no backend access.
- Playwright with JavaScript is the automation tool.
- The dropdowns use integer option values (`0`–`5`) mapping to July/December across three years.
- The exact seat-inventory algorithm is unknown; tests only verify that a recognised message appears.

## Acceptance-Criteria Analysis

### Story #1 – Basic Search flow

- **Covered**: departure/return fields, July/December schedule, two-year range, availability messages.
- **Gap identified**: The story says "trips for the next two years should be searchable" but does not define whether all 10 valid combinations have seats. Testing verifies a user-facing message is shown, not that seats are always available.

### Story #2 – Promotional Codes

- **Covered**: format `XX9-XXX-999`, check-digit algorithm, valid/invalid message texts.
- **Gap identified**: The story does not define behavior for empty input, whitespace, lowercase, truncated codes, or a 0% discount digit. Edge-case tests are included to explore these.
- **Note**: The previous test suite pre-annotated all promo tests as expected failures. The updated suite runs them without `test.fail()` so failures are surfaced naturally.

### Story #3 – Link to Home Page

- **Covered**: logo navigation, CTA visibility, CTA navigation attempt.
- **Bug found**: CTA is `<h3>` not `<a>` (BUG-001).
- **Typo noted**: "apperar" in story text (BUG-002).

### Story #4 – Invalid Return Dates

- **Covered**: return < 1 year, same date, return before departure.
- **Gap identified**: The story only mentions "return date is less than 1 year from departure." Same-date and reverse-date cases are implicit but not explicit, so tests cover them as exploratory edge cases.

## Test Framework Design Decisions

| Decision | Rationale |
| --- | --- |
| Page Object Model | Keeps locators in one place; easy to update if HTML changes |
| Custom Playwright fixtures | Injects `homePage` and `resultsPage` so tests stay clean |
| Data-driven tests via `for…of` | Each data point becomes its own test – clear pass/fail per case |
| No `test.fail()` on promo tests | Let failures reveal real bugs instead of pre-annotating |
| `test.fail()` only on BUG-001 | CTA is confirmed not a link from HTML inspection |
| `generateValidPromoCode()` helper | Demonstrates understanding of the check-digit algorithm |
