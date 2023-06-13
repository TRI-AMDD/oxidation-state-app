import { useEffect, useMemo, useRef } from 'react';
import { OxidationStatesAPI } from 'models/DataViewerModel';
import { createPlotData, createBarPlotData, drawPlotDataCanvas, BAR_WIDTH } from './canvas-graph-util';
import { GraphType } from 'models/PlotDataModel';
import styles from './canvas-graph.module.css';
import SpecieLabel from './SpecieLabel';

interface Props {
    data: OxidationStatesAPI;
    graphType: GraphType;
}

const CanvasGraph = ({ data, graphType }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const items = useMemo(() => {
        if (graphType === GraphType.Bar) {
            return createBarPlotData(data);
        }

        return createPlotData(data);
    }, [data, graphType]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            drawPlotDataCanvas(items, canvas);
        }
    }, [items]);

    const figureHeight = 100 * data.oxidationStateRangeData.length;

    return (
        <div className={styles.container}>
            <div className={styles.species}>
                {data.oxidationStateRangeData.map((item, index) => (
                    <SpecieLabel key={item.ionTypeSymbol} index={index} label={item.ionTypeSymbol} />
                ))}
            </div>
            <canvas id="canvasGraph" ref={canvasRef} width={BAR_WIDTH} height={figureHeight} />
        </div>
    );
};

export default CanvasGraph;
