import PageWrapper from '@/components/PageWrapper/PageWrapper';
import styles from './AboutUs.module.css';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Router, Link as RouterLink } from 'react-router-dom';

const AboutUs = () => {
    return (
        <PageWrapper>
            <Breadcrumbs className={styles.breadcrumbs}>
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link color="text.primary">About Us</Link>
            </Breadcrumbs>
            <div className={styles.pageContainer}>
                <Typography variant="h4" component={'div'}>
                    About Us
                </Typography>
                <Typography variant="body1" component={'div'} sx={{ marginTop: '40px' }}>
                    The oxidation state analyzer is an open web application for predicting and analyzing oxidation
                    states in materials based on <br /> the theory and algorithms described in this{' '}
                    <Link component={RouterLink} to="/tutorial" color="primary" underline="always">
                        manuscript
                    </Link>{' '}
                    (an overview of this approach is provided in the{' '}
                    <Link component={RouterLink} to="/">
                        tutorial
                    </Link>
                    )
                    <br />
                    <br />
                    An open source implementation of the core algorithm is available{' '}
                    <Link component={RouterLink} to="/">
                        here.
                    </Link>
                    <br />
                    If you have any questions about the web site or underlying approach, please reach out to us at{' '}
                    <Link>Placeholder.</Link>
                    <br />
                    <br />
                    THe algorithms and web site were developed by the Energy & Materials Division of the Toyota Research
                    Institute.
                </Typography>
            </div>
        </PageWrapper>
    );
};

export default AboutUs;
