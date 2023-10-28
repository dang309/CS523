import { BOARD } from "../constants";
import { Node } from "../types";
import { createNode } from "../utils";

import { Icon } from "@iconify/react";

type Props = {
  board: Node[][];
  setBoard: (_: ((_: Node[][]) => Node[][]) | Node[][]) => void;
  initializeGrid: () => void;
  setRows: (_: number) => void;
  setCols: (_: number) => void;
};

const Manipulator = (props: Props) => {
  const { board, setBoard, initializeGrid, setRows, setCols } = props;

  const addOneRow = () => {
    if (!board || (board && board.length < 1)) return;

    const temp: Node[] = [];
    for (let col = 0; col < board[0].length; col++) {
      temp.push(createNode(board.length, col));
    }

    setBoard((prev) => [...prev, temp]);
  };

  const addOneColumn = () => {
    if (!board || (board && board.length < 1)) return;
    const cloneBoard = board.slice();
    for (let row = 0; row < cloneBoard.length; row++) {
      cloneBoard[row].push(createNode(row, cloneBoard[row].length));
    }

    setBoard(cloneBoard);
  };

  const transform = () => {
    const transposedArray: Node[][] = [];

    for (let i = 0; i < board[0].length; i++) {
      transposedArray.push([]);

      for (let j = 0; j < board.length; j++) {
        transposedArray[i].push(board[j][i]);
      }
    }

    setBoard(transposedArray);
  };

  const resetBoard = () => {
    initializeGrid();
    setRows(BOARD.INITIAL_ROWS);
    setCols(BOARD.INITIAL_COLS);
  };

  const leftButtons = [
    {
      id: 1,
      label: "Add one row",
      icon: "material-symbols:add",
      action: () => {
        addOneRow();
      },
    },
    {
      id: 2,
      label: "Add one column",
      icon: "material-symbols:add",
      action: () => {
        addOneColumn();
      },
    },
    {
      id: 3,
      label: "Transform",
      icon: "material-symbols:rotate-90-degrees-cw-outline-rounded",
      action: () => {
        transform();
      },
    },
    {
      id: 4,
      label: "Reset",
      icon: "material-symbols:refresh",
      action: () => {
        resetBoard();
      },
    },
  ];
  return (
    <div className="flex items-start gap-2">
      {leftButtons &&
        leftButtons.map((button) => {
          return (
            <button
              key={button.id}
              type="button"
              className="p-2 flex items-center gap-1 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={button.action}
            >
              <Icon icon={button.icon} />
              {button.label}
            </button>
          );
        })}
    </div>
  );
};

export default Manipulator;
