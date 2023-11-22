import { Stack, TextField } from "@mui/material";

const Manipulators = ({
  capacity,
  growthFactor,
  handleChangeCapacity,
  handleChangeGrowthFactor,
}) => {
  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <TextField
        label="Capacity"
        value={capacity}
        onChange={handleChangeCapacity}
        size="small"
      />

      <TextField
        label="Growth factor"
        value={growthFactor}
        onChange={handleChangeGrowthFactor}
        size="small"
      />
    </Stack>
  );
};

export default Manipulators;
