import { createPlotData, drawPlotDataCanvas } from './render-graph';
import mockData from '@/mocks/sample-response.json';

const settings = {
    BAR_WIDTH: 450,
    BAR_HEIGHT: 50,
    OFFSET_X: 0,
    OFFSET_Y: 0
};

describe('drawPlotDataCanvas', () => {
    test(`should canvas draw calls`, function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const items = createPlotData(mockData, settings);
        if (ctx) {
            drawPlotDataCanvas(items, canvas, true, settings);
            const path = ctx.__getPath();
            expect(path).toMatchSnapshot();
        }
    });
});
