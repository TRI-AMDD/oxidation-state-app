import { Tooltip } from '@mui/material';
import styles from './GraphHeaders.module.css';

const GraphHeaders = () => {
    return (
        <div className={styles.container}>
            <Tooltip title={<span>The element or group of <br/> elements that are <br/> found in the ion.</span>}>
                <div className={styles.headerText}>Species</div>
            </Tooltip>
            <div className={styles.divider} />
            <Tooltip title={<span>The electronic chemical <br /> potential ranges at which <br /> each oxidation state is likely <br/> to be observed</span>}>
            <div className={styles.headerText}>Oxidation States</div>
            </Tooltip>
        </div>
    );
};

export default GraphHeaders;
