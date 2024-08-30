import { Dispatch, SetStateAction } from "react";
import { TileProps } from "../components/tile";

// Add function to set Board on color selection
export function updateBoard(props: TileProps, value: number) {
    let newBoard: Array<number> = [];
    props.setBoard(prevBoard => {
        newBoard = [...prevBoard];
        newBoard[props.tileIndex] = value;
        return newBoard;
    });
    return newBoard;
}
    
function isBoardFull(board: Array<number>) {
    for (let i = 0; i < 81; i++) {
        if (board[i] == 0) {
            return false;
        }
    }
    return true;
}

// add function to check if board is full and make submit button visible if so
export function checkIfSubmittable(board: Array<number>) {
    const submitButton = document.querySelector('.submit-button') as HTMLElement;
    if (submitButton) {
        if (isBoardFull(board)) {
            console.log('HEY TYHE BOARD IS BFULLLL');
            submitButton.classList.remove('disabled');
        }
        else {
            console.log('board is not full');
            submitButton.classList.add('disabled');
        }
    }
}