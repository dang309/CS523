import { Button, ButtonGroup, Stack } from "@mui/material";
import FileUploadButton from "./common/FileUploadButton";
import { ChangeEvent } from "react";

type Props = {
  onChangeImage: (_: ChangeEvent) => void;
  removeImage: () => void;
  resetImage: () => void;
  handleGrayScale: () => void;
};

const ImageProcessing = (props: Props) => {
  const { onChangeImage, removeImage, resetImage, handleGrayScale } = props;
  return (
    <Stack spacing={2} alignItems="flex-start">
      <Stack direction="row" spacing={2}>
        <FileUploadButton onChangeImage={onChangeImage} />
        <Button
          variant="contained"
          color="warning"
          onClick={resetImage}
          className="reset-btn"
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={removeImage}
          className="remove-btn"
        >
          Remove
        </Button>
      </Stack>{" "}
      <ButtonGroup>
        <Button
          variant="outlined"
          onClick={handleGrayScale}
          className="grayscale-btn"
        >
          Grayscale
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ImageProcessing;
