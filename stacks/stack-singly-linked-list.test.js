const { Node, Stack } = require("./stack-singly-linked-list");

describe("node >", () => {
  const properties = ["val", "next"];
  properties.forEach((prop) => {
    test(`should have a ${prop} property`, () => {
      const node = new Node();
      expect(node.hasOwnProperty(`${prop}`)).toBe(true);
    });
  });
});

describe("Stack >", () => {
  let s;
  beforeEach(() => {
    s = new Stack();
  });

  test("push should add node to first and return length", () => {
    expect(s.push("A")).toBe(1);
    expect(s.first.val).toBe("A");
    expect(s.last.val).toBe("A");
    expect(s.push("B")).toBe(2);
    expect(s.first.val).toBe("B");
    expect(s.first.next.val).toBe("A");
    expect(s.last.val).toBe("A");
  });

  test("pop should remove and return node value from first", () => {
    s.push("A");
    s.push("B");
    s.push("C");
    expect(s.pop()).toBe("C");
    expect(s.length).toBe(2);
    expect(s.last.val).toBe("A");
  });
});
