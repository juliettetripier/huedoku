import { Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { Button } from '@mantine/core';
import { ColorOption } from './coloroption';
import { updateBoard } from '../features/validateSolution';

interface BoardsByDifficulty {
    [difficulty: string]: {
      startingBoard: number[];
      currentBoard: number[];
      palette: string[];
      solved: boolean;
      previouslySolved: boolean;
      repeatedTiles: Set<number>;
    }
}

interface InitialColorDict {
    [key: number]: string;
}

export type TileProps = {
    tileIndex: number;
    palette: Array<string>;
    currentBoard: Array<number>;
    setCurrentBoard: Dispatch<SetStateAction<Array<number>>>;
    startingBoard: Array<number>;
    repeatedTiles: Set<number>;
    boardsByDifficulty: BoardsByDifficulty;
    currentDifficulty: string;
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
    const { tileIndex, palette, startingBoard, currentBoard, repeatedTiles, boardsByDifficulty, currentDifficulty } = props;
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
    const [isRepeated, setIsRepeated] = useState<boolean>(false);
    const tileRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState<boolean|null>(null);

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
        // Change tile color to match new tile value
        const tileValue = currentBoard[tileIndex];
        const newColor = initialColorDict[tileValue];
        setColor(newColor);
    }, [currentBoard, tileIndex])

    useEffect(() => {
        if (repeatedTiles.has(tileIndex)) {
            setIsRepeated(true);
        }
        else {
            setIsRepeated(false);
        }
    }, [repeatedTiles])

    useEffect(() => {
        if (boardsByDifficulty[currentDifficulty] && 
            boardsByDifficulty[currentDifficulty].solved === true) 
        {
            setIsInteractable(false);
        }
    }, [boardsByDifficulty, currentDifficulty])

    // Set color picker properties for mobile vs. desktop
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 700);
        };
        if (window) {
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <Popover 
            width={200} 
            position="bottom" 
            withArrow 
            shadow="md" 
            opened={opened} 
            onClose={close}
        >
            <Popover.Target>
                <div
                    ref={tileRef} 
                    className={`${isInteractable ? 'tile tile-interactable no-transition' : 'tile tile-fixed no-transition'}`
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
                    <div 
                        className='repeated-div'
                        style={{ display: isRepeated ? 'block flex' : 'none'}}
                    >
                        <img src="./images/warning.png" className='repeated-marker'></img>
                    </div>
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <div className="color-option-grid">
                    {generateColorOptions(props, close)}
                </div>
                <div className="reset-tile-div">
                    <Button 
                        className="minimal-button reset-tile-button"
                        onClick = {() => resetTile(props, close)}
                    >
                        Reset
                    </Button>
                </div>
            </Popover.Dropdown>
        </Popover>
      );
    
}