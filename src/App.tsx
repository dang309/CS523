import { useCallback, useEffect, useState } from "react";

import Board from "./components/Board";

import { Icon } from "@iconify/react";

import { ALGORITHM_ACTION_STATUS, BOARD } from "./constants";
import Manipulator from "./components/Manipulator";
import { Node } from "./types";
import { createNode, sleep } from "./utils/common";
import Algorithms from "./components/Algorithms";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { recursiveDivisionMaze } from "./utils/maze";
import Header from "./components/Header";
import {
  Box,
  Chip,
  Divider,
  Grid,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

const App = () => {
  const [rows, setRows] = useState(BOARD.INITIAL_ROWS);
  const [cols, setCols] = useState(BOARD.INITIAL_COLS);
  const [board, setBoard] = useState<Node[][]>([]);
  const [selectAlgorithm, setSelectAlgorithm] = useState<string>("dijkstra");
  const [algorithmActionStatus, setAlgorithmActionStatus] =
    useState<ALGORITHM_ACTION_STATUS>(ALGORITHM_ACTION_STATUS.IDLE);

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

  const handleChangeAlgorithm = (e: SelectChangeEvent<string>) => {
    setSelectAlgorithm(e.target.value);
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
    if (!board) return;
    if (board && board.length === 0) return;
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

  const clearBoard = () => {
    setBoard((prev: Node[][]) => {
      for (const row of prev) {
        for (const node of row) {
          const id = `${node.row}-${node.col}`;
          const el = document.getElementById(id);
          if (id) {
            el?.classList.remove("node-visited");
          }
          node.isVisited = false;
        }
      }
      return prev;
    });
  };

  const startAlgorithmAction = async () => {
    if (!selectAlgorithm) return;
    visualizeDijkstra();
    if (algorithmActionStatus === ALGORITHM_ACTION_STATUS.IDLE) {
      setAlgorithmActionStatus(ALGORITHM_ACTION_STATUS.RUNNING);
      visualizeDijkstra();
    } else if (algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING) {
      setAlgorithmActionStatus(ALGORITHM_ACTION_STATUS.IDLE);
      clearBoard();
    }
  };

  const generateRecursiveDivisionMaze = async () => {
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
      await sleep(2000);
      setBoard((prev) => {
        const cloneBoard = [...prev];

        for (let i = 0; i < cloneBoard.length; i++) {
          for (let j = 0; j < cloneBoard[0].length; j++) {
            cloneBoard[i][j].isWall = newBoard[i][j].isWall;
          }
        }

        return cloneBoard;
      });
    }
  };

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  return (
    <Stack sx={{ height: "100%" }}>
      <Header />
      <Grid container sx={{ p: 2, height: "100%" }} spacing={2}>
        <Grid item lg={4} md={4}>
          <Stack spacing={2} divider={<Divider />}>
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
              algorithmActionStatus={algorithmActionStatus}
              handleChangeAlgorithm={handleChangeAlgorithm}
              startAlgorithmAction={startAlgorithmAction}
              generateRecursiveDivisionMaze={generateRecursiveDivisionMaze}
            />
          </Stack>
        </Grid>

        <Grid item lg={8} md={8} sx={{height: '100%'}}>
          <Stack spacing={2} alignItems="flex-start" sx={{ height: "100%" }}>
            <Stack direction="row" spacing={1}>
              <Chip
                variant="outlined"
                icon={<Icon icon="ph:wall" />}
                label="Wall"
              />
              <Chip
                variant="outlined"
                icon={<Icon icon="noto:mouse-face" />}
                label="Start"
              />
              <Chip
                variant="outlined"
                icon={<Icon icon="emojione:cheese-wedge" />}
                label="Target"
              />
            </Stack>

            <Stack
              sx={{ width: "100%", height: "100%" }}
              alignItems="center"
              justifyContent="center"
            >
              <Board board={board} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default App;
