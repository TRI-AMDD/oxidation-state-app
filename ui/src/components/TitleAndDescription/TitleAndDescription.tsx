import { Link, Typography } from '@mui/material';
import styles from './TitleAndDescription.module.css';

const TitleAndDescription = () => {
    return (
        <div className={styles.container}>
            <Typography component={'div'} variant="h4" className={styles.title}>
                Oxidation State Analyzer
            </Typography>
            <Typography component={'div'} variant="body1" className={styles.description}>
                This tool can be used to quickly identify likely oxidation states for a given composition, or assign
                likely oxidation states to sites in a given structure, using the methods described{' '}
                <Link
                    component={'a'}
                    href="https://chemrxiv.org/engage/chemrxiv/article-details/6542a27a48dad23120de97ee"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    here
                </Link>
                .
            </Typography>
            <Typography component={'div'} variant="body1" className={styles.subtext}>
                A library implementing the underlying methods is available to download for offline use.
            </Typography>
        </div>
    );
};

export default TitleAndDescription;
