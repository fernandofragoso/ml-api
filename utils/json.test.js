const { getAuthor, getCategoriesArray, getItemsArray, getItem } = require('./json.js');
const { itemMock, fullItemMock, categoriesMock } = require('../test/mocks.js');

test('getAuthor should return an object', () => {
  expect(typeof getAuthor()).toBe('object');
});

test('getAuthor should always return Fernando Fragoso', () => {
  expect(getAuthor().name).toEqual('Fernando');
  expect(getAuthor().lastName).toEqual('Fragoso');
});

test('getCategoriesArray should return an array with 4 categories', () => {
  expect(getCategoriesArray(categoriesMock).length).toBe(4);
});

test('getItemsArray should return an array with 1 item', () => {
  expect(getItemsArray([itemMock]).length).toBe(1);
});

test('getItem should return an object', () => {
  expect(typeof getItem(itemMock)).toBe('object');
});

test('getItem with 1 parameter should not return description and sold_quantity', () => {
  expect(getItem(itemMock).description).toBe(undefined);
  expect(getItem(itemMock).sold_quantity).toBe(undefined);
});

test('getItem with 2 params should return the description on the object', () => {
  const description = 'description'
  expect(getItem(fullItemMock, description).description).toEqual(description);
});
