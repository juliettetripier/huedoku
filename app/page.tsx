"use client";

import Board from "./components/board";
import "./globals.css";
import React, { useState, useEffect, useRef } from "react";
import generateBoard from "./features/generateBoard";
import generateColorPalette from "./features/generateColorPalette";
import SuccessAlert from "./components/successAlert";
import ResetAllButton from "./components/resetAllButton";
import checkForRepeatedTiles from "./features/checkForRepeatedTile";

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

interface EmptyTilesDict {
  [key: string]: number;
}

function getPuzzleByDifficulty(difficulty: string, 
  setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
  setCurrentBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
  setPalette: React.Dispatch<React.SetStateAction<string[]>>,
  boardsByDifficulty: BoardsByDifficulty,
  setBoardsByDifficulty: React.Dispatch<React.SetStateAction<BoardsByDifficulty>>,
  setRepeatedTiles: React.Dispatch<React.SetStateAction<Set<number>>>
) {
  if (boardsByDifficulty[difficulty]) {
    setStartingBoard(boardsByDifficulty[difficulty]['startingBoard']);
    setCurrentBoard(boardsByDifficulty[difficulty]['currentBoard']);
    setPalette(boardsByDifficulty[difficulty]['palette']);
    setRepeatedTiles(boardsByDifficulty[difficulty]['repeatedTiles']);
  } else {
    const newPuzzle = generateBoard(difficulty);
    const newPalette = generateColorPalette();
    setBoardsByDifficulty(prevState => ({
      ...prevState,
      [difficulty]: {
        'startingBoard': newPuzzle,
        'currentBoard': newPuzzle,
        'palette': newPalette,
        'solved': false,
        'previouslySolved': false,
        'repeatedTiles': new Set(),
      }
    }));
    setStartingBoard(newPuzzle);
    setCurrentBoard(newPuzzle);
    setPalette(newPalette);
    setRepeatedTiles(new Set());
  }
}

export default function Home() {
  const [currentBoard, setCurrentBoard] = useState(generateBoard());
  const [startingBoard, setStartingBoard] = useState(currentBoard);
  const [palette, setPalette] = useState<string[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("easy");
  const [boardsByDifficulty, setBoardsByDifficulty] = useState<BoardsByDifficulty>({});
  const [resetButtonDisabled, setResetButtonDisabled] = useState<boolean>(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [repeatedTiles, setRepeatedTiles] = useState(new Set<number>());
  const prevBoardRef = useRef(currentBoard);
  const prevDifficultyRef = useRef(currentDifficulty);

  const setNoTransition = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.classList.add('no-transition');
    });
  };

  const updateBoardsByDifficulty = () => {
    setBoardsByDifficulty(prevState => ({
      ...prevState, 
      [currentDifficulty]: {
        ...prevState[currentDifficulty],
        'currentBoard': currentBoard,
        'repeatedTiles': repeatedTiles
      }
    }));
  }

  const switchDifficulty = (difficulty: string) => {
    setAlertVisible(false);
    updateBoardsByDifficulty();
    setNoTransition();
    const newDifficulty = difficulty;
    setCurrentDifficulty(newDifficulty);
    getPuzzleByDifficulty(newDifficulty, setStartingBoard, setCurrentBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty, setRepeatedTiles);
    if (boardsByDifficulty[newDifficulty] && 
      boardsByDifficulty[newDifficulty].solved) {
      setAlertVisible(true);
    }
  }

  useEffect(() => {
    getPuzzleByDifficulty(currentDifficulty, setStartingBoard, setCurrentBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty, setRepeatedTiles);
  }, []);

  useEffect(() => {
    if (boardsByDifficulty[currentDifficulty] &&
      boardsByDifficulty[currentDifficulty].solved == true) {
        // disable reset button if puzzle is solved
        setResetButtonDisabled(true);
        // increment puzzles solved count
        if (boardsByDifficulty[currentDifficulty].previouslySolved == false) {
          setPuzzlesSolved(prev => prev + 1);
          setBoardsByDifficulty(prevBoards => ({
            ...prevBoards,
            [currentDifficulty]: {
              ...prevBoards[currentDifficulty],
              previouslySolved: true,
            }
          }));
        }
      }
  }, [boardsByDifficulty, currentDifficulty]);

  useEffect(() => {
    // Check if any tiles are filled out to determine if reset button is active
    if (currentBoard) {
      let emptyTiles = 0;
      const emptyTilesDict: EmptyTilesDict = {
        'easy': 19,
        'medium': 28,
        'hard': 37
    }
    const maximumEmptyTiles = emptyTilesDict[currentDifficulty];
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] == 0) {
        emptyTiles += 1;
      }
    }
    if (emptyTiles == maximumEmptyTiles) {
      setResetButtonDisabled(true);
    }
    else {
      setResetButtonDisabled(false);
    }
    };

    // Highlight repeated tiles
    // Make sure this only runs when the board changes because a tile changes,
    // not because the difficulty changes
    const prevDifficulty = prevDifficultyRef.current;
    const prevBoard = prevBoardRef.current;
    let changedTileIndex = undefined;

    if (prevBoard && prevDifficulty === currentDifficulty) {
      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] !== prevBoard[i]) {
          changedTileIndex = i;
          break;
        }
      }
    }

    prevBoardRef.current = currentBoard;
    prevDifficultyRef.current = currentDifficulty;

    // Check changed tile's row/column/square
    if (changedTileIndex !== undefined) {
      const newRepeatedTiles = checkForRepeatedTiles(currentBoard, changedTileIndex);
      // add changed tile to newRepeatedTiles
      if (newRepeatedTiles.size > 0 && currentBoard[changedTileIndex] !== 0) {
        newRepeatedTiles.add(changedTileIndex);
      }
      // check tiles in repeatedTiles
      if (repeatedTiles) {
        repeatedTiles.forEach((tile: number) => {
          const checkedRepeatedTiles = checkForRepeatedTiles(currentBoard, tile);
          if (checkedRepeatedTiles) {
            checkedRepeatedTiles.forEach((tile: number) => {
              newRepeatedTiles.add(tile);
            })
          }
        })
      }
      setRepeatedTiles(newRepeatedTiles);
    }
  }, [currentBoard, currentDifficulty]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="header">
        <img src="./images/huedoku.PNG" alt="Huedoku logo"></img>
        <div className="difficulty-div">
          <button 
            className={`difficulty-button ${currentDifficulty == 'easy' ? 'selected-button disabled': undefined}`}
            id="easy" 
            onClick={() => {
              currentDifficulty == 'easy' ? undefined :
              switchDifficulty('easy');
            }} 
          >
            Easy
          </button>
          <button 
            className={`difficulty-button ${currentDifficulty == 'medium' ? 'selected-button disabled' : undefined}`}
            id="medium" 
            onClick={() => {
              currentDifficulty == 'medium' ? undefined :
              switchDifficulty('medium');
            }}
          >
            Medium
          </button>
          <button 
            className={`difficulty-button ${currentDifficulty == 'hard' ? 'selected-button disabled' : undefined}`}
            id="hard" 
            onClick={() => {
              currentDifficulty == 'hard' ? undefined :
              switchDifficulty('hard');
            }}
          >
            Hard
          </button>
        </div>
        <div>
            <ResetAllButton
              currentDifficulty={currentDifficulty} 
              boardsByDifficulty={boardsByDifficulty}
              setCurrentBoard={setCurrentBoard}
              resetButtonDisabled={resetButtonDisabled}
              setResetButtonDisabled={setResetButtonDisabled}
            />
        </div>
        <div>
          <SuccessAlert 
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard} 
            setStartingBoard={setStartingBoard}
            setPalette={setPalette}
            difficulty={currentDifficulty}
            setBoardsByDifficulty={setBoardsByDifficulty}
            alertVisible={alertVisible}
            setAlertVisible={setAlertVisible}
          />
          <span>Puzzles Solved: { puzzlesSolved }</span>
        </div>
      </div>

      <div>
        <Board 
          currentBoard={currentBoard} 
          setCurrentBoard={setCurrentBoard}
          startingBoard={startingBoard} 
          palette={palette}
          repeatedTiles={repeatedTiles}
          boardsByDifficulty={boardsByDifficulty}
          currentDifficulty={currentDifficulty}
        />
      </div>
    </main>
  );
}
