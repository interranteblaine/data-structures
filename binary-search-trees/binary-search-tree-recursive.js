// Binary search trees store data that can be compared (sorted)
// and follows a child.left < root < child.right pattern where
// every node that have a value that is less than the current node
// is stored to the left of the current node.
// Fast lookups and insertions
// -i.e., Best & average case O(logn), worst case O(n)

class BinarySearchTree {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.magnitude = 1;
  }

  insert(val) {
    const direction = val < this.val ? "left" : "right";
    if (this[direction]) {
      this[direction].insert(val);
    } else {
      this[direction] = new BinarySearchTree(val);
      this.magnitude++;
    }
  }

  contains(val) {
    if (this.val === val) return true;
    const direction = val < this.val ? "left" : "right";
    if (this[direction]) {
      return this[direction].contains(val);
    } else {
      return false;
    }
  }

  breadthFirstSearch(fn) {
    const queue = [this];
    while (queue.length) {
      const currentNode = queue.shift();
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      fn(currentNode.val);
    }
  }

  depthFirstSearch(fn, option = 'in-order') {
    if (option === 'pre-order') fn(this.val); // root > left side > right side
    if (this.left) this.left.depthFirstSearch(fn, option);
    if (option === 'in-order') fn(this.val); // left side > root > right side
    if (this.right) this.right.depthFirstSearch(fn, option);
    if (option === 'post-order') fn(this.val); // left side > right side > root
  }
}

module.exports = BinarySearchTree;