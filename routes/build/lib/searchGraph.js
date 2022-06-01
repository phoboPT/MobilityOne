"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoute = void 0;
/////////////////////////////start        //end       //allRoutes
const searchRoute = (src, dst, routes, allTargets) => {
    // The graph
    try {
        console.log('src', src, dst);
        const adjacencyList = new Map();
        // Add node
        function addNode(node) {
            adjacencyList.set(node, []);
        }
        // Add edge, undirected
        function addEdge(origin, destination) {
            adjacencyList.get(origin).push(destination);
        }
        // Create the Graph
        allTargets.forEach(addNode);
        routes.forEach((route) => addEdge(route.startLocation, route.endLocation));
        let visit = { start: false };
        const paths = [];
        adjacencyList.forEach((item, key) => {
            if (item.length > 0) {
                adjacencyList.set(key, uniq_fast(item));
            }
        });
        console.log(adjacencyList);
        const searchAllPaths = (graph, start, end, visited, all) => {
            console.log(start, end, visited, all);
            if (start === end) {
                paths.push(all);
                return;
            }
            visited[start] = true;
            const destinations = adjacencyList.get(start);
            destinations.forEach((item) => {
                if (!visited[item]) {
                    searchAllPaths(graph, item, end, visited, all + ',' + item);
                }
            });
            visited[start] = false;
        };
        searchAllPaths(adjacencyList, src, dst, visit, src);
        console.log(paths);
        return paths;
    }
    catch (error) {
        console.log(`search error: ${error}`);
    }
};
exports.searchRoute = searchRoute;
function uniq_fast(itemList) {
    let seen = {};
    let out = [];
    let len = itemList.length;
    let j = 0;
    for (let i = 0; i < len; i++) {
        let item = itemList[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}
