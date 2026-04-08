/**
 * Shared test data for MarsAir automated tests.
 *
 * Select-option values map to the search-form dropdowns:
 *   0 = July (current year)
 *   1 = December (current year)
 *   2 = July (next year)
 *   3 = December (next year)
 *   4 = July (two years from now)
 *   5 = December (two years from now)
 */

// ── Dropdown options (Story #1) ──────────────────────────────────────
const ALL_MONTH_OPTIONS = [
  'Select...',
  'July',
  'December',
  'July (next year)',
  'December (next year)',
  'July (two years from now)',
  'December (two years from now)',
];

// ── Story #1: Valid search pairs (return >= 1 year from departure) ───
const VALID_SEARCH_PAIRS = [
  { departing: '0', returning: '2', label: 'July → July+1yr (boundary 12mo)' },
  { departing: '0', returning: '3', label: 'July → Dec+1yr (18mo)' },
  { departing: '0', returning: '4', label: 'July → July+2yr (24mo)' },
  { departing: '0', returning: '5', label: 'July → Dec+2yr (30mo)' },
  { departing: '1', returning: '3', label: 'Dec → Dec+1yr (boundary 12mo)' },
  { departing: '1', returning: '4', label: 'Dec → July+2yr (19mo)' },
  { departing: '1', returning: '5', label: 'Dec → Dec+2yr (24mo)' },
  { departing: '2', returning: '4', label: 'July+1yr → July+2yr (12mo)' },
  { departing: '2', returning: '5', label: 'July+1yr → Dec+2yr (18mo)' },
  { departing: '3', returning: '5', label: 'Dec+1yr → Dec+2yr (12mo)' },
];

// ── Story #4: Invalid – return less than 1 year after departure ──────
const INVALID_SCHEDULES = [
  { departing: '0', returning: '1', label: 'July → Dec (6mo gap)' },
  { departing: '1', returning: '2', label: 'Dec → July+1yr (7mo gap)' },
  { departing: '2', returning: '3', label: 'July+1yr → Dec+1yr (6mo gap)' },
  { departing: '3', returning: '4', label: 'Dec+1yr → July+2yr (7mo gap)' },
  { departing: '4', returning: '5', label: 'July+2yr → Dec+2yr (6mo gap)' },
];

// ── Story #4 edge: same departure and return (0 gap) ────────────────
const SAME_DATE_SCHEDULES = [
  { departing: '0', returning: '0', label: 'July → July (same)' },
  { departing: '1', returning: '1', label: 'Dec → Dec (same)' },
];

// ── Story #4 edge: return before departure (negative gap) ───────────
const REVERSE_SCHEDULES = [
  { departing: '2', returning: '0', label: 'July+1yr → July (−12mo)' },
  { departing: '2', returning: '1', label: 'July+1yr → Dec (−7mo)' },
  { departing: '3', returning: '1', label: 'Dec+1yr → Dec (−12mo)' },
];

// ── Story #2: Valid promo codes (examples from acceptance criteria) ──
const VALID_PROMO_CODES = [
  { code: 'AF3-FJK-418', discount: 30 },  // 3 + 4 + 1 = 8  ✓
  { code: 'JJ5-OPQ-320', discount: 50 },  // 5 + 3 + 2 = 10 → 0  ✓
];

// ── Story #2: Clearly invalid promo codes ───────────────────────────
const INVALID_PROMO_CODES = [
  { code: 'AF3-FJK-419', label: 'wrong check digit (8 expected, 9 given)' },
  { code: 'NOT-A-CODE',  label: 'wrong format entirely' },
  { code: 'XX0-YYY-001', label: 'valid format, wrong check digit (0+0+1≠0)' },
];

// ── Story #2: Edge-case promo codes ─────────────────────────────────
const EDGE_CASE_PROMO_CODES = [
  { code: '',              label: 'empty string' },
  { code: '   ',           label: 'whitespace only' },
  { code: 'af3-fjk-418',  label: 'lowercase valid code' },
  { code: ' AF3-FJK-418 ', label: 'leading/trailing spaces' },
  { code: 'AF3-FJK',      label: 'truncated – missing last segment' },
  { code: 'AF3-FJK-41',   label: 'missing check digit' },
];

// ── Helper: generate a valid promo code by the story algorithm ──────
function generateValidPromoCode(discountDigit = 3) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const pick = () => letters[Math.floor(Math.random() * 26)];
  const d1 = Math.floor(Math.random() * 10);
  const d2 = Math.floor(Math.random() * 10);
  const checkDigit = (discountDigit + d1 + d2) % 10;

  return {
    code: `${pick()}${pick()}${discountDigit}-${pick()}${pick()}${pick()}-${d1}${d2}${checkDigit}`,
    discount: discountDigit * 10,
  };
}

module.exports = {
  ALL_MONTH_OPTIONS,
  EDGE_CASE_PROMO_CODES,
  INVALID_PROMO_CODES,
  INVALID_SCHEDULES,
  REVERSE_SCHEDULES,
  SAME_DATE_SCHEDULES,
  VALID_PROMO_CODES,
  VALID_SEARCH_PAIRS,
  generateValidPromoCode,
};
