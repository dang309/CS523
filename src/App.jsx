import { Divider, Stack } from "@mui/material";
import Ram from "./Ram";
import Dimension from "./Dimension";
import { useState } from "react";
import { DEFAULT_GRID } from "./constants";

function App() {
  const [grid, setGrid] = useState(DEFAULT_GRID);

  const addOneRow = () => {
    const cloneGrid = [...grid];
    cloneGrid.push(new Array(grid[0].length).fill(0));

    for (let i = 0; i < grid[0].length; i++) {
      setTimeout(() => {
        // Use Math.floor to get integer values
        cloneGrid[cloneGrid.length - 1][i] = Math.floor(Math.random() * 9);
        setGrid([...cloneGrid]); // Make sure to use a new reference for state update
      }, 1000 * (i + 1)); // Adjust the delay based on the index to stagger updates
    }
  };

  return (
    <Stack spacing={2} divider={<Divider />}>
      <Dimension grid={grid} addOneRow={addOneRow} />
      <Ram />
    </Stack>
  );
}

export default App;
