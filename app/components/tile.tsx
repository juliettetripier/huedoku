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

interface ColorPaletteDict {
    [key: number]: Array<string>;
}

const colorPaletteDict: ColorPaletteDict = {
    1: [
        "#eb3f2f",
        "#eb8449",
        "#ebad27",
        "#aaac1c",
        "#77a86f",
        "#729b8b",
        "#57b6af",
        "#c8748c",
        "#cb4c7b"
    ],
    2: [
        "#00202e",
        "#003f5c",
        "#2c4875",
        "#8a508f",
        "#bc5090",
        "#ff6361",
        "#ff8531",
        "#ffa600",
        "#ffd380"
    ],
}

function generateColorPalette() {
    const paletteSelection = () => Object.keys(colorPaletteDict)[(Math.random()
        * Object.keys(colorPaletteDict).length) | 0];
    const paletteKey = paletteSelection();
    const paletteNumber = Number(paletteKey)
    const palette = colorPaletteDict[paletteNumber]
    return palette;
}

function generateColorOptions() {
    const colorOptions = [];
    const colorPalette = generateColorPalette();
    const numOptions = 9;

    for (let i = 0; i < numOptions; i++) {
        colorOptions.push(<ColorOption key={i} color={colorPalette[i]} />);
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
                <PopoverHeader>Color Picker</PopoverHeader>
                <PopoverBody style={{display: 'flex'}}>
                    <div className="color-option-grid">
                        {generateColorOptions()}
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>;
}