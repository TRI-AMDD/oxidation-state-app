import { OxidationStatesAPI } from '../data-table/table-models/data-viewer-model';
import { Settings } from './render-graph';

export function renderSpeciesLabel(data: OxidationStatesAPI, canvas: HTMLCanvasElement, settings: Settings) {
    const { BAR_HEIGHT, OFFSET_Y } = settings;

    if (data.oxidationStateRangeData.length > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            for (const [i, specie] of data.oxidationStateRangeData.entries()) {
                const fontSize = BAR_HEIGHT * 0.3;
                ctx.font = `${fontSize}px sans-serif`;
                const textYPos = BAR_HEIGHT / 2 + i * (BAR_HEIGHT * 1.25) + fontSize * 0.3 + OFFSET_Y;
                const textXPos = BAR_HEIGHT * 0.4;

                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.fillText(specie.ionTypeSymbol, textXPos, textYPos);
            }
        }
    }
}
