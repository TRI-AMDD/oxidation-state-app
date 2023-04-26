import Header from 'components/Header/Header';
import { useQuery } from 'react-query';
import styles from './Home.module.css';
import Footer from 'components/Footer/Footer';

function Home() {
    const info = useQuery('getInfo', () =>
        fetch(`${API_BASE_URL}/api/items/123?q=blah`).then((response) => {
            return response.json();
        })
    );

    return (
        <div className={styles.App}>
            <Header />
            <main className={styles.AppMain}>
                <p>
                    Edit <code>src/pages/Home/Home.tsx</code> and save to reload.
                </p>
                {info.isSuccess && (
                    <p>
                        Data ID: {info.data.item_id} <br /> Data Query: {info.data.q}
                    </p>
                )}

                <a className={styles.AppLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
