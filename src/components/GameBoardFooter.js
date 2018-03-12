import PropTypes from 'prop-types';
import React from 'react';

const GameBoardFooter = ({ changeSize, changeSpeed }) => {
  const handleSizeChange = (event) => {
    const [numCols, numRows] = event.target.textContent.split(' x ').map(Number);
    const sizeBtns = document.querySelectorAll('.btn--size');
    sizeBtns.forEach(btn => btn.classList.remove('btn--active'));
    event.target.classList.add('btn--active');
    changeSize(numCols, numRows);
  };

  const handleSpeedChange = (event) => {
    const speedBtns = document.querySelectorAll('.btn--speed');
    speedBtns.forEach(btn => btn.classList.remove('btn--active'));
    event.target.classList.add('btn--active');
    changeSpeed(event.target.textContent);
  };

  return (
    <footer className="game-board-footer">
      <p>Board Size:</p>
      <button className="btn--size" onClick={handleSizeChange}>50 x 30</button>
      <button className="btn--size btn--active" onClick={handleSizeChange}>70 x 50</button>
      <button className="btn--size" onClick={handleSizeChange}>100 x 80</button>
      <p>Sim Speed:</p>
      <button className="btn--speed" onClick={handleSpeedChange}>Slow</button>
      <button className="btn--speed" onClick={handleSpeedChange}>Medium</button>
      <button className="btn--speed btn--active" onClick={handleSpeedChange}>Fast</button>
    </footer>
  );
};

GameBoardFooter.propTypes = {
  changeSize: PropTypes.func.isRequired,
  changeSpeed: PropTypes.func.isRequired,
};

export default GameBoardFooter;
