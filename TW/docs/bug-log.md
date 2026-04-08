# MarsAir Bug Log

This file is a local backup of issues found during testing. Confirmed defects should also be logged in the embedded tracker inside the application.

---

## BUG-001: Prominent CTA is missing / not a link

- **Severity**: High
- **Story**: #3 – Link to Home Page
- **Status**: Confirmed
- **Tests**: MA-012 ✗, MA-013 ✗

### Acceptance Criteria Reference

> "Book a ticket to the red planet now!" should appear somewhere prominent on the page.
> Clicking it takes the user to the home page.

### Steps to Reproduce

1. Open MarsAir home page.
2. Perform any valid search (e.g. July → July next year).
3. On the results page, look for "Book a ticket to the red planet now!".

### Expected

The CTA text is visible and is a clickable link (`<a>`) that navigates back to the home page.

### Actual

- **MA-012 failed**: The CTA text is **not visible at all** on the results page.
- **MA-013 failed**: Since the element doesn't exist as a link, clicking it throws an error.
- On the home page, it is rendered as `<h3>` plain text, not as a link.

### Impact

Customers have no prominent call-to-action to book or navigate back. Only the MarsAir logo and browser back button work. This directly violates the acceptance criteria for Story #3.

---

## BUG-002: Promotional code validation is non-functional

- **Severity**: Critical
- **Story**: #2 – Promotional Codes
- **Status**: Confirmed
- **Tests**: MA-008 ✗, MA-009 ✗, MA-010 (4/6 ✗)

### Acceptance Criteria Reference

> Valid code → "Promotional code [code] used: [N]% discount!"
> Invalid code → "Sorry, code [code] is not valid"

### Steps to Reproduce

1. Open MarsAir home page.
2. Select a valid search (July → July next year).
3. Enter promo code `AF3-FJK-418` (valid, 30% discount per story).
4. Click Search.

### Expected

Results page shows: "Promotional code AF3-FJK-418 used: 30% discount!"

### Actual

No promotional code message is displayed at all. The same behavior occurs for:
- Valid codes: `AF3-FJK-418`, `JJ5-OPQ-320` → no discount message
- Invalid codes: `AF3-FJK-419`, `NOT-A-CODE`, `XX0-YYY-001` → no rejection message
- Edge cases: lowercase, spaces, truncated codes → no rejection message
- Empty/whitespace codes → correctly ignored (MA-010 passed for these)

### Impact

The entire promo code feature appears to be unimplemented or broken. Customers cannot use any promotional discounts, defeating the purpose of Story #2.

---

## BUG-003: Same departure and return date not handled as invalid

- **Severity**: Medium
- **Story**: #4 – Invalid Return Dates
- **Status**: Confirmed
- **Tests**: MA-006 ✗ (both variants)

### Acceptance Criteria Reference

> "Unfortunately, this schedule is not possible. Please try again." displayed when return date is less than 1 year from the departure.

### Steps to Reproduce

1. Open MarsAir home page.
2. Select departure: July, return: July (same option).
3. Click Search.

### Expected

"Unfortunately, this schedule is not possible. Please try again." — because 0 months is less than 1 year.

### Actual

The invalid schedule message is **not displayed**. The application shows a different result instead of rejecting the schedule.

### Affected Combinations

- July → July (same) ✗
- December → December (same) ✗

---

## BUG-004: Return date before departure not handled as invalid

- **Severity**: Medium
- **Story**: #4 – Invalid Return Dates
- **Status**: Confirmed
- **Tests**: MA-007 ✗ (all 3 variants)

### Acceptance Criteria Reference

> "Unfortunately, this schedule is not possible. Please try again." displayed when return date is less than 1 year from the departure.

### Steps to Reproduce

1. Open MarsAir home page.
2. Select departure: July (next year), return: July (current year).
3. Click Search.

### Expected

"Unfortunately, this schedule is not possible. Please try again." — returning before departing is logically invalid (negative gap).

### Actual

The invalid schedule message is **not displayed**. The application does not prevent booking a return flight that happens before departure.

### Affected Combinations

- July+1yr → July (−12 months) ✗
- July+1yr → December (−7 months) ✗
- December+1yr → December (−12 months) ✗

---

## BUG-005: One valid search pair shows no seats

- **Severity**: Low
- **Story**: #1 – Basic Search flow
- **Status**: Confirmed
- **Tests**: MA-003 ✗ (1 of 10 variants)

### Steps to Reproduce

1. Open MarsAir home page.
2. Select departure: July, return: December (two years from now).
3. Click Search.

### Expected

One of the recognized availability messages should appear:
- "Seats available! Call 0800 MARSAIR to book!"
- "Sorry, there are no more seats available."

### Actual

Neither standard availability message is displayed. The result page may show unexpected content or a blank result.

### Note

9 out of 10 valid search pairs work correctly. Only July → December (two years from now) fails. This may be an inventory data issue or a boundary calculation error.

---

## BUG-006: Typo in Story #3 acceptance criteria

- **Severity**: Low (documentation only)
- **Story**: #3 – Link to Home Page
- **Status**: Noted

### Details

The story text reads: *"should **apperar** somewhere prominent"* — should be "appear". Not a code defect, but worth noting for documentation quality.

---

## Summary

| Bug | Severity | Story | Status |
| --- | --- | --- | --- |
| BUG-001 | High | #3 | CTA missing/not a link on results page |
| BUG-002 | Critical | #2 | Promo code feature entirely non-functional |
| BUG-003 | Medium | #4 | Same-date schedule not rejected |
| BUG-004 | Medium | #4 | Return-before-departure not rejected |
| BUG-005 | Low | #1 | 1/10 valid search shows no availability message |
| BUG-006 | Low | #3 | Typo "apperar" in story text |
