import styles from './Graph.module.css';
import PlotlyGraph from './PlotlyGraph/PlotlyGraph';

const Graph = () => {
    return (
        <div className={styles.container}>
            <PlotlyGraph />
        </div>
    );
};

export default Graph;
