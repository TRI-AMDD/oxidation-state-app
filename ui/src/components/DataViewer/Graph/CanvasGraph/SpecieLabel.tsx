import { BAR_HEIGHT } from './canvas-graph-util';

interface Props {
    label: string;
    index: number;
}

const SpecieLabel = ({ label, index }: Props) => {
    const indexY = BAR_HEIGHT + index * 75;
    const textPos = indexY - BAR_HEIGHT / 2 - 10;

    return (
        <span key={label} style={{ top: textPos }}>
            {label}
        </span>
    );
};

export default SpecieLabel;
