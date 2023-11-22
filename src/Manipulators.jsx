import { Stack, TextField } from "@mui/material";

const Manipulators = ({ capacity, handleChangeCapacity }) => {
  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <TextField
        label="Capacity"
        value={capacity}
        onChange={handleChangeCapacity}
        size="small"
      />
    </Stack>
  );
};

export default Manipulators;
