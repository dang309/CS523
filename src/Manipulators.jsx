import { Button, Stack, TextField } from "@mui/material";

const Manipulators = ({
  capacity,
  handleChangeCapacity,
  addOneRow,
  addOneColumn,
}) => {
  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <TextField
        label="Capacity"
        value={capacity}
        onChange={handleChangeCapacity}
        size="small"
      />
      <Button onClick={addOneRow} variant="outlined" size="small">
        Add 1 row
      </Button>
      <Button onClick={addOneColumn} variant="outlined" size="small">
        Add 1 column
      </Button>
    </Stack>
  );
};

export default Manipulators;
