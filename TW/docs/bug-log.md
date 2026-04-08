# MarsAir Bug Log Backup

This file is a local backup of issues found while testing. The intent is to also log confirmed defects in the embedded tracker inside the application.

## BUG-001: Prominent CTA is not implemented as a home link

- Severity: Medium
- Story: #3 Link to Home Page
- Status: Reproduced from the supplied home page markup

### Steps

1. Open the MarsAir home page.
2. Inspect the prominent text `Book a ticket to the red planet now!`.
3. Try to identify or use it as a home navigation link.

### Expected

The prominent CTA should be clickable and take the user to the home page from anywhere on the site.

### Actual

The CTA is rendered as plain heading text rather than a link, so it cannot be clicked for navigation.

### Evidence

- Home page markup shows the CTA as `<h3>Book a ticket to the red planet now!</h3>` instead of an anchor element.

## BUG-002: Results and edge-case behavior need live verification

- Severity: TBD
- Story: #1, #2, #4
- Status: Open investigation

### Notes

- The user stories define exact result messages for availability, promo validation, and invalid schedules.
- These paths should be confirmed against the live site during execution and then logged in the embedded tracker if the actual behavior differs from the stories.
- The automated suite already includes those checks so failures can be used as fast evidence during the interview.
