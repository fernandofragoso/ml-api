const { getAmount, getDecimals } = require('./helpers.js');

test('getAmout 500 should return 500', () => {
  expect(getAmount(500)).toBe(500);
});

test('getAmout 99.9 should return 99', () => {
  expect(getAmount(99.9)).toBe(99);
});

test('getAmout 0.01 should return 0', () => {
  expect(getAmount(0.01)).toBe(0);
});

test('getDecimals 500 should return 0', () => {
  expect(getDecimals(500)).toBe(0);
});

test('getDecimals 99.9 should return 90', () => {
  expect(getDecimals(99.9)).toBe(90);
});

test('getDecimals 100.09 should return 9', () => {
  expect(getDecimals(100.09)).toBe(9);
});