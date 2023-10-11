import { Link, Typography } from '@mui/material';
import styles from './GetStarted.module.css';
import { Link as RouterLink } from 'react-router-dom';

const GetStarted = () => {
    return (
        <div className={styles.container}>
            <Typography component={'div'} variant="body1" className={styles.bodyText}>
                <strong>Get Started:</strong> Enter a chemical composition or upload a structure file to generate a
                ranked list of ways in which oxidation states can be assigned to the elements. To specify a composition
                in terms of{' '}
                <Link
                    component={RouterLink}
                    to="/tutorial/#tutorial-polyatomic-ions"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    polyatomic ions
                </Link>
                , surround each polyatomic ion in parentheses. For example, entering "Cu(SO4)" will produce oxidation
                state analysis for copper and sulfate, whereas entering "CuSO4" will produce analysis for copper,
                oxygen, and sulfur.
            </Typography>
        </div>
    );
};

export default GetStarted;
