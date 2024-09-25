"use client";

import { ReactNode, useState, useEffect } from "react";
import React from "react";
import { Tile } from "./tile";

interface GridProps {
    children: ReactNode;
  }

function Grid({ children }: GridProps) {
    return <div className="main-grid">
        {children}
    </div>;
}

export default function Board({ board, setBoard, startingBoard, palette }: {board: Array<number>, 
    setBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    startingBoard: Array<number>,
    palette: Array<string> }) {

    function generateTiles(generatedPalette: Array<string>) {
        const tiles = [];
        const numTiles = 81;
        const palette = generatedPalette;
        
        for (let i = 0; i < numTiles; i++) {
            tiles.push(<Tile 
                key={i} 
                tileIndex={i}
                palette={palette} 
                board={board} 
                setBoard={setBoard}
                startingBoard={startingBoard}
            />);
        }
    
        return tiles;
    }

    return (
        <Grid>
            {generateTiles(palette)}
        </Grid>
    )
  }