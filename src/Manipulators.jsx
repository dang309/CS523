import { Stack, TextField } from "@mui/material";

const Manipulators = ({
  capacity,
  growthFactor,
  handleChangeCapacity,
  handleChangeGrowthFactor,
  handleBlurCapacity,
}) => {
  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <TextField
        label="Capacity"
        value={capacity}
        onChange={handleChangeCapacity}
        onBlur={handleBlurCapacity}
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
