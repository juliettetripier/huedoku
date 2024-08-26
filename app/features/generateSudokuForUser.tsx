// import { valueIsValid } from "./generateSudoku";

function valueIsValid(board: Array<Array<number>>, row: number, col: number, value: number): boolean {
    // Check if value is in row or column
    for (let i = 0; i < 9; i++) {
        // Check if value in row
        if (board[row][i] == value) {
            return false;
        };
        // Check if value in column
        if (board[i][col] == value) {
            return false;
        };
    };
    // Check if value is in 3x3 square
    const squareStartRow = Math.floor(row / 3) * 3;
    const squareStartCol = Math.floor(col / 3) * 3;
    // Iterate over each row
    for (let i = 0; i < 3; i++) {
        // Iterate over each column in row
        for (let j = 0; j < 3; j++) {
            if (board[squareStartRow + i][squareStartCol + j] == value) {
                return false;
            };
        };
    };
    return true;
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

function countSolutions(board: Array<Array<number>>, solutions: number = 0): number {
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

// Testing
// 2 solutions
const board1 = [
    [0, 3, 9, 0, 0, 0, 1, 2, 0],
    [0, 0, 0, 9, 0, 7, 0, 0, 0],
    [8, 0, 0, 4, 0, 1, 0, 0, 6],
    [0, 4, 2, 0, 0, 0, 7, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 1, 0, 0, 0, 5, 4, 0],
    [5, 0, 0, 1, 0, 9, 0, 0, 3],
    [0, 0, 0, 8, 0, 5, 0, 0, 0],
    [0, 1, 4, 0, 0, 0, 8, 7, 0]
]

// 3 solutions
const board2 = [
    [0, 0, 3, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 9, 8, 0, 0, 2, 0],
    [9, 4, 2, 6, 0, 0, 7, 0, 0],
    [4, 5, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 9, 0, 5, 0, 4, 7, 0],
    [0, 0, 0, 0, 2, 5, 0, 4, 0],
    [6, 0, 0, 0, 7, 8, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// 1 solution
const board3 = [
    [0, 0, 2, 0, 3, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 8, 0, 0, 0],
    [0, 3, 1, 0, 2, 0, 0, 0, 0],
    [0, 6, 0, 0, 5, 0, 2, 7, 0],
    [0, 1, 0, 0, 0, 0, 0, 5, 0],
    [2, 0, 4, 0, 6, 0, 0, 3, 1],
    [0, 0, 0, 0, 8, 0, 6, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 1, 3],
    [0, 0, 5, 3, 1, 0, 4, 0, 0]
]

console.log(countSolutions(board1));
console.log(countSolutions(board2));
console.log(countSolutions(board3));

// removeTiles
// choose random non-empty cell
// keep track of its value in a backup variable in case of backtracking
// make a copy of this grid (is this necessary?)
// run solveGrid on that grid with the tile removed
// if the number of solutions > 1, put it back and keep trying
// if the number of solutions == 1, increment the missing tiles variable by 1 and
// keep going
