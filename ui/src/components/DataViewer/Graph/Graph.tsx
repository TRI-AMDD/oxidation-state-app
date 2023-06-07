import { useAtom } from 'jotai';
import { oxidationDataAtom } from 'atoms/atoms';
import CanvasGraph from './CanvasGraph/CanvasGraph';
import styles from './Graph.module.css';
import GraphKey from './GraphKey/GraphKey';
// import PlotlyGraph from './PlotlyGraph/PlotlyGraph';

const Graph = () => {
    const [oxidationData] = useAtom(oxidationDataAtom);
    console.log(window.screen.availWidth);

    return (
        <div className={styles.container}>
            {oxidationData && <CanvasGraph data={oxidationData} />}
            <div>
                <GraphKey />
            </div>
        </div>
    );
};

export default Graph;
