import { ReactNode } from "react";
import React from "react";
import { Tile } from "./tile";

interface GridProps {
    children: ReactNode;
  }

function generateTiles() {
    const tiles = [];
    const numTiles = 81;

    for (let i = 0; i < numTiles; i++) {
        tiles.push(<Tile/>);
    }

    return tiles;
}

function Grid({ children }: GridProps) {
    return <div className="grid">
        {children}
    </div>;
}

export default function Board({ children }: { children: ReactNode }) {
    return (
        <Grid>
            {generateTiles()}
        </Grid>
    )
  }