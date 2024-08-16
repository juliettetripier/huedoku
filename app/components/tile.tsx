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

type TileProps = {
    palette: Array<string>;
}

// interface ColorPaletteDict {
//     [key: number]: Array<string>;
// }

// const colorPaletteDict: ColorPaletteDict = {
//     1: [
//         "#eb3f2f",
//         "#eb8449",
//         "#ebad27",
//         "#aaac1c",
//         "#77a86f",
//         "#729b8b",
//         "#57b6af",
//         "#c8748c",
//         "#cb4c7b"
//     ],
//     2: [
//         "#00202e",
//         "#003f5c",
//         "#2c4875",
//         "#8a508f",
//         "#bc5090",
//         "#ff6361",
//         "#ff8531",
//         "#ffa600",
//         "#ffd380"
//     ],
//     3: [
//         "#14073d",
//         "#1e3549",
//         "#276355",
//         "#479684",
//         "#c75685",
//         "#ed7496",
//         "#ff8262",
//         "#ffa361",
//         "#b39bf7"
//     ],
//     4: [
//         "#57d0be",
//         "#57afdb",
//         "#5b89f4",
//         "#877df0",
//         "#b477e5",
//         "#dc6bd9",
//         "#f966ca",
//         "#fb8db3",
//         "#fbae96"
//     ],
//     5: [
//         "#77bd79",
//         "#8fd595",
//         "#a6edb1",
//         "#ffbfc1",
//         "#ff9a9a",
//         "#f58282",
//         "#b86262",
//         "#9a5252",
//         "#7b4141"
//     ],
//     6: [
//         "#d82dcd",
//         "#d96db6",
//         "#d7959a",
//         "#d3b875",
//         "#cdd82d",
//         "#b0d770",
//         "#8fd599",
//         "#69d2ba",
//         "#2dcdd8"
//     ],
//     7: [
//         "#e8263d",
//         "#ff6974",
//         "#ff7211",
//         "#fe8b10",
//         "#fbc531",
//         "#aacde1",
//         "#42abae",
//         "#0d9ba3",
//         "#235347"
//     ],
//     8: [
//         "#ff6361",
//         "#bc5090",
//         "#58508d",
//         "#809bce",
//         "#95b8d1",
//         "#78938a",
//         "#b8e0d4",
//         "#d6eadf",
//         "#eac4d5"
//     ],
//     9: [
//         "#4b9bbd",
//         "#3c84a3",
//         "#2f7794",
//         "#964788",
//         "#bc5090",
//         "#ff6361",
//         "#ff8531",
//         "#ffa600",
//         "#ffd380"
//     ],
//     10: [
//         "#374982",
//         "#1c4563",
//         "#0e6c80",
//         "#00929c",
//         "#91f8ff",
//         "#bffbff",
//         "#762f99",
//         "#4c1961",
//         "#410547"
//     ],
//     11: [
//         "#00b069",
//         "#007b49",
//         "#bfffe5",
//         "#80ffcc",
//         "#e8005f",
//         "#a20043",
//         "#ffbfd9",
//         "#ff80b4",
//         "#ff8200"
//     ],
//     12: [
//         "#fe608d",
//         "#ff0a54",
//         "#ff594f",
//         "#ffa749",
//         "#f7f4e5",
//         "#7fc399",
//         "#07914c",
//         "#0b6d70",
//         "#16079c"
//     ]
// }

// function generateColorPalette() {
//     const paletteSelection = () => Object.keys(colorPaletteDict)[(Math.random()
//         * Object.keys(colorPaletteDict).length) | 0];
//     const paletteKey = paletteSelection();
//     const paletteNumber = Number(paletteKey)
//     const palette = colorPaletteDict[paletteNumber]
//     return palette;
// }

function generateColorOptions(props: TileProps) {
    const colorOptions = [];
    const colorPalette = props.palette;
    const numOptions = 9;

    for (let i = 0; i < numOptions; i++) {
        colorOptions.push(<ColorOption key={i} color={colorPalette[i]} />);
    }

    return colorOptions;
}

export function Tile(props: TileProps) {
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
                        {generateColorOptions(props)}
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>;
}