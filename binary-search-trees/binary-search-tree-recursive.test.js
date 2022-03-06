const BinarySearchTree = require('./binary-search-tree-recursive');

//      10
//   5     13
// 2  7  11  16

describe('bst recursive >', () => {
    let tree;
    beforeEach(() => {
        tree = new BinarySearchTree(10);
    });

    test('insert should add tree to the appropriate left or right property', () => {
        tree.insert(5);
        tree.insert(13);
        expect(tree.left.val).toBe(5);
        expect(tree.right.val).toBe(13);
        expect(tree.magnitude).toBe(3);
    });

    test('contains should return true if val is found in tree, false otherwise', () => {
        expect(tree.contains(5)).toBe(false);
        tree.insert(5);
        tree.insert(13);
        tree.insert(11);
        expect(tree.contains(13)).toBe(true);
    });

    test('bfs should traverse level by level', () => {
        const testArr = [];
        const storeValsInArr = (val) => {
            testArr.push(val);
        }
        tree.insert(5);
        tree.insert(13);
        tree.insert(11);
        tree.insert(2);
        tree.insert(16);
        tree.insert(7);
        tree.breadthFirstSearch(storeValsInArr);
        expect(testArr).toMatchObject([10, 5, 13, 2, 7, 11, 16]);
    });
    test('dfs should process root, left, or right appropirately', () => {
        const preOrder = [];
        const inOrder = [];
        const postOrder = [];
        const _preorder = (val) => (preOrder.push(val));
        const _inOrder = (val) => (inOrder.push(val));
        const _postOrder = (val) => (postOrder.push(val));
        tree.insert(5);
        tree.insert(13);
        tree.insert(11);
        tree.insert(2);
        tree.insert(16);
        tree.insert(7);
        tree.depthFirstSearch(_preorder, 'pre-order');
        expect(preOrder).toMatchObject([10, 5, 2, 7, 13, 11, 16]);
        // tree.depthFirstSearch(_inOrder, 'in-order');
        // expect(inOrder).toMatchObject([10, 5, 2, 7, 13, 11, 16]);
        // tree.depthFirstSearch(_postOrder, 'post-order');
        // expect(postOrder).toMatchObject([10, 5, 2, 7, 13, 11, 16]);
    });

});