import { OxidationStatesAPI } from '../data-table/table-models/data-viewer-model';
import { Settings } from './render-graph';
import { getPositionFromValue } from '@/utils/GraphUtil';

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
            const lineWidth = BAR_HEIGHT * 0.05;

            const ecpRange = [data.minGraph, data.maxGraph];
            const xPercent = getPositionFromValue(mpValue, ecpRange);
            const xPos = BAR_WIDTH * (xPercent / 100) - lineWidth / 2 + OFFSET_X;
            const yPos = data.oxidationStateRangeData.length * (BAR_HEIGHT * 1.25) - BAR_HEIGHT * 0.25;

            ctx.strokeStyle = '#3747ac';
            ctx.beginPath();
            ctx.moveTo(xPos, OFFSET_Y);
            ctx.lineTo(xPos, yPos + OFFSET_Y);
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    }
}
