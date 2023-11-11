import { Button, ButtonGroup, Stack } from "@mui/material";
import FileUploadButton from "./common/FileUploadButton";

type Props = {};

const ImageProcessing = (props: Props) => {
  return (
    <Stack spacing={2} alignItems="flex-start">
      <FileUploadButton />
      <ButtonGroup>
        <Button variant="outlined">Gray</Button>
        <Button variant="outlined">Warm</Button>
        <Button variant="outlined">Cool</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ImageProcessing;
