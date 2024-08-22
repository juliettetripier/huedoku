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
    useDisclosure,
  } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react';
import { ColorOption } from './coloroption';

type TileProps = {
    palette: Array<string>;
}

function changeTileColor(setColor: Dispatch<SetStateAction<string>>, 
        color: string, onClose: () => void) {
    setColor(color);
    onClose();
}

function generateColorOptions(props: TileProps, setColor: Dispatch<SetStateAction<string>>, onClose: () => void) {
    const colorOptions = [];
    const colorPalette = props.palette;
    const numOptions = 9;

    for (let i = 0; i < numOptions; i++) {
        colorOptions.push(
            <ColorOption 
                key={i} 
                color={colorPalette[i]} 
                onColorSelection={() => 
                    changeTileColor(setColor, colorPalette[i], onClose)}/>);
        }

    return colorOptions;
}

export function Tile(props: TileProps) {
    const [color, setColor] = useState<string>('transparent');
    const { isOpen, onOpen, onClose } = useDisclosure();

    return <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
                <div className="tile" style={{ backgroundColor: color }} onClick={onOpen}>
                    <h1>Test</h1>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Color Picker</PopoverHeader>
                <PopoverBody style={{display: 'flex'}}>
                    <div className="color-option-grid">
                        {generateColorOptions(props, setColor, onClose)}
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>;
}