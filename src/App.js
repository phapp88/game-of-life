import { connect } from 'react-redux';

import Layout from './components/Layout';
import { addCell, changeSize, changeSpeed, clear, run } from './actions';

const mapStateToProps = (state) => {
  const {
    delay, generation, grid, gridHeight, gridWidth,
  } = state;
  return {
    delay, generation, grid, gridHeight, gridWidth,
  };
};

const mapDispatchToProps = dispatch => ({
  addCell: (cellCol, cellRow) => dispatch(addCell(cellCol, cellRow)),
  changeSize: (numCols, numRows) => dispatch(changeSize(numCols, numRows)),
  changeSpeed: delay => dispatch(changeSpeed(delay)),
  clear: () => dispatch(clear()),
  run: () => dispatch(run()),
});

const App = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default App;
