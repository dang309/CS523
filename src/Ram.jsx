import { Box, Stack, Typography } from "@mui/material";

const Ram = ({ addressSpace }) => {
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
        {addressSpace &&
          addressSpace.map((item, index) => {
            return (
              <Stack key={index} alignItems="center">
                <Box
                  className={`node-${item?.rIndex}-${item?.cIndex}`}
                  sx={{
                    backgroundColor: "#FAF6F0",

                    width: "32px",
                    minWidth: "32px",
                    height: "32px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item?.value}
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
