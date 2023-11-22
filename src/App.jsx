import { Divider, Stack } from "@mui/material";
import Ram from "./Ram";
import Dimension from "./Dimension";
import { useState } from "react";
import {
  DEFAULT_CAPACITY,
  DEFAULT_GRID,
  DEFAULT_GROWTH_FACTOR,
  MAX_ADDRESS_SPACE,
} from "./constants";
import Manipulators from "./Manipulators";
import { useEffect } from "react";
import { useCallback } from "react";

import randomcolor from "randomcolor";

function App() {
  const [grid, setGrid] = useState(DEFAULT_GRID);
  const [addressSpace, setAddressSpace] = useState([]);
  const [capacity, setCapacity] = useState(DEFAULT_CAPACITY);
  const [growthFactor, setGrowthFactor] = useState(DEFAULT_GROWTH_FACTOR);

  const initializeAddressSpace = useCallback(() => {
    if (!grid || (grid && grid.length === 0)) return null;
    const cloneGrid = [...grid];
    for (let i = 0; i < cloneGrid.length; i++) {
      cloneGrid[i] = cloneGrid[i].concat(
        new Array(capacity - cloneGrid[i].length).fill(null)
      );
    }

    const result = new Array(MAX_ADDRESS_SPACE).fill(null);
    cloneGrid.forEach((row, rIndex) => {
      row.forEach((_, cIndex) => {
        const index = rIndex * cloneGrid[0].length + cIndex;
        result[index] = {
          cIndex,
          rIndex,
          value: cloneGrid[rIndex][cIndex],
        };
      });
    });
    setAddressSpace(result);
  }, [grid, capacity]);

  const addOneRow = () => {
    const cloneGrid = [...grid];
    cloneGrid.push([]);

    for (let i = 0; i < grid[0].length; i++) {
      setTimeout(() => {
        // Use Math.floor to get integer values
        cloneGrid[cloneGrid.length - 1].push(Math.floor(Math.random() * 9));
        setGrid([...cloneGrid]); // Make sure to use a new reference for state update
        colorizeGrid();
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
        colorizeGrid();
      }, 100 * (i + 1)); // Adjust the delay based on the index to stagger updates
    }
  };

  const colorizeGrid = () => {
    const cloneGrid = [...grid];
    for (let i = 0; i < cloneGrid.length; i++) {
      cloneGrid[i] = cloneGrid[i].concat(
        new Array(capacity - cloneGrid[i].length).fill(null)
      );
    }
    for (let i = 0; i < cloneGrid.length; i++) {
      const color = randomcolor({
        luminosity: "light",
      });
      for (let j = 0; j < cloneGrid[0].length; j++) {
        setTimeout(() => {
          const els = Array.from(
            document.getElementsByClassName(`node-${i}-${j}`)
          );
          if (els && els.length > 0) {
            els.forEach((el) => {
              el.style.backgroundColor = color;
            });
          }
        }, 200 * i);
      }
    }
  };

  const renderByRow = () => {
    colorizeGrid();
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

  const handleBlurCapacity = () => {
    initializeAddressSpace();
  };

  const handleChangeGrowthFactor = (e) => {
    setGrowthFactor(e.target.value);
  };

  useEffect(() => {
    initializeAddressSpace();
  }, [initializeAddressSpace]);

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
        growthFactor={growthFactor}
        handleChangeCapacity={handleChangeCapacity}
        handleChangeGrowthFactor={handleChangeGrowthFactor}
        handleBlurCapacity={handleBlurCapacity}
        renderByRow={renderByRow}
      />
      <Ram addressSpace={addressSpace} capacity={capacity} />
    </Stack>
  );
}

export default App;
