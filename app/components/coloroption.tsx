type ColorOptionProps = {
    color: string;
}

export function ColorOption(props: ColorOptionProps) {
    return (
        <button className="color-option" style={{ backgroundColor: props.color }}></button>
    );
}