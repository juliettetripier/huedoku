"use client";

import { ReactNode, useState, useEffect } from "react";
import React from "react";
import { Tile } from "./tile";
import generateColorPalette from "../features/generateColorPalette";
import { checkIfSubmittable } from "../features/submitSolution";

interface GridProps {
    children: ReactNode;
  }

function Grid({ children }: GridProps) {
    return <div className="main-grid">
        {children}
    </div>;
}

export default function Board({ board, setBoard }: {board: Array<number>, 
    setBoard: React.Dispatch<React.SetStateAction<Array<number>>> }) {
    const [palette, setPalette] = useState<string[]>([]);

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