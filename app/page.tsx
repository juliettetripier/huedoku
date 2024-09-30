"use client";

import Board from "./components/board";
import "./globals.css";
import React, { useState, useEffect } from "react";
import generateBoard from "./features/generateBoard";
import generateColorPalette from "./features/generateColorPalette";
import { SuccessAlert } from "./components/successAlert";

interface BoardsByDifficulty {
  [difficulty: string]: {
    startingBoard: number[];
    currentBoard: number[];
    palette: string[];
    solved: boolean;
  }
}

function getPuzzleByDifficulty(difficulty: string, 
  setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
  setCurrentBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
  setPalette: React.Dispatch<React.SetStateAction<string[]>>,
  boardsByDifficulty: BoardsByDifficulty,
  setBoardsByDifficulty: React.Dispatch<React.SetStateAction<BoardsByDifficulty>>
) {
  if (boardsByDifficulty[difficulty]) {
    setStartingBoard(boardsByDifficulty[difficulty]['startingBoard']);
    setCurrentBoard(boardsByDifficulty[difficulty]['currentBoard']);
    setPalette(boardsByDifficulty[difficulty]['palette']);
  } else {
    const newPuzzle = generateBoard(difficulty);
    const newPalette = generateColorPalette();
    setStartingBoard(newPuzzle);
    setCurrentBoard(newPuzzle);
    setPalette(newPalette);
    setBoardsByDifficulty(prevState => ({
      ...prevState,
      [difficulty]: {
        'startingBoard': newPuzzle,
        'currentBoard': newPuzzle,
        'palette': newPalette,
        'solved': false
      }
    }));
  }
}

export default function Home() {
  const [currentBoard, setCurrentBoard] = useState(generateBoard());
  const [startingBoard, setStartingBoard] = useState(currentBoard);
  const [palette, setPalette] = useState<string[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("easy");
  const [boardsByDifficulty, setBoardsByDifficulty] = useState<BoardsByDifficulty>({});
  const [alertVisible, setAlertVisible] = useState(false);

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
        'currentBoard': currentBoard
      }
    }));
  }

  const switchDifficulty = (difficulty: string) => {
    setAlertVisible(false);
    updateBoardsByDifficulty();
    setNoTransition();
    const newDifficulty = difficulty;
    setCurrentDifficulty(newDifficulty);
    getPuzzleByDifficulty(newDifficulty, setStartingBoard, setCurrentBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty);
    if (boardsByDifficulty[newDifficulty].solved) {
      setAlertVisible(true);
    }
  }

  useEffect(() => {
    getPuzzleByDifficulty(currentDifficulty, setStartingBoard, setCurrentBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="header">
        <h1>Huedoku</h1>
        <div className="difficulty-div">
          <button 
            className={`difficulty-button ${currentDifficulty == 'easy' ? 'selected-button': undefined}`}
            id="easy" 
            onClick={() => {
              switchDifficulty('easy');
            }} 
          >
            Easy
          </button>
          <button 
            className={`difficulty-button ${currentDifficulty == 'medium' ? 'selected-button' : undefined}`}
            id="medium" 
            onClick={() => {
              switchDifficulty('medium');
            }}
          >
            Medium
          </button>
          <button 
            className={`difficulty-button ${currentDifficulty == 'hard' ? 'selected-button' : undefined}`}
            id="hard" 
            onClick={() => {
              switchDifficulty('hard');
            }}
          >
            Hard
          </button>
        </div>
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
      </div>

      <div>
        <Board 
          currentBoard={currentBoard} 
          setCurrentBoard={setCurrentBoard}
          startingBoard={startingBoard} 
          palette={palette}
        />
      </div>
    </main>
  );
}
