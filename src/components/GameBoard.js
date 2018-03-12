import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.drawGrid();
  }

  componentDidUpdate() {
    this.drawGrid();
  }

  drawGrid() {
    const { grid, height, width } = this.props;
    const ctx = this.canvas.getContext('2d');
    const cellHeight = height / grid.length;
    const cellWidth = width / grid[0].length;
    ctx.fillStyle = 'black';
    ctx.strokeStyle = '#343436';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'BlueViolet';
    grid.forEach((rowArr, row) => rowArr.forEach((isAlive, col) => {
      ctx.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
      if (isAlive) {
        ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
      }
    }));
  }

  handleClick(event) {
    const { borderLeftWidth, borderTopWidth } = window.getComputedStyle(this.canvas);
    const {
      addCell, grid, height, width,
    } = this.props;
    const clickX = event.clientX - parseFloat(borderLeftWidth, 10) - this.canvas.offsetLeft;
    const clickY = event.clientY - parseFloat(borderTopWidth, 10) - this.canvas.offsetTop;
    const cellHeight = height / grid.length;
    const cellWidth = width / grid[0].length;
    const cellCol = Math.floor(clickX / cellWidth);
    const cellRow = Math.floor(clickY / cellHeight);
    addCell(cellCol, cellRow);
  }

  render() {
    const { height, width } = this.props;
    return (
      <canvas
        height={height}
        onClick={this.handleClick}
        ref={(canvas) => { this.canvas = canvas; }}
        width={width}
      />
    );
  }
}

GameBoard.propTypes = {
  addCell: PropTypes.func.isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default GameBoard;
