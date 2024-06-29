import React from 'react';

import IAmove, { didSomeoneWin, isMoveLeft } from '../services/minmax';

function Board(props) {
    // Variáveis de estado
    const [boardMatriz, setBoardMatriz] = React.useState(
        [
            ["‎", "‎", "‎"],
            ["‎", "‎", "‎"],
            ["‎", "‎", "‎"]
        ]
    );
    const [isIaTurn, setIsIaTurn] = React.useState(false);

    function handleIaMove() {
        if (isMoveLeft(boardMatriz) && !didSomeoneWin(boardMatriz)) {
            const bestMove = IAmove(boardMatriz);
            handleMove(bestMove[0], bestMove[1], '◯');
            
        };
    };

    function handleMove(row, col, value) {
        const newBoardMatriz = boardMatriz.map((rowArray, rowIndex) =>
            rowArray.map((item, colIndex) =>
                rowIndex === row && colIndex === col ? value : item
            )
        );
        setBoardMatriz(newBoardMatriz);
    };


    function handleUserMove(event) {
        const id = event.target.id;
        const i = parseInt(id[0]);
        const j = parseInt(id[1]);

        if (boardMatriz[i][j] === "‎" && !didSomeoneWin(boardMatriz)) {
            setIsIaTurn((prevIsIaTurn) => !prevIsIaTurn);
            handleMove(i, j, '✕');
        };
    };

    function restartGame() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.style.backgroundColor = '';
        });

        setBoardMatriz(
            [
                ["‎", "‎", "‎"],
                ["‎", "‎", "‎"],
                ["‎", "‎", "‎"]
            ]
        );
        handleIaMove();
    };

    function checkWinner(board) {
        let someoneWon = 0;
        let squaresToColor = [[-1, -1], [-1, 1], [-1, -1]];

        for (let i = 0; i < 3; i++) {
            // Verifica se alguém ganhou na horizontal
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "‎") {
                someoneWon = (board[i][0] === '✕') ? 1 : -1;
                squaresToColor = [[i, 0], [i, 1], [i, 2]];
            }

            // Verifica se alguém ganhou na vertical
            else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "‎") {
                someoneWon = (board[0][i] === '✕') ? 1 : -1;
                squaresToColor = [[0, i], [1, i], [2, i]];
            };
        };

        // Verifica se alguém ganhou na diagonal
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "‎") {
            someoneWon = (board[0][0] === '✕') ? 1 : -1;
            squaresToColor = [[0, 0], [1, 1], [2, 2]];
        }
        else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "‎") {
            someoneWon = (board[0][2] === '✕') ? 1 : -1;
            squaresToColor = [[0, 2], [1, 1], [2, 0]];
        };

        if (someoneWon) squaresToColor.forEach((pos) => document.getElementById(`${pos[0]}${pos[1]}`).style.backgroundColor = '#75206a31');
        return someoneWon;
    };

    // Movimento da IA sempre que o jogador joga
    React.useEffect(() => {
        handleIaMove();
    }, [isIaTurn]);

    // Checar o fim do jogo
    React.useEffect(() => {
        const isAnyMoveLeft = isMoveLeft(boardMatriz);
        let gameResult = checkWinner(boardMatriz);

        if (gameResult || !isAnyMoveLeft) {
            gameResult = !isAnyMoveLeft ? 0 : gameResult;

            props.recordResult((prevHistory) => ({...prevHistory, [gameResult]: prevHistory[gameResult] + 1}));
            console.log('is IA turn?', isIaTurn);

            const timeOutId = setTimeout(() => {
                restartGame();
                
            }, 3200);
            return () => clearTimeout(timeOutId);
        };
    }, [boardMatriz]);


    return (
        <div>
            <div className="board-column">
                <div id='00' className="square" onClick={handleUserMove}>{boardMatriz[0][0]}</div>
                <div id='10' className="square top-border" onClick={handleUserMove}>{boardMatriz[1][0]}</div>
                <div id='20' className="square top-border" onClick={handleUserMove}>{boardMatriz[2][0]}</div>
            </div>
            <div className="board-column">
                <div id='01' className="square left-border" onClick={handleUserMove}>{boardMatriz[0][1]}</div>
                <div id='11' className="square top-border left-border" onClick={handleUserMove}>{boardMatriz[1][1]}</div>
                <div id='21' className="square top-border left-border" onClick={handleUserMove}>{boardMatriz[2][1]}</div>
            </div>
            <div className="board-column">
                <div id='02' className="square left-border" onClick={handleUserMove}>{boardMatriz[0][2]}</div>
                <div id='12' className="square top-border left-border" onClick={handleUserMove}>{boardMatriz[1][2]}</div>
                <div id='22' className="square top-border left-border" onClick={handleUserMove}>{boardMatriz[2][2]}</div>
            </div>

            <div>
                <button onClick={restartGame}>Restart</button>
            </div>
        </div>
    );
};

export default Board;