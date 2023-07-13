import { Link as RouterLink } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '@/Assets/Images/logo.svg';
import { Typography, Link } from '@mui/material';

export default function Header() {
    return (
        <header className={styles.AppHeader}>
            <Link component={RouterLink} to="/">
                <Logo className={styles.logo} />
            </Link>
            <Typography component={'div'} variant="body2" className={styles.headerSubGroup}>
                <div className={styles.headerLinkContainer}>
                    <Link component={RouterLink} to="/" className={styles.headerLink} underline="hover">
                        FAQ
                    </Link>
                </div>
                <div className={styles.headerLinkContainer}>
                    <Link component={RouterLink} to="/" className={styles.headerLink} underline="hover">
                        About Us
                    </Link>
                </div>
            </Typography>
        </header>
    );
}
