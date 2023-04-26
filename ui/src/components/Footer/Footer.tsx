import { Link, Typography } from '@mui/material';
import styles from './Footer.module.css';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={styles.appFooter}>
            <Typography component={'div'} variant="body1" className={styles.footerLinksContainer}>
                <Link component={RouterLink} to="/">
                    Legal
                </Link>
                <Link component={RouterLink} to="/">
                    FAQ
                </Link>
                <Link component={RouterLink} to="/">
                    About Us
                </Link>
                <Link component={RouterLink} to="/">
                    Data
                </Link>
                <Link component={RouterLink} to="/">
                    Download
                </Link>
                <Link component={RouterLink} to="/">
                    Manuscript
                </Link>
            </Typography>
        </footer>
    );
};

export default Footer;
