import {useState} from "react";

function Square({handleClick, value}) {

    return  <button
                className="square"
                onClick={handleClick}>
                {value}
            </button>;
}

function Board({isX, squares, onPlay}) {

    const winner = checkWinner(squares);

    const status = winner ? `Winner: ${winner}` : `Next player: ${isX ? "X" : "O"}`;


    function handleClick(i, j) {
        const nextSquares = JSON.parse(JSON.stringify(squares));
        if (!nextSquares[i][j] && !winner) {
            nextSquares[i][j] = isX ? 'X' : 'O';
            onPlay(nextSquares);
        }
    }

    const board = squares.map((row, i) => (
        <div key={i} className="board-row">
            {row.map((cell, j) => (
                <Square key={j} handleClick={() => handleClick(i, j)} value={cell} />
            ))}
        </div>
    ));

    return (
        <>
            <div className='status'>{status}</div>
            {board}
        </>
    );
}

function GameInfo({history, jumpTo}) {
    return history.map((squares, move) => {
        const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
}

export default function Game() {
    const [history, setHistory] = useState([Array.from({ length: 3 }, () => Array(3).fill(null))]);
    const [currentMove, setCurrentMove] = useState(0);
    const isX = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function reset() {
        setHistory([Array.from({ length: 3 }, () => Array(3).fill(null))]);
        setCurrentMove(0);
    }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    return (
        <div className="game">
            <div className="game-board">
                <div className='game-container'>
                <Board isX={isX} squares={currentSquares} onPlay={handlePlay}/>
                    <div className='reset-container'>
                        <button onClick={reset}>reset</button>
                    </div>
                </div>
            </div>
            <div className="game-info">
                <ol>{<GameInfo history={history} jumpTo={jumpTo}/>}</ol>
            </div>
        </div>
    );
}

function checkWinner(squares) {
    if (squares[1][1] &&
        ((squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) || (squares[0][2] === squares[1][1] && squares[0][2] === squares[2][0]))) {
        return squares[1][1];
    }
    for (let i = 0; i < 3; i++) {
        if (squares[i][0] && squares[i][0] === squares[i][1] && squares[i][0] === squares[i][2]){
            return squares[i][0];
        }
        if (squares[0][i] && squares[0][i] === squares[1][i] && squares[0][i] === squares[2][i]){
            return squares[0][i];
        }
    }
    return null;
}


