# MarsAir QA Assignment Pack

This folder contains a self-contained QA submission pack for the MarsAir ThoughtWorks assignment.

## Contents

- `automation/` – Playwright UI tests (TypeScript) against the live MarsAir site
  - `pages/` – Page objects with full type annotations (HomePage, SearchResultsPage)
  - `fixtures/` – Typed Playwright fixtures providing page objects to tests
  - `data/` – Shared test data with TypeScript interfaces and helpers (promo-code generator)
  - `tests/` – Test specs organized by user story
- `docs/test-approach.md` – Testing strategy, techniques, and coverage summary
- `docs/test-cases.md` – Story-mapped automated and manual scenarios
- `docs/bug-log.md` – Local backup of issues found during testing
- `docs/notes.md` – Acceptance-criteria analysis, design decisions, and interview notes

## Run the Tests

From `TW/automation`:

```powershell
npm install
npx playwright install chromium
npm test
```

Useful commands:

```powershell
npm run test:headed     # run with visible browser
npm run test:report     # open the HTML report
```

## Test Organization

Tests are organized by user story, not by page:

| describe block | Story | Tests |
| --- | --- | --- |
| Story #1 – Basic Search flow | #1 | MA-001 to MA-004 |
| Story #4 – Invalid Return Dates | #4 | MA-005 to MA-007 |
| Story #2 – Promotional Codes | #2 | MA-008 to MA-010 |
| Story #3 – Link to Home Page | #3 | MA-011 to MA-013 |

## Notes

- Target site: `https://marsair.recruiting.thoughtworks.net/BuiKienTin`
- Only MA-013 is marked `test.fail()` – it documents a confirmed bug (CTA is not a link).
- All other tests, including promo codes, run without pre-annotations so failures reveal real application behavior.
- The docs in `TW/docs` are designed to walk through during a pairing interview.
