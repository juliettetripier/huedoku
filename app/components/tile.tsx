import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { ColorOption } from './coloroption';

type TileProps = {
    palette: Array<string>;
}

function changeTileColor(setColor: Dispatch<SetStateAction<string>>, color: string) {
    setColor(color);
}

function generateColorOptions(props: TileProps, setColor: Dispatch<SetStateAction<string>>) {
    const colorOptions = [];
    const colorPalette = props.palette;
    const numOptions = 9;

    for (let i = 0; i < numOptions; i++) {
        colorOptions.push(
            <ColorOption 
                key={i} 
                color={colorPalette[i]} 
                onColorSelection={() => changeTileColor(setColor, colorPalette[i])}/>);
        }

    return colorOptions;
}

export function Tile(props: TileProps) {
    const [color, setColor] = useState<string>('transparent');

    return <Popover>
            <PopoverTrigger>
                <div className="tile" style={{ backgroundColor: color }}>
                    <h1>Test</h1>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Color Picker</PopoverHeader>
                <PopoverBody style={{display: 'flex'}}>
                    <div className="color-option-grid">
                        {generateColorOptions(props, setColor)}
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>;
}