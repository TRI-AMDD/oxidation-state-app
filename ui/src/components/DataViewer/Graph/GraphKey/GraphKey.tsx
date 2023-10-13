import { ReactComponent as ColorPalette } from '@/Assets/Images/graphKey.svg';
import styles from './GraphKey.module.css';

const GraphKey = () => (
    <div className={styles.container}>
        <div className={styles.innerContainer}>
            <div className={styles.keyText}>Key:</div>
            <ColorPalette />
        </div>
        <div className={styles.divider} />
    </div>
);

export default GraphKey;
