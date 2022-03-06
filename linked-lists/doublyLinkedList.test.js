const { Node, DoublyLinkedList } = require("./doublyLinkedList");

describe("node >", () => {
  const properties = ["val", "next", "prev"];
  properties.forEach((prop) => {
    test(`should have a ${prop} property`, () => {
      const node = new Node();
      expect(node.hasOwnProperty(`${prop}`)).toBe(true);
    });
  });
});

describe("dll >", () => {
  let dll;
  beforeEach(() => {
    dll = new DoublyLinkedList();
  });

  const properties = ["head", "tail", "length"];
  properties.forEach((prop) => {
    test(`dll should have a ${prop} property`, () => {
      const dll = new DoublyLinkedList();
      expect(dll.hasOwnProperty(`${prop}`)).toBe(true);
    });
  });

  test("push adds node, updates head, tail, and length", () => {
    dll.push("A");
    expect(dll.head.val).toBe("A");
    expect(dll.tail.val).toBe("A");
    expect(dll.length).toBe(1);
    dll.push("B");
    expect(dll.head.val).toBe("A");
    expect(dll.head.next.val).toBe("B");
    expect(dll.tail.val).toBe("B");
    expect(dll.tail.prev.val).toBe("A");
    expect(dll.length).toBe(2);
  });

  test("pop removes tail node, returns removed node, updates head, tail, and length", () => {
    dll.push("A");
    dll.push("B");
    dll.push("C");
    expect(dll.pop().val).toBe("C");
    expect(dll.length).toBe(2);
    expect(dll.tail.val).toBe("B");
    expect(dll.tail.next).toBe(null);
    dll.pop();
    dll.pop();
    expect(dll.head).toBe(null);
    expect(dll.tail).toBe(null);
  });

  test("shift removes head node, returns removed node, updates head, tail, and length", () => {
    dll.push("A");
    dll.push("B");
    dll.push("C");
    expect(dll.shift().val).toBe("A");
    expect(dll.length).toBe(2);
    expect(dll.head.val).toBe("B");
    expect(dll.head.prev).toBe(null);
    dll.shift();
    expect(dll.length).toBe(1);
    dll.shift();
    expect(dll.length).toBe(0);
    expect(dll.head).toBe(null);
    expect(dll.tail).toBe(null);
  });

  test("unshift adds a new head, updates head, tail, and length", () => {
    dll.unshift("A");
    expect(dll.head.val).toBe("A");
    expect(dll.tail.val).toBe("A");
    expect(dll.length).toBe(1);
    dll.unshift("B");
    expect(dll.head.val).toBe("B");
    expect(dll.head.next.val).toBe("A");
    expect(dll.tail.val).toBe("A");
    expect(dll.tail.prev.val).toBe("B");
    expect(dll.length).toBe(2);
  });

  test(`get should return node at a specific index and null otherwise`, () => {
    dll.push("A");
    dll.push("B");
    dll.push("C");
    expect(dll.get(2).val).toBe("C");
    expect(dll.get(-1)).toBe(null);
    expect(dll.get(dll.length)).toBe(null);
  });

  test(`set should update a node and return true, and false otherwise`, () => {
    dll.push("A");
    dll.push("B");
    dll.push("C");
    expect(dll.set(0, "C")).toBe(true);
    expect(dll.set(2, "A")).toBe(true);
    expect(dll.set(-1, "D")).toBe(false);
    expect(dll.get(0).val).toBe("C");
    expect(dll.get(2).val).toBe("A");
  });

  test(`insert should add a new node and return true, and false otherwise`, () => {
    // A <-> B <-> C <-> E
    expect(dll.insert(0, "A")).toBe(true);
    expect(dll.insert(1, "B")).toBe(true);
    expect(dll.insert(2, "C")).toBe(true);
    expect(dll.insert(3, "E")).toBe(true);
    expect(dll.head.val).toBe("A");
    expect(dll.length).toBe(4);
    // A <-> B <-> C <-> D <-> E
    expect(dll.insert(3, "D")).toBe(true);
    expect(dll.get(3).val).toBe("D");
    expect(dll.get(3).prev.val).toBe("C");
    expect(dll.get(3).next.val).toBe("E");
    expect(dll.insert(-1, "aA")).toBe(false);
  });

  test(`remove should delete node and return that node, undefined otherwise`, () => {
    // A <-> B <-> C <-> D
    dll.push("A");
    dll.push("B");
    dll.push("C");
    dll.push("D");
    expect(dll.remove(dll.length)).toBe(undefined);
    expect(dll.remove(1).val).toBe("B");
    expect(dll.length).toBe(3);
    expect(dll.remove(0).val).toBe("A");
  });

  test(`reverse should reverse the SLL in place`, () => {
    dll.push("A");
    dll.push("B");
    dll.push("C");
    dll.push("D");
    dll.reverse();
    expect(dll.head.val).toBe("D");
    expect(dll.tail.val).toBe("A");
    expect(dll.tail.prev.val).toBe("B");
    expect(dll.head.next.val).toBe("C");
  });
});
