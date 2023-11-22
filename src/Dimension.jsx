import { Box, IconButton, Stack, Tooltip } from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Dimension = ({ grid, addOneRow, addOneColumn }) => {
  return (
    <Box sx={{ mb: "32px !important" }}>
      <Stack alignItems="center">
        <Stack alignItems="center" direction="row">
          <Stack alignItems="start" sx={{ position: "relative" }}>
            {grid &&
              grid.map((row, i) => {
                return (
                  <Stack key={i} direction="row">
                    {row.map((item, j) => {
                      if (item === null) return;
                      return (
                        <Box
                          key={j}
                          className={`node-${i}-${j}`}
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
                          {item}
                        </Box>
                      );
                    })}
                  </Stack>
                );
              })}
            <Tooltip title="Add 1 row" arrow>
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translate(-50%, 100%)",
                }}
                size="small"
                onClick={addOneRow}
              >
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add 1 column" arrow placement="right">
              <IconButton
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translate(100%, -50%)",
                }}
                size="small"
                onClick={addOneColumn}
              >
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Dimension;
