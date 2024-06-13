const Heapsort = require('../heapsort');

describe('Heapsort', () => {
  test('can be instantiated', () => {
    const inputArray = [4, 2, 6, 1, 3, 5, 7];
    const heapsort = new Heapsort(inputArray);
    expect(heapsort).toBeInstanceOf(Heapsort);
    expect(heapsort.inputArr.length).toBe(inputArray.length);
  });
});
