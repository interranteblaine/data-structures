const { BinarySearchTree, Node } = require("./binary-search-tree-iterative");

describe("bst iterative >", () => {
  let tree;
  beforeEach(() => {
    tree = new BinarySearchTree();
  });

  test("insert should add node to the appropriate left or right property", () => {
    tree.insert(5);
    expect(tree.root.val).toBe(5);
    tree.insert(13);
    expect(tree.root.right.val).toBe(13);
    tree.insert(5);
    expect(tree.root.count).toBe(2);
  });

  test("find should return the node if found, undefined otherwise", () => {
    expect(tree.find(5)).toBe(undefined);
    tree.insert(5);
    tree.insert(13);
    tree.insert(11);
    expect(tree.find(13).val).toBe(13);
  });

  test("bfs should traverse level by level", () => {
    const testArr = [];
    const storeValsInArr = (val) => {
      testArr.push(val);
    };
    tree.insert(10);
    tree.insert(5);
    tree.insert(13);
    tree.insert(11);
    tree.insert(2);
    tree.insert(16);
    tree.insert(7);
    tree.breadthFirstSearch(storeValsInArr);
    expect(testArr).toMatchObject([10, 5, 13, 2, 7, 11, 16]);
  });

  test("dfs preorder should process the root, left side, then right side", () => {
    const testArr = [];
    const testFunc = (node) => testArr.push(node.val);
    tree.insert(10);
    tree.insert(5);
    tree.insert(13);
    tree.insert(11);
    tree.insert(2);
    tree.insert(16);
    tree.insert(7);
    tree.depthFirstSearchPreOrder(testFunc);
    expect(testArr).toMatchObject([10, 5, 2, 7, 13, 11, 16]);
  });

  test("dfs inorder should process left side, root, then right side", () => {
    const testArr = [];
    const testFunc = (node) => testArr.push(node.val);
    tree.insert(10);
    tree.insert(5);
    tree.insert(13);
    tree.insert(11);
    tree.insert(2);
    tree.insert(16);
    tree.insert(7);
    tree.depthFirstSearchInOrder(testFunc);
    expect(testArr).toMatchObject([2, 5, 7, 10, 11, 13, 16]);
  });

  //      10
  //   5     13
  // 2  7  11  16

  test("dfs postorder should process left side, right side, then root", () => {
    const testArr = [];
    const testFunc = (node) => testArr.push(node.val);
    tree.insert(10);
    tree.insert(5);
    tree.insert(13);
    tree.insert(11);
    tree.insert(2);
    tree.insert(16);
    tree.insert(7);
    tree.depthFirstSearchPostOrder(testFunc);
    expect(testArr).toMatchObject([2, 7, 5, 11, 16, 13, 10]);
  });
});
