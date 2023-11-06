import { createBarPlotData, createPlotData, drawPlotDataCanvas } from '@/features/render-graph/render-graph';
import { renderSpeciesLabel } from '../render-graph/render-species-label';
import { renderSliderLine } from '../render-graph/render-slider';
import { renderKeys } from '../render-graph/render-key';
import { ExportGraphSettings } from '@/models/ExportGraphModel';
import { OxidationStatesAPI } from '../data-table/table-models/data-viewer-model';

export const BAR_WIDTH = 1680;
export const BAR_HEIGHT = 210;
export const OFFSET_X = 220;
export const OFFSET_Y = 100;

const settings = {
    BAR_HEIGHT,
    BAR_WIDTH,
    OFFSET_X,
    OFFSET_Y
};

interface Props {
    canvas: HTMLCanvasElement;
    data: OxidationStatesAPI;
    mpValue: number;
    img: HTMLImageElement;
    exportSettings: ExportGraphSettings;
}

export const renderExportGraph = (props: Props) => {
    const { canvas, data, mpValue, img, exportSettings } = props;

    const context = canvas.getContext('2d');
    if (context) {
        let items = [];
        if (exportSettings.showCurves) {
            items = createPlotData(data, settings);
        } else {
            items = createBarPlotData(data, settings);
        }

        drawPlotDataCanvas(items, canvas, exportSettings.showLabels, settings);
        renderSpeciesLabel(data, canvas, settings);

        if (exportSettings.showSliderBar) {
            renderSliderLine(data, canvas, mpValue, settings);
        }

        if (exportSettings.showColorKey) {
            renderKeys(data, canvas, settings, img);
        }
    }

    return canvas.toDataURL();
};
