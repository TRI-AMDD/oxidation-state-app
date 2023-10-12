import { ColorPalette, TextColor } from '@/constants/colors';
import { OxidationStatesAPI } from '@/models/DataViewerModel';
import { PlotData } from '@/models/PlotDataModel';
import { formatOxidationState } from '@/utils/GraphUtil';

const GRAPH_POINTS = 250;

export interface Settings {
    BAR_WIDTH: number;
    BAR_HEIGHT: number;
    OFFSET_X: number;
    OFFSET_Y: number;
}

function getStateRangeLabelPosition(min: number, max: number, xMultiplier: number, minBoundaryValue: number) {
    // Get the middle of the boundary difference
    const rangeDiff = (max - min) / 2;

    // Get the x position relative to the min value
    const xPos = min + rangeDiff - minBoundaryValue;

    return xPos * xMultiplier;
}

export function computeECP(mappedPotential: number, intercept: number, slope: number) {
    return (mappedPotential - intercept) / slope;
}

export function createPlotData(data: OxidationStatesAPI, settings: Settings): PlotData[] {
    const generatedData: PlotData[] = [];
    const { BAR_HEIGHT, BAR_WIDTH } = settings;
    const intercept = data.potentialMapper.intercept;
    const slope = data.potentialMapper.slope;
    const maxBoundaryValue = computeECP(data.maxGraph, intercept, slope);
    const minBoundaryValue = computeECP(data.minGraph, intercept, slope);

    const diff = maxBoundaryValue - minBoundaryValue;
    const xPoints = Array.from({ length: GRAPH_POINTS }, (_v, k) => (k / GRAPH_POINTS) * diff + minBoundaryValue);

    for (const [index, rangeData] of data.oxidationStateRangeData.entries()) {
        const oxidationStates = [];

        // offset y of each graph
        const indexY = BAR_HEIGHT + index * (BAR_HEIGHT * 1.25);
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
                textPos: [getStateRangeLabelPosition(min, max, xMultiplier, minBoundaryValue), indexY - BAR_HEIGHT / 2]
            });
        }

        generatedData.push({
            specie: rangeData.ionTypeSymbol,
            textPos: [15, indexY - BAR_HEIGHT / 2],
            oxidationStates
        });
    }

    return generatedData;
}

export function createBarPlotData(data: OxidationStatesAPI, settings: Settings): PlotData[] {
    const generatedData: PlotData[] = [];
    const { BAR_HEIGHT, BAR_WIDTH } = settings;
    const maxBoundaryValue = data.maxGraph;
    const minBoundaryValue = data.minGraph;
    const diff = maxBoundaryValue - minBoundaryValue;

    for (const [index, rangeData] of data.oxidationStateRangeData.entries()) {
        const oxidationStates = [];

        // offset y of each graph
        const indexY = BAR_HEIGHT + index * (BAR_HEIGHT * 1.25);
        const xMultiplier = BAR_WIDTH / diff;

        for (let i = 0; i < rangeData.oxidationStates.length; i++) {
            const oxidationState = rangeData.oxidationStates[i];
            const min = rangeData.rangeBoundaries[i];
            const max = rangeData.rangeBoundaries[i + 1];

            const leftX = min < minBoundaryValue ? 0 : (min - minBoundaryValue) * xMultiplier;
            const rightX = max > maxBoundaryValue ? BAR_WIDTH : (max - minBoundaryValue) * xMultiplier;

            const topY = indexY;
            const bottomY = indexY - BAR_HEIGHT;

            oxidationStates.push({
                specie: rangeData.ionTypeSymbol,
                oxidationState,
                potential: [leftX, rightX, rightX, leftX],
                likelihood: [bottomY, bottomY, topY, topY],
                toShowLabel: rightX - leftX > 25,
                textPos: [leftX + (rightX - leftX) / 2, indexY - BAR_HEIGHT / 2]
            });
        }

        generatedData.push({
            specie: rangeData.ionTypeSymbol,
            textPos: [15, indexY - BAR_HEIGHT / 2],
            oxidationStates
        });
    }

    return generatedData;
}

export function drawPlotDataCanvas(
    items: PlotData[],
    canvas: HTMLCanvasElement,
    showLabels: boolean,
    settings: Settings
) {
    const { BAR_HEIGHT, OFFSET_X, OFFSET_Y } = settings;

    if (items.length > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (const specie of items) {
                for (const item of specie.oxidationStates) {
                    ctx.beginPath();
                    const color = ColorPalette[item.oxidationState];
                    ctx.fillStyle = color;

                    ctx.moveTo(OFFSET_X + item.potential[0], OFFSET_Y + item.likelihood[0]);
                    for (let i = 0; i < item.potential.length; i++) {
                        ctx.lineTo(OFFSET_X + item.potential[i], OFFSET_Y + item.likelihood[i]);
                    }

                    ctx.closePath();
                    ctx.fill();
                }
            }

            if (showLabels) {
                const fontSize = BAR_HEIGHT * 0.3;
                ctx.font = `${fontSize}px sans-serif`;
                for (const specie of items) {
                    for (const item of specie.oxidationStates) {
                        if (item.toShowLabel) {
                            ctx.fillStyle = TextColor[item.oxidationState];
                            ctx.textAlign = 'center';
                            ctx.fillText(
                                formatOxidationState(item.oxidationState),
                                OFFSET_X + item.textPos[0],
                                OFFSET_Y + fontSize * 0.3 + item.textPos[1]
                            );
                        }
                    }
                }
            }
        }
    }
}
