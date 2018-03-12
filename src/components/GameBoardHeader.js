import PropTypes from 'prop-types';
import React from 'react';

const GameBoardHeader = ({
  clear, generation, pause, start,
}) => (
  <header className="game-board-header">
    <div />
    <button id="run" onClick={start}>Run</button>
    <button id="pause" onClick={pause}>Pause</button>
    <button id="clear" onClick={clear}>Clear</button>
    <p>Generation: {generation}</p>
  </header>
);

GameBoardHeader.propTypes = {
  clear: PropTypes.func.isRequired,
  generation: PropTypes.number.isRequired,
  pause: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
};

export default GameBoardHeader;
