// @ts-nocheck

import { useCallback, useEffect, useMemo, useState } from "react";

// import Board from "./components/Board";

import { Icon } from "@iconify/react";

import { ALGORITHM_ACTION_STATUS, BOARD, CHECKPOINT_STATUS } from "./constants";
import Manipulator from "./components/Manipulator";
import { Node, Pixel } from "./types";
import { createNode } from "./utils/common";
import Algorithms from "./components/Algorithms";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { recursiveDivisionMaze } from "./utils/maze";
import Header from "./components/Header";
import { Box, Divider, Grid, SelectChangeEvent, Stack } from "@mui/material";
import Picture from "./components/Picture";
import ImageProcessing from "./components/ImageProcessing";

const App = () => {
  const [imageData, setImageData] = useState<Pixel[][]>([]);

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
  const [selectedStart, setSelectedStart] = useState<{
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

  const loadImageData = useCallback(() => {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const imageArray: TPixel[][] = [];

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const image = new Image();

        image.onload = function () {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0, image.width, image.height);

          const imageData = ctx.getImageData(0, 0, image.width, image.height);
          const pixelData = imageData.data;
          const width = image.width;
          const height = image.height;

          for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
              const offset = (y * width + x) * 4; // 4 channels (RGBA)
              const red = pixelData[offset];
              const green = pixelData[offset + 1];
              const blue = pixelData[offset + 2];
              const alpha = pixelData[offset + 3];
              row.push({ red, green, blue, alpha });
            }
            imageArray.push(row);
          }

          setImageData(imageArray);
        };

        image.src = "/image.jpg";
      }
    }
  }, []);

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
    if (
      selectedStart.row === -1 ||
      selectedStart.col === -1 ||
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
    // loadImageData();
  }, [initializeGrid, loadImageData]);

  // useEffect(() => {
  //   if (selectedStarting.row > -1 && selectedStarting.col > -1) {
  //     setFlagStatus(CHECKPOINT_STATUS.TURN_ON);
  //   }

  //   if (selectedTarget.row > -1 && selectedTarget.col > -1) {
  //     setTargetStatus(CHECKPOINT_STATUS.TURN_ON);
  //   }
  // }, [selectedStarting, selectedTarget]);

  return (
    <Box>
      <Header />
      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item lg={4} md={4}>
          <Stack spacing={2}>
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

            <Divider />

            <Algorithms
              selectedAlgorithm={selectAlgorithm}
              algorithmActionStatus={algorithmActionStatus}
              handleChangeAlgorithm={handleChangeAlgorithm}
              startAlgorithmAction={startAlgorithmAction}
              generateRecursiveDivisionMaze={generateRecursiveDivisionMaze}
            />

            <Divider />

            <ImageProcessing />
          </Stack>
        </Grid>

        <Grid item lg={8} md={8}>
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
              <Icon icon="noto:mouse-face" style={{ fontSize: "24px" }} />
              <span>Start</span>
            </div>

            <div className="flex items-center gap-2 border rounded p-1">
              <Icon icon="emojione:cheese-wedge" style={{ fontSize: "24px" }} />
              <span>Target</span>
            </div>
          </div>
          {/* <Board board={board} /> */}
          {/* <Picture imageData={imageData} /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
