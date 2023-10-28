import clsx from "clsx";

import "../styles/node.css";

import { Icon } from "@iconify/react";
import { Node as Square } from "../types";

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
      {isStart && <Icon icon="material-symbols:flag" />}
      {isFinish && <Icon icon="material-symbols:target" />}
    </td>
  );
};

export default Square;
