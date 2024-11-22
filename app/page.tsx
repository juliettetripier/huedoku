"use client";

import Board from "./components/board";
import "./globals.css";
import { Button, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState, useEffect, useRef } from "react";
import generateBoard from "./features/generateBoard";
import generateColorPalette from "./features/generateColorPalette";
import NewPuzzleButton from "./components/newPuzzleButton";
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
  const [difficultyDropdownValue, setDifficultyDropdownValue] = useState<string|null>('easy');
  const [boardsByDifficulty, setBoardsByDifficulty] = useState<BoardsByDifficulty>({});
  const [resetButtonDisabled, setResetButtonDisabled] = useState<boolean>(true);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [repeatedTiles, setRepeatedTiles] = useState(new Set<number>());
  const prevBoardRef = useRef(currentBoard);
  const prevDifficultyRef = useRef(currentDifficulty);

  const [opened, { open, close }] = useDisclosure(false);

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
    updateBoardsByDifficulty();
    setNoTransition();
    const newDifficulty = difficulty;
    setCurrentDifficulty(newDifficulty);
    getPuzzleByDifficulty(newDifficulty, setStartingBoard, setCurrentBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty, setRepeatedTiles);
    if (boardsByDifficulty[newDifficulty] && 
      boardsByDifficulty[newDifficulty].solved) {
    }
  }

  const helpOnHover = () => {
    const blackIcon = document.getElementById('help-icon-black');
    const whiteIcon = document.getElementById('help-icon-white');
    if (blackIcon && whiteIcon) {
      blackIcon.style.display = 'block';
      whiteIcon.style.display = 'none';
    }
  }

  const helpOnLeave = () => {
    const blackIcon = document.getElementById('help-icon-black');
    const whiteIcon = document.getElementById('help-icon-white');
    if (blackIcon && whiteIcon) {
      blackIcon.style.display = 'none';
      whiteIcon.style.display = 'block';
    }
  }

  useEffect(() => {
    getPuzzleByDifficulty(currentDifficulty, setStartingBoard, setCurrentBoard, setPalette, boardsByDifficulty, setBoardsByDifficulty, setRepeatedTiles);
  }, []);

  useEffect(() => {
    if (difficultyDropdownValue!== null && difficultyDropdownValue !== currentDifficulty) {
      switchDifficulty(difficultyDropdownValue);
    }
  }, [difficultyDropdownValue]);

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
      <div className="content-div">
        <div className="header">
          <div className="header-top-row">
            <img src="./images/huedoku2.PNG" className="huedoku-logo" alt="Huedoku logo"></img>
            <span className="score-counter">Score: { puzzlesSolved }</span>
          </div>
          <div className="header-bottom-row">
            <div className="difficulty-div">
              <Button 
                className={`difficulty-button ${currentDifficulty == 'easy' ? 'selected-button': undefined}`}
                id="easy" 
                onClick={() => {
                  currentDifficulty == 'easy' ? undefined :
                  switchDifficulty('easy');
                }} 
              >
                Easy
              </Button>
              <Button 
                className={`difficulty-button ${currentDifficulty == 'medium' ? 'selected-button' : undefined}`}
                id="medium" 
                onClick={() => {
                  currentDifficulty == 'medium' ? undefined :
                  switchDifficulty('medium');
                }}
              >
                Medium
              </Button>
              <Button 
                className={`difficulty-button ${currentDifficulty == 'hard' ? 'selected-button' : undefined}`}
                id="hard" 
                onClick={() => {
                  currentDifficulty == 'hard' ? undefined :
                  switchDifficulty('hard');
                }}
              >
                Hard
              </Button>
            </div>
            <div className="difficulty-dropdown">
              <Select 
                checkIconPosition="right"
                value={difficultyDropdownValue}
                data={[
                  {value: 'easy', label: 'Easy'},
                  {value: 'medium', label: 'Medium'},
                  {value: 'hard', label: 'Hard'},
                ]}
                defaultValue='easy'
                allowDeselect={false}
                onChange={setDifficultyDropdownValue}
              ></Select>
            </div>
            <div className="help-div-mobile">
              <Modal opened={opened}
                onClose={close}
                title="How To Play Huedoku"
                className="tutorial-modal">
                <p>Fill each blank tile on the board by clicking on them and selecting a color from the pop-up menu.</p>
                <p>Each row, column, and 3x3 square must contain 9 unique colors.</p>
                <p>A color cannot appear more than once in a given row/column/3x3 square.</p>
                <p>Complete the puzzle by filling the board!</p>
              </Modal>
              <div className="help-div" onMouseOver={helpOnHover} onMouseLeave={helpOnLeave}>
                <img src="./images/help-black.png" 
                  className="help-icon" 
                  id="help-icon-black" 
                  style={{ display: "none" }} 
                  alt="Black question mark icon"
                  onClick={()=>{open()}}></img>
                <img src="./images/help-white.png" 
                  className="help-icon" 
                  id="help-icon-white" 
                  alt="White question mark icon"
                  onClick={()=>{open()}}></img>
              </div>
            </div>
            <div className="new-puzzle-reset-div">
              <ResetAllButton
                currentDifficulty={currentDifficulty} 
                boardsByDifficulty={boardsByDifficulty}
                setCurrentBoard={setCurrentBoard}
                resetButtonDisabled={resetButtonDisabled}
                setResetButtonDisabled={setResetButtonDisabled}
              />
              <NewPuzzleButton
                currentBoard={currentBoard}
                setCurrentBoard={setCurrentBoard} 
                setStartingBoard={setStartingBoard}
                setPalette={setPalette}
                difficulty={currentDifficulty}
                setBoardsByDifficulty={setBoardsByDifficulty}
              />
              <Modal opened={opened}
                onClose={close}
                title="How To Play Huedoku"
                className="tutorial-modal">
                <p>Fill each blank tile on the board by clicking on them and selecting a color from the pop-up menu.</p>
                <p>Each row, column, and 3x3 square must contain 9 unique colors.</p>
                <p>A color cannot appear more than once in a given row/column/3x3 square.</p>
                <p>Complete the puzzle by filling the board!</p>
              </Modal>
              <div className="help-div" onMouseOver={helpOnHover} onMouseLeave={helpOnLeave}>
                <img src="./images/help-black.png" 
                  className="help-icon" 
                  id="help-icon-black" 
                  style={{ display: "none" }} 
                  alt="Black question mark icon"
                  onClick={()=>{open()}}></img>
                <img src="./images/help-white.png" 
                  className="help-icon" 
                  id="help-icon-white" 
                  alt="White question mark icon"
                  onClick={()=>{open()}}></img>
            </div>
            </div>
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
        <div className="new-puzzle-reset-div-mobile">
          <ResetAllButton
            currentDifficulty={currentDifficulty} 
            boardsByDifficulty={boardsByDifficulty}
            setCurrentBoard={setCurrentBoard}
            resetButtonDisabled={resetButtonDisabled}
            setResetButtonDisabled={setResetButtonDisabled}
          />
          <NewPuzzleButton
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard} 
            setStartingBoard={setStartingBoard}
            setPalette={setPalette}
            difficulty={currentDifficulty}
            setBoardsByDifficulty={setBoardsByDifficulty}
          />
        </div>
      </div>
    </main>
  );
}
