import { useMemo } from 'react';

import Plot from 'react-plotly.js';
import { formatOxidationState } from '@/utils/GraphUtil';
import { Data } from 'plotly.js';
import { OxidationStatesAPI } from '@/models/DataViewerModel';

const GRAPH_POINTS = 250;

interface PlotData {
    specie: string;
    oxidationState: number;
    potential: number[];
    likelihood: number[];
}

interface Props {
    data: OxidationStatesAPI;
}

const PlotlyGraph = ({ data }: Props) => {
    const items = useMemo(() => {
        const generatedData: PlotData[] = [];
        const diff = data.maxBoundaryValue - data.minBoundaryValue;
        const xPoints = Array.from(
            { length: GRAPH_POINTS },
            (_v, k) => (k / GRAPH_POINTS) * diff + data.minBoundaryValue
        );
        const xReversePoints = [...xPoints].reverse();

        for (const [index, rangeData] of data.oxidationStateRangeData.entries()) {
            for (let i = 0; i < rangeData.oxidationStates.length; i++) {
                const oxidationState = rangeData.oxidationStates[i];
                const min = rangeData.rangeBoundaries[i];
                const max = rangeData.rangeBoundaries[i + 1];

                // offset y of each graph
                const indexY = index * 1.5;

                const yLeftPoints: number[] = [];
                const yRightPoints: number[] = [];
                // points for left boundary
                for (const point of xPoints) {
                    yLeftPoints.push(1 / (1 + Math.exp(point - min)) + indexY);
                }

                // points for right boundary
                for (const point of xPoints) {
                    yRightPoints.push(1 / (1 + Math.exp(point - max)) + indexY);
                }
                yRightPoints.reverse();

                generatedData.push({
                    specie: rangeData.ionTypeSymbol,
                    oxidationState,
                    potential: [...xPoints, ...xReversePoints],
                    likelihood: [...yLeftPoints, ...yRightPoints]
                });
            }
        }

        const graphData: Data[] = [];

        for (let i = 0; i < generatedData.length; i++) {
            if (generatedData[i].oxidationState !== 0) {
                graphData.push({
                    name: `${generatedData[i].specie} ${formatOxidationState(generatedData[i].oxidationState)}`,
                    x: generatedData[i].potential,
                    y: generatedData[i].likelihood,
                    type: 'scatter',
                    fill: 'toself',
                    mode: 'lines'
                });
            }
        }
        return graphData;
    }, [data]);

    const figureHeight = 180 * data.oxidationStateRangeData.length;

    return <Plot data={items} layout={{ width: 543, height: figureHeight }} />;
};

export default PlotlyGraph;
