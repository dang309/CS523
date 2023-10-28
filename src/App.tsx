import { FormEvent, useCallback, useEffect, useState } from "react";

import Board from "./components/Board";

import { Icon } from "@iconify/react";

import { ALGORITHM_ACTION_STATUS, BOARD, CHECKPOINT_STATUS } from "./constants";
import Manipulator from "./components/Manipulator";
import { Node } from "./types";
import { createNode } from "./utils/common";
import Algorithms from "./components/Algorithms";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { recursiveDivisionMaze } from "./utils/maze";

const App = () => {
  const [rows, setRows] = useState(BOARD.INITIAL_ROWS);
  const [cols, setCols] = useState(BOARD.INITIAL_COLS);
  const [board, setBoard] = useState<Node[][]>([]);
  const [selectAlgorithm, setSelectAlgorithm] = useState<string>("dijkstra");
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

  const handleChangeAlgorithm = (e: FormEvent<HTMLSelectElement>) => {
    setSelectAlgorithm(e.currentTarget.value);
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
        if (el) {
          el.classList.add("node-visited");
        }
      }, 10 * i);
    }
  };

  const animateWalls = (walls: Node[]) => {
    for (let i = 0; i < walls.length; i++) {
      setTimeout(() => {
        const node = walls[i];
        const el = document.getElementById(`${node.row}-${node.col}`);
        if (el) {
          el.classList.add("node-wall");
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
    if (!selectAlgorithm) return;
    visualizeDijkstra();
    // if (algorithmActionStatus === ALGORITHM_ACTION_STATUS.IDLE) {
    //   setAlgorithmActionStatus(ALGORITHM_ACTION_STATUS.RUNNING);
    //   visualizeDijkstra();
    // } else if (algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING) {
    //   setAlgorithmActionStatus(ALGORITHM_ACTION_STATUS.IDLE);
    //   clearBoard();
    // }
  };

  const generateRecursiveDivisionMaze = () => {
    const newBoard = recursiveDivisionMaze(
      board,
      2,
      board.length - 3,
      2,
      board[0].length - 3,
      "horizontal",
      false,
      "wall"
    );

    if (newBoard) {
      const walls = [];
      for (const row of newBoard) {
        for (const node of row) {
          if (node.isWall) {
            walls.push(node);
          }
        }
      }
      animateWalls(walls);
    }
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
      <div className="mt-4 mb-2 flex justify-between items-start">
        <Manipulator
          board={board}
          rows={rows}
          cols={cols}
          setGridSize={setGridSize}
          setBoard={setBoard}
          initializeGrid={initializeGrid}
          setRows={setRows}
          setCols={setCols}
        />

        <Algorithms
          selectedAlgorithm={selectAlgorithm}
          handleChangeAlgorithm={handleChangeAlgorithm}
          startAlgorithmAction={startAlgorithmAction}
          generateRecursiveDivisionMaze={generateRecursiveDivisionMaze}
        />
      </div>

      <div className="flex justify-center gap-2 mb-4">
        <div className="flex items-center gap-2  border rounded p-1">
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "rgb(12, 53, 71)",
            }}
          />
          <span>Wall</span>
        </div>

        <div className="flex items-center gap-2  border rounded p-1">
          <Icon icon="material-symbols:flag" style={{ fontSize: "24px" }} />
          <span>Start</span>
        </div>

        <div className="flex items-center gap-2 border rounded p-1">
          <Icon icon="material-symbols:target" style={{ fontSize: "24px" }} />
          <span>Target</span>
        </div>
      </div>

      <Board board={board} />
    </div>
  );
};

export default App;
