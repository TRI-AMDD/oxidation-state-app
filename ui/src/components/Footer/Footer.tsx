import { Link, Typography } from '@mui/material';
import styles from './Footer.module.css';
import { Link as RouterLink } from 'react-router-dom';

const TRI_GLOBAL_PRIVACY_POLICY_URL = 'https://www.tri.global/privacy-policy';

const Footer = () => {
    return (
        <footer className={styles.appFooter}>
            <Typography component={'div'} variant="body1" className={styles.footerLinksContainer}>
                <Link
                    component={'a'}
                    href={TRI_GLOBAL_PRIVACY_POLICY_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="whiteText"
                >
                    Legal
                </Link>
                <Link component={RouterLink} to="/" variant="whiteText">
                    FAQ
                </Link>
                <Link component={RouterLink} to="/about-us" variant="whiteText">
                    About Us
                </Link>
                <Link component={RouterLink} to="/" variant="whiteText">
                    Data
                </Link>
                <Link component={RouterLink} to="/" variant="whiteText">
                    Download
                </Link>
                <Link component={RouterLink} to="/" variant="whiteText">
                    Manuscript
                </Link>
            </Typography>
        </footer>
    );
};

export default Footer;
