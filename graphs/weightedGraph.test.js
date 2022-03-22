const WeightedGraph = require("./weightedGraph");

describe("unweighted undirected graph >", () => {
  let g;
  beforeEach(() => {
    g = new WeightedGraph();
  });

  test("graph uses an adjacency list", () => {
    expect(g.hasOwnProperty("adjacencyList")).toBe(true);
  });

  test("addVertex adds a ", () => {
    g.addVertex("A");
    expect(g.adjacencyList["A"]).toMatchObject([]);
  });

  test("addEdge adds an edge between two nodes ", () => {
    g.addVertex("A");
    g.addVertex("B");
    g.addEdge("A", "B", 3);
    expect(g.adjacencyList["A"]).toMatchObject([{ node: "B", weight: 3 }]);
    expect(g.adjacencyList["B"]).toMatchObject([{ node: "A", weight: 3 }]);
  });

  test("removeEdge removes an edge between two nodes ", () => {
    g.addVertex("A");
    g.addVertex("B");
    g.addVertex("C");
    g.addEdge("A", "B", 3);
    g.addEdge("A", "C", 2);
    g.removeEdge("A", "B");
    expect(g.adjacencyList["A"]).toMatchObject([{ node: "C", weight: 2 }]);
    expect(g.adjacencyList["B"]).toMatchObject([]);
  });

  test("removeVertex removes all edges of that vertex and the vertex itself", () => {
    g.addVertex("A");
    g.addVertex("B");
    g.addVertex("C");
    g.addVertex("D");
    g.addEdge("A", "B", 1);
    g.addEdge("A", "C", 2);
    g.addEdge("B", "C", 3);
    g.addEdge("B", "D", 4);
    g.addEdge("C", "D", 5);
    g.removeVertex("A");
    expect(g.adjacencyList.hasOwnProperty("A")).toBe(false);
    expect(g.adjacencyList["B"].map((v) => v.node)).toMatchObject(["C", "D"]);
    expect(g.adjacencyList["C"].map((v) => v.node)).toMatchObject(["B", "D"]);
  });

  test("recursive DFS visits neighbors and continues to visit neighbors before backtracking", () => {
    g.addVertex("A");
    g.addVertex("B");
    g.addVertex("C");
    g.addVertex("D");
    g.addVertex("E");
    g.addVertex("F");
    g.addEdge("A", "B", 1);
    g.addEdge("A", "C", 2);
    g.addEdge("B", "D", 3);
    g.addEdge("C", "E", 4);
    g.addEdge("D", "E", 5);
    g.addEdge("D", "F", 6);
    g.addEdge("E", "F", 7);
    //          A
    //        /   \
    //       B     C
    //       |     |
    //       D --- E
    //        \   /
    //          F
    expect(g.depthFirstTraversal("A")).toMatchObject([
      "A",
      "B",
      "D",
      "E",
      "C",
      "F",
    ]);
  });

  test("BFS visits neighbors before going deeper", () => {
    g.addVertex("A");
    g.addVertex("B");
    g.addVertex("C");
    g.addVertex("D");
    g.addVertex("E");
    g.addVertex("F");
    g.addEdge("A", "B", 1);
    g.addEdge("A", "C", 2);
    g.addEdge("B", "D", 3);
    g.addEdge("C", "E", 4);
    g.addEdge("D", "E", 5);
    g.addEdge("D", "F", 6);
    g.addEdge("E", "F", 7);
    //          A
    //        /   \
    //       B     C
    //       |     |
    //       D --- E
    //        \   /
    //          F
    expect(g.breadthFirstTraversal("A")).toMatchObject([
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ]);
  });

  test("dijkstra returns the shortest path from one vertex to another", () => {
    g.addVertex("A");
    g.addVertex("B");
    g.addVertex("C");
    g.addVertex("D");
    g.addVertex("E");
    g.addVertex("F");

    g.addEdge("A", "B", 4);
    g.addEdge("A", "C", 2);
    g.addEdge("B", "E", 3);
    g.addEdge("C", "D", 2);
    g.addEdge("C", "F", 4);
    g.addEdge("D", "E", 3);
    g.addEdge("D", "F", 1);
    g.addEdge("E", "F", 1);

    expect(g.dijkstra("A", "E")).toMatchObject(["A", "C", "D", "F", "E"]);
  });
});
