import { useAtom } from 'jotai';
import { oxidationDataAtom } from 'atoms/atoms';
import CanvasGraph from './CanvasGraph/CanvasGraph';
import styles from './Graph.module.css';
// import PlotlyGraph from './PlotlyGraph/PlotlyGraph';

const Graph = () => {
    const [oxidationData] = useAtom(oxidationDataAtom);

    return <div className={styles.container}>{oxidationData && <CanvasGraph data={oxidationData} />}</div>;
};

export default Graph;
