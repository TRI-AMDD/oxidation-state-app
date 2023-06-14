import { useAtom } from 'jotai';
import { oxidationDataAtom } from 'atoms/atoms';
import CanvasGraph from './CanvasGraph/CanvasGraph';
import styles from './Graph.module.css';
import GraphKey from './GraphKey/GraphKey';
import ElectronicChemicalPotentialInput from './ElectronicChemicalPotentialInput/ElectronicChemicalPotentialInput';
import { GraphType } from 'models/PlotDataModel';
import { useState } from 'react';
import Slider from './Slider/Slider';
import useGraph from 'hooks/useGraph';
import useTable from 'hooks/useTable';
import SpecieLabel from './CanvasGraph/SpecieLabel';

const Graph = () => {
    const [oxidationData] = useAtom(oxidationDataAtom);
    const [graphType] = useState<GraphType>(GraphType.Wavy);
    const { handleECPInputChange, ECPRange, ECPValue, handleSliderChange } = useGraph();
    const { selectedRow } = useTable();

    return (
        <div className={styles.container}>
            {oxidationData && selectedRow && (
                <>
                    <div className={styles.graphContainer}>
                        <div className={styles.species}>
                            {oxidationData.oxidationStateRangeData.map((item, index) => (
                                <SpecieLabel key={item.ionTypeSymbol} index={index} label={item.ionTypeSymbol} />
                            ))}
                        </div>
                        <div className={styles.canvasContainer}>
                            <Slider
                                graphComponent={<CanvasGraph data={oxidationData} graphType={graphType} />}
                                initValue={selectedRow.optimalElecChemPotential}
                                ecpRange={ECPRange}
                                ECPInputValue={ECPValue}
                                handleSliderChange={handleSliderChange}
                            />
                        </div>
                    </div>

                    <ElectronicChemicalPotentialInput onChange={handleECPInputChange} value={ECPValue} />
                </>
            )}

            <GraphKey />
        </div>
    );
};

export default Graph;
