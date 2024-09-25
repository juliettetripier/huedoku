"use client";

import Board from "./components/board";
import "./globals.css";
import React, { useState, useEffect } from "react";
import generateBoard from "./features/generateBoard";
import generateColorPalette from "./features/generateColorPalette";
import { SuccessModal } from "./components/successModal";

interface BoardsByDifficulty {
  [difficulty: string]: {
    board: number[];
    palette: string[];
  }
}

function getPuzzleByDifficulty(difficulty: string, 
  setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
  setBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
  setPalette: React.Dispatch<React.SetStateAction<string[]>>,
  boardsByDifficulty: BoardsByDifficulty,
  setBoardsByDifficulty: React.Dispatch<React.SetStateAction<BoardsByDifficulty>>
) {
  if (boardsByDifficulty[difficulty]) {
    setStartingBoard(boardsByDifficulty[difficulty]['board']);
    setBoard(boardsByDifficulty[difficulty]['board']);
    setPalette(boardsByDifficulty[difficulty]['palette']);
  } else {
    const newPuzzle = generateBoard(difficulty);
    const newPalette = generateColorPalette();
    setStartingBoard(newPuzzle);
    setBoard(newPuzzle);
    setPalette(newPalette);
    setBoardsByDifficulty(prevState => ({
      ...prevState,
      [difficulty]: {
        'board': newPuzzle,
        'palette': newPalette
      }
    }));
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

export default function Home() {
  const [board, setBoard] = useState(generateBoard());
  // startingBoard is set to the value of board only when the board
  // first renders. Subsequent setBoards won't update startingBoard
  const [startingBoard, setStartingBoard] = useState(board);
  const [palette, setPalette] = useState<string[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("easy");
  const [boardsByDifficulty, setBoardsByDifficulty] = useState<BoardsByDifficulty>({});
  const [showNewPuzzleButton, setShowNewPuzzleButton] = useState(false);

  const setNoTransition = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.classList.add('no-transition');
    });
  };

  useEffect(() => {
    getPuzzleByDifficulty(currentDifficulty, setStartingBoard, setBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty);
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
              setNoTransition();
              // maybe check if new puzzle button is visible
              // and if so, put new puzzle in puzzlesbydifficulty
              // and hide new puzzle button
              const newDifficulty = "easy";
              setCurrentDifficulty(newDifficulty);
              getPuzzleByDifficulty(newDifficulty, setStartingBoard, setBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty);
            }} 
          >
            Easy
          </button>
          <button 
            className={`difficulty-button ${currentDifficulty == 'medium' ? 'selected-button' : undefined}`}
            id="medium" 
            onClick={() => {
              setNoTransition();
              const newDifficulty = "medium";
              setCurrentDifficulty(newDifficulty);
              getPuzzleByDifficulty(newDifficulty, setStartingBoard, setBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty);
            }}
          >
            Medium
          </button>
          <button 
            className={`difficulty-button ${currentDifficulty == 'hard' ? 'selected-button' : undefined}`}
            id="hard" 
            onClick={() => {
              setNoTransition();
              const newDifficulty = "hard";
              setCurrentDifficulty(newDifficulty);
              getPuzzleByDifficulty(newDifficulty, setStartingBoard, setBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty)
            }}
          >
            Hard
          </button>
        </div>
        <button 
          className="new-puzzle-button" 
          style={{ display: showNewPuzzleButton ? "block" : "none" }}
          onClick = {() => {
            setNoTransition();
            setShowNewPuzzleButton(false); 
            getNewPuzzle(currentDifficulty, setStartingBoard, setPalette, setBoard, setBoardsByDifficulty)}}
        >
          New puzzle
        </button>
        <SuccessModal 
          board={board}
          setBoard={setBoard} 
          setStartingBoard={setStartingBoard}
          setPalette={setPalette}
          difficulty={currentDifficulty}
          setBoardsByDifficulty={setBoardsByDifficulty}
          setShowNewPuzzleButton={setShowNewPuzzleButton} 
        />
      </div>
      <div>
        <Board 
          board={board} 
          setBoard={setBoard}
          startingBoard={startingBoard} 
          palette={palette} 
        />
      </div>
    </main>
  );
}
