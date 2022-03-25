const PriorityQueue = require("./naive-priority-queue");

describe("Naive Priority Queue >", () => {
  let pq = new PriorityQueue();

  test(`enqueue should create add and places it based on priority`, () => {
    pq.enqueue("Cat", 2);
    pq.enqueue("Bunny", 4);
    pq.enqueue("Snake", 6);
    pq.enqueue("Lizzard", 5);
    pq.enqueue("Dog", 1);
    pq.enqueue("Fish", 3);
    expect(minBinaryHeapCheck(pq.values)).toBe(true);
  });

  test(`dequeue should return the node with the lowest priorty `, () => {
    expect(pq.dequeue().val).toBe("Dog");
    expect(pq.dequeue().val).toBe("Cat");
  });
});

function minBinaryHeapCheck(values) {
  let test = true;
  for (let i = values.length - 1; i > 0; i--) {
    let parentIdx = Math.floor((i - 1) / 2);
    let currPriority = values[i].priority;
    let parentPriority = values[parentIdx].priority;
    if (!(parentPriority < currPriority)) test = false;
  }
  return test;
}
