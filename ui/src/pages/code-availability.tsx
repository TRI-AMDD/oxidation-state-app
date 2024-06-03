import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import styles from './Tutorial/Tutorial.module.css';
// import { GITHUB_LINK } from '@/constants/links';

const CodeAvailability = () => {
    useEffect(() => {
        document.title = 'Oxidation State Analyzer - Code Availability';

        // TODO redirect to this url when the github repo is public
        // window.location.replace(GITHUB_LINK);
    }, []);

    return (
        <PageWrapper>
            <div className={styles.pageContainer}>
                <Typography component={'div'} variant="body1" sx={{ margin: '16px', fontSize: '20px' }}>
                    We expect this code to be available soon, pending approval
                </Typography>
            </div>
        </PageWrapper>
    );
};

export default CodeAvailability;
