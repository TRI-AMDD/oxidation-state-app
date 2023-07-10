import { Typography } from '@mui/material';
import styles from './TitleAndDescription.module.css';

const TitleAndDescription = () => {
    return (
        <div className={styles.container}>
            <Typography component={'div'} variant="h4" className={styles.title}>
                Oxidation State Analyzer
            </Typography>
            <Typography component={'div'} variant="body2">
                This tool can be used to quickly identify likely oxidation states for a given composition, or assign
                likely
            </Typography>
            <Typography component={'div'} variant="body2">
                oxidation states to sites in a given structure, using the methods described here.
            </Typography>
            <Typography component={'div'} variant="body2" className={styles.subtext}>
                A library implementing the underlying methods is available to download for offline use
            </Typography>
        </div>
    );
};

export default TitleAndDescription;
