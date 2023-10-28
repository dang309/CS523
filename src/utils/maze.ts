import { BOARD } from "../constants";
import { Node } from "../types";

export const recursiveDivisionMaze = (
  board: Node[][],
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: "horizontal" | "vertical",
  surroundingWalls: boolean,
  type: "wall"
): Node[][] | null => {
  if (rowEnd < rowStart || colEnd < colStart) {
    return null;
  }
  if (!surroundingWalls) {
    const start = `${BOARD.DEFAULT_START_NODE_ROW}-${BOARD.DEFAULT_FINISH_NODE_COL}`;
    const target = `${BOARD.DEFAULT_FINISH_NODE_ROW}-${BOARD.DEFAULT_FINISH_NODE_COL}`;
    let relevantIds = [start, target];
    for (const row of board) {
      for (const node of row) {
        const currentId = `${node.row}-${node.col}`;
        if (!relevantIds.includes(currentId)) {
          let r = node.row;
          let c = node.col;
          if (
            r === 0 ||
            c === 0 ||
            r === board.length - 1 ||
            c === board[0].length - 1
          ) {
            if (type === "wall") {
              node.isWall = true;
            }
          }
        }
      }
    }

    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    for (const row of board) {
      for (const node of row) {
        let r = node.row;
        let c = node.col;
        if (
          r === currentRow &&
          c !== colRandom &&
          c >= colStart - 1 &&
          c <= colEnd + 1
        ) {
          if (!node.isStart && !node.isFinish) {
            if (type === "wall") {
              node.isWall = true;
            }
          }
        }
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        board,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    } else {
      recursiveDivisionMaze(
        board,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        type
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        board,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    } else {
      recursiveDivisionMaze(
        board,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        type
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    for (const row of board) {
      for (const node of row) {
        let r = node.row;
        let c = node.col;
        if (
          c === currentCol &&
          r !== rowRandom &&
          r >= rowStart - 1 &&
          r <= rowEnd + 1
        ) {
          if (!node.isStart && !node.isFinish) {
            if (type === "wall") {
              node.isWall = true;
            }
          }
        }
      }
    }
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        board,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls,
        type
      );
    } else {
      recursiveDivisionMaze(
        board,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls,
        type
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        board,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        type
      );
    } else {
      recursiveDivisionMaze(
        board,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    }
  }
  return board;
};
