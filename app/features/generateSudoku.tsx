const initialBoard = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0] 
    ];

// Checks if the value is valid (not present in row, column, or square)
export function valueIsValid(board: Array<Array<number>>, row: number, col: number, value: number): boolean {
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

let possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Shuffle an array (used to randomize order of values we try)
function shuffleValues(values: Array<number>) {
    // Fisher-Yates algorithm
    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    };
}

// Recursively fill the board
export function fillBoard(board: Array<Array<number>>) {
    // Find first empty tile
    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i/9);
        const col = i % 9;
        if (board[row][col] == 0) {
            // Shuffle possibleValues
            shuffleValues(possibleValues);
            // Try out potential value for tile
            for (let value of possibleValues) {
                // Check if value is valid
                if (valueIsValid(board, row, col, value)) {
                    board[row][col] = value;
                    // Recursively call fillBoard with this new value
                    if (fillBoard(board)) {
                        return true;
                    }
                    // Allow for backtracking if you reach a dead end
                    board[row][col] = 0;
                }
            }
            // If you've tried out all possible values and none were valid
            return false;
        }
    }
    // If there are no blank tiles remaining
    return true;
}