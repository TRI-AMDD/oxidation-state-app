import { OxidationStatesAPI } from 'models/DataViewerModel';
import { PlotData } from 'models/PlotDataModel';

const GRAPH_POINTS = 250;
const BAR_WIDTH = 350;
const BAR_HEIGHT = 50;
const BAR_X_OFFSET = 0;

function getStateRangeLabelPosition(min: number, max: number, xMultiplier: number, data: OxidationStatesAPI) {
    // Get the middle of the boundary difference
    const rangeDiff = (max - min) / 2;

    // Get the x position relative to the min value
    const xPos = min + rangeDiff - data.minBoundaryValue;

    return BAR_X_OFFSET + xPos * xMultiplier - 5;
}

export function createPlotData(data: OxidationStatesAPI): PlotData[] {
    const generatedData: PlotData[] = [];
    const diff = data.maxBoundaryValue - data.minBoundaryValue;
    const xPoints = Array.from({ length: GRAPH_POINTS }, (v, k) => (k / GRAPH_POINTS) * diff + data.minBoundaryValue);

    for (const [index, rangeData] of data.oxidationStateRangeData.entries()) {
        const oxidationStates = [];

        // offset y of each graph
        const indexY = BAR_HEIGHT + index * 75;
        const xMultiplier = BAR_WIDTH / diff;

        for (let i = 0; i < rangeData.oxidationStates.length; i++) {
            const oxidationState = rangeData.oxidationStates[i];
            const min = rangeData.rangeBoundaries[i];
            const max = rangeData.rangeBoundaries[i + 1];

            const yLeftPoints: number[] = [];
            const xLeftPoints: number[] = [];
            const yRightPoints: number[] = [];

            // points for left boundary
            for (const point of xPoints) {
                yLeftPoints.push(indexY - (1 / (1 + Math.exp(point - min))) * BAR_HEIGHT);
                xLeftPoints.push(BAR_X_OFFSET + (point - data.minBoundaryValue) * xMultiplier);
            }

            // points for right boundary
            for (const point of xPoints) {
                yRightPoints.push(indexY - (1 / (1 + Math.exp(point - max))) * BAR_HEIGHT);
            }
            const xRightPoints = [...xLeftPoints].reverse();
            yRightPoints.reverse();

            oxidationStates.push({
                specie: rangeData.ionTypeSymbol,
                oxidationState,
                potential: [...xLeftPoints, ...xRightPoints],
                likelihood: [...yLeftPoints, ...yRightPoints],
                textPos: [getStateRangeLabelPosition(min, max, xMultiplier, data), indexY - BAR_HEIGHT / 2 + 5]
            });
        }

        generatedData.push({
            specie: rangeData.ionTypeSymbol,
            textPos: [15, indexY - BAR_HEIGHT / 2 + 5],
            oxidationStates
        });
    }

    return generatedData;
}
