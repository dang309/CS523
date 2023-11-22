import { Box, Stack } from "@mui/material";

const Dimension = ({ grid }) => {
  return (
    <Stack alignItems="center">
      <Stack alignItems="center" direction="row">
        <Stack alignItems="start">
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
      </Stack>
    </Stack>
  );
};

export default Dimension;
