const BinarySearchTree = require("./binary-search-tree-recursive");

describe("bst recursive >", () => {
  let tree;
  beforeEach(() => {
    tree = new BinarySearchTree(10);
  });

  test("insert should add tree to the appropriate left or right property", () => {
    tree.insert(5);
    tree.insert(13);
    expect(tree.left.val).toBe(5);
    expect(tree.right.val).toBe(13);
    expect(tree.magnitude).toBe(3);
  });

  test("contains should return true if val is found in tree, false otherwise", () => {
    expect(tree.contains(5)).toBe(false);
    tree.insert(5);
    tree.insert(13);
    tree.insert(11);
    expect(tree.contains(13)).toBe(true);
  });

  test("bfs should traverse level by level", () => {
    const testArr = [];
    const storeValsInArr = (val) => {
      testArr.push(val);
    };
    tree.insert(5);
    tree.insert(13);
    tree.insert(11);
    tree.insert(2);
    tree.insert(16);
    tree.insert(7);
    tree.breadthFirstSearch(storeValsInArr);
    expect(testArr).toMatchObject([10, 5, 13, 2, 7, 11, 16]);
  });

  test("dfs should process root, left, or right appropirately", () => {
    const preOrder = [];
    const inOrder = [];
    const postOrder = [];
    const _preorder = (val) => preOrder.push(val);
    const _inOrder = (val) => inOrder.push(val);
    const _postOrder = (val) => postOrder.push(val);
    //      10
    //   5     13
    // 2  7  11  16
    tree.insert(5);
    tree.insert(13);
    tree.insert(11);
    tree.insert(2);
    tree.insert(16);
    tree.insert(7);
    tree.depthFirstSearch(_preorder, "pre-order"); // root > left side > right side
    expect(preOrder).toMatchObject([10, 5, 2, 7, 13, 11, 16]);
    tree.depthFirstSearch(_inOrder, "in-order"); // left side > root > right side
    expect(inOrder).toMatchObject([2, 5, 7, 10, 11, 13, 16]);
    tree.depthFirstSearch(_postOrder, "post-order"); // left side > right side > root
    expect(postOrder).toMatchObject([2, 7, 5, 11, 16, 13, 10]);
  });

  test("remove should delete the node value and update the BST", () => {
    const tree = new BinarySearchTree(10);
    tree.insert(5);
    tree.insert(17);
    tree.insert(2);
    tree.insert(1);
    tree.insert(22);
    tree.insert(14);
    tree.insert(12);
    tree.insert(15);
    tree.insert(13);
    tree.remove(10);
    expect(tree.val).toBe(12);
    expect(tree.left.val).toBe(5);
    expect(tree.right.val).toBe(17);
    expect(tree.right.left.left.val).toBe(13);
    expect(tree.contains(10)).toBe(false);
  });
});
