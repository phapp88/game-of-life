export const addCell = (cellCol, cellRow) => ({
  type: 'ADD_CELL',
  payload: { cellCol, cellRow },
});

export const changeSize = (numCols, numRows) => {
  const gridHeights = { 30: 420, 50: 600, 80: 800 };
  const gridWidths = { 50: 700, 70: 840, 100: 1000 };
  return {
    type: 'CHANGE_SIZE',
    payload: {
      gridHeight: gridHeights[numRows],
      gridWidth: gridWidths[numCols],
      numCols,
      numRows,
    },
  };
};

export const changeSpeed = (speed) => {
  const delays = { Slow: 210, Medium: 140, Fast: 70 };
  return {
    type: 'CHANGE_SPEED',
    payload: {
      delay: delays[speed],
    },
  };
};

export const clear = () => ({ type: 'CLEAR' });

export const run = () => ({ type: 'RUN' });
