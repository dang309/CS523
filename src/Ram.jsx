import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

const MAX_ADDRESS_SPACE = 256;

const Ram = ({ grid }) => {
  const convertMatrixToVectorByRowMajor = useMemo(() => {
    if (!grid || (grid && grid.length === 0)) return null;
    const result = new Array(grid.length * grid[0].length).fill(0);
    grid.forEach((row, rIndex) => {
      row.forEach((col, cIndex) => {
        const index = rIndex * grid[0].length + cIndex;
        result[index] = grid[rIndex][cIndex];
      });
    });
    console.log({ result });
    return result;
  }, [grid]);

  return (
    <Stack
      direction="row"
      spacing={2}
      component="fieldset"
      sx={{
        border: "1px dashed #ccc",
        borderRadius: 2,

        p: 2,
      }}
    >
      <Typography component="legend">RAM</Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        sx={{ maxWidth: "100%", flexWrap: "wrap", gap: 2 }}
      >
        {new Array(MAX_ADDRESS_SPACE).fill(0).map((_, index) => {
          const value = convertMatrixToVectorByRowMajor
            ? convertMatrixToVectorByRowMajor[index]
            : "";
          return (
            <Stack key={index} alignItems="center">
              <Box
                sx={{
                  backgroundColor: "#ccc",

                  width: "32px",
                  minWidth: "32px",
                  height: "32px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {value}
              </Box>
              <Typography>{index}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Ram;
