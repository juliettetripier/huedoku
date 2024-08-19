type ColorOptionProps = {
    color: string;
    onColorSelection: (color: string) => void;
}

export function ColorOption(props: ColorOptionProps) {
    const handleClick = () => {
        props.onColorSelection(props.color);
    };

    return (
        <button className="color-option" style={{ backgroundColor: props.color }} onClick={handleClick}></button>
    );
}