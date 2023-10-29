import { Button, ButtonGroup, Tooltip } from "@mui/material";
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

  const addAfterRow = () => {
    if (!board || (board && board.length < 1)) return;

    const temp: Node[] = [];
    for (let col = 0; col < board[0].length; col++) {
      temp.push(createNode(board.length, col));
    }

    setBoard((prev) => [...prev, temp]);
  };

  const addBeforeRow = () => {
    if (!board || (board && board.length < 1)) return;

    const temp: Node[] = [];
    for (let col = 0; col < board[0].length; col++) {
      temp.push(createNode(board.length, col));
    }

    setBoard((prev) => [temp, ...prev]);
  };

  const addAfterColumn = () => {
    if (!board || (board && board.length < 1)) return;
    const cloneBoard = board.slice();
    for (let row = 0; row < cloneBoard.length; row++) {
      cloneBoard[row].push(createNode(row, cloneBoard[row].length));
    }

    setBoard(cloneBoard);
  };

  const addBeforeColumn = () => {
    if (!board || (board && board.length < 1)) return;
    const cloneBoard = board.slice();
    for (let row = 0; row < cloneBoard.length; row++) {
      cloneBoard[row].unshift(createNode(row, cloneBoard[row].length));
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
      label: "Add after row",
      icon: "mdi:table-row-add-after",
      action: () => {
        addAfterRow();
      },
    },
    {
      id: 2,
      label: "Add before row",
      icon: "mdi:table-row-add-before",
      action: () => {
        addBeforeRow();
      },
    },
    {
      id: 3,
      label: "Add before column",
      icon: "mdi:table-column-add-before",
      action: () => {
        addBeforeColumn();
      },
    },
    {
      id: 4,
      label: "Add after column",
      icon: "mdi:table-column-add-after",
      action: () => {
        addAfterColumn();
      },
    },
    {
      id: 5,
      label: "Delete column",
      icon: "fluent:table-delete-column-16-regular",
      action: () => {
        addAfterColumn();
      },
    },
    {
      id: 6,
      label: "Delete row",
      icon: "fluent:table-delete-row-16-regular",
      action: () => {
        addAfterColumn();
      },
    },
    {
      id: 7,
      label: "Transform",
      icon: "material-symbols:rotate-90-degrees-cw-outline-rounded",
      action: () => {
        transform();
      },
    },
    {
      id: 8,
      label: "Reset",
      icon: "material-symbols:refresh",
      action: () => {
        resetBoard();
      },
    },
  ];
  return (
    <ButtonGroup size="large">
      {leftButtons &&
        leftButtons.map((button) => {
          return (
            <Tooltip key={button.id} title={button.label}>
              <Button
                type="button"
                className="p-2 flex items-center gap-1 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={button.action}
              >
                <Icon icon={button.icon} />
              </Button>
            </Tooltip>
          );
        })}
    </ButtonGroup>
  );
};

export default Manipulator;
