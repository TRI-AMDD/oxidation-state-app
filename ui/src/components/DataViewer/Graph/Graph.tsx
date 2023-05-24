import { useAtom } from 'jotai';
import { oxidationDataAtom } from 'atoms/atoms';
import styles from './Graph.module.css';
import PlotlyGraph from './PlotlyGraph/PlotlyGraph';

const Graph = () => {
    const [oxidationData] = useAtom(oxidationDataAtom);

    return <div className={styles.container}>{oxidationData && <PlotlyGraph data={oxidationData} />}</div>;
};

export default Graph;
