import { useCallback, useEffect, useState } from "react";

import Board from "./components/Board";

import { ALGORITHM_ACTION_STATUS, BOARD, CHECKPOINT_STATUS } from "./constants";
import Manipulator from "./components/Manipulator";
import { Node } from "./types";
import { createNode } from "./utils";
import Algorithms from "./components/Algorithms";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";

const App = () => {
  const [rows, setRows] = useState(BOARD.INITIAL_ROWS);
  const [cols, setCols] = useState(BOARD.INITIAL_COLS);
  const [board, setBoard] = useState<Node[][]>([]);
  const [flagStatus, setFlagStatus] = useState<CHECKPOINT_STATUS>(
    CHECKPOINT_STATUS.TURN_OFF
  );
  const [targetStatus, setTargetStatus] = useState<CHECKPOINT_STATUS>(
    CHECKPOINT_STATUS.TURN_OFF
  );
  const [algorithmActionStatus, setAlgorithmActionStatus] =
    useState<ALGORITHM_ACTION_STATUS>(ALGORITHM_ACTION_STATUS.IDLE);
  const [selectedStarting, setSelectedStarting] = useState<{
    row: number;
    col: number;
  }>({
    row: BOARD.DEFAULT_START_NODE_ROW,
    col: BOARD.DEFAULT_START_NODE_COL,
  });
  const [selectedTarget, setSelectedTarget] = useState<{
    row: number;
    col: number;
  }>({
    row: BOARD.DEFAULT_FINISH_NODE_ROW,
    col: BOARD.DEFAULT_FINISH_NODE_COL,
  });

  const initializeGrid = useCallback(
    (rows = BOARD.INITIAL_ROWS, cols = BOARD.INITIAL_COLS) => {
      const grid = [];
      for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
          currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
      }
      setBoard(grid);
    },
    []
  );

  const setGridSize = () => {
    if (!rows || !cols) return;
    initializeGrid(rows, cols);
  };

  const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const el = document.getElementById(`${node.row}-${node.col}`);
        if (el) {
          el.classList.add("node-shortest-path");
        }
      }, 50 * i);
    }
  };

  const animateDijkstra = (
    visitedNodesInOrder: Node[],
    nodesInShortestPathOrder: Node[]
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const el = document.getElementById(`${node.row}-${node.col}`);
        console.log({ el });
        if (el) {
          el.classList.add("node-visited");
        }
      }, 10 * i);
    }
  };

  const visualizeDijkstra = () => {
    if (
      selectedStarting.row === -1 ||
      selectedStarting.col === -1 ||
      selectedTarget.row === -1 ||
      selectedTarget.col === -1
    )
      return;
    const startNode =
      board[BOARD.DEFAULT_START_NODE_ROW][BOARD.DEFAULT_START_NODE_COL];
    const finishNode =
      board[BOARD.DEFAULT_FINISH_NODE_ROW][BOARD.DEFAULT_FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(board, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if (visitedNodesInOrder) {
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  };

  const startAlgorithmAction = async () => {
    visualizeDijkstra();
    // if (algorithmActionStatus === ALGORITHM_ACTION_STATUS.IDLE) {
    //   setAlgorithmActionStatus(ALGORITHM_ACTION_STATUS.RUNNING);
    //   visualizeDijkstra();
    // } else if (algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING) {
    //   setAlgorithmActionStatus(ALGORITHM_ACTION_STATUS.IDLE);
    //   clearBoard();
    // }
  };

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  useEffect(() => {
    if (selectedStarting.row > -1 && selectedStarting.col > -1) {
      setFlagStatus(CHECKPOINT_STATUS.TURN_ON);
    }

    if (selectedTarget.row > -1 && selectedTarget.col > -1) {
      setTargetStatus(CHECKPOINT_STATUS.TURN_ON);
    }
  }, [selectedStarting, selectedTarget]);

  return (
    <div className="container mx-auto h-full flex flex-col">
      <header className="border-b p-2">
        <div className="max-w-lg mx-auto">
          <a href="/">LOGO</a>
        </div>
      </header>
      <div className="mt-4 mb-2 flex justify-between">
        <Manipulator
          board={board}
          setBoard={setBoard}
          initializeGrid={initializeGrid}
          setRows={setRows}
          setCols={setCols}
        />

        <Algorithms startAlgorithmAction={startAlgorithmAction} />
      </div>

      <div className="mb-4 flex items-center justify-center gap-4">
        <div>
          <label
            htmlFor="rows"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Number of Rows
          </label>

          <input
            type="text"
            id="rows"
            className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter number of rows"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value, 10))}
            onBlur={setGridSize}
          />
        </div>

        <div>
          <label
            htmlFor="columns"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Number of Columns
          </label>
          <input
            type="text"
            id="columns"
            className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter number of columns"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value, 10))}
            onBlur={setGridSize}
          />
        </div>
      </div>

      <Board board={board} />
    </div>
  );
};

export default App;
