import styles from './Home.module.css';
import { Grid } from '@mui/material';
import TitleAndDescription from '@/components/TitleAndDescription/TitleAndDescription';
import HowToUse from '@/components/HowToUse/HowToUse';
import GetStarted from '@/components/GetStarted/GetStarted';
import InputSection from '@/components/InputSection/InputSection';
import DataViewer from '@/components/DataViewer/DataViewer';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = 'Oxidation State Analyzer';
    }, []);

    return (
        <PageWrapper>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignContent="center"
                className={styles.AppMain}
                spacing={2}
                textAlign="center"
            >
                <Grid item className={styles.itemPadding}>
                    <TitleAndDescription />
                </Grid>
                <Grid item className={styles.itemPadding}>
                    <HowToUse />
                </Grid>

                <Grid item className={styles.itemPadding}>
                    <GetStarted />
                </Grid>
                <Grid item className={styles.itemPadding}>
                    <InputSection />
                </Grid>
            </Grid>
            <DataViewer />
        </PageWrapper>
    );
}

export default Home;
