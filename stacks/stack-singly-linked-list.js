// Implementing a stack using a singly linked list (SLL)
// requires adding and removing from the begining of
// the SLL so that adding and removing are both O(1)

class Node {
  constructor(val) {
    this.val = val;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    return ++this.length;
  }

  pop() {
    if (!this.first) return undefined;
    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.length--;
    return temp.val;
  }
}
