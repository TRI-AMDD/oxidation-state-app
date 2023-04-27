import Header from 'components/Header/Header';
import styles from './Home.module.css';
import Footer from 'components/Footer/Footer';
import { Grid } from '@mui/material';
import TitleAndDescription from 'components/TitleAndDescription/TitleAndDescription';
import HowToUse from 'components/HowToUse/HowToUse';
import GetStarted from 'components/GetStarted/GetStarted';
import InputSection from 'components/InputSection/InputSection';

function Home() {
    return (
        <div className={styles.App}>
            <Header />
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignContent="center"
                className={styles.AppMain}
                spacing={2}
                textAlign="center"
            >
                <Grid item>
                    <TitleAndDescription />
                </Grid>
                <Grid item>
                    <HowToUse />
                </Grid>
                <Grid item>
                    <GetStarted />
                </Grid>
                <Grid item>
                    <InputSection />
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
}

export default Home;
