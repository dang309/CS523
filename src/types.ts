export type Node = {
  id: string;
  row: number;
  col: number;
  distance: number;
  isWall: boolean;
  isVisited: boolean;
  previousNode: Node | null;
  isStart: boolean;
  isFinish: boolean;
};

export type Point = {
  row: number;
  col: number;
};
