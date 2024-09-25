import { TileProps } from "../components/tile";

// Update board state when a new color is selected
// Check if board is full
// Check if filled out board is valid
// Repurpose checkIfSubmittable to instead open modal
// If valid:
    // Open modal/overlay with "new puzzle" button
    // and "admire puzzle" button to click out of modal
    // have a "new puzzle" button above the board so they can
    // get a new puzzle if they click out
// Don't have to do anything if not valid


// We also need to highlight repeated colors as they're selected
// Maybe in the board component, where we're currently checking if submittable
// or maybe in tile component...? would it be more efficient to 
// specifically check for the tile that was just selected instead
// of checking the whole board for repeats? 


// Update board state when a new color is selected
export function updateBoard(props: TileProps, value: number) {
    let newBoard: Array<number> = [];
    props.setBoard(prevBoard => {
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