# MarsAir Test Cases

## Automated Test Coverage

All IDs below match the test-name prefixes in `marsair.spec.js`.

### Story #1 – Basic Search flow

| ID | Scenario | Type | Expected Result |
| --- | --- | --- | --- |
| MA-001 | Home page loads with form fields and links | Automated | Departure, return, promo code, search button, and key links are visible |
| MA-002 | Dropdowns match the two-year six-month schedule | Automated | Both selects show `Select…` + July/Dec × 3 years |
| MA-003 | Valid search combinations (×10 data-driven) | Automated | Each search shows "Seats available!" or "Sorry, no more seats" |
| MA-004 | Search with default "Select…" values | Automated | No server error or crash |

### Story #4 – Invalid Return Dates

| ID | Scenario | Type | Expected Result |
| --- | --- | --- | --- |
| MA-005 | Return < 1 year from departure (×5 pairs) | Automated | "Unfortunately, this schedule is not possible. Please try again." |
| MA-006 | Same departure and return date (×2 pairs) | Automated | Same invalid-schedule message |
| MA-007 | Return before departure (×3 pairs) | Automated | Same invalid-schedule message |

### Story #2 – Promotional Codes

| ID | Scenario | Type | Expected Result |
| --- | --- | --- | --- |
| MA-008 | Valid promo code (×2 from story examples) | Automated | "Promotional code [code] used: [N]% discount!" |
| MA-009 | Invalid promo code (×3 variants) | Automated | "Sorry, code [code] is not valid" |
| MA-010 | Edge-case promo input (×6 variants) | Automated | Empty/whitespace → ignored; others → rejected |

### Story #3 – Link to Home Page

| ID | Scenario | Type | Expected Result |
| --- | --- | --- | --- |
| MA-011 | MarsAir logo returns to home from results | Automated | URL matches `/BuiKienTin` and home page heading visible |
| MA-012 | CTA text is visible on results page | Automated | "Book a ticket to the red planet now!" text is present |
| MA-013 | CTA navigates back to home (expected fail – BUG-001) | Automated | Should navigate but CTA is not a link |

---

## Additional Manual Scenarios

| ID | Story | Scenario | Priority | Expected Result |
| --- | --- | --- | --- | --- |
| MA-MAN-001 | #1 | Search with only departing selected | High | Validation or meaningful result without server error |
| MA-MAN-002 | #1 | Search with only returning selected | High | Same as above |
| MA-MAN-003 | #2 | Case sensitivity of promo codes | Medium | Behavior should be consistent (accept or reject, not crash) |
| MA-MAN-004 | #2 | Promo code with 0% discount digit (e.g. XX0-YYY-000) | Medium | Defined behavior – 0% discount or rejection |
| MA-MAN-005 | #3 | Logo and CTA navigation from the "Report an issue" page | Medium | Both should return to home from every page |
| MA-MAN-006 | #3 | Browser back button after navigation | Low | Consistent navigation history |
| MA-MAN-007 | General | Submit a defect via the embedded issue tracker | High | Issue accepted without errors |
| MA-MAN-008 | General | Visual consistency across Chrome, Firefox, Edge | Low | No major layout breaks |

---

## Suggested Execution Order

1. **Smoke**: Run MA-001, MA-002 to verify home page.
2. **Core flows**: Run MA-003 (valid searches) and MA-005 (invalid schedules).
3. **Business rules**: Run MA-006, MA-007 (schedule edge cases) and MA-008–MA-010 (promo codes).
4. **Navigation**: Run MA-011–MA-013.
5. **Explore**: Execute manual scenarios and log any new bugs.
