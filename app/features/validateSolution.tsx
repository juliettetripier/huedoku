import { TileProps } from "../components/tile";

// Update board state when a new color is selected
export function updateBoard(props: TileProps, value: number) {
    let newBoard: Array<number> = [];
    props.setCurrentBoard(prevBoard => {
        newBoard = [...prevBoard];
        newBoard[props.tileIndex] = value;
        return newBoard;
    });
    return newBoard;
}
    

export function isBoardFull(board: Array<number>) {
    for (let i = 0; i < 81; i++) {
        if (board[i] == 0) {
            return false;
        }
    }
    return true;
}


// Check if a filled-out board is valid
export function solutionIsValid(board: Array<number>) {
    for (let i = 0; i < 81; i++) {
        // figure out row and column
        const row = Math.floor(i / 9);
        const col = i % 9;

        // check if value in row
        const rowStartIndex = row * 9;
        const rowEndIndex = (row + 1) * 9 - 1;
        for (let j = rowStartIndex; j <= rowEndIndex; j++) {
            if (board[j] == board[i] && j!= i) {
                return false;
            }
        }

        // check if value in column
        for (let j = col; j < 81; j+=9) {
            if (board[j] == board[i] && j != i) {
                return false;
            }
        }
        
        // figure out square
        const squareStartRow = Math.floor(row / 3) * 3;
        const squareStartCol = Math.floor(col / 3) * 3;

        // check if value in square
        for (let j = squareStartRow; j < squareStartRow + 3; j++) {
            for (let k = squareStartCol; k < squareStartCol + 3; k++) {
                const index = j * 9 + k;
                if (board[index] == board[i] && index != i) {
                    return false;
                }
            }
        }
    }
    return true;
}

export function checkForValidSolution(board: Array<number>) {
    if (isBoardFull(board)) {
        if (solutionIsValid(board)) {
            return true;
        };
    };
    return false;
}