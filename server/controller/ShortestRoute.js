class Graph {
    constructor() {
        this.nodes = new Set();
        this.edges = {};
    }

    addNode(node) {
        this.nodes.add(node);
        this.edges[node] = [];
    }

    addEdge(node1, node2, weight) {
        this.edges[node1].push({ node: node2, weight });
        this.edges[node2].push({ node: node1, weight });
    }

    dijkstra(startNode, endNode) {
        const distances = {};
        const previousNodes = {};
        const visited = new Set();

        this.nodes.forEach(node => {
            distances[node] = Infinity;
            previousNodes[node] = null;
        });

        distances[startNode] = 0;

        while (visited.size < this.nodes.size) {
            const currentNode = this.getMinDistanceNode(distances, visited);

            for (const neighbor of this.edges[currentNode]) {
                const tentativeDistance = distances[currentNode] + neighbor.weight;
                if (tentativeDistance < distances[neighbor.node]) {
                    distances[neighbor.node] = tentativeDistance;
                    previousNodes[neighbor.node] = currentNode;
                }
            }

            visited.add(currentNode);

            if (currentNode === endNode) {
                return this.reconstructPath(previousNodes, endNode);
            }
        }

        return null; 
    }

    getMinDistanceNode(distances, visited) {
        let minDistance = Infinity;
        let minNode = null;

        this.nodes.forEach(node => {
            if (!visited.has(node) && distances[node] < minDistance) {
                minDistance = distances[node];
                minNode = node;
            }
        });

        return minNode;
    }

    reconstructPath(previousNodes, endNode) {
        const path = [];
        let currentNode = endNode;

        while (currentNode !== null) {
            path.unshift(currentNode);
            currentNode = previousNodes[currentNode];
        }

        return path;
    }

    totalWeightOfShortestPath(startNode, endNode) {
        const path = this.dijkstra(startNode, endNode);
        if (path) {
            let totalWeight = 0;
            for (let i = 0; i < path.length - 1; i++) {
                const currentNode = path[i];
                const nextNode = path[i + 1];
                for (const neighbor of this.edges[currentNode]) {
                    if (neighbor.node === nextNode) {
                        totalWeight += neighbor.weight;
                        break;
                    }
                }
            }
            return totalWeight;
        } else {
            return Infinity; 
        }
    }
}

const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");

graph.addEdge("A", "B", 5);
graph.addEdge("A", "C", 7);
graph.addEdge("B", "D", 15);
graph.addEdge("B", "E", 20);
graph.addEdge("C", "D", 5);
graph.addEdge("C", "E", 35);
graph.addEdge("D", "F", 20);
graph.addEdge("E", "F", 10);

const ShortestRoute = (startNode, endNode) => {
    const shortestPath = graph.dijkstra(startNode, endNode);
    if (shortestPath) {
        console.log(`Shortest path from ${startNode} to ${endNode}: ${shortestPath.join(" -> ")}`);
        const totalWeight = graph.totalWeightOfShortestPath(startNode, endNode);
        console.log(`Total weight of the shortest path: ${totalWeight}`);
        const response = {
            pathFound: true,
            shortestPath: shortestPath.join(" -> "),
            stations: shortestPath,
            totalTime: totalWeight
        }
        return response;
    } else {
        const response = {
            pathFound: false,
            totalTime: -1
        }
        return response;
    }
}

module.exports = ShortestRoute;
