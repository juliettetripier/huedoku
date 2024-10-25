import { useState, useEffect } from "react";
import { Alert, Button } from "@mantine/core";
import { IconTrophy } from "@tabler/icons-react";
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


export default function SuccessAlert({ currentBoard, setCurrentBoard, setStartingBoard, setPalette, difficulty, setBoardsByDifficulty, alertVisible, setAlertVisible }: {
    currentBoard: Array<number>,
    setCurrentBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    setPalette: React.Dispatch<React.SetStateAction<Array<string>>>,
    difficulty: string,
    setBoardsByDifficulty:  React.Dispatch<React.SetStateAction<BoardsByDifficulty>>,
    alertVisible: boolean,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>> 
}) {
    const icon = <IconTrophy />;
    
    const setNoTransition = () => {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
        tile.classList.add('no-transition');
        });
    };

    useEffect(() => {
        if (checkForValidSolution(currentBoard)) {
            setAlertVisible(true);
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

    return <Alert 
            variant="light" 
            color="green" 
            title="Puzzle Solved!" 
            icon={ icon } 
            style={{ display: alertVisible ? 'block' : 'none' }}
        >
        <Button onClick = {() => {
            setNoTransition();
            setAlertVisible(false);
            getNewPuzzle(difficulty, setStartingBoard, setPalette, setCurrentBoard, setBoardsByDifficulty)}
        }>
            New puzzle
        </Button>
    </Alert>
}
