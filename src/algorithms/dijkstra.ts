import { Node } from "../types";

export const sortNodesByDistance = (unvisitedNodes: Node[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

export const getUnvisitedNeighbors = (node: Node, board: Node[][]) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(board[row - 1][col]);
  if (row < board.length - 1) neighbors.push(board[row + 1][col]);
  if (col > 0) neighbors.push(board[row][col - 1]);
  if (col < board[0].length - 1) neighbors.push(board[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const updateUnvisitedNeighbors = (node: Node, board: Node[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, board);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

export const getAllNodes = (board: Node[][]): Node[] => {
  const nodes: Node[] = [];
  for (const row of board) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const dijkstra = (
  board: Node[][],
  startNode: Node,
  finishNode: Node
) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(board);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode) {
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, board);
    }
  }
};

export const getNodesInShortestPathOrder = (finishNode: Node | null) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};
