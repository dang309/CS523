import { Stack } from "@mui/material";
import { TPixel } from "../types";
import Pixel from "./Pixel";

type Props = {
  imageData: TPixel[][];
};

const Picture = (props: Props) => {
  const { imageData } = props;

  return (
    <Stack>
      {imageData &&
        imageData.map((row, rowIndex) => {
          return (
            <Stack direction="row" key={rowIndex} id={rowIndex.toString()}>
              {row.map((pixel, index) => {
                return <Pixel rowIndex={rowIndex} colIndex={index} key={index} pixel={pixel} />;
              })}
            </Stack>
          );
        })}
    </Stack>
  );
};

export default Picture;
