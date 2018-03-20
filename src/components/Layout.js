import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Footer from './Footer';
import GameBoard from './GameBoard';
import GameBoardFooter from './GameBoardFooter';
import GameBoardHeader from './GameBoardHeader';
import Header from './Header';

const handleActionBtns = (action) => {
  const btn = document.getElementById(action);
  if (action !== 'pause') {
    document.getElementById('pause').classList.remove('btn--active');
    setTimeout(() => btn.classList.remove('btn--active'), 750);
  }
  btn.classList.add('btn--active');
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
    this.pause = this.pause.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.props.run, this.props.delay);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.delay !== this.props.delay && this.interval) {
      clearInterval(this.interval);
      this.interval = setInterval(this.props.run, this.props.delay);
    }
  }

  componenWillUnmount() {
    clearInterval(this.interval);
  }

  clear() {
    clearInterval(this.interval);
    this.interval = 0;
    this.props.clear();
    handleActionBtns('clear');
  }

  pause() {
    clearInterval(this.interval);
    this.interval = 0;
    handleActionBtns('pause');
  }

  start() {
    if (this.interval === 0) {
      this.interval = setInterval(this.props.run, this.props.delay);
      handleActionBtns('run');
    }
  }

  render() {
    const {
      addCell, changeSize, changeSpeed, delay, grid, generation, gridHeight, gridWidth,
    } = this.props;
    return (
      <main>
        <Header />
        <GameBoardHeader
          generation={generation}
          gridWidth={gridWidth}
          clear={this.clear}
          pause={this.pause}
          start={this.start}
        />
        <GameBoard
          addCell={addCell}
          grid={grid}
          height={gridHeight}
          width={gridWidth}
        />
        <GameBoardFooter
          changeSize={changeSize}
          changeSpeed={changeSpeed}
          delay={delay}
          gridWidth={gridWidth}
        />
        <Footer />
      </main>
    );
  }
}

Layout.propTypes = {
  addCell: PropTypes.func.isRequired,
  changeSize: PropTypes.func.isRequired,
  changeSpeed: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  generation: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
  run: PropTypes.func.isRequired,
};

export default Layout;
