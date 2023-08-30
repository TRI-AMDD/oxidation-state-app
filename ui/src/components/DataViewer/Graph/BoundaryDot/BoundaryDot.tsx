import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { boundaryAtom } from '@/atoms/atoms';
import { BAR_HEIGHT, BAR_WIDTH } from '../CanvasGraph/canvas-graph-util';
import { getPositionFromValue } from '@/utils/GraphUtil';
import styles from './boundary-dot.module.css';

const DOT_HALF_WIDTH = 9;

interface Props {
    value: number;
    ecpRange: [number, number];
}

const BoundaryDot = ({ value, ecpRange }: Props) => {
    const [boundary] = useAtom(boundaryAtom);

    const stylePos = useMemo(() => {
        if (boundary) {
            const xPercent = getPositionFromValue(value, ecpRange);
            const xPos = BAR_WIDTH * (xPercent / 100) - DOT_HALF_WIDTH;

            const top = BAR_HEIGHT / 2 - DOT_HALF_WIDTH + boundary.ionIndex * 60;
            return { top, left: xPos };
        }

        return { top: 0, left: 0 };
    }, [boundary, value, ecpRange]);

    if (!boundary) {
        return null;
    }

    return (
        <div className={styles.dot} style={stylePos}>
            {boundary.oxidationState}
        </div>
    );
};

export default BoundaryDot;
