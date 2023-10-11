import { OxidationStatesAPI } from '@/models/DataViewerModel';
import { Settings, computeECP } from './render-graph';

export function renderSliderLine(
    data: OxidationStatesAPI,
    canvas: HTMLCanvasElement,
    mpValue: number,
    settings: Settings
) {
    const { BAR_HEIGHT, BAR_WIDTH, OFFSET_X, OFFSET_Y } = settings;

    if (data.oxidationStateRangeData.length > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const intercept = data.potentialMapper.intercept;
            const slope = data.potentialMapper.slope;
            const maxBoundaryValue = computeECP(data.maxGraph, intercept, slope);
            const minBoundaryValue = computeECP(data.minGraph, intercept, slope);

            const diff = maxBoundaryValue - minBoundaryValue;
            const xMultiplier = BAR_WIDTH / diff;
            const xPos = ((mpValue - minBoundaryValue) * xMultiplier) + OFFSET_X;
            const yPos = data.oxidationStateRangeData.length * (BAR_HEIGHT * 1.25) - (BAR_HEIGHT * 0.25);

            const lineWidth = BAR_HEIGHT * 0.05;

            ctx.strokeStyle = '#3747ac';
            ctx.beginPath();
            ctx.moveTo(xPos, OFFSET_Y);
            ctx.lineTo(xPos, yPos + OFFSET_Y);
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    }
}
