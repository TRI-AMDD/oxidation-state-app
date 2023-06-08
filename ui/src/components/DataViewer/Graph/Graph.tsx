import { useAtom } from 'jotai';
import { oxidationDataAtom } from 'atoms/atoms';
import CanvasGraph from './CanvasGraph/CanvasGraph';
import styles from './Graph.module.css';
import GraphKey from './GraphKey/GraphKey';
import ElectronicChemicalPotentialInput from './ElectronicChemicalPotentialInput/ElectronicChemicalPotentialInput';
// import PlotlyGraph from './PlotlyGraph/PlotlyGraph';

const Graph = () => {
    const [oxidationData] = useAtom(oxidationDataAtom);

    return (
        <div className={styles.container}>
            {oxidationData && <CanvasGraph data={oxidationData} />}
            <ElectronicChemicalPotentialInput />
            <GraphKey />
        </div>
    );
};

export default Graph;
