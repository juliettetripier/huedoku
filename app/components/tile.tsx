import { Popover, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import React from 'react';
import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { ColorOption } from './coloroption';
import { updateBoard } from '../features/submitSolution';

export type TileProps = {
    tileIndex: number;
    palette: Array<string>;
    board: Array<number>;
    setBoard: Dispatch<SetStateAction<Array<number>>>;
}

interface InitialColorDict {
    [key: number]: string;
}


function changeTileColor(setColor: Dispatch<SetStateAction<string>>, 
    color: string, onClose: () => void) {
        setColor(color);
        onClose();
    }


function resetTile(props: TileProps, setColor: Dispatch<SetStateAction<string>>,
        onClose: () => void) {
        updateBoard(props, 0);
        changeTileColor(setColor, 'transparent', onClose);
    }


function generateColorOptions(props: TileProps, setColor: Dispatch<SetStateAction<string>>, 
    onClose: () => void) {
    const colorOptions = [];
    const colorPalette = props.palette;
    const numOptions = 9;

    for (let i = 0; i < numOptions; i++) {
        colorOptions.push(
            <ColorOption 
                key={i} 
                color={colorPalette[i]} 
                onColorSelection={() => {
                    updateBoard(props, i+1);
                    changeTileColor(setColor, colorPalette[i], onClose);
                }}
            />
        );
    }

    return colorOptions;
}


export function Tile(props: TileProps) {
    const { tileIndex, palette, board } = props;
    const [color, setColor] = useState<string>('transparent');
    const [opened, { open, close }] = useDisclosure(false);
    // variables for setting tiles as interactable vs. fixed
    const [isInteractable, setIsInteractable] = useState<boolean>(false);
    const isInitialized = useRef(false);

    useEffect(() => {
        // Set the initial color for each tile
        const initialColorDict: InitialColorDict = {
            0: 'transparent',
            1: palette[0],
            2: palette[1],
            3: palette[2],
            4: palette[3],
            5: palette[4],
            6: palette[5],
            7: palette[6],
            8: palette[7],
            9: palette[8]
        }
        const initialColor: string = initialColorDict[board[tileIndex]];
        setColor(initialColor);

        // Set whether or not tile is interactable
        // Use isInitialized to make sure this only happens on first render
        if (!isInitialized.current) {
            if (board[tileIndex] == 0) {
                setIsInteractable(true);
            }
            isInitialized.current = true;
        }
    }, [palette, board, tileIndex]);

    return (
        <Popover width={200} position="bottom" withArrow shadow="md" opened={opened} onClose={close}>
            <Popover.Target>
                <div 
                    className={
                        isInteractable ? 'tile tile-interactable' : 'tile tile-fixed no-transition'
                    } 
                    style={{ backgroundColor: color }} 
                    onClick={isInteractable ? open : undefined}
                    tabIndex={isInteractable ? 0 : undefined}
                >
                    <div 
                        className='tile-corner'
                        style={{ display: isInteractable ? 'block' : 'none' }}
                    >    
                    </div>
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <div className="color-option-grid">
                    {generateColorOptions(props, setColor, close)}
                </div>
                <div className="reset-tile-div">
                    <button 
                        className="reset-tile-button"
                        onClick = {() => resetTile(props, setColor, close)}
                    >
                        Reset
                    </button>
                </div>
            </Popover.Dropdown>
        </Popover>
      );
    
}