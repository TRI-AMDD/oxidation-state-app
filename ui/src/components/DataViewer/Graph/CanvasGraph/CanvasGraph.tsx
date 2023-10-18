import { useEffect, useMemo, useRef } from 'react';
import { createPlotData, createBarPlotData, drawPlotDataCanvas } from '@/features/render-graph/render-graph';
import { GraphType } from '@/models/PlotDataModel';
import { OxidationStatesAPI } from '@/features/data-table/table-models/data-viewer-model';

interface Props {
    data: OxidationStatesAPI;
    graphType: GraphType;
}

export const BAR_WIDTH = 400;
export const BAR_HEIGHT = 50;

const settings = {
    BAR_WIDTH,
    BAR_HEIGHT,
    OFFSET_X: 0,
    OFFSET_Y: 0
};

const CanvasGraph = ({ data, graphType }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const items = useMemo(() => {
        if (graphType === GraphType.Bar) {
            return createBarPlotData(data, settings);
        }

        return createPlotData(data, settings);
    }, [data, graphType]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            drawPlotDataCanvas(items, canvas, true, settings);
        }
    }, [items]);

    const figureHeight = BAR_HEIGHT * 1.25 * data.oxidationStateRangeData.length;

    return <canvas id="canvasGraph" ref={canvasRef} width={BAR_WIDTH} height={figureHeight} />;
};

export default CanvasGraph;
