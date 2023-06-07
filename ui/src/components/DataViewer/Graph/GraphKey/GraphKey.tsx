import { ReactComponent as ColorPalette } from 'Assets/Images/graphKey.svg';
import styles from './GraphKey.module.css';

const GraphKey = () => {
    return (
        <div className={styles.container}>
            <div className={styles.keyText}>Key:</div>
            <ColorPalette />
        </div>
    );
};

export default GraphKey;
