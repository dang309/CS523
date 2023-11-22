import { Box, Button, Stack } from "@mui/material";

const Dimension = ({ grid, addOneRow }) => {
  return (
    <Stack>
      <Stack alignItems="center">
        {grid &&
          grid.map((row, i) => {
            return (
              <Stack key={i} direction="row">
                {row.map((node, j) => {
                  return (
                    <Box
                      key={j}
                      sx={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#ccc",
                        margin: "1px",
                        padding: "4px",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {node}
                    </Box>
                  );
                })}
              </Stack>
            );
          })}
      </Stack>

      <Stack direction="row">
        <Button onClick={addOneRow}>Add 1 row</Button>
      </Stack>
    </Stack>
  );
};

export default Dimension;
