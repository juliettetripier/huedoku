export default function checkForRepeatedTiles (board: number[], tileIndex: number): Set<number> {
    const repeatedTiles: Set<number> = new Set();

    // figure out row and column
    const row = Math.floor(tileIndex / 9);
    const col = tileIndex % 9;
    // is value already in row?
    const rowStartIndex = row * 9;
    const rowEndIndex = (row + 1) * 9 - 1;
    for (let j = rowStartIndex; j <= rowEndIndex; j++) {
        if (board[j] == board[tileIndex] && j!= tileIndex && board[tileIndex] !== 0) {
            repeatedTiles.add(j);
        };
    };
    // is value already in col?
    for (let j = col; j < 81; j+=9) {
        if (board[j] == board[tileIndex] && j != tileIndex && board[tileIndex] !== 0) {
            repeatedTiles.add(j);
        }
    }
    // figure out square
    const squareStartRow = Math.floor(row / 3) * 3;
    const squareStartCol = Math.floor(col / 3) * 3;
    // is value already in square?
    for (let j = squareStartRow; j < squareStartRow + 3; j++) {
        for (let k = squareStartCol; k < squareStartCol + 3; k++) {
            const squareIndex = j * 9 + k;
            if (board[squareIndex] == board[tileIndex] && squareIndex != tileIndex && board[tileIndex] !== 0) {
                repeatedTiles.add(squareIndex);
            }
        }
    }

    return repeatedTiles;
}