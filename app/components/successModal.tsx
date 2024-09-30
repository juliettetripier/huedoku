import { useState, useEffect } from "react";
import { Modal, Button } from "@mantine/core";
import generateBoard from "../features/generateBoard";
import generateColorPalette from "../features/generateColorPalette";
import { checkForValidSolution } from "../features/validateSolution";

interface BoardsByDifficulty {
    [difficulty: string]: {
      startingBoard: number[];
      currentBoard: number[];
      palette: string[];
    }
}


function getNewPuzzle(difficulty: string,
    setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setPalette: React.Dispatch<React.SetStateAction<Array<string>>>,
    setCurrentBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setBoardsByDifficulty: React.Dispatch<React.SetStateAction<BoardsByDifficulty>> ) {

    const newBoard = generateBoard(difficulty);
    setStartingBoard(newBoard);
    setCurrentBoard(newBoard);

    const newPalette = generateColorPalette();
    setPalette(newPalette);

    setBoardsByDifficulty(prevState => ({
        ...prevState,
        [difficulty]: {
            'startingBoard': newBoard,
            'currentBoard': newBoard,
            'palette': newPalette
        }
    }));
}


export function SuccessModal({ currentBoard, setCurrentBoard, setStartingBoard, setPalette, difficulty, setBoardsByDifficulty, setShowNewPuzzleButton }: {
    currentBoard: Array<number>,
    setCurrentBoard: React.Dispatch <React.SetStateAction<Array<number>>>,
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
        if (checkForValidSolution(currentBoard)) {
            setModalOpen(true);
            setShowNewPuzzleButton(true);
        }
    }, [currentBoard]);

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
                        getNewPuzzle(difficulty, setStartingBoard, setPalette, setCurrentBoard, setBoardsByDifficulty)}
                    }>
                        New puzzle
                    </Button>
                    <Button onClick={() => setModalOpen(false)}>Admire puzzle</Button>
                </Modal.Body>
            </Modal.Content>
        </Modal.Overlay>
    </Modal.Root>
}
