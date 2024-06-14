const Heapsorter = require('../heapsorter');

describe('Heapsort', () => {
  test('can be instantiated', () => {
    const heapsort = new Heapsorter();
    expect(heapsort).toBeInstanceOf(Heapsorter);
  });

  test('validate Get Child Indices helper method calculations', () => {
    const parentIndices = [0, 1, 2, 3, 4, 5];
    const leftChildren = [1, 3, 5, 7, 9, 11];
    const rightChildren = [2, 4, 6, 8, 10, 12]; // 5 parents -> 11 nodes ttl

    const heapsort = new Heapsorter();
    let childIdx = 0;
    for (let parentIdx = 0; parentIdx < 5; parentIdx++) {
      expect(heapsort.getLeftChildIndex(parentIndices[parentIdx])).toBe(
        leftChildren[childIdx]
      );
      expect(heapsort.getRightChildIndex(parentIndices[parentIdx])).toBe(
        rightChildren[childIdx]
      );
      childIdx++;
    }
  });

  test('validate Get Parent Index helper method calculations', () => {
    const heapsorter = new Heapsorter();
    const parentIndices = [-1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
    const childIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let idx = 0; idx <= childIndices.length - 1; idx++) {
      expect(heapsorter.getParentIndex(childIndices[idx])).toBe(
        parentIndices[idx]
      );
    }

    let alreadyParentIdx = 0;
    expect(heapsorter.getParentIndex(alreadyParentIdx)).toBe(-1);
    alreadyParentIdx--;
    expect(heapsorter.getParentIndex(alreadyParentIdx)).toBe(-1);
  });

  test('heapsort properly determines if item has children in an array', () => {
    // parentIndices = [0, 1, 2];
    // note: tree node indices range is 0 - 5
    // node at idx=2 has left child only
    let maxLen = 5;
    const heapsort = new Heapsorter();

    for (let targetIdx = 0; targetIdx < 10; targetIdx++) {
      let isLeft = true;
      let isRight = !isLeft;

      if (targetIdx < 2) {
        expect(heapsort.itemHasChildInTree(targetIdx, maxLen, isLeft)).toBe(
          true
        );
        expect(heapsort.itemHasChildInTree(targetIdx, maxLen, isRight)).toBe(
          true
        );
      }
      if (targetIdx == 2) {
        expect(heapsort.itemHasChildInTree(targetIdx, maxLen, isLeft)).toBe(
          true
        );
        expect(heapsort.itemHasChildInTree(targetIdx, maxLen, isRight)).toBe(
          false
        );
      }
      if (targetIdx > 2) {
        expect(heapsort.itemHasChildInTree(targetIdx, maxLen, isLeft)).toBe(
          false
        );
        expect(heapsort.itemHasChildInTree(targetIdx, maxLen, isRight)).toBe(
          false
        );
      }
    }
  });

  test('input array is a heap', () => {
    const alphaArr = [1, 2, 3, 4, 5]; // false
    const bravoArr = [5, 4, 3, 2, 1]; // true
    const charlieArr = [15, 11, 10, 7, 5, 9, 2, 6, 4, 3, 1, 8]; // true
    const deltaArr = [7, 1, 10, 4, 6, 9, 2, 11, 3, 5, 12, 8]; // false
    const echoArr = [3]; // true
    const foxtrotArr = [10, 5]; //true
    const golfArr = [10, 5, 1]; //true
    const sut = new Heapsorter();

    expect(sut.isHeap(alphaArr)).toBe(false);
    expect(sut.isHeap(bravoArr)).toBe(true);
    expect(sut.isHeap(charlieArr)).toBe(true);
    expect(sut.isHeap(deltaArr)).toBe(false);
    expect(sut.isHeap(echoArr)).toBe(true);
    expect(sut.isHeap(foxtrotArr)).toBe(true);
    expect(sut.isHeap(golfArr)).toBe(true);
  });

  test('create new heap and add items, maintaining heap with every add', () => {
    const sut = new Heapsorter();
    sut.addItemToHeap(15);
    expect(sut.isHeap(sut.backingArr)).toBe(true);
    expect(sut.backingArr).toStrictEqual([15]);

    const alphaResult = [15, 10];
    sut.addItemToHeap(10);
    expect(sut.backingArr).toStrictEqual(alphaResult);

    const bravoResult = [15, 10, 5];
    sut.addItemToHeap(5);
    expect(sut.backingArr).toStrictEqual(bravoResult);

    const charlieResult = [25, 15, 20, 10, 0, 5];
    sut.addItemToHeap(20);
    sut.addItemToHeap(0);
    sut.addItemToHeap(25);
    expect(sut.backingArr).toStrictEqual(charlieResult);
    expect(sut.isHeap(sut.backingArr)).toBe(true);
  });

  test('swap items in backing array', () => {
    const expectedArr = [0, 1, 2, 3, 4];
    const sut = new Heapsorter();
    sut.backingArr = [0, 3, 2, 1, 4];
    sut.swapItems(1, 3);
    expect(sut.backingArr).toStrictEqual(expectedArr);
  });
});
