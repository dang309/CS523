import { FormEvent } from "react";

type Props = {
  selectedAlgorithm: string;
  handleChangeAlgorithm: (_: FormEvent<HTMLSelectElement>) => void;
  startAlgorithmAction: () => void;
  generateRecursiveDivisionMaze: () => void;
};

const Algorithms = (props: Props) => {
  const {
    selectedAlgorithm,
    handleChangeAlgorithm,
    startAlgorithmAction,
    generateRecursiveDivisionMaze,
  } = props;
  return (
    <div className="flex flex-wrap items-start gap-2 ">
      {/* <button */}
      {/*   type="button" */}
      {/*   className={clsx( */}
      {/*     "p-2 flex items-center gap-1 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700", */}
      {/*     (flagStatus === CHECKPOINT_STATUS.TURN_ON || */}
      {/*       flagStatus === CHECKPOINT_STATUS.CHOOSING) && */}
      {/*       "bg-blue-500" */}
      {/*   )} */}
      {/*   onClick={() => { */}
      {/*     if (targetStatus === CHECKPOINT_STATUS.CHOOSING) { */}
      {/*       setTargetStatus(CHECKPOINT_STATUS.TURN_OFF); */}
      {/*     } */}
      {/*     if (flagStatus === CHECKPOINT_STATUS.TURN_OFF) { */}
      {/*       setFlagStatus(CHECKPOINT_STATUS.CHOOSING); */}
      {/*     } else if ( */}
      {/*       flagStatus === CHECKPOINT_STATUS.TURN_ON || */}
      {/*       flagStatus === CHECKPOINT_STATUS.CHOOSING */}
      {/*     ) { */}
      {/*       setFlagStatus(CHECKPOINT_STATUS.TURN_OFF); */}
      {/*       setSelectedStarting({ row: -1, col: -1 }); */}
      {/*     } */}
      {/*   }} */}
      {/* > */}
      {/*   <Icon */}
      {/*     icon="material-symbols:flag" */}
      {/*     className={clsx( */}
      {/*       (flagStatus === CHECKPOINT_STATUS.TURN_ON || */}
      {/*         flagStatus === CHECKPOINT_STATUS.CHOOSING) && */}
      {/*         "text-white" */}
      {/*     )} */}
      {/*   /> */}
      {/* </button> */}

      {/* <button */}
      {/*   type="button" */}
      {/*   className={clsx( */}
      {/*     "p-2 flex items-center gap-1 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700", */}
      {/*     (targetStatus === CHECKPOINT_STATUS.TURN_ON || */}
      {/*       targetStatus === CHECKPOINT_STATUS.CHOOSING) && */}
      {/*       "bg-blue-500" */}
      {/*   )} */}
      {/*   onClick={() => { */}
      {/*     if (flagStatus === CHECKPOINT_STATUS.CHOOSING) { */}
      {/*       setFlagStatus(CHECKPOINT_STATUS.TURN_OFF); */}
      {/*     } */}
      {/*     if (targetStatus === CHECKPOINT_STATUS.TURN_OFF) { */}
      {/*       setTargetStatus(CHECKPOINT_STATUS.CHOOSING); */}
      {/*     } else if ( */}
      {/*       targetStatus === CHECKPOINT_STATUS.TURN_ON || */}
      {/*       targetStatus === CHECKPOINT_STATUS.CHOOSING */}
      {/*     ) { */}
      {/*       setTargetStatus(CHECKPOINT_STATUS.TURN_OFF); */}
      {/*       setSelectedTarget({ row: -1, col: -1 }); */}
      {/*     } */}
      {/*   }} */}
      {/* > */}
      {/*   <Icon */}
      {/*     icon="material-symbols:target" */}
      {/*     className={clsx( */}
      {/*       (targetStatus === CHECKPOINT_STATUS.TURN_ON || */}
      {/*         targetStatus === CHECKPOINT_STATUS.CHOOSING) && */}
      {/*         "text-white" */}
      {/*     )} */}
      {/*   /> */}
      {/* </button> */}

      <button
        type="button"
        className="p-2 flex items-center gap-1 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={generateRecursiveDivisionMaze}
      >
        Generate random maze
      </button>

      <select
        id="algorithms"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        style={{ width: "256px" }}
        value={selectedAlgorithm}
        onChange={handleChangeAlgorithm}
      >
        <option selected disabled>
          Choose a algorithm
        </option>
        <option value="dijkstra">Dijkstra</option>
        <option value="bfs">Breath-first Search</option>
        <option value="dfs">Depth-first Search</option>
      </select>

      <button
        type="button"
        className="p-2 flex items-center gap-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={startAlgorithmAction}
      >
        {/* <Icon icon="material-symbols:play-arrow" /> */}
        {/* {algorithmActionStatus === ALGORITHM_ACTION_STATUS.IDLE */}
        {/*   ? "Run" */}
        {/*   : algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING */}
        {/*   ? "Terminate" */}
        {/*   : "Run again"} */}
        Run
      </button>
    </div>
  );
};

export default Algorithms;
