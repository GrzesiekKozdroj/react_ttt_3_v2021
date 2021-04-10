import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ val = 'i', handleClick, ki }){
    return (
      <button className="square" ki={ki} onClick={()=> handleClick(ki) }   >
        {val}
      </button>
    );
}


function Board () {
  const [values, setValues] = useState(Array(9).fill(null))
  const [xIsNext, setX] = useState(true)
  const [status, setStatus] = useState(`Next Player: X`)
  const handleClick = i => {
    const squares = values.slice()
    if (calculateWinner(squares) || squares[i]) {      return     }
    squares[i] = xIsNext ? 'X' : 'O'
    setX(!xIsNext)
    setValues(squares)
    setStatus(`Next Player: ${!xIsNext ? 'X' : 'O'}`)
    const winner = calculateWinner(squares)
    if(winner) setStatus(`Winner is: ${winner}`)
  }

  const renderSquare = i => {
    return <Square val={values[i]} ki={i} handleClick={ handleClick }  />;
  }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
