import { valueIsValid } from "./generateSudoku";

interface DifficultyDict {
    [key: string]: number;
}

function isBoardFull(board: Array<Array<number>>) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0) {
                return false;
            }
        }
    }
    return true;
}

export function countSolutions(board: Array<Array<number>>, solutions: number = 0): number {
    // If we've found more than one solution, we already know this board isn't good
    // so there's no need to keep going
    if (solutions > 1) {
        return solutions;
    }
    // Find first empty tile
    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i/9);
        const col = i % 9;
        if (board[row][col] == 0) {
            // Try out possible values
            for (let j = 1; j < 10; j++) {
                if (valueIsValid(board, row, col, j)) {
                    board[row][col] = j;
                    if (isBoardFull(board)) {
                        solutions += 1;
                    }
                    else {
                        solutions = countSolutions(board, solutions);
                    }
                }
                board[row][col] = 0;
            }
            // If no valid value is found
            return solutions;
        }
    }
    return solutions;
}

const difficultyDict: DifficultyDict = {
    'easy': 19,
    'medium': 28,
    'hard': 37
}

export function removeTiles(board: Array<Array<number>>, difficulty: string, emptyTiles: number = 0): Array<Array<number>> {
    const targetEmptyTiles = difficultyDict[difficulty];
    if (emptyTiles >= targetEmptyTiles) {
        return board;
    }

    // Grab a random, non-empty tile
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    // Keep going until you find a non-empty tile
    while (board[row][col] === 0) {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
    }
    // Keep track of value so you can backtrack
    const originalTile = board[row][col];
    board[row][col] = 0
    // Figure out if this new board has more than one solution
     const numSolutions = countSolutions(board);
     if (numSolutions > 1) {
        board[row][col] = originalTile;
     }
     else {
        emptyTiles += 1;
     }

     removeTiles(board, difficulty, emptyTiles);
     return board;
}