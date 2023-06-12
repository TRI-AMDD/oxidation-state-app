import { useAtom } from 'jotai';
import { oxidationDataAtom } from 'atoms/atoms';
import CanvasGraph from './CanvasGraph/CanvasGraph';
import styles from './Graph.module.css';
import GraphKey from './GraphKey/GraphKey';
import ElectronicChemicalPotentialInput from './ElectronicChemicalPotentialInput/ElectronicChemicalPotentialInput';
// import PlotlyGraph from './PlotlyGraph/PlotlyGraph';
import { ReactCompareSlider } from 'react-compare-slider';

const CustomHandle = () => {
    return <div style={{ backgroundColor: '#3747AC', width: '2px', height: '100%', cursor: 'ew-resize' }}></div>;
};

const Graph = () => {
    const [oxidationData] = useAtom(oxidationDataAtom);

    return (
        <div className={styles.container}>
            {oxidationData && (
                <ReactCompareSlider
                    itemOne={<CanvasGraph data={oxidationData} />}
                    itemTwo={<CanvasGraph data={oxidationData} />}
                    handle={<CustomHandle />}
                />
            )}
            <ElectronicChemicalPotentialInput />
            <GraphKey />
        </div>
    );
};

export default Graph;
