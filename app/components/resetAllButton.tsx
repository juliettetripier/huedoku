import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import React from 'react';

interface BoardsByDifficulty {
    [difficulty: string]: {
      startingBoard: number[];
      currentBoard: number[];
      palette: string[];
      solved: boolean;
      previouslySolved: boolean;
    }
  }

export default function ResetAllButton({currentDifficulty, boardsByDifficulty, setCurrentBoard}: {
    currentDifficulty: string,
    boardsByDifficulty: BoardsByDifficulty,
    setCurrentBoard: React.Dispatch<React.SetStateAction<number[]>>,
}) {
    const [opened, { open, close }] = useDisclosure(false);

    const resetTiles = () => {
        const startingBoard = boardsByDifficulty[currentDifficulty].startingBoard;
        setCurrentBoard(startingBoard);
        close();
    }

    return (
        <>
            <Modal opened={opened}
                onClose={close} 
                title="Are you sure you want to reset all tiles?">
                    <p>You will lose your progress.</p>
                    <Button onClick={resetTiles}>
                        Reset Tiles
                    </Button>
                    <Button onClick={close}>
                        Cancel
                    </Button>
            </Modal>

            <button onClick={open}>
                Reset Tiles
            </button>
        </>
    ); 
}