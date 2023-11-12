import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type Props = {
  onChangeImage: (_: ChangeEvent) => void;
};

export default function FileUploadButton(props: Props) {
  const { onChangeImage } = props;
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      className="upload-btn"
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={onChangeImage} />
    </Button>
  );
}
