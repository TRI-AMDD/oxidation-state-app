import { useAtom } from 'jotai';
import { oxidationDataAtom } from '@/atoms/atoms';
import CanvasGraph from './CanvasGraph/CanvasGraph';
import styles from './Graph.module.css';
import GraphKey from './GraphKey/GraphKey';
import ElectronicChemicalPotentialInput from './ElectronicChemicalPotentialInput/ElectronicChemicalPotentialInput';
import { GraphType } from '@/models/PlotDataModel';
import { useState } from 'react';
import Slider from './Slider/Slider';
import useGraph from '@/hooks/useGraph';
import useTable from '@/features/data-table/table-hooks/use-table';
import SpecieLabel from './CanvasGraph/SpecieLabel';
import GraphTypeToggle from './GraphTypeToggle/GraphTypeToggle';
import NudgeButtons from './NudgeButtons/NudgeButtons';
import ExportGraphButton from '@/features/export-graph/ExportGraphButton';
import GraphHeaders from './GraphHeaders/GraphHeaders';
import BoundaryDot from './BoundaryDot/BoundaryDot';

const Graph = () => {
    const [oxidationData] = useAtom(oxidationDataAtom);
    const [graphType, setGraphType] = useState<GraphType>(GraphType.Wavy);
    const { ECPValue, handleMPVChange, handleNudgeChange } = useGraph();
    const { selectedRow } = useTable();

    return (
        <div className={styles.container}>
            <ExportGraphButton />
            {oxidationData && selectedRow && (
                <div id="graph-export" className={styles.graphExport}>
                    <div className={styles.graphHeader}>
                        <GraphHeaders />
                        <NudgeButtons onChange={handleNudgeChange} value={ECPValue} data={oxidationData} />
                    </div>
                    <div className={styles.graphContainer}>
                        <div className={styles.species}>
                            {oxidationData.oxidationStateRangeData.map((item, index) => (
                                <SpecieLabel key={item.ionTypeSymbol} index={index} label={item.ionTypeSymbol} />
                            ))}
                        </div>
                        <div className={styles.canvasContainer}>
                            <Slider
                                graphComponent={<CanvasGraph data={oxidationData} graphType={graphType} />}
                                initValue={selectedRow.optimalMappedPotential}
                                oxidationData={oxidationData}
                                ECPInputValue={ECPValue}
                                handleSliderChange={handleMPVChange}
                            />
                            <BoundaryDot value={ECPValue} oxidationData={oxidationData} />
                        </div>
                    </div>
                    <div className={styles.inputAndToggleContainer}>
                        <ElectronicChemicalPotentialInput onChange={handleMPVChange} value={ECPValue} />
                        <GraphTypeToggle graphType={graphType} setGraphType={setGraphType} />
                    </div>
                    <GraphKey />
                </div>
            )}
        </div>
    );
};

export default Graph;
