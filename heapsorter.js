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

  swapItems(leftIdx, rightIdx) {
    let temp = this.backingArr[leftIdx];
    this.backingArr[leftIdx] = this.backingArr[rightIdx];
    this.backingArr[rightIdx] = temp;
  }
}

module.exports = Heapsorter;
