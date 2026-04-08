# MarsAir Notes

## Working Assumptions

- The assignment should be treated as a UI-focused QA exercise against the hosted site.
- Playwright is sufficient for demonstrating automated coverage in the interview.
- Existing files outside `TW` are unrelated and intentionally left untouched.

## Observations

- The application is intentionally simple, which makes business-rule accuracy more important than UI complexity.
- The user stories are strong enough to derive meaningful negative coverage, especially around invalid schedules and promo codes.
- The seat inventory rules are not fully described in the stories, so availability outcomes need to be learned from the running system.

## Interview Talking Points

- Why I prioritized story coverage over broad exploratory automation
- How I separated confirmed defects from open questions
- How I would extend this into a maintainable regression suite
- What additional checks I would add if I had direct API or backend access

## Open Questions

- What are the exact seat-availability rules behind the search results?
- Should promo code validation be case-sensitive?
- How should incomplete searches be handled when one or both dates are left as `Select...`?
