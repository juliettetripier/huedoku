"use client";

import { ReactNode, useState, useEffect } from "react";
import React from "react";
import { Tile } from "./tile";
import generateColorPalette from "../features/generateColorPalette";
import { fillBoard } from "../features/generateSudoku"
import { countSolutions, removeTiles } from "../features/generateSudokuForUser";

interface GridProps {
    children: ReactNode;
  }

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
    console.log('TESTING');
    console.log(countSolutions(boardForUser));
    // Flatten board so you can easily use the tile's
    // key to index it
    const flattenedBoard = boardForUser.flat();
    return flattenedBoard;
}

function generateTiles(generatedPalette: Array<string>) {
    const tiles = [];
    const numTiles = 81;
    const palette = generatedPalette;
    let board = generateBoard();

    for (let i = 0; i < numTiles; i++) {
        tiles.push(<Tile key={i} tileIndex={i} palette={palette} board={board}/>);
    }

    return tiles;
}

function Grid({ children }: GridProps) {
    return <div className="main-grid">
        {children}
    </div>;
}

export default function Board() {
    const [palette, setPalette] = useState<string[]>([]);

    useEffect(() => {
        setPalette(generateColorPalette())
    }, []);

    return (
        <Grid>
            {generateTiles(palette)}
        </Grid>
    )
  }