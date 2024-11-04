import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";
import confetti from 'canvas-confetti';
import generateBoard from "../features/generateBoard";
import generateColorPalette from "../features/generateColorPalette";
import { checkForValidSolution } from "../features/validateSolution";

interface BoardsByDifficulty {
    [difficulty: string]: {
      startingBoard: number[];
      currentBoard: number[];
      palette: string[];
      solved: boolean;
      previouslySolved: boolean;
      repeatedTiles: Set<number>;
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
            'palette': newPalette,
            'solved': false,
            'previouslySolved': false,
            'repeatedTiles': new Set(),
        }
    }));
}


export default function NewPuzzleButton({ currentBoard, setCurrentBoard, setStartingBoard, setPalette, difficulty, setBoardsByDifficulty }: {
    currentBoard: Array<number>,
    setCurrentBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setPalette: React.Dispatch<React.SetStateAction<Array<string>>>,
    difficulty: string,
    setBoardsByDifficulty:  React.Dispatch<React.SetStateAction<BoardsByDifficulty>>,
}) {
    const [opened, { open, close }] = useDisclosure(false);

    const setNoTransition = () => {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
        tile.classList.add('no-transition');
        });
    };

    useEffect(() => {
        if (checkForValidSolution(currentBoard)) {
            confetti();
            setBoardsByDifficulty(prevState => ({
                ...prevState, 
                [difficulty]: {
                    ...prevState[difficulty],
                    'solved': true
                }
            }));
        }
    }, [currentBoard]);

    return <>
    <Modal opened={opened}
        onClose={close}
        title="Are you sure you want to generate a new puzzle?">
            <p>You won&apos;t be able to access this puzzle again.</p>
            <div className="confirmation-div">
                <Button className="minimal-button confirmation-button" 
                    onClick={() => {
                        setNoTransition();
                        getNewPuzzle(difficulty, setStartingBoard, setPalette, setCurrentBoard, setBoardsByDifficulty);
                        close();
                    }}>
                    New Puzzle
                </Button>
                <Button variant="filled" color="red" className="confirmation-button" onClick={close}>
                    Cancel
                </Button>
            </div>
    </Modal>
    <Button className="filled-button new-puzzle-button" 
    onClick = {() => {open()}}>
        New Puzzle
    </Button>
    </>
}
