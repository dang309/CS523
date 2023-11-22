import { Divider, Stack } from "@mui/material";
import Ram from "./Ram";
import Dimension from "./Dimension";
import { useState } from "react";
import { DEFAULT_CAPACITY, DEFAULT_GRID } from "./constants";
import Manipulators from "./Manipulators";

function App() {
  const [grid, setGrid] = useState(DEFAULT_GRID);
  const [capacity, setCapacity] = useState(DEFAULT_CAPACITY);

  const addOneRow = () => {
    const cloneGrid = [...grid];
    cloneGrid.push([]);

    for (let i = 0; i < grid[0].length; i++) {
      setTimeout(() => {
        // Use Math.floor to get integer values
        cloneGrid[cloneGrid.length - 1].push(Math.floor(Math.random() * 9));
        setGrid([...cloneGrid]); // Make sure to use a new reference for state update
      }, 100 * (i + 1)); // Adjust the delay based on the index to stagger updates
    }
  };

  const addOneColumn = () => {
    const cloneGrid = [...grid];

    for (let i = 0; i < grid.length; i++) {
      setTimeout(() => {
        // Use Math.floor to get integer values
        cloneGrid[i].push(Math.floor(Math.random() * 9));
        setGrid([...cloneGrid]); // Make sure to use a new reference for state update
      }, 100 * (i + 1)); // Adjust the delay based on the index to stagger updates
    }
  };

  const deleteOneRow = () => {
    const cloneGrid = [...grid];

    cloneGrid.pop();
    setGrid([...cloneGrid]); // Make sure to use a new reference for state update
  };

  const deleteOneColumn = () => {
    const cloneGrid = [...grid];

    for (let i = 0; i < grid.length; i++) {
      cloneGrid[i].pop();
      setGrid([...cloneGrid]); // Make sure to use a new reference for state update
    }
  };

  const handleChangeCapacity = (e) => {
    setCapacity(e.target.value);
  };

  return (
    <Stack spacing={2} divider={<Divider />}>
      <Dimension
        grid={grid}
        addOneRow={addOneRow}
        addOneColumn={addOneColumn}
        deleteOneRow={deleteOneRow}
        deleteOneColumn={deleteOneColumn}
      />
      <Manipulators
        capacity={capacity}
        handleChangeCapacity={handleChangeCapacity}
      />
      <Ram grid={grid} />
    </Stack>
  );
}

export default App;
