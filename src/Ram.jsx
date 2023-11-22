import { Box, Stack, Typography } from "@mui/material";
import { DEFAULT_GRID } from "./constants";
import { useMemo } from "react";

const Ram = () => {
  const convertMatrixToVectorByRowMajor = useMemo(() => {
    const result = new Array(DEFAULT_GRID.length * DEFAULT_GRID[0].length).fill(
      0
    );
    DEFAULT_GRID.forEach((row, rIndex) => {
      row.forEach((col, cIndex) => {
        const index = rIndex * DEFAULT_GRID[0].length + cIndex;
        result[index] = DEFAULT_GRID[rIndex][cIndex];
      });
    });
    console.log({ result });
    return result;
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <Typography>RAM</Typography>
      <Stack direction="row">
        {new Array(40).fill(0).map((_, index) => {
          const value = convertMatrixToVectorByRowMajor[index];
          return (
            <Box
              key={index}
              sx={{
                backgroundColor: "#ccc",

                width: "32px",
                minWidth: "32px",
                height: "32px",

                margin: "0px 1px",
              }}
            >
              {value}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Ram;
