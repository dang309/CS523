import Square from "./Square";
import { Node } from "../types";

type Props = {
  board: Node[][];
};

const Board = (props: Props) => {
  const { board } = props;
  // const handleSetFlagPoint = (row: number, col: number) => {
  //   setSelectedStarting({ row, col });
  //   setFlagStatus(CHECKPOINT_STATUS.TURN_ON);
  // };

  // const handleSetTargetPoint = (row: number, col: number) => {
  //   setSelectedTarget({ row, col });
  //   setTargetStatus(CHECKPOINT_STATUS.TURN_ON);
  // };

  // const handleChangeFlagStatus = (flagStatus: CHECKPOINT_STATUS) => {
  //   setFlagStatus(flagStatus);
  // };

  // const handleChangeTargetStatus = (targetStatus: CHECKPOINT_STATUS) => {
  //   setTargetStatus(targetStatus);
  // };

  // const resetCell = async (rowIndex: number, colIndex: number) => {
  //   const id = `${rowIndex}-${colIndex}`;
  //   const el = document.getElementById(id);
  //   if (el) {
  //     el.classList.remove("visited");
  //   }
  // };

  // const clearBoard = async () => {
  //   for (let row = 0; row < board.length; row++) {
  //     for (let col = 0; col < board[row].length; col++) {
  //       resetCell(row, col);
  //     }
  //   }
  // };

  return (
    <table>
      <tbody>
        {board &&
          board.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} id={rowIndex.toString()}>
                {row.map((node) => {
                  return <Square key={node.id} node={node} />;
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Board;
