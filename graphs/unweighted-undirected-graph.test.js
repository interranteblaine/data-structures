const Graph = require('./unweighted-undirected-graph');

describe('unweighted undirected graph >', () => {
    let g;
    beforeEach(() => {
        g = new Graph();
    });

    test('graph uses an adjacency list', () => {
        expect(g.hasOwnProperty('adjacencyList')).toBe(true);
    });

    test('addVertex adds a ', () => {
        g.addVertex('A');
        expect(g.adjacencyList['A']).toMatchObject([]);
    });

    test('addEdge adds an edge between two nodes ', () => {
        g.addVertex("A");
        g.addVertex("B");
        g.addEdge("A", "B");
        expect(g.adjacencyList['A']).toMatchObject(['B']);
        expect(g.adjacencyList['B']).toMatchObject(['A']);
    });

    test('removeEdge removes an edge between two nodes ', () => {
        g.addVertex("A");
        g.addVertex("B");
        g.addVertex("C")
        g.addEdge("A", "B");
        g.addEdge("A", "C");
        g.removeEdge("A", "B")
        expect(g.adjacencyList['A']).toMatchObject(['C']);
        expect(g.adjacencyList['B']).toMatchObject([]);
    });

    test('removeVertex removes all edges of that vertex and the vertex itself', () => {
        g.addVertex("A");
        g.addVertex("B");
        g.addVertex("C");
        g.addVertex("D");
        g.addEdge("A", "B");
        g.addEdge("A", "C");
        g.addEdge("B", "C");
        g.addEdge("B", "D");
        g.addEdge("C", "D");
        g.removeVertex('A');
        expect(g.adjacencyList.hasOwnProperty('A')).toBe(false);
        expect(g.adjacencyList['B']).toMatchObject(['C', 'D']);
        expect(g.adjacencyList['C']).toMatchObject(['B', 'D']);
    });

    test('recursive DFS visits neighbors and continues to visit neighbors before backtracking', () => {
        g.addVertex("A");
        g.addVertex("B");
        g.addVertex("C");
        g.addVertex("D");
        g.addVertex("E");
        g.addVertex("F");
        g.addEdge("A", "B");
        g.addEdge("A", "C");
        g.addEdge("B","D");
        g.addEdge("C","E");
        g.addEdge("D","E");
        g.addEdge("D","F");
        g.addEdge("E","F");
        //          A
        //        /   \
        //       B     C
        //       |     |
        //       D --- E
        //        \   /
        //          F
        expect(g.depthFirstRecursive('A')).toMatchObject(['A', 'B', 'D', 'E', 'C', 'F']);
    });

    test('iterative DFS visits neighbors and continues to visit neighbors before backtracking', () => {
        g.addVertex("A");
        g.addVertex("B");
        g.addVertex("C");
        g.addVertex("D");
        g.addVertex("E");
        g.addVertex("F");
        g.addEdge("A", "B");
        g.addEdge("A", "C");
        g.addEdge("B","D");
        g.addEdge("C","E");
        g.addEdge("D","E");
        g.addEdge("D","F");
        g.addEdge("E","F");
        //          A
        //        /   \
        //       B     C
        //       |     |
        //       D --- E
        //        \   /
        //          F
        expect(g.depthFirstIterative('A')).toMatchObject(['A', 'C', 'E', 'F', 'D', 'B']);
    });

    test('BFS visits neighbors before going deeper', () => {
        g.addVertex("A");
        g.addVertex("B");
        g.addVertex("C");
        g.addVertex("D");
        g.addVertex("E");
        g.addVertex("F");
        g.addEdge("A", "B");
        g.addEdge("A", "C");
        g.addEdge("B","D");
        g.addEdge("C","E");
        g.addEdge("D","E");
        g.addEdge("D","F");
        g.addEdge("E","F");
        //          A
        //        /   \
        //       B     C
        //       |     |
        //       D --- E
        //        \   /
        //          F
        expect(g.breadthFirst('A')).toMatchObject(['A', 'B', 'C', 'D', 'E', 'F']);
    });


});

// g.addVertex("A")
// g.addVertex("B")
// g.addVertex("C")
// g.addVertex("D")
// g.addVertex("E")
// g.addVertex("F")
// g.addEdge("A", "B")
// g.addEdge("A", "C")
// g.addEdge("B","D")
// g.addEdge("C","E")
// g.addEdge("D","E")
// g.addEdge("D","F")
// g.addEdge("E","F")
//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F