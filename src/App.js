import {useState} from "react";

function Square({handleClick, value}) {
    return  <button
                className="square"
                onClick={handleClick}>
                {value}
            </button>;
}

export default function Board() {
    const [isX, setValue] = useState(true);

    function trackState() {
        setValue(!isX);
    }

    const [squares, setSquares] = useState(Array.from({ length: 3 }, () => Array(3).fill(null)));

    const winner = checkWinner(squares);

    const status = winner ? `Winner: ${winner}` : `Next player: ${isX ? "X" : "O"}`;

    function handleClick(i, j) {
        const squaresCopy = squares.slice();

        if (!squaresCopy[i][j] && !winner) {
            if (isX) {
                squaresCopy[i][j] = 'X';
            } else {
                squaresCopy[i][j] = 'O';
            }

            trackState();
            setSquares(squaresCopy);
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
        <>  <div className='status'>{status}</div>
            {board}
        </>
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


