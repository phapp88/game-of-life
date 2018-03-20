import PropTypes from 'prop-types';
import React from 'react';

const GameBoardHeader = ({
  clear, generation, gridWidth, pause, start,
}) => {
  const gridIsLarge = gridWidth > 450;
  const className = gridIsLarge
    ? 'game-board-header'
    : 'game-board-header game-board-header--mobile';
  const pText = gridIsLarge ? `Generation: ${generation}` : String(generation);
  return (
    <header className={className}>
      <div />
      <button id="run" onClick={start}>Run</button>
      <button id="pause" onClick={pause}>Pause</button>
      <button id="clear" onClick={clear}>Clear</button>
      <p>{pText}</p>
    </header>
  );
};

GameBoardHeader.propTypes = {
  clear: PropTypes.func.isRequired,
  generation: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
  pause: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
};

export default GameBoardHeader;
