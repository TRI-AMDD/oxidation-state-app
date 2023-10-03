import { Link as RouterLink } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '@/Assets/Images/logo.svg';
import { Typography, Link } from '@mui/material';

export default function Header() {
    const path = window.location.pathname;
    const linkTarget = path === '/' ? '_blank' : undefined;

    return (
        <header className={styles.AppHeader}>
            <Link component={RouterLink} to="/">
                <Logo className={styles.logo} />
            </Link>
            <Typography component={'div'} variant="body2" className={styles.headerSubGroup}>
                <div className={styles.headerLinkContainer}>
                    <Link
                        component={RouterLink}
                        to="/tutorial"
                        rel="noopener noreferrer"
                        target={linkTarget}
                        underline="hover"
                        variant="whiteText"
                    >
                        Tutorial
                    </Link>
                </div>
                <div className={styles.headerLinkContainer}>
                    <Link
                        component={RouterLink}
                        to="/faq"
                        rel="noopener noreferrer"
                        target={linkTarget}
                        underline="hover"
                        variant="whiteText"
                    >
                        FAQ
                    </Link>
                </div>
                <div className={styles.headerLinkContainer}>
                    <Link
                        component={RouterLink}
                        to="/faq/#faq-0"
                        rel="noopener noreferrer"
                        target={linkTarget}
                        underline="hover"
                        variant="whiteText"
                    >
                        How to Cite
                    </Link>
                </div>
                <div className={styles.headerLinkContainer}>
                    <Link
                        component={RouterLink}
                        to="/about-us"
                        rel="noopener noreferrer"
                        target={linkTarget}
                        underline="hover"
                        variant="whiteText"
                    >
                        About Us
                    </Link>
                </div>
            </Typography>
        </header>
    );
}
