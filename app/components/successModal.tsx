import { useState, useEffect } from "react";
import { Modal, Button } from "@mantine/core";
import generateBoard from "../features/generateBoard";
import generateColorPalette from "../features/generateColorPalette";
import { checkForValidSolution } from "../features/validateSolution";

interface BoardsByDifficulty {
    [difficulty: string]: {
      board: number[];
      palette: string[];
    }
}


function getNewPuzzle(difficulty: string,
    setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setPalette: React.Dispatch<React.SetStateAction<Array<string>>>,
    setBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setBoardsByDifficulty: React.Dispatch<React.SetStateAction<BoardsByDifficulty>> ) {

    const newBoard = generateBoard(difficulty);
    setStartingBoard(newBoard);
    setBoard(newBoard);

    const newPalette = generateColorPalette();
    setPalette(newPalette);

    setBoardsByDifficulty(prevState => ({
        ...prevState,
        [difficulty]: {
            'board': newBoard,
            'palette': newPalette
        }
    }));
}


export function SuccessModal({ board, setBoard, setStartingBoard, setPalette, difficulty, setBoardsByDifficulty, setShowNewPuzzleButton }: {
    board: Array<number>,
    setBoard: React.Dispatch <React.SetStateAction<Array<number>>>,
    setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setPalette: React.Dispatch<React.SetStateAction<Array<string>>>,
    difficulty: string,
    setBoardsByDifficulty:  React.Dispatch<React.SetStateAction<BoardsByDifficulty>>,
    setShowNewPuzzleButton: React.Dispatch<React.SetStateAction<boolean>> }) 
{
    const [isModalOpen, setModalOpen] = useState(false);
    const modalStyle = { borderTop: '.375rem solid #4c8c2b' };
    
    const setNoTransition = () => {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
        tile.classList.add('no-transition');
        });
    };

    useEffect(() => {
        if (checkForValidSolution(board)) {
            setModalOpen(true);
            setShowNewPuzzleButton(true);
        }
    }, [board]);

    return <Modal.Root opened={isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Overlay>
            <Modal.Content>
                <Modal.Header style={modalStyle}>
                    <Modal.Title>
                        Success!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You won!
                    <Button onClick = {() => {
                        setNoTransition();
                        setShowNewPuzzleButton(false); 
                        getNewPuzzle(difficulty, setStartingBoard, setPalette, setBoard, setBoardsByDifficulty)}
                    }>
                        New puzzle
                    </Button>
                    <Button onClick={() => setModalOpen(false)}>Admire puzzle</Button>
                </Modal.Body>
            </Modal.Content>
        </Modal.Overlay>
    </Modal.Root>
}
