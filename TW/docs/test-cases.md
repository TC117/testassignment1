# MarsAir Test Cases

## Automated Coverage

| ID | Story | Scenario | Type | Expected Result |
| --- | --- | --- | --- | --- |
| MA-AUTO-001 | #1 | Load home page | Automated | Departure, return, promo code, search button, and key links are visible |
| MA-AUTO-002 | #1 | Verify search month options | Automated | Both dropdowns show July/December options across current year, next year, and two years from now |
| MA-AUTO-003 | #1 | Submit valid search combinations | Automated | Each valid search shows a seat availability result message |
| MA-AUTO-004 | #4 | Search with return less than one year after departure | Automated | Invalid schedule message is shown |
| MA-AUTO-005 | #2 | Submit valid promotional code | Automated | Correct discount message is shown |
| MA-AUTO-006 | #2 | Submit invalid promotional code | Automated | Invalid code message is shown and echoes the entered code |
| MA-AUTO-007 | #3 | Click MarsAir logo from results page | Automated | User returns to the home page |
| MA-AUTO-008 | #3 | Click prominent CTA from results page | Automated, expected failure | User should return to the home page |

## Additional Manual Scenarios

| ID | Story | Scenario | Priority | Expected Result |
| --- | --- | --- | --- | --- |
| MA-MAN-001 | #1 | Search with only departing selected | High | Validation or a meaningful result should be shown without server error |
| MA-MAN-002 | #1 | Search with only returning selected | High | Validation or a meaningful result should be shown without server error |
| MA-MAN-003 | #1 | Search with both fields left as Select | High | User should not see a crash or broken flow |
| MA-MAN-004 | #2 | Submit lowercase promo code | Medium | Behavior should be defined and handled consistently |
| MA-MAN-005 | #2 | Submit promo code with leading or trailing spaces | Medium | Input should be trimmed or rejected consistently |
| MA-MAN-006 | #3 | Use browser back and then logo/CTA navigation | Medium | User can reliably return to home from results |
| MA-MAN-007 | #4 | Boundary case: return exactly one year after departure | High | This should be treated as a valid schedule |
| MA-MAN-008 | General | Open Report an issue flow and submit a clear defect | High | Bug tracker accepts issue details successfully |

## Suggested Execution Order

1. Smoke the home page and search form.
2. Run invalid schedule and promo code checks.
3. Run the navigation checks.
4. Explore edge cases and document any new bugs found.
