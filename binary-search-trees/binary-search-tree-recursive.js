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

  depthFirstSearch(fn, option = "in-order") {
    if (option === "pre-order") fn(this.val); // root > left side > right side
    if (this.left) this.left.depthFirstSearch(fn, option);
    if (option === "in-order") fn(this.val); // left side > root > right side
    if (this.right) this.right.depthFirstSearch(fn, option);
    if (option === "post-order") fn(this.val); // left side > right side > root
  }

  remove(val, parent = null) {
    if (this.val !== val) {
      let direction = val < this.val ? "left" : "right";
      if (this[direction] !== null) {
        this[direction].remove(val, this);
      }
    } else {
      if (this.left !== null && this.right !== null) {
        this.val = this.right.getMinValFromSubTree();
        this.right.remove(this.val, this);
      } else if (parent === null) {
        if (this.left !== null) {
          this.val = this.left.val;
          this.val.right = this.left.right;
          this.val.left = this.left.left;
        } else if (this.right !== null) {
          this.val = this.right.val;
          this.left = this.right.left;
          this.right = this.right.right;
        } else {
          // single tree node
        }
      } else if (parent.left === this) {
        parent.left = this.left !== null ? this.left : this.right;
      } else if (parent.right === this) {
        parent.right = this.left !== null ? this.left : this.right;
      }
    }
    return this;
  }

  getMinValFromSubTree() {
    if (this.left === null) {
      return this.val;
    } else {
      return this.left.getMinValFromSubTree();
    }
  }
}

module.exports = BinarySearchTree;
