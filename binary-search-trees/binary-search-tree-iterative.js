// Binary search trees store data that can be compared (sorted)
// and follows a child.left < root < child.right pattern where
// every node that have a value that is less than the current node
// is stored to the left of the current node.
// Fast lookups and insertions
// -i.e., Best & average case O(logn), worst case O(n)

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.count = 1;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let currentNode = this.root;
    while (true) {
      if (val === currentNode.val) {
        currentNode.count++;
        return this;
      }
      if (val < currentNode.val) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  find(val) {
    if (this.root === null) return undefined;
    let currentNode = this.root;
    let found = false;
    while (currentNode && !found) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return currentNode;
  }

  breadthFirstSearch(fn) {
    const queue = [this.root];
    while (queue.length) {
      const currentNode = queue.shift();
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      fn(currentNode.val);
    }
  }

  depthFirstSearchPreOrder(fn) {
    const stack = [this.root];
    let currNode;
    while (stack.length) {
      currNode = stack.pop();
      fn(currNode);
      if (currNode.right) stack.push(currNode.right);
      if (currNode.left) stack.push(currNode.left);
    }
  }

  depthFirstSearchInOrder(fn) {
    const stack = [];
    let currNode = this.root;
    while (currNode !== null || stack.length) {
      while (currNode !== null) {
        stack.push(currNode);
        currNode = currNode.left;
      }
      currNode = stack.pop();
      fn(currNode);
      currNode = currNode.right;
    }
  }

  //      10
  //   5     13
  // 2  7  11  16

  depthFirstSearchPostOrder(fn) {
    const stack = [];
    let currNode = this.root;
    while (true) {
      while (currNode !== null) {
        stack.push(currNode);
        stack.push(currNode);
        currNode = currNode.left;
      }
      if (!stack.length) return;
      currNode = stack.pop();
      if (stack.length && stack[stack.length - 1] === currNode) {
        currNode = currNode.right;
      } else {
        fn(currNode);
        currNode = null;
      }
    }
  }
}

module.exports = {
  Node,
  BinarySearchTree,
};
