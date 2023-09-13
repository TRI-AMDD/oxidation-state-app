import CompositionTitle from '../../CompositionTitle/CompositionTitle';
import { BAR_HEIGHT } from './canvas-graph-util';

interface Props {
    label: string;
    index: number;
}

const SpecieLabel = ({ label, index }: Props) => {
    const indexY = BAR_HEIGHT + index * 60;
    const textPos = indexY - BAR_HEIGHT / 2 - 10;

    return (
        <div key={label} style={{ top: textPos, left: '10px' }}>
            <CompositionTitle composition={label} />
        </div>
    );
};

export default SpecieLabel;
