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

const ImageProcessing = (props: Props) => {
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
        variant="contained"
        disabled={algorithmActionStatus === ALGORITHM_ACTION_STATUS.RUNNING}
        onClick={startAlgorithmAction}
      >
        Run
      </Button>
    </Stack>
  );
};

export default ImageProcessing;
