import { ReactComponent as ColorPalette } from '@/Assets/Images/graphKey.svg';
import styles from './GraphKey.module.css';
import { useAtom } from 'jotai';
import { exportGraphModalOpenAtom, exportGraphSettingsAtom } from '@/atoms/atoms';

const GraphKey = () => {
    const [exportGraphSettings] = useAtom(exportGraphSettingsAtom);
    const [isModalOpen] = useAtom(exportGraphModalOpenAtom);
    return (
        <>
            {exportGraphSettings.showColorKey && (
                <div className={styles.container}>
                    <div className={styles.innerContainer}>
                        <div className={styles.keyText}>Key:</div>
                        <ColorPalette />
                    </div>
                    {!isModalOpen && <div className={styles.divider} />}
                </div>
            )}
        </>
    );
};

export default GraphKey;
