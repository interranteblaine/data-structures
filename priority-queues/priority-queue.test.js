const { PriorityQueue, Node } = require("./priority-queue");

describe("node >", () => {
  const properties = ["val", "priority"];
  properties.forEach((prop) => {
    test(`should have a ${prop} property`, () => {
      const node = new Node();
      expect(node.hasOwnProperty(`${prop}`)).toBe(true);
    });
  });
});

describe("Priority Queue >", () => {
  let pq = new PriorityQueue();

  test(`enqueue should create a new node and places it based on priority`, () => {
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
    expect(minBinaryHeapCheck(pq.values)).toBe(true);
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
