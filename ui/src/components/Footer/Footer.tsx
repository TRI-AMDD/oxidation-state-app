import { Link, Typography } from '@mui/material';
import styles from './Footer.module.css';
import { Link as RouterLink } from 'react-router-dom';

const TRI_GLOBAL_PRIVACY_POLICY_URL = 'https://www.tri.global/privacy-policy';

const Footer = () => {
    const path = window.location.pathname;
    const linkTarget = path === '/' ? '_blank' : undefined;

    return (
        <footer className={styles.appFooter}>
            <Typography component={'div'} variant="body1" className={styles.footerLinksContainer}>
                <Link
                    component={'a'}
                    href={TRI_GLOBAL_PRIVACY_POLICY_URL}
                    rel="noopener noreferrer"
                    target={linkTarget}
                    variant="whiteText"
                >
                    Legal
                </Link>
                <Link
                    component={RouterLink}
                    to="/faq"
                    rel="noopener noreferrer"
                    target={linkTarget}
                    variant="whiteText"
                >
                    FAQ
                </Link>
                <Link
                    component={RouterLink}
                    to="/about-us"
                    variant="whiteText"
                    rel="noopener noreferrer"
                    target={linkTarget}
                >
                    About Us
                </Link>
                <Link
                    component={RouterLink}
                    to="/faq/#faq-12"
                    rel="noopener noreferrer"
                    target={linkTarget}
                    variant="whiteText"
                >
                    API
                </Link>
                <Link
                    component={RouterLink}
                    to="/faq/#faq-13"
                    rel="noopener noreferrer"
                    target={linkTarget}
                    variant="whiteText"
                >
                    Data
                </Link>
                <Link
                    component={RouterLink}
                    to="/faq/#faq-11"
                    rel="noopener noreferrer"
                    target={linkTarget}
                    variant="whiteText"
                >
                    Download
                </Link>
                <Link
                    component={RouterLink}
                    to="/faq/#faq-0"
                    rel="noopener noreferrer"
                    target={linkTarget}
                    variant="whiteText"
                >
                    Manuscript
                </Link>
            </Typography>
        </footer>
    );
};

export default Footer;
