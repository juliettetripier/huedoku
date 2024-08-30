"use client";

import { ReactNode, useState, useEffect } from "react";
import React from "react";
import { Tile } from "./tile";
import generateColorPalette from "../features/generateColorPalette";
import { fillBoard } from "../features/generateSudoku"
import { removeTiles } from "../features/generateSudokuForUser";
import { checkIfSubmittable } from "../features/submitSolution";

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
    // Flatten board so you can easily use the tile's
    // key to index it
    const flattenedBoard = boardForUser.flat();
    return flattenedBoard;
}

function Grid({ children }: GridProps) {
    return <div className="main-grid">
        {children}
    </div>;
}

export default function Board() {
    const [palette, setPalette] = useState<string[]>([]);
    const [board, setBoard] = useState(generateBoard());

    useEffect(() => {
        setPalette(generateColorPalette())
    }, []);

    useEffect(() => {
        checkIfSubmittable(board);
    }, [board]);

    function generateTiles(generatedPalette: Array<string>) {
        const tiles = [];
        const numTiles = 81;
        const palette = generatedPalette;
    
        for (let i = 0; i < numTiles; i++) {
            tiles.push(<Tile key={i} tileIndex={i} palette={palette} board={board} setBoard={setBoard}/>);
        }
    
        return tiles;
    }

    return (
        <Grid>
            {generateTiles(palette)}
        </Grid>
    )
  }