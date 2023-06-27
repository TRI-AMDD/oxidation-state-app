import styles from './GraphHeaders.module.css';

const GraphHeaders = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headerText}>Species</div>
            <div className={styles.divider} />
            <div className={styles.headerText}>Oxidation States</div>
        </div>
    );
};

export default GraphHeaders;
