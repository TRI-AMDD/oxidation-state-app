import { useAtom } from 'jotai';
import { oxidationDataAtom } from 'atoms/atoms';
import CanvasGraph from './CanvasGraph/CanvasGraph';
import styles from './Graph.module.css';
import GraphKey from './GraphKey/GraphKey';
import ElectronicChemicalPotentialInput from './ElectronicChemicalPotentialInput/ElectronicChemicalPotentialInput';
// import PlotlyGraph from './PlotlyGraph/PlotlyGraph';
import Slider from './Slider/Slider';
import useGraph from 'hooks/useGraph';
import useTable from 'hooks/useTable';

const Graph = () => {
    const [oxidationData] = useAtom(oxidationDataAtom);
    const { handleECPInputChange, ECPRange, ECPValue, handleSliderChange } = useGraph();
    const { selectedRow } = useTable();

    return (
        <div className={styles.container}>
            {oxidationData && selectedRow && (
                <>
                    <div className={styles.canvasContainer}>
                        <Slider
                            graphComponent={<CanvasGraph data={oxidationData} />}
                            initValue={selectedRow.optimalElecChemPotential}
                            ecpRange={ECPRange}
                            ECPInputValue={ECPValue}
                            handleSliderChange={handleSliderChange}
                        />
                    </div>
                    <ElectronicChemicalPotentialInput onChange={handleECPInputChange} value={ECPValue} />
                </>
            )}

            <GraphKey />
        </div>
    );
};

export default Graph;
