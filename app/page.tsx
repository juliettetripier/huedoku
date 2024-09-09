"use client";

import { ChakraProvider } from '@chakra-ui/react'
import Board from "./components/board";
import "./globals.css";
import { useState } from "react";
import { fillBoard } from "./features/generateSudoku";
import { removeTiles } from "./features/generateSudokuForUser";
import { SubmitButton } from "./components/submitButton";

function generateBoard() {
  const initialBoard = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0] 
      ];
  // Create a shallow copy of initialBoard
  let sudokuBoard = initialBoard.map(row => [...row]);
  // Fill sudokuBoard
  fillBoard(sudokuBoard);
  // Remove tiles
  const boardForUser = removeTiles(sudokuBoard);
  // Flatten board so you can easily use the tile's
  // key to index it
  const flattenedBoard = boardForUser.flat();
  return flattenedBoard;
}

export default function Home() {
  const [board, setBoard] = useState(generateBoard());

  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="header">
          <h1>Huedoku</h1>
          <div className="difficulty-div">
            <button className="difficulty-button" id="easy">Easy</button>
            <button className="difficulty-button" id="medium">Medium</button>
            <button className="difficulty-button" id="hard">Hard</button>
          </div>
          <SubmitButton board={board} />
        </div>
        <div>
          <Board board={board} setBoard={setBoard} />
        </div>
      </main>
    </ChakraProvider>
  );
}
