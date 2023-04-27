import { Typography } from '@mui/material';
import styles from './GetStarted.module.css';

const GetStarted = () => {
    return (
        <div className={styles.container}>
            <Typography component={'div'} variant="h5">
                Get Started:
            </Typography>
            <Typography component={'div'} variant="body1" className={styles.bodyText}>
                Enter a chemical composition or upload a structure file to generate a ranked list of ways in which{' '}
                <br />
                oxidation states can be assigned to the elements.
            </Typography>
        </div>
    );
};

export default GetStarted;
