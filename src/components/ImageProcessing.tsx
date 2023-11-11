import { Button, ButtonGroup, Stack } from "@mui/material";
import FileUploadButton from "./common/FileUploadButton";

type Props = {
  onChangeImage: () => void;
  removeImage: () => void;
  handleGrayScale: () => void;
  handleWarm: () => void;
  handleCool: () => void;
};

const ImageProcessing = (props: Props) => {
  const {
    onChangeImage,
    removeImage,
    handleGrayScale,
    handleWarm,
    handleCool,
  } = props;
  return (
    <Stack spacing={2} alignItems="flex-start">
      <FileUploadButton onChangeImage={onChangeImage} />
      <Button variant="contained" color="error" onClick={removeImage}>
        Remove
      </Button>
      <ButtonGroup>
        <Button variant="outlined" onClick={handleGrayScale}>
          Gray
        </Button>
        <Button variant="outlined" onClick={handleWarm}>
          Warm
        </Button>
        <Button variant="outlined" onClick={handleCool}>
          Cool
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ImageProcessing;
