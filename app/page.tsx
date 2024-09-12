"use client";

import Board from "./components/board";
import "./globals.css";
import { useState, useEffect } from "react";
import { SubmitButton } from "./components/submitButton";
import generateBoard from "./features/generateBoard";
import generateColorPalette from "./features/generateColorPalette";

export default function Home() {
  const [board, setBoard] = useState(generateBoard());
  // startingBoard is set to the value of board only when the board
  // first renders. Subsequent setBoards won't update startingBoard
  const [startingBoard, setStartingBoard] = useState(board);
  const [palette, setPalette] = useState<string[]>([]);

  // Update board, palette, etc. when a new starting board is generated
  useEffect(() => {
    setBoard(startingBoard);
    setPalette(generateColorPalette);
  }, [startingBoard]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="header">
        <h1>Huedoku</h1>
        <div className="difficulty-div">
          <button className="difficulty-button" id="easy">Easy</button>
          <button className="difficulty-button" id="medium">Medium</button>
          <button className="difficulty-button" id="hard">Hard</button>
        </div>
        <SubmitButton 
          board={board} 
          setStartingBoard={setStartingBoard} 
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
