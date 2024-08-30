import { useState, useEffect } from "react";
import { isBoardFull, solutionIsValid } from "../features/submitSolution";

function handleSubmission(board: Array<number>) {
    const solutionValid = solutionIsValid(board);
    if (solutionValid) {
        console.log("solution is valid yippieeeeee");
    }
    else {
        console.log("WRONGGGGGGGGGG");
    }
}

export function SubmitButton({ board }: { board: Array<number> }) {
    const [isSubmittable, setIsSubmittable] = useState(false);

    useEffect(() => {
        setIsSubmittable(isBoardFull(board));
    }, [board]);

    return (
        <button className="submit-button"
        onClick={() => handleSubmission(board)}
        disabled={!isSubmittable}
        >
        Submit
        </button>
    )
}