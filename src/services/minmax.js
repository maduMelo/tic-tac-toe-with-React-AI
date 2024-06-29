function main() {
    let board = [
        ['✕', "‎", "‎"],
        ["‎", "‎", "‎"],
        ["‎", "‎", "‎"]
    ];

    let bestMove = findBestMove(board);
    console.log("The Optimal Move is :", bestMove);
};

function isMoveLeft(board) {
    for (let i = 0; i < 3; i++) {
        if (board[i].includes("‎")) return true;
    };
    return false;
};

function didSomeoneWin(board) {
    for (let i = 0; i < 3; i++) {
        // Verifica se alguém ganhou na horizontal
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "‎") return board[i][0] === '✕' ? 10 : -10;

        // Verifica se alguém ganhou na vertical
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "‎") return board[0][i] === '✕' ? 10 : -10;
    };

    // Verifica se alguém ganhou na diagonal
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "‎") return board[0][0] === '✕' ? 10 : -10;
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "‎") return board[0][2] === '✕' ? 10 : -10;

    // Caso ninguém tenha ganhado ainda
    return 0;
};

function minMax(board, depth, isMax) {
    let score = didSomeoneWin(board);
    if (score === 10) return score - depth; // X (maximizador) ganhou
    if (score === -10) return score + depth; // O (minimizador) ganhou
    if (!isMoveLeft(board)) return 0; // Jogo acabou empatado

    if (isMax) /* Se for a vez do maximizador (X) jogar */ {
        let bestMoveValue = -Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                
                if (board[i][j] === "‎") {
                    board[i][j] = '✕';
                    bestMoveValue = Math.max(bestMoveValue, minMax(board, depth + 1, !isMax));
                    board[i][j] = "‎";
                };
            };
        };
        return bestMoveValue;
    }

    // 
    else /* Se for a vez do minimizador (O) jogar */ {
        let bestMoveValue = Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                
                if (board[i][j] === "‎") {
                    board[i][j] = '◯';
                    bestMoveValue = Math.min(bestMoveValue, minMax(board, depth + 1, !isMax));
                    board[i][j] = "‎";
                };
            };
        };
        return bestMoveValue;
    };
};

function findBestMove(board) {
    let bestMoveValue = Infinity;
    let bestMove = [-1, -1];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            
            if (board[i][j] === "‎") {
                board[i][j] = '◯';
                const moveValue = minMax(board, 0, true);
                board[i][j] = "‎";

                if (moveValue < bestMoveValue) {
                    bestMove = [i, j];
                    bestMoveValue = moveValue;
                };
            };
        };
    };
    return bestMove;
};

main();

export default findBestMove;
export { didSomeoneWin, isMoveLeft };