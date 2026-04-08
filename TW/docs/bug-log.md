# MarsAir Bug Log

This file is a local backup of issues found during testing. Confirmed defects should also be logged in the embedded tracker inside the application.

---

## BUG-001: Prominent CTA is missing on results page and not a link anywhere

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

The CTA text is visible **on every page** and is a clickable link (`<a>`) that navigates back to the home page.

### Actual

- **Results page**: The CTA text does **not appear at all**. Only "Back" (browser history) is shown.
- **Home page**: The CTA exists as `<h3>Book a ticket to the red planet now!</h3>` — plain heading text, not a link.
- Two issues: (1) missing from results page, (2) not clickable even where present.

### Impact

Customers have no prominent call-to-action to navigate back from search results. Only the MarsAir logo and browser back button work.

---

## BUG-002: Availability message text differs from acceptance criteria

- **Severity**: Low
- **Story**: #1 – Basic Search flow
- **Status**: Confirmed

### Acceptance Criteria Reference

> If there are seats, display "Seats available! Call 0800 MARSAIR to book!"

### Expected

A single message: `Seats available! Call 0800 MARSAIR to book!`

### Actual

The message is split into separate paragraphs with different wording:
- `<p>Seats available!</p>`
- `<p>Call now on 0800 MARSAIR to book!</p>`

Differences:
1. Split across two `<p>` tags instead of one message
2. Extra words: "Call **now on** 0800 MARSAIR" instead of "Call 0800 MARSAIR"

### Impact

Minor — the intent is communicated, but the text does not match the exact acceptance criteria.

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

"Unfortunately, this schedule is not possible. Please try again." — 0 months gap is less than 1 year.

### Actual

The invalid schedule message is **not displayed**. The app treats same-date as a valid search.

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

"Unfortunately, this schedule is not possible. Please try again." — returning before departing is logically invalid.

### Actual

The invalid schedule message is **not displayed**. The app accepts a return trip scheduled before departure.

### Affected Combinations

- July+1yr → July (−12 months) ✗
- July+1yr → December (−7 months) ✗
- December+1yr → December (−12 months) ✗

---

## BUG-005: Typo in Story #3 acceptance criteria

- **Severity**: Low (documentation only)
- **Story**: #3 – Link to Home Page
- **Status**: Noted

### Details

The story text reads: *"should **apperar** somewhere prominent"* — should be "appear". Not a code defect, but worth noting.

---

## BUG-006: Promo validation appears hardcoded — only the story example code is accepted

- **Severity**: Critical
- **Story**: #2 – Promotional Codes
- **Status**: Confirmed
- **Tests**: MA-008 (4 of 5 valid codes) ✗

### Acceptance Criteria Reference

> Promotional codes are in the format XX9-XXX-999.
> The first digit indicates the discount percentage (2 = 20%, 3 = 30% etc).
> The final digit is a check digit; it is equal to the sum of all other digits modulo 10.

### Steps to Reproduce

1. Open MarsAir home page.
2. Select a valid search with seats available.
3. Enter a valid promo code that follows the algorithm but is NOT from the story examples.
4. Click Search.

### Expected

The discount message should appear for **any** code that satisfies the XX9-XXX-999 format with a correct check digit.

### Actual

Only `AF3-FJK-418` (the first example from the story) is accepted. All other algorithmically valid codes are silently ignored — no discount message and no rejection message.

### Evidence

| Code | Discount | Check digit | Valid per algorithm? | Result |
| --- | --- | --- | --- | --- |
| `AF3-FJK-418` | 30% | 8 | ✅ 3+4+1=8 | ✅ **Accepted** |
| `JJ5-OPQ-320` | 50% | 0 | ✅ 5+3+2=10→0 | ❌ Ignored |
| `AB2-CDE-134` | 20% | 6 | ✅ 2+1+3=6 | ❌ Ignored |
| `ZZ5-ABC-500` | 50% | 0 | ✅ 5+5+0=10→0 | ❌ Ignored |
| `AA9-BBB-111` | 90% | 1 | ✅ 9+1+1=11→1 | ❌ Ignored |

### Root Cause Analysis

The pattern strongly suggests the promo validation is **hardcoded** to accept only the specific example code(s) listed in the story, rather than implementing the general check-digit algorithm described in the acceptance criteria. Key evidence:

1. Three different non-zero check digits (6, 1, 8) were tested — only the story example works.
2. The failure is not limited to check digit 0 — it affects ALL codes except `AF3-FJK-418`.
3. Failed codes are silently ignored (no rejection message), suggesting they don't go through validation at all.

### Impact

The promotional code system is fundamentally broken. Only one specific code works. Any new promo codes distributed to customers will not function, making the entire promo distribution strategy unusable.

---

## BUG-007: Promo code validation is case-sensitive with silent failure

- **Severity**: Medium
- **Story**: #2 – Promotional Codes
- **Status**: Confirmed
- **Tests**: MA-010 (lowercase) ✗

### Acceptance Criteria Reference

> Promotional codes are in the format XX9-XXX-999.
> Characters are all random.

### Steps to Reproduce

1. Open MarsAir home page.
2. Select a valid search with seats available.
3. Enter promo code `af3-fjk-418` (lowercase version of the only working code).
4. Click Search.

### Expected

Either:
- Accept the code (case-insensitive validation) — better UX, or
- Show rejection message: "Sorry, code af3-fjk-418 is not valid"

### Actual

The code is silently ignored — no discount message AND no rejection message. The customer gets zero feedback.

### Impact

Even the one working promo code fails if a customer types it in lowercase. Combined with BUG-006, this further limits the already broken promo system.

---

## BUG-008: Promo codes with 0% discount digit are silently ignored

- **Severity**: Low
- **Story**: #2 – Promotional Codes
- **Status**: Confirmed
- **Tests**: MA-010 (0% discount variants) ✗

### Acceptance Criteria Reference

> The first digit indicates the discount percentage (2 = 20%, 3 = 30% etc).

### Steps to Reproduce

1. Open MarsAir home page.
2. Select a valid search with seats available.
3. Enter promo code `AA0-BBB-011` (discount digit 0, valid check digit 1).
4. Click Search.

### Expected

Either:
- Accept and show: "Promotional code AA0-BBB-011 used: 0% discount!", or
- Reject with message: "Sorry, code AA0-BBB-011 is not valid"

The AC does not define whether 0% is a valid discount. Either behavior is acceptable, but the app should provide feedback.

### Actual

The code is silently ignored — no message at all.

### Note

This is likely a subset of BUG-006 (hardcoded validation). If the algorithm were properly implemented, the behavior for 0% discount would need a business decision: accept or reject.

### Affected Codes

- `AA0-BBB-011` (0% discount, check digit 1) ✗
- `AA0-BBB-000` (0% discount, check digit 0) ✗

---

## Summary

| Bug | Severity | Story | Description |
| --- | --- | --- | --- |
| BUG-001 | High | #3 | CTA missing on results page + not a link on home page |
| BUG-002 | Low | #1 | Availability message text differs from AC |
| BUG-003 | Medium | #4 | Same-date schedule not rejected as invalid |
| BUG-004 | Medium | #4 | Return-before-departure not rejected as invalid |
| BUG-005 | Low | #3 | Typo "apperar" in story text |
| BUG-006 | **Critical** | #2 | Promo validation hardcoded — only story example accepted |
| BUG-007 | Medium | #2 | Lowercase promo codes silently ignored |
| BUG-008 | Low | #2 | 0% discount codes silently ignored |
