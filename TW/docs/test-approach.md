# MarsAir Test Approach

## Objective

Validate the four user stories defined in the MarsAir assignment, focusing on functional correctness, business-rule accuracy, and basic usability of the public flight-search UI.

## Scope

### In scope

- Stories #1–#4 from the assignment (search, promo codes, navigation, invalid dates)
- Happy paths **and** negative/boundary paths derived directly from acceptance criteria
- Edge cases inferred from equivalence partitioning and boundary-value analysis
- Defect logging in both the embedded tracker and a local backup

### Out of scope

- Performance, load, or stress testing
- Accessibility beyond obvious checks
- Cross-browser matrix (Chromium only in this pack)
- Backend, API, or database verification (only the public UI is available)

## Strategy

I followed a **risk-based, story-driven** approach:

1. **Map tests to stories** – every automated test references a story and acceptance criterion.
2. **Cover boundaries first** – the acceptance criteria define sharp rules (e.g., "return < 1 year from departure") so I prioritized boundary-value analysis around those thresholds.
3. **Partition inputs** – for promo codes I used equivalence partitioning: valid codes, invalid check digits, wrong formats, empty/whitespace, lowercase, and truncated inputs.
4. **Data-drive repetitive checks** – search pairs, invalid schedules, and promo codes are expressed as test data arrays so new cases are added in one place.
5. **Fail honestly** – only one test carries `test.fail()` (the CTA navigation, documented as BUG-001). All other tests run without pre-annotations so failures surface naturally.

## Testing Techniques Applied

| Technique | Where used |
| --- | --- |
| Boundary-value analysis | Story #4 invalid schedules (6-month gap vs 12-month gap boundary) |
| Equivalence partitioning | Story #2 promo codes (valid, wrong check digit, wrong format, edge input) |
| Decision table | Story #1 all valid departure/return combinations (10 pairs) |
| Negative testing | Stories #2, #4 (invalid codes, reverse schedules, same-date searches) |
| Exploratory | Default-value search, CTA element type, promo whitespace handling |

## Why Playwright

- Fast setup against a live hosted site – no local server required
- Clear locators (`getByRole`, `getByText`) for form-based UI
- Built-in evidence: HTML reports, screenshots, video, and traces on failure
- Easy to extend and demo live during a pairing session

## Coverage Summary

| Story | Automated tests | Data-driven variants |
| --- | --- | --- |
| #1 Basic Search | 4 test IDs | 10 valid search pairs |
| #2 Promo Codes | 3 test IDs | 2 valid + 3 invalid + 6 edge-case codes |
| #3 Navigation | 3 test IDs | – |
| #4 Invalid Dates | 3 test IDs | 5 invalid + 2 same-date + 3 reverse schedules |
