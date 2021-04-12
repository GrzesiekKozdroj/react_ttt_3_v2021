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
      <button className="square" key={ki} onClick={()=> handleClick(ki) }   >
        {val}
      </button>
    );
}


const renderSquare = ({i, values, handleClick}) => {
  return <Square key={i} val={values[i]} ki={i} handleClick={ handleClick }  />;
}

const renderRow = ({i, values, handleClick}) => {
  let produce = []
  for (let l = i; l < i+3; l++){
    produce = [...produce, renderSquare({i:l, values, handleClick })]
  }

  return (
    <div className="board-row">
      { produce }
    </div>
  )
}

const HistoryButton = ({i, handleClick}) => {
  return (
    <li>
      <button onClick={()=>handleClick(i-1)} key={i} >{i-1===0?'Start of the Game' : `Turn: ${i-1}`}</button>
    </li>
  )
}

function Board ({values, handleClick, status}) {

  return (
    <div>
      <div className="status">{status}</div>
        {renderRow({i:0, values, handleClick})}
        {renderRow({i:3, values, handleClick})}
        {renderRow({i:6, values, handleClick})}
    </div>
  );
}


function Game () {
  const [values, setValues] = useState(Array(9).fill(null))
  const [xIsNext, setX] = useState(true)
  const [status, setStatus] = useState(`Next Player: X`)
  const [history, setHistory] = useState([values])
  const [historyButtons, sethBtns] = useState([])
  const [stepMove, setStepMove] = useState(0)

  const handleClick = i => {
    const squares = values.slice()
    if (calculateWinner(squares) || squares[i]) 
      {      return     }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory([...history, squares])
    const historyClick = (i) => { 
      const newXIsNext = (i % 2 === 0)
      setX( newXIsNext )
      const slicedHistory = history.slice(0,i+1)
      const slicedButtons = historyButtons.slice(0,i+1)
      sethBtns( slicedButtons )
      setHistory( slicedHistory )
      setValues( history[i] )
      setStatus( `Next Player: ${ newXIsNext ? 'X' : 'O' }` )
     }
    setX(!xIsNext)
    setStepMove(stepMove+1)
    setValues(squares)
    setStatus(`Next Player: ${!xIsNext ? 'X' : 'O'}`)
    sethBtns([...historyButtons, <HistoryButton i={history.length} handleClick={historyClick} key={i} /> ])
    const winner = calculateWinner(squares)
    if(winner) 
      setStatus(`Winner is: ${winner}`)
  }

    return (
      <div className="game">
        <div className="game-board">
          <Board values={values} handleClick={handleClick} status={status} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ul>{historyButtons}</ul>
        </div>
      </div>
    )
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
