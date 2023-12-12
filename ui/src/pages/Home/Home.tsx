import styles from './Home.module.css';
import { Grid } from '@mui/material';
import TitleAndDescription from '@/components/TitleAndDescription/TitleAndDescription';
import HowToUse from '@/components/HowToUse/HowToUse';
import GetStarted from '@/components/GetStarted/GetStarted';
import InputSection from '@/features/input-submission/input-section/input-section';
import DataViewer from '@/components/DataViewer/DataViewer';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { useEffect} from 'react';
import useInputs from '@/features/input-submission/input-hooks/use-inputs';
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const { handleFileUpload, handleSubmitClick, handleEnterClick} = useInputs();
    const param = new URLSearchParams(location.search);
    const qparam = param.get('q');
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
                    <InputSection
                        handleFileUpload={handleFileUpload}
                        handleSubmitClick={handleSubmitClick}
                        handleEnterClick={handleEnterClick}
                        inputFromUrl={qparam}
                    />
                </Grid>
            </Grid>
            <DataViewer />
        </PageWrapper>
        
    );
}

export default Home;