# MarsAir Notes

## Working Assumptions

- The assignment is a UI-focused QA exercise against a hosted site – no backend access.
- Playwright with **TypeScript** is the automation tool.
- The dropdowns use integer option values (`0`–`5`) mapping to July/December across three years.
- The exact seat-inventory algorithm is unknown; tests only verify that a recognised message appears.

## Acceptance-Criteria Analysis

### Story #1 – Basic Search flow

- **Covered**: departure/return fields, July/December schedule, two-year range, availability messages.
- **Gap identified**: The story says "trips for the next two years should be searchable" but does not define whether all 10 valid combinations have seats. Testing verifies a user-facing message is shown, not that seats are always available.

### Story #2 – Promotional Codes

- **Covered**: format `XX9-XXX-999`, check-digit algorithm, valid/invalid message texts.
- **Gap identified**: The story does not define behavior for empty input, whitespace, lowercase, truncated codes, or a 0% discount digit. Edge-case tests are included to explore these.
- **Note**: The previous test suite pre-annotated all promo tests as expected failures. The updated suite runs them without `test.fail()` so failures are surfaced naturally.

### Story #3 – Link to Home Page

- **Covered**: logo navigation, CTA visibility, CTA navigation attempt.
- **Bug found**: CTA is `<h3>` not `<a>` (BUG-001).
- **Typo noted**: "apperar" in story text (BUG-002).

### Story #4 – Invalid Return Dates

- **Covered**: return < 1 year, same date, return before departure.
- **Gap identified**: The story only mentions "return date is less than 1 year from departure." Same-date and reverse-date cases are implicit but not explicit, so tests cover them as exploratory edge cases.

## Test Framework Design Decisions

| Decision | Rationale |
| --- | --- |
| **TypeScript over JavaScript** | See detailed rationale below |
| Page Object Model | Keeps locators in one place; easy to update if HTML changes |
| Custom Playwright fixtures | Injects `homePage` and `resultsPage` so tests stay clean |
| Data-driven tests via `for…of` | Each data point becomes its own test – clear pass/fail per case |
| No `test.fail()` on promo tests | Let failures reveal real bugs instead of pre-annotating |
| `test.fail()` only on BUG-001 | CTA is confirmed not a link from HTML inspection |
| `generateValidPromoCode()` helper | Demonstrates understanding of the check-digit algorithm |

## Why TypeScript Instead of JavaScript?

### 1. Compile-Time Type Safety
TypeScript catches type-related bugs **at compile time** rather than at runtime. In a test automation context, this means mismatched Page Object method signatures, wrong parameter types, or missing properties are flagged immediately in the IDE — before the test suite even runs. This significantly reduces debugging time when maintaining or extending the test suite.

### 2. Better IDE Support & Developer Experience
With explicit type annotations, IDEs (VS Code, WebStorm) provide:
- **Accurate autocomplete** for Page Object methods and properties (e.g., `homePage.` instantly shows all available actions)
- **Inline documentation** via JSDoc + types on hover
- **Safe refactoring** — renaming a method or property updates all references automatically without risk of silent breakage

### 3. Self-Documenting Code
Interfaces like `SearchOptions`, `PromoCode`, and `MarsAirFixtures` serve as **living documentation** of the data shapes used in the test suite. A new team member can read the type definitions to understand the expected structure without digging through test logic.

### 4. Scalability for Larger Test Suites
As the test suite grows (more pages, more API tests, shared utilities), TypeScript's module system with `import/export` and strict type checking prevents the common JavaScript pitfalls:
- Importing a non-existent export → compile error (JS would silently return `undefined`)
- Passing wrong argument types → compile error (JS would fail only at runtime, possibly with a cryptic Playwright error)
- Inconsistent data structures across files → caught at build time

### 5. Playwright's First-Class TypeScript Support
Playwright is built with TypeScript and provides complete type definitions out of the box. Using TypeScript unlocks the **full power** of Playwright's type system — typed fixtures (`test.extend<MarsAirFixtures>`), typed config (`defineConfig`), and typed assertions — with zero additional configuration overhead.

### 6. Industry Standard for QA Automation
TypeScript has become the de facto standard for modern test automation frameworks. Most QA teams in the industry now prefer TypeScript for its balance of **JavaScript's flexibility** and **strong typing's reliability**, making the codebase more maintainable and team-friendly.
