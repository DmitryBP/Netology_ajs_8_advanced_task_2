import ErrorRepository from '../js/app.js';

test('should add new error code', () => {
  const errorRepository1 = new ErrorRepository();
  errorRepository1.errorList.set(201, 'Некая ошибка 201');

  expect(errorRepository1.errorList.has(201)).toBeTruthy();
});

test('should return error text', () => {
  const errorRepository2 = new ErrorRepository();
  errorRepository2.errorList.set(202, 'Некая ошибка 202');
  const result = 'Некая ошибка 202';

  expect(errorRepository2.translate(202)).toBe(result);
});

test('should throw new Error', () => {
  const errorRepository3 = new ErrorRepository();
  expect(() => errorRepository3.translate(207)).toThrow();
});
