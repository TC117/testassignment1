# MarsAir QA Assignment Pack

This folder contains a self-contained QA submission pack for the MarsAir ThoughtWorks assignment.

## Contents

- `automation/`: Playwright UI tests against the live MarsAir site
- `automation/pages/`: page objects for the home page and search results page
- `automation/fixtures/`: custom Playwright fixtures that provide MarsAir page objects to tests
- `automation/data/`: shared test data used by the specs
- `docs/test-approach.md`: concise testing strategy and scope
- `docs/test-cases.md`: story-mapped manual and automated scenarios
- `docs/bug-log.md`: local backup of issues found during testing
- `docs/notes.md`: interview notes, assumptions, and open questions

## Run The Tests

From [`TW/automation`](/C:/Users/tinvt/OneDrive/Documents/GitHub/testassignment1/TW/automation):

```powershell
npm install
npm test
```

Useful commands:

```powershell
npm run test:headed
npm run test:report
```

## Notes

- The test suite targets the live site at `https://marsair.recruiting.thoughtworks.net/BuiKienTin`.
- Some tests may be marked as expected failures when they represent known defects against the user stories.
- The docs in `TW/docs` are written to be easy to walk through during a pairing interview.
