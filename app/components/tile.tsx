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
import { ColorOption } from './coloroption';

function generateColorOptions() {
    const colorOptions = [];
    const numOptions = 9;

    for (let i = 0; i < numOptions; i++) {
        colorOptions.push(<ColorOption />);
    }

    return colorOptions;
}

export function Tile() {
    return <Popover>
            <PopoverTrigger>
                <div className="tile">
                    <h1>Test</h1>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Header</PopoverHeader>
                <PopoverBody style={{display: 'flex'}}>
                    <div className="color-option-grid">
                        {generateColorOptions()}
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>;
}