const VALID_PROMO_CODES = [
  { code: 'AF3-FJK-418', discount: 30 },
  { code: 'JJ5-OPQ-320', discount: 50 },
];

const INVALID_PROMO_CODES = [
  'AF3-FJK-419',
  'NOT-A-CODE',
];

const INVALID_SCHEDULES = [
  { departing: '0', returning: '1', departingLabel: 'July', returningLabel: 'December' },
  { departing: '1', returning: '2', departingLabel: 'December', returningLabel: 'July (next year)' },
  { departing: '2', returning: '3', departingLabel: 'July (next year)', returningLabel: 'December (next year)' },
];

const VALID_SEARCH_PAIRS = [
  ['0', '2'],
  ['0', '3'],
  ['1', '3'],
  ['1', '4'],
  ['2', '4'],
  ['2', '5'],
  ['3', '5'],
];

const ALL_MONTH_OPTIONS = [
  'Select...',
  'July',
  'December',
  'July (next year)',
  'December (next year)',
  'July (two years from now)',
  'December (two years from now)',
];

module.exports = {
  ALL_MONTH_OPTIONS,
  INVALID_PROMO_CODES,
  INVALID_SCHEDULES,
  VALID_PROMO_CODES,
  VALID_SEARCH_PAIRS,
};
