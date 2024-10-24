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
    3: [
        "#14073d",
        "#1e3549",
        "#276355",
        "#479684",
        "#c75685",
        "#ed7496",
        "#ff8262",
        "#ffa361",
        "#b39bf7"
    ],
    4: [
        "#57d0be",
        "#57afdb",
        "#5b89f4",
        "#877df0",
        "#b477e5",
        "#dc6bd9",
        "#f966ca",
        "#fb8db3",
        "#fbae96"
    ],
    5: [
        "#77bd79",
        "#8fd595",
        "#a6edb1",
        "#ffbfc1",
        "#ff9a9a",
        "#f58282",
        "#b86262",
        "#9a5252",
        "#7b4141"
    ],
    6: [
        "#d82dcd",
        "#d96db6",
        "#d7959a",
        "#d3b875",
        "#cdd82d",
        "#b0d770",
        "#8fd599",
        "#69d2ba",
        "#2dcdd8"
    ],
    7: [
        "#e8263d",
        "#ff6974",
        "#ff7211",
        "#fe8b10",
        "#fbc531",
        "#aacde1",
        "#42abae",
        "#0d9ba3",
        "#235347"
    ],
    8: [
        "#ff6361",
        "#bc5090",
        "#58508d",
        "#809bce",
        "#95b8d1",
        "#78938a",
        "#b8e0d4",
        "#d6eadf",
        "#eac4d5"
    ],
    9: [
        "#4b9bbd",
        "#3c84a3",
        "#2f7794",
        "#964788",
        "#bc5090",
        "#ff6361",
        "#ff8531",
        "#ffa600",
        "#ffd380"
    ],
    10: [
        "#374982",
        "#1c4563",
        "#0e6c80",
        "#00929c",
        "#91f8ff",
        "#bffbff",
        "#762f99",
        "#4c1961",
        "#410547"
    ],
    11: [
        "#00b069",
        "#007b49",
        "#bfffe5",
        "#80ffcc",
        "#e8005f",
        "#a20043",
        "#ffbfd9",
        "#ff80b4",
        "#ff8200"
    ],
    12: [
        "#fe608d",
        "#ff0a54",
        "#ff594f",
        "#ffa749",
        "#f7f4e5",
        "#7fc399",
        "#07914c",
        "#0b6d70",
        "#16079c"
    ],
    13: [
        "#40a4d8",
        "#33beb7",
        "#b2c224",
        "#fecc2f",
        "#f8a227",
        "#f66320",
        "#db3937",
        "#ee6579",
        "#a364d9"
    ],
    14: [
        "#264653",
        "#287271",
        "#2a9d8f",
        "#8ab17d",
        "#e9c46a",
        "#f4a261",
        "#ec8151",
        "#e36040",
        "#bc6b85"
    ],
    15: [
        "#003f5c",
        "#2c4875",
        "#8a508f",
        "#bc5090",
        "#90bc50",
        "#50bc7c",
        "#a1f4ae",
        "#ffa600",
        "#ffd380"
    ],
    16: [
        "#810c9c",
        "#a808a8",
        "#e32fad",
        "#d723f2",
        "#4cc9f0",
        "#4895ef",
        "#4361ee",
        "#443dc9",
        "#2609b8"        
    ],
    17: [
        "#5b4c82",
        "#8a508f",
        "#cc0863",
        "#ff6361",
        "#ff8531",
        "#ffa600",
        "#8cb357",
        "#18bfae",
        "#53cbef"        
    ],
    18: [
        "#7ce2ad",
        "#7cc6c6",
        "#7ca8da",
        "#808be9",
        "#a689dd",
        "#c784d0",
        "#e77dc3",
        "#eb9ab3",
        "#ecb79f"        
    ],
    19: [
        "#510117",
        "#a5012a",
        "#fa0145",
        "#ff507f",
        "#ffa4bc",
        "#a5fee4",
        "#02f9b4",
        "#02a479",
        "#025139"        
    ],
    20: [
        "#b3f2f8",
        "#00cfe3",
        "#4c9aff",
        "#b96eff",
        "#d94fff",
        "#ff57b9",
        "#ff7433",
        "#ffab50",
        "#ffe878"        
    ],
    21: [
        "#fe749f",
        "#fcaac1",
        "#f9e0e2",
        "#97c564",
        "#b1d48b",
        "#cbe2b2",
        "#4a8688",
        "#7db9b9",
        "#b0ebe9"        
    ],
    22: [
        "#a3629c",
        "#e07fa6",
        "#cba3b2",
        "#73aeb8",
        "#5093b2",
        "#92b3cc",
        "#c1def0",
        "#a5cfb4",
        "#82b596"
    ]
}

export default function generateColorPalette() {
    const paletteSelection = () => Object.keys(colorPaletteDict)[(Math.random()
        * Object.keys(colorPaletteDict).length) | 0];
    const paletteKey = paletteSelection();
    const paletteNumber = Number(paletteKey)
    const palette = colorPaletteDict[paletteNumber]
    return palette;
}