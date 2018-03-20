import PropTypes from 'prop-types';
import React from 'react';

const GameBoardFooter = ({
  changeSize, changeSpeed, delay, gridWidth,
}) => {
  const handleSizeChange = (event) => {
    const [numCols, numRows] = event.target.textContent.split(' x ').map(Number);
    changeSize(numCols, numRows);
  };
  const handleSpeedChange = (event) => { changeSpeed(event.target.textContent); };

  const gridIsLarge = gridWidth > 450;
  const className = gridIsLarge
    ? 'game-board-footer'
    : 'game-board-footer game-board-footer--mobile';

  return (
    <footer className={className}>
      {gridIsLarge && <p>Board Size:</p>}
      {gridIsLarge &&
        <button
          className={gridWidth === 700 ? 'btn--size btn--active' : 'btn--size'}
          onClick={handleSizeChange}
        >50 x 30
        </button>}
      {gridIsLarge &&
        <button
          className={gridWidth === 840 ? 'btn--size btn--active' : 'btn--size'}
          onClick={handleSizeChange}
        >70 x 50
        </button>}
      {gridIsLarge &&
        <button
          className={gridWidth === 1000 ? 'btn--size btn--active' : 'btn--size'}
          onClick={handleSizeChange}
        >100 x 80
        </button>}
      {gridIsLarge && <p>Sim Speed:</p>}
      <button
        className={delay === 210 ? 'btn--speed btn--active' : 'btn-speed'}
        onClick={handleSpeedChange}
      >Slow
      </button>
      <button
        className={delay === 140 ? 'btn--speed btn--active' : 'btn-speed'}
        onClick={handleSpeedChange}
      >Medium
      </button>
      <button
        className={delay === 70 ? 'btn--speed btn--active' : 'btn-speed'}
        onClick={handleSpeedChange}
      >Fast
      </button>
    </footer>
  );
};

GameBoardFooter.propTypes = {
  changeSize: PropTypes.func.isRequired,
  changeSpeed: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
};

export default GameBoardFooter;
