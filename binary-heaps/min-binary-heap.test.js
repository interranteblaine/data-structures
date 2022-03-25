const MinBinaryHeap = require("./min-binary-heap");

describe("Min Binary Heaps >", () => {
  let minHeap = new MinBinaryHeap();

  test(`insert should place a value in the tree appropriately`, () => {
    minHeap.insert(2);
    minHeap.insert(7);
    minHeap.insert(3);
    minHeap.insert(25);
    minHeap.insert(1);
    minHeap.insert(17);
    minHeap.insert(19);
    minHeap.insert(100);
    minHeap.insert(26);
    expect(minBinaryHeapCheck(minHeap.values)).toBe(true);
  });

  test(`extractMin should return the node with the lowest priorty `, () => {
    expect(minHeap.extractMin()).toBe(1);
    expect(minHeap.extractMin()).toBe(2);
    expect(minBinaryHeapCheck(minHeap.values)).toBe(true);
  });
});

function minBinaryHeapCheck(values) {
  let test = true;
  for (let i = values.length - 1; i > 0; i--) {
    let parentIdx = Math.floor((i - 1) / 2);
    if (!(values[parentIdx] < values[i])) test = false;
  }
  return test;
}
