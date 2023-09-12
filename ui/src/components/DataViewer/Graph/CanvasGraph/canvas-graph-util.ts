import { ColorPalette, TextColor } from '@/constants/colors';
import { OxidationStatesAPI } from '@/models/DataViewerModel';
import { PlotData } from '@/models/PlotDataModel';
import { formatOxidationState } from '@/utils/GraphUtil';

const GRAPH_POINTS = 250;
export const BAR_WIDTH = 350;
export const BAR_HEIGHT = 50;

function getStateRangeLabelPosition(min: number, max: number, xMultiplier: number, minBoundaryValue: number) {
    // Get the middle of the boundary difference
    const rangeDiff = (max - min) / 2;

    // Get the x position relative to the min value
    const xPos = min + rangeDiff - minBoundaryValue;

    return xPos * xMultiplier - 7;
}

export function computeECP(mappedPotential: number, intercept: number, slope: number) {
    return (mappedPotential - intercept) / slope;
}

export function createPlotData(data: OxidationStatesAPI): PlotData[] {
    const generatedData: PlotData[] = [];
    const intercept = data.potentialMapper.intercept;
    const slope = data.potentialMapper.slope;
    const maxBoundaryValue = computeECP(data.maxBoundaryValue, intercept, slope);
    const minBoundaryValue = computeECP(data.minBoundaryValue, intercept, slope);

    const diff = maxBoundaryValue - minBoundaryValue;
    const xPoints = Array.from({ length: GRAPH_POINTS }, (_v, k) => (k / GRAPH_POINTS) * diff + minBoundaryValue);

    for (const [index, rangeData] of data.oxidationStateRangeData.entries()) {
        const oxidationStates = [];

        // offset y of each graph
        const indexY = BAR_HEIGHT + index * 60;
        const xMultiplier = BAR_WIDTH / diff;

        for (let i = 0; i < rangeData.oxidationStates.length; i++) {
            const min = computeECP(rangeData.rangeBoundaries[i], intercept, slope);
            const max = computeECP(rangeData.rangeBoundaries[i + 1], intercept, slope);

            const oxidationState = rangeData.oxidationStates[i];
            const yLeftPoints: number[] = [];
            const xLeftPoints: number[] = [];
            const yRightPoints: number[] = [];

            // points for left boundary
            for (const point of xPoints) {
                yLeftPoints.push(indexY - (1 / (1 + Math.exp(point - min))) * BAR_HEIGHT);
                xLeftPoints.push((point - minBoundaryValue) * xMultiplier);
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
                toShowLabel: max - min > 3,
                textPos: [
                    getStateRangeLabelPosition(min, max, xMultiplier, minBoundaryValue),
                    indexY - BAR_HEIGHT / 2 + 5
                ]
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

export function createBarPlotData(data: OxidationStatesAPI): PlotData[] {
    const generatedData: PlotData[] = [];
    const diff = data.maxBoundaryValue - data.minBoundaryValue;

    for (const [index, rangeData] of data.oxidationStateRangeData.entries()) {
        const oxidationStates = [];

        // offset y of each graph
        const indexY = BAR_HEIGHT + index * 60;
        const xMultiplier = BAR_WIDTH / diff;

        for (let i = 0; i < rangeData.oxidationStates.length; i++) {
            const oxidationState = rangeData.oxidationStates[i];
            const min = rangeData.rangeBoundaries[i];
            const max = rangeData.rangeBoundaries[i + 1];

            const leftX = min < data.minBoundaryValue ? 0 : (min - data.minBoundaryValue) * xMultiplier;
            const rightX = max > data.maxBoundaryValue ? BAR_WIDTH : (max - data.minBoundaryValue) * xMultiplier;

            const topY = indexY;
            const bottomY = indexY - BAR_HEIGHT;

            oxidationStates.push({
                specie: rangeData.ionTypeSymbol,
                oxidationState,
                potential: [leftX, rightX, rightX, leftX],
                likelihood: [bottomY, bottomY, topY, topY],
                toShowLabel: rightX - leftX > 25,
                textPos: [leftX + (rightX - leftX) / 2 - 7, indexY - BAR_HEIGHT / 2 + 5]
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

export function drawPlotDataCanvas(items: PlotData[], canvas: HTMLCanvasElement, showLabels: boolean) {
    if (items.length > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const canvasHeight = 100 * items.length;
            ctx.clearRect(0, 0, BAR_WIDTH, canvasHeight);

            for (const specie of items) {
                for (const item of specie.oxidationStates) {
                    ctx.beginPath();
                    const color = ColorPalette[item.oxidationState];
                    ctx.fillStyle = color;

                    ctx.moveTo(item.potential[0], item.likelihood[0]);
                    for (let i = 0; i < item.potential.length; i++) {
                        ctx.lineTo(item.potential[i], item.likelihood[i]);
                    }

                    ctx.closePath();
                    ctx.fill();
                }
            }

            if (showLabels) {
                ctx.font = '16px sans-serif';
                for (const specie of items) {
                    for (const item of specie.oxidationStates) {
                        if (item.toShowLabel) {
                            ctx.fillStyle = TextColor[item.oxidationState];
                            ctx.fillText(formatOxidationState(item.oxidationState), item.textPos[0], item.textPos[1]);
                        }
                    }
                }
            }
        }
    }
}
