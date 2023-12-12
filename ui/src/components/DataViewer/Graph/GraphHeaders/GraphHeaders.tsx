import { Tooltip } from '@mui/material';
import styles from './GraphHeaders.module.css';
import { useAtom } from 'jotai';
import { exportGraphModalOpenAtom } from '@/atoms/atoms';

const GraphHeaders = () => {
    const [isModalOpen] = useAtom(exportGraphModalOpenAtom);
    return (
        <>
            {!isModalOpen && (
                <div className={styles.container}>
                    <Tooltip
                        title={
                            <span>
                                The element or group of <br /> elements that are <br /> found in the ion.
                            </span>
                        }
                    >
                        <div className={styles.headerText}>Species</div>
                    </Tooltip>
                    <div className={styles.divider} />
                    <Tooltip
                        title={
                            <span>
                                The ICSD-derived reduction <br /> potential ranges at which <br /> each oxidation state
                                is likely <br /> to be observed
                            </span>
                        }
                    >
                        <div className={styles.headerText}>Oxidation States</div>
                    </Tooltip>
                </div>
            )}
        </>
    );
};

export default GraphHeaders;
