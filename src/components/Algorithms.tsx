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
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

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
      <Button
        className="generate-maze-btn"
        variant="outlined"
        size="small"
        onClick={generateRecursiveDivisionMaze}
      >
        Generate random maze
      </Button>

      <Box className="algo-options">
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
        className="start-btn"
        variant="contained"
        disabled={algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING}
        onClick={startAlgorithmAction}
        color={
          algorithmActionStatus === ALGORITHM_ACTION_STATUS.IDLE ||
          algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING
            ? "primary"
            : "error"
        }
        startIcon={
          algorithmActionStatus === ALGORITHM_ACTION_STATUS.IDLE ||
          algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING ? (
            <PlayArrowOutlinedIcon />
          ) : (
            <RestartAltOutlinedIcon />
          )
        }
      >
        {algorithmActionStatus === ALGORITHM_ACTION_STATUS.IDLE
          ? "Run"
          : algorithmActionStatus === ALGORITHM_ACTION_STATUS.DONE
          ? "Reset"
          : "Run"}
      </Button>
    </Stack>
  );
};

export default Algorithms;
