import styles from './PageWrapper.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <div className={styles.App}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default PageWrapper;
