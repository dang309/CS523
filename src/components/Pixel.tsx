import "../styles/pixel.css";

import { TPixel } from "../types";

type Props = {
  pixel: TPixel;
  rowIndex: number;
  colIndex: number;
};

const Pixel = (props: Props) => {
  const { pixel, rowIndex, colIndex } = props;
  const { red, green, blue, alpha } = pixel;

  return (
    <div
      id={`${rowIndex}-${colIndex}`}
      style={{
        width: "1px",
        height: "1px",
        backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
      }}
    />
  );
};

export default Pixel;
