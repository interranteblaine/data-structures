const MaxBinaryHeap = require("./max-binary-heap");

describe("Max Binary Heaps >", () => {
  let maxHeap = new MaxBinaryHeap();

  test(`insert should place a value in the tree appropriately`, () => {
    maxHeap.insert(2);
    maxHeap.insert(7);
    maxHeap.insert(3);
    maxHeap.insert(25);
    maxHeap.insert(1);
    maxHeap.insert(17);
    maxHeap.insert(3);
    maxHeap.insert(19);
    maxHeap.insert(100);
    maxHeap.insert(26);
    expect(maxBinaryHeapCheck(maxHeap.values)).toBe(true);
  });

  test(`extractMax should return the node with the lowest priorty `, () => {
    expect(maxHeap.extractMax()).toBe(100);
    expect(maxHeap.extractMax()).toBe(26);
    expect(maxBinaryHeapCheck(maxHeap.values)).toBe(true);
  });
});

function maxBinaryHeapCheck(values) {
  let test = true;
  for (let i = values.length - 1; i > 0; i--) {
    let parentIdx = Math.floor((i - 1) / 2);
    if (!(values[parentIdx] > values[i])) test = false;
  }
  return test;
}
