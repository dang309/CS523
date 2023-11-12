import "../styles/pixel.css";

import { TPixel } from "../types";

import { motion } from "framer-motion";

type Props = {
  pixel: TPixel;
  rowIndex: number;
  colIndex: number;
};

const Pixel = (props: Props) => {
  const { pixel, rowIndex, colIndex } = props;
  const { red, green, blue, alpha } = pixel;

  return (
    <motion.div
      id={`${rowIndex}-${colIndex}`}
      initial={{
        scale: 1,
      }}
      style={{
        width: "8px",
        height: "8px",
        backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
        margin: "0.5px",
      }}
    />
  );
};

export default Pixel;
