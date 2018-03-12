const nextGen = (grid) => {
  const numRows = grid.length;
  const numCols = grid[0].length;
  return grid.map((rowArr, row) => rowArr.map((isAlive, col) => {
    let aliveNeighbors = 0;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (!(c === col && r === row)) {
          const neighborIsAlive = grid[(r + numRows) % numRows][(c + numCols) % numCols];
          if (neighborIsAlive) {
            aliveNeighbors++;
          }
        }
      }
    }
    if (isAlive) {
      return aliveNeighbors > 1 && aliveNeighbors < 4;
    }
    return aliveNeighbors === 3;
  }));
};

const randomGrid = (numCols, numRows) =>
  Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => Math.random() >= 0.6));

const initialState = {
  delay: 70,
  generation: 0,
  grid: randomGrid(70, 50),
  gridHeight: 600,
  gridWidth: 840,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CELL': {
      const { cellCol, cellRow } = action.payload;
      return {
        ...state,
        grid: [
          ...state.grid.slice(0, cellRow),
          [
            ...state.grid[cellRow].slice(0, cellCol),
            true,
            ...state.grid[cellRow].slice(cellCol + 1),
          ],
          ...state.grid.slice(cellRow + 1),
        ],
      };
    }
    case 'CHANGE_SIZE': {
      const {
        gridHeight, gridWidth, numCols, numRows,
      } = action.payload;
      return {
        ...state,
        generation: 0,
        grid: randomGrid(numCols, numRows),
        gridHeight,
        gridWidth,
      };
    }
    case 'CHANGE_SPEED': {
      return { ...state, delay: action.payload.delay };
    }
    case 'CLEAR': {
      return {
        ...state,
        generation: 0,
        grid: state.grid.map(rowArr => rowArr.map(() => false)),
      };
    }
    case 'RUN': {
      return { ...state, generation: state.generation + 1, grid: nextGen(state.grid) };
    }
    default:
      return state;
  }
};

export default reducer;
