class Heapsorter {
  constructor() {
    this.backingArr = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIdx) {
    let childIdxNum = this.getValueAsNumber(childIdx);
    if (childIdxNum < 1) {
      return -1;
    }

    let result = Math.floor((childIdxNum - 1) / 2);
    return result;
  }

  /**
   * Checks if an item has a child in a tree given its index and the maximum index.
   * @param {number} itemIdx - The index of the item.
   * @param {number} maxIdx - The maximum index in the tree.
   * @param {boolean} [left=true] - Indicates whether to check for the left child (default) or the right child.
   * @returns {boolean|undefined} - Returns true if the item has a child, false if not, or undefined if the input is invalid.
   */
  itemHasChildInTree(itemIdx, maxIdx, left = true) {
    let itemIdxNum = this.getValueAsNumber(itemIdx);
    let maxIdxNum = this.getValueAsNumber(maxIdx);

    if (itemIdxNum === undefined || maxIdxNum === undefined) {
      return undefined;
    }

    let childNum = left ? 1 : 2;
    let maxChildIdx = 2 * itemIdxNum + childNum;
    return maxChildIdx <= maxIdxNum;
  }

  /**
   * Converts the input number to a numeric value.
   * @param {any} inputNum - The input number to be converted.
   * @returns {number|undefined} - The converted numeric value or undefined if the input is not a number.
   */
  getValueAsNumber(inputNum) {
    if (typeof inputNum === 'number') {
      return Number(inputNum);
    } else {
      return undefined;
    }
  }

  /**
   * Checks if the given array represents a valid heap.
   * Runs in O(n) time. Exists primarily as a way to test for Heapiness.
   * @param {Array} inpArr - The input array to be checked.
   * @returns {boolean} - Returns true if the array is a valid heap, false otherwise.
   */
  isHeap(inpArr) {
    let maxIdx = inpArr.length - 1;
    let currIdx = 0;
    // if node has no left child it is a heap
    while (this.itemHasChildInTree(currIdx, maxIdx) && currIdx <= maxIdx) {
      // check left child value first because there is one
      let leftIdx = this.getLeftChildIndex(currIdx);
      if (inpArr[currIdx] < inpArr[leftIdx]) {
        return false;
      }

      // node has both children that need to be value checked
      let rightIdx = this.getRightChildIndex(currIdx);
      if (rightIdx <= maxIdx) {
        if (inpArr[currIdx] < inpArr[rightIdx]) {
          // either child has value greater than its parent
          return false;
        }
      }

      currIdx++;
    }

    return true;
  }

  /**
   * Adds a new item to the heap and maintains the heap
   * property by comparing the new value with its parent.
   * @param {number} number - The number to be added to the heap.
   */
  addItemToHeap(number) {
    let num = this.getValueAsNumber(number);
    // add the new value to the end of the heap
    this.backingArr.push(num);
    // compare the new value to its parent, swap if new is GT parent
    let numIdx = this.backingArr.length - 1;
    let parentIdx = this.getParentIndex(numIdx);

    while (parentIdx > -1) {
      if (this.backingArr[numIdx] > this.backingArr[parentIdx]) {
        this.swapItems(numIdx, parentIdx);
      }
      numIdx = parentIdx;
      parentIdx = this.getParentIndex(numIdx);
    }
  }

  /**
   * Removes and returns the top item
   * while maintaining heap property.
   * @returns {*} The top item of the heap.
   */
  removeTopItem() {
    if (this.backingArr.length < 1) {
      return;
    }
    if (this.backingArr.length == 1) {
      return this.backingArr.pop();
    }

    const topItem = this.backingArr[0];
    this.backingArr[0] = this.backingArr.pop();
    let maxIdx = this.backingArr.length - 1;
    let parentIdx = 0;
    // if head value is less than either of its child node values
    // swap it will the larger child value
    while (this.itemHasChildInTree(parentIdx, maxIdx, true)) {
      // parent has a left child at least now check for right child
      let selectedIdx = this.getLeftChildIndex(parentIdx);
      if (this.itemHasChildInTree(parentIdx, maxIdx, false)) {
        let rightIdx = this.getRightChildIndex(parentIdx);
        selectedIdx =
          this.backingArr[selectedIdx] > this.backingArr[rightIdx]
            ? selectedIdx
            : rightIdx;
      }
      if (this.backingArr[selectedIdx] > this.backingArr[parentIdx]) {
        this.swapItems(selectedIdx, parentIdx);
      }
      parentIdx = selectedIdx;
    }
    return topItem;
  }

  /**
   * Sorts an array using the heapsort algorithm.
   *
   * @param {Array} inputArr - The array to be sorted.
   * @returns {Array} - The sorted array.
   */
  static heapsort(inputArr) {
    // validate input is an array
    if (Array.isArray(inputArr) !== true) {
      return [];
    }

    // track decrementing lastIdx
    for (let lastIdx = inputArr.length - 1; lastIdx > 0; lastIdx--) {
      // heapify the input array
      inputArr = Heapsorter.makeHeap(inputArr, lastIdx);

      // swap head and last item
      inputArr = Heapsorter.swapItemsInArr(inputArr, 0, lastIdx);
      // repeat steps until only idx 0 remains
    }
    // return the heapsorted array
    return inputArr;
  }

  /**
   * Converts an input array into a max heap.
   *
   * @param {Array} inpArr - The input array to be converted into a max heap.
   * @param {number} endIdx - The index of the last element in the input array.
   * @returns {Array} - The input array converted into a max heap.
   */
  static makeHeap(inpArr, endIdx) {
    if (endIdx <= 0) {
      return inpArr;
    }

    let firstIdx = 0;

    if (Array.isArray(inpArr)) {
      for (let childIdx = endIdx; childIdx >= firstIdx; childIdx--) {
        let parentIdx = Math.floor((childIdx - 1) / 2);
        // work from leaf nodes to root
        if (inpArr[childIdx] > inpArr[parentIdx]) {
          inpArr = Heapsorter.swapItemsInArr(inpArr, childIdx, parentIdx);
        }
      }
      return inpArr;
    }
    return [];
  }

  /**
   * Swaps two items in an array.
   *
   * @param {Array} arrIn - The input array.
   * @param {number} leftIdx - The index of the first item to swap.
   * @param {number} rightIdx - The index of the second item to swap.
   * @returns {Array} - The array with the swapped items.
   */
  static swapItemsInArr(arrIn, leftIdx, rightIdx) {
    let temp = arrIn[leftIdx];
    arrIn[leftIdx] = arrIn[rightIdx];
    arrIn[rightIdx] = temp;
    return arrIn;
  }

  /**
   * Swaps the items at the given indices in the backing array.
   *
   * @param {number} leftIdx - The index of the first item to swap.
   * @param {number} rightIdx - The index of the second item to swap.
   */
  swapItems(leftIdx, rightIdx) {
    let temp = this.backingArr[leftIdx];
    this.backingArr[leftIdx] = this.backingArr[rightIdx];
    this.backingArr[rightIdx] = temp;
  }
}

module.exports = Heapsorter;
