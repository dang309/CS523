import { v4 as uuidv4 } from "uuid";
import { Node } from "./types";
import { BOARD } from "./constants";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createNode = (row: number, col: number): Node => {
  const randomRow = generateRandom(0, BOARD.INITIAL_ROWS);
  const randomCol = generateRandom(0, BOARD.INITIAL_COLS);
  return {
    id: uuidv4(),
    row,
    col,
    distance: Infinity,
    isWall:
      row === randomRow &&
      row !== BOARD.DEFAULT_START_NODE_ROW &&
      row !== BOARD.INITIAL_ROWS &&
      col === randomCol &&
      col !== BOARD.DEFAULT_START_NODE_COL &&
      col !== BOARD.DEFAULT_FINISH_NODE_COL,
    isVisited: false,
    previousNode: null,
    isStart:
      row === BOARD.DEFAULT_START_NODE_ROW &&
      col === BOARD.DEFAULT_START_NODE_COL,
    isFinish:
      row === BOARD.DEFAULT_FINISH_NODE_ROW &&
      col === BOARD.DEFAULT_FINISH_NODE_COL,
  };
};

export const generateRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
