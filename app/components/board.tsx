"use client";

import { ReactNode, useState, useEffect } from "react";
import React from "react";
import { Tile } from "./tile";
import generateColorPalette from "../features/generateColorPalette";

interface GridProps {
    children: ReactNode;
  }

function generateTiles(generatedPalette: Array<string>) {
    const tiles = [];
    const numTiles = 81;
    const palette = generatedPalette;

    for (let i = 0; i < numTiles; i++) {
        tiles.push(<Tile palette={palette}/>);
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