import { useState, useEffect } from "react";
import { isBoardFull } from "../features/submitSolution";

export function SubmitButton({ board }: { board: Array<number> }) {
    const [isSubmittable, setIsSubmittable] = useState(false);

    useEffect(() => {
        setIsSubmittable(isBoardFull(board));
    }, [board]);

    return (
        <button className="submit-button"
        onClick={() => console.log('clicky')}
        disabled={!isSubmittable}
        >
        Submit
        </button>
    )
}