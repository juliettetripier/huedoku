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

export default function Board({ currentBoard, setCurrentBoard, startingBoard, palette, repeatedTiles }: {
    currentBoard: Array<number>, 
    setCurrentBoard: React.Dispatch<React.SetStateAction<Array<number>>>,
    startingBoard: Array<number>,
    palette: Array<string>,
    repeatedTiles: Set<number> }) {

    function generateTiles(generatedPalette: Array<string>) {
        const tiles = [];
        const numTiles = 81;
        const palette = generatedPalette;
        
        for (let i = 0; i < numTiles; i++) {
            tiles.push(<Tile 
                key={i} 
                tileIndex={i}
                palette={palette} 
                currentBoard={currentBoard} 
                setCurrentBoard={setCurrentBoard}
                startingBoard={startingBoard}
                repeatedTiles={repeatedTiles}
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