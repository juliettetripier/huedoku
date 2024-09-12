import { fillBoard } from "./generateSudoku";
import { removeTiles } from "./generateSudokuForUser";

export default function generateBoard(difficulty: string = 'easy') {
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
  const boardForUser = removeTiles(sudokuBoard, difficulty);
  // Flatten board so you can easily use the tile's
  // key to index it
  const flattenedBoard = boardForUser.flat();
  return flattenedBoard;
}