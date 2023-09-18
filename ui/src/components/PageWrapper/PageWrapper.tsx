import styles from './PageWrapper.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from '@mui/material/Container';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <div className={styles.App}>
            <Header />
            <Container maxWidth="lg">
                {children}
            </Container>
            <Footer />
        </div>
    );
};

export default PageWrapper;
