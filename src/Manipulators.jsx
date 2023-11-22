import { Button, Stack, TextField } from "@mui/material";

const Manipulators = ({
  capacity,
  growthFactor,
  handleChangeCapacity,
  handleChangeGrowthFactor,
  handleBlurCapacity,
  renderByRow,
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

      <Button onClick={renderByRow}>By Row</Button>
    </Stack>
  );
};

export default Manipulators;
