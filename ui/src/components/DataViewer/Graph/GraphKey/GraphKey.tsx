import { ReactComponent as ColorPalette } from 'Assets/Images/graphKey.svg';
import styles from './GraphKey.module.css';
import { useAtom } from 'jotai';
import { exportGraphSettingsAtom } from 'atoms/atoms';

const GraphKey = () => {
    const [exportGraphSettings] = useAtom(exportGraphSettingsAtom);
    return (
        <>
            {exportGraphSettings.showColorKey && (
                <div className={styles.container}>
                    <div className={styles.keyText}>Key:</div>
                    <ColorPalette />
                </div>
            )}
        </>
    );
};

export default GraphKey;
