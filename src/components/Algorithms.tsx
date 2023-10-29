import { FormEvent } from "react";
import { ALGORITHM_ACTION_STATUS } from "../constants";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

type Props = {
  selectedAlgorithm: string;
  algorithmActionStatus: ALGORITHM_ACTION_STATUS;
  handleChangeAlgorithm: (_: SelectChangeEvent<string>) => void;
  startAlgorithmAction: () => void;
  generateRecursiveDivisionMaze: () => void;
};

const Algorithms = (props: Props) => {
  const {
    selectedAlgorithm,
    algorithmActionStatus,
    handleChangeAlgorithm,
    startAlgorithmAction,
    generateRecursiveDivisionMaze,
  } = props;
  return (
    <Stack spacing={2} alignItems="flex-start">
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

      <Button
        variant="outlined"
        size="small"
        onClick={generateRecursiveDivisionMaze}
      >
        Generate random maze
      </Button>

      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Algorithms</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAlgorithm}
            label="Age"
            onChange={handleChangeAlgorithm}
          >
            <MenuItem selected disabled>
              Choose a algorithm
            </MenuItem>
            <MenuItem value="dijkstra">Dijkstra</MenuItem>
            <MenuItem value="bfs">Breath-first Search</MenuItem>
            <MenuItem value="dfs">Depth-first Search</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
      variant="contained"
        disabled={algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING}
        onClick={startAlgorithmAction}
      >
        Run
      </Button>
    </Stack>
  );
};

export default Algorithms;
