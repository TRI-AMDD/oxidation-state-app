import { OxidationStatesAPI } from '../data-table/table-models/data-viewer-model';
import { Settings } from './render-graph';

export function renderKeys(
    data: OxidationStatesAPI,
    canvas: HTMLCanvasElement,
    settings: Settings,
    img: HTMLImageElement
) {
    const { BAR_HEIGHT } = settings;

    if (data.oxidationStateRangeData.length > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const items = data.oxidationStateRangeData.length;
            const fontSize = BAR_HEIGHT * 0.3;
            ctx.font = `${fontSize}px sans-serif`;
            const textYPos = BAR_HEIGHT / 2 + items * (BAR_HEIGHT * 1.25) + fontSize * 0.3;
            const textXPos = fontSize;

            ctx.fillStyle = 'black';
            ctx.textAlign = 'left';
            ctx.fillText('Key:', textXPos, textYPos + BAR_HEIGHT * 0.5);
            ctx.drawImage(img, BAR_HEIGHT * 1.05, textYPos, BAR_HEIGHT * 8.8, BAR_HEIGHT * 0.75);
        }
    }
}
