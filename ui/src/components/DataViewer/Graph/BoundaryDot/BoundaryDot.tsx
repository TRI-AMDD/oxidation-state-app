import { useAtom } from 'jotai';
import styles from './boundary-dot.module.css';
import { boundaryAtom } from '@/atoms/atoms';

interface Props {
    label: string;
    index: number;
}

const BoundaryDot = () => {
    const [boundary] = useAtom(boundaryAtom);
    const stylePos = { top: '10px', left: '10px' };

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
