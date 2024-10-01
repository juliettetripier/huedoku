import { Popover, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { Dispatch, SetStateAction, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ColorOption } from './coloroption';
import { updateBoard } from '../features/validateSolution';

export type TileProps = {
    tileIndex: number;
    palette: Array<string>;
    currentBoard: Array<number>;
    setCurrentBoard: Dispatch<SetStateAction<Array<number>>>;
    startingBoard: Array<number>;
}

interface InitialColorDict {
    [key: number]: string;
}


function resetTile(props: TileProps, onClose: () => void) {
    updateBoard(props, 0);
    onClose();
    }


function generateColorOptions(props: TileProps, onClose: () => void) {
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
                    onClose();
                }}
            />
        );
    }

    return colorOptions;
}


export function Tile(props: TileProps) {
    const { tileIndex, palette, startingBoard, currentBoard } = props;
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
    const [color, setColor] = useState<string>('transparent');
    const [opened, { open, close }] = useDisclosure(false);
    const [isInteractable, setIsInteractable] = useState<boolean>(false);
    const tileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set the initial color for each tile
        const tileValue = currentBoard[tileIndex];
        const initialColor: string = initialColorDict[tileValue];
        setColor(initialColor);

        // Set whether or not tile is interactable
        if (startingBoard[tileIndex] == 0) {
            setIsInteractable(true);
        }
        else {
            setIsInteractable(false);
        }

        // Make tile have transitions after being intialized
        const currentTile = tileRef.current;
        if (currentTile) {
            setTimeout(() => {
                currentTile.classList.remove('no-transition');
            }, 100);
        }
    }, [startingBoard, palette, tileIndex]);

    useEffect(() => {
        const tileValue = currentBoard[tileIndex];
        const newColor = initialColorDict[tileValue];
        setColor(newColor);
    }, [currentBoard, tileIndex])

    return (
        <Popover width={200} position="bottom" withArrow shadow="md" opened={opened} onClose={close}>
            <Popover.Target>
                <div
                    ref={tileRef} 
                    className={
                        isInteractable ? 'tile tile-interactable no-transition' : 'tile tile-fixed no-transition'
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
                    {generateColorOptions(props, close)}
                </div>
                <div className="reset-tile-div">
                    <button 
                        className="reset-tile-button"
                        onClick = {() => resetTile(props, close)}
                    >
                        Reset
                    </button>
                </div>
            </Popover.Dropdown>
        </Popover>
      );
    
}