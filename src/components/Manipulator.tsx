import { BOARD } from "../constants";
import { Node } from "../types";
import { createNode } from "../utils/common";

import { Icon } from "@iconify/react";

type Props = {
  board: Node[][];
  rows: number;
  cols: number;
  setBoard: (_: ((_: Node[][]) => Node[][]) | Node[][]) => void;
  initializeGrid: () => void;
  setGridSize: () => void;
  setRows: (_: number) => void;
  setCols: (_: number) => void;
};

const Manipulator = (props: Props) => {
  const {
    board,
    setBoard,
    rows,
    cols,
    setGridSize,
    initializeGrid,
    setRows,
    setCols,
  } = props;

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
    <div>
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
    </div>
  );
};

export default Manipulator;
