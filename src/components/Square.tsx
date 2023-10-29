import clsx from "clsx";

import "../styles/node.css";

import { Icon } from "@iconify/react";
import { Node as Square } from "../types";
import { Stack } from "@mui/material";

type Props = {
  node: Square;
};

const Square = (props: Props) => {
  const { node } = props;
  const { row, col, isStart, isFinish, isWall } = node;

  const extraClass = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <td id={`${row}-${col}`} className={clsx("node", extraClass)}>
      <Stack alignItems="center" justifyContent="center">
        {isStart && <Icon icon="noto:mouse-face" />}
        {isFinish && <Icon icon="emojione:cheese-wedge" />}
        {isWall && <Icon icon="ph:wall" style={{ color: "white" }} />}
      </Stack>
    </td>
  );
};

export default Square;
