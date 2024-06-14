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

  getValueAsNumber(inputNum) {
    if (typeof inputNum === 'number') {
      return Number(inputNum);
    } else {
      return undefined;
    }
  }

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

  removeTopItemOld() {
    // Note: if backing array is empty shift returns undefined
    // use shift to remove zeroeth index from array
    const topItem = this.backingArr.shift();
    if (topItem !== undefined) {
      // compare new Head to its children and swap it with largest value
      // continue through descendants until leaf node is reached then return topItem
      let parentIdx = 0;
      let maxIdx = this.backingArr.length - 1;

      while (this.itemHasChildInTree(parentIdx, maxIdx, true)) {
        let selectedChildIdx = this.getLeftChildIndex(parentIdx);

        if (this.itemHasChildInTree(parentIdx, maxIdx, false)) {
          let rightIdx = this.getRightChildIndex(parentIdx);
          selectedChildIdx =
            this.backingArr[selectedChildIdx] > this.backingArr[rightIdx]
              ? selectedChildIdx
              : rightIdx;
        }

        if (this.backingArr[parentIdx] < this.backingArr[selectedChildIdx]) {
          this.swapItems(parentIdx, selectedChildIdx);
        }
        parentIdx = selectedChildIdx;
      }
    }

    return topItem;
  }

  swapItems(leftIdx, rightIdx) {
    let temp = this.backingArr[leftIdx];
    this.backingArr[leftIdx] = this.backingArr[rightIdx];
    this.backingArr[rightIdx] = temp;
  }
}

module.exports = Heapsorter;
