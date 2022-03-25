const { PriorityQueue } = require("../priority-queues/priority-queue");

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(v) {
    if (!this.adjacencyList[v]) this.adjacencyList[v] = [];
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => {
      return v.node !== v2;
    });
    this.adjacencyList[v2] = this.adjacencyList[v2].filter((v) => {
      return v.node !== v1;
    });
  }

  removeVertex(v) {
    while (this.adjacencyList[v].length) {
      const adjacentVertex = this.adjacencyList[v].pop().node;
      this.removeEdge(v, adjacentVertex);
    }
    delete this.adjacencyList[v];
  }

  depthFirstTraversal(start) {
    const visited = {};
    const { adjacencyList } = this;
    const result = [];
    const dfs = (v) => {
      if (!v) return null;
      visited[v] = true;
      result.push(v);
      adjacencyList[v].forEach((neighbor) => {
        if (!visited[neighbor.node]) {
          dfs(neighbor.node);
        }
      });
    };
    dfs(start);
    return result;
  }

  breadthFirstTraversal(start) {
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
        if (!visited[neighbor.node]) {
          visited[neighbor.node] = true;
          queue.push(neighbor.node);
        }
      });
    }
    return result;
  }

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          let nextNeighbor = nextNode.node;
          let currDistance = distances[smallest] + nextNode.weight;
          if (currDistance < distances[nextNeighbor]) {
            distances[nextNeighbor] = currDistance;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, currDistance);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

module.exports = WeightedGraph;
