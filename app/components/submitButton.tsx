import { useState, useEffect } from "react";
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { isBoardFull, solutionIsValid } from "../features/submitSolution";

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

export function SubmitButton({ board }: { board: Array<number> }) {
    const [isSubmittable, setIsSubmittable] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState("");

    useEffect(() => {
        setIsSubmittable(isBoardFull(board));
    }, [board]);

    return (
        <>
            <button className="submit-button"
            onClick={() => handleSubmission(board, setModalOpen, setModalData)}
            disabled={!isSubmittable}
            >
            Submit
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {modalData === "valid" ? "Success!" : "Try Again"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {modalData === "valid" ? "You won!" : "Your solution is invalid."}
                    </ModalBody>

                    <ModalFooter>
                        <button onClick={() => setModalOpen(false)}>Ok</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}