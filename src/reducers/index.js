const maxGridDims = (screenWidth) => {
  let dims = {};
  if (screenWidth < 500) {
    dims = {
      gridHeight: 180, gridWidth: 300, numCols: 25, numRows: 15,
    };
  } else if (screenWidth < 750) {
    dims = {
      gridHeight: 270, gridWidth: 450, numCols: 37, numRows: 23,
    };
  } else if (screenWidth < 900) {
    dims = {
      gridHeight: 420, gridWidth: 700, numCols: 50, numRows: 30,
    };
  } else if (screenWidth < 1075) {
    dims = {
      gridHeight: 600, gridWidth: 840, numCols: 70, numRows: 50,
    };
  } else {
    dims = {
      gridHeight: 800, gridWidth: 1000, numCols: 100, numRows: 80,
    };
  }
  return dims;
};

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

const getInitialState = () => {
  const {
    gridHeight,
    gridWidth,
    numCols,
    numRows,
  } = maxGridDims(window.innerWidth);
  return {
    delay: 70,
    generation: 0,
    grid: randomGrid(numCols, numRows),
    gridHeight,
    gridWidth,
  };
};

const initialState = getInitialState();

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
