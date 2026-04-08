# MarsAir Test Approach

## Objective

Validate the highest-risk user journeys in the first MarsAir release:

- searching for flights
- handling invalid schedules
- validating promotional codes
- navigating back to the home page

## Scope

Primary focus:

- user stories 1 to 4 from the assignment
- core happy paths and the most important negative paths
- obvious usability and functional defects visible through the public UI

Out of scope for this pack:

- performance or load testing
- accessibility auditing beyond obvious smoke checks
- browser matrix execution across multiple engines
- any backend or database validation, because the assignment only exposes the public website

## Strategy

I used a risk-based approach:

1. Cover the core booking flow first.
2. Add negative coverage where the stories define explicit business rules.
3. Capture known defects in a local bug log and reflect them in the automated suite when useful.
4. Keep the implementation small enough to explain comfortably during an interview.

## Why Playwright

- Fast to set up for a live hosted site
- Clear locators and assertions for form-based UI testing
- Good failure evidence through HTML reports, screenshots, video, and traces
- Easy to demo and extend during a pairing session

## Coverage Notes

- The schedule tests are data-driven because the business rules are discrete and calendar-based.
- Promotional code tests use both valid and invalid examples directly from the story description.
- Availability tests confirm the site returns a customer-facing seat result for valid searches, while the exact seat inventory rules are treated as application behavior to be explored further.
