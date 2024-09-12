import { useState, useEffect } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from "@mantine/core";
import { isBoardFull, solutionIsValid } from "../features/submitSolution";
import generateBoard from "../features/generateBoard";

function handleSubmission(board: Array<number>, 
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setModalData: React.Dispatch<React.SetStateAction<string>>) {
    const solutionValid = solutionIsValid(board);
    if (solutionValid) {
        // set modal data, set open to true
        setModalData("valid");
        setModalOpen(true);
    }
    else {
        // set modal data, set open to true
        setModalData("invalid");
        setModalOpen(true);
        
    }
}

function getNewPuzzle(setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>>) {
    const newBoard = generateBoard();
    setStartingBoard(newBoard);
}

export function SubmitButton({ board, setStartingBoard }: {board: Array<number>, 
    setStartingBoard: React.Dispatch<React.SetStateAction<Array<number>>> }) {
    const [isSubmittable, setIsSubmittable] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState("");

    useEffect(() => {
        setIsSubmittable(isBoardFull(board));
    }, [board]);

    const modalStyle = modalData === "valid" ? { borderTop: '.375rem solid #4c8c2b' }
        : { borderTop: '.375rem solid #c8102e' }

    return (
        <>
            <button className="submit-button"
            onClick={() => handleSubmission(board, setModalOpen, setModalData)}
            disabled={!isSubmittable}
            >
            Submit
            </button>
            <Modal.Root opened={isModalOpen} onClose={() => setModalOpen(false)}>
                <Modal.Overlay>
                <Modal.Content>
                    <Modal.Header style={modalStyle}>
                        <Modal.Title>
                            {modalData === "valid" ? "Success!" : "Try Again"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalData === "valid" ? "You won!" : "Your solution is invalid."}
                        {modalData === "valid" ? <Button onClick = {() => getNewPuzzle(setStartingBoard)}>New puzzle</Button> : undefined}
                        <Button onClick={() => setModalOpen(false)}>Ok</Button>
                    </Modal.Body>
                </Modal.Content>
                </Modal.Overlay>
            </Modal.Root>
        </>
    )
}