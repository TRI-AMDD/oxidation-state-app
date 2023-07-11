import { useEffect, useMemo, useRef } from 'react';
import { OxidationStatesAPI } from 'models/DataViewerModel';
import { createPlotData, createBarPlotData, drawPlotDataCanvas, BAR_WIDTH } from './canvas-graph-util';
import { GraphType } from 'models/PlotDataModel';
import { useAtom } from 'jotai';
import { exportGraphSettingsAtom } from 'atoms/atoms';

interface Props {
    data: OxidationStatesAPI;
    graphType: GraphType;
}

const CanvasGraph = ({ data, graphType }: Props) => {
    const [exportGraphSettings] = useAtom(exportGraphSettingsAtom);
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
            drawPlotDataCanvas(items, canvas, exportGraphSettings.showLabels);
        }
    }, [exportGraphSettings.showLabels, items]);

    const figureHeight = 75 * data.oxidationStateRangeData.length;

    return <canvas id="canvasGraph" ref={canvasRef} width={BAR_WIDTH} height={figureHeight} />;
};

export default CanvasGraph;
