import PageWrapper from '@/components/PageWrapper/PageWrapper';
import styles from './AboutUs.module.css';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        document.title = 'Oxidation State Analyzer - About Us';
    }, []);

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
                <Typography
                    variant="body1"
                    component={'div'}
                    sx={{ marginTop: '40px', marginLeft: '16px', marginRight: '16px' }}
                >
                    The oxidation state analyzer is an open web application for predicting and analyzing oxidation
                    states in materials based on <br /> the approach described in{' '}
                    <Link component={RouterLink} to="/" color="primary" underline="always">
                        manuscript
                    </Link>{' '}
                    (an overview of this approach is provided in the{' '}
                    <Link component={RouterLink} to="/tutorial">
                        tutorial
                    </Link>
                    ). An open-source implementation of the web site and core algorithms is available{' '}
                    <Link component={RouterLink} to="/">
                        here.
                    </Link>
                    <br />
                    <br />
                    The algorithms and web site were developed by the{' '}
                    <Link
                        component={'a'}
                        href="https://www.tri.global/our-work/energy-materials"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Energy & Materials Division
                    </Link>{' '}
                    of the Toyota Research Institute, with contributions from Tim Mueller, Joseph Montoya, Weike Ye, Ray
                    Lei, Linda Hung, Jens Hummelshoj, Michael Puzon, Daniel Martinez, Chris Fajardo, Rachel Abela, Brian
                    Storey, Reko Ong, Kumundra Aung, Kevin Tran, Ha-Kyung Kwon, and Kenji Yokoe.
                    <br />
                    If you have any questions about the web site or underlying approach, please reach out to us at{' '}
                    <Link component={'a'} href="mailto:em-oxi@tri.global">
                        em-oxi@tri.global
                    </Link>
                </Typography>
            </div>
        </PageWrapper>
    );
};

export default AboutUs;
