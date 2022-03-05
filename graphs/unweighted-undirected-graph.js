class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v) => {
      return v !== vertex2;
    });
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v) => {
      return v !== vertex1;
    });
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  depthFirstRecursive(start) {
    const visited = {};
    const { adjacencyList } = this;
    const result = [];
    const dfs = (vertex) => {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          dfs(neighbor);
        }
      });
    };
    dfs(start);
    return result;
  }

  depthFirstIterative(start) {
    const stack = [start];
    const visited = {};
    visited[start] = true;
    const { adjacencyList } = this;
    const result = [];
    let currVertex;
    while (stack.length) {
      currVertex = stack.pop();
      result.push(currVertex);
      adjacencyList[currVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  breadthFirst(start) {
    const queue = [start];
    const visited = {};
    visited[start] = true;
    const { adjacencyList } = this;
    const result = [];
    let currVertex;
    while (queue.length) {
      currVertex = queue.shift();
      result.push(currVertex);
      adjacencyList[currVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

module.exports = Graph;
