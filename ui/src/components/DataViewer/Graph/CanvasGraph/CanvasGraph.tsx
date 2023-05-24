import { useEffect, useMemo, useRef } from 'react';
import { formatOxidationState } from 'utils/GraphUtil';
import { OxidationStatesAPI } from 'models/DataViewerModel';
import { ColorPalette } from 'constants/colors';

const GRAPH_POINTS = 250;
const BAR_WIDTH = 350;
const BAR_HEIGHT = 50;

interface PlotData {
    specie: string;
    oxidationState: number;
    potential: number[];
    likelihood: number[];
    textPos: number[];
}

interface Props {
    data: OxidationStatesAPI;
}

const CanvasGraph = ({ data }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const items = useMemo(() => {
        const generatedData: PlotData[] = [];
        const diff = data.maxBoundaryValue - data.minBoundaryValue;
        const xPoints = Array.from(
            { length: GRAPH_POINTS },
            (v, k) => (k / GRAPH_POINTS) * diff + data.minBoundaryValue
        );

        for (const [index, rangeData] of data.oxidationStateRangeData.entries()) {
            for (let i = 0; i < rangeData.oxidationStates.length; i++) {
                const oxidationState = rangeData.oxidationStates[i];
                const min = rangeData.rangeBoundaries[i];
                const max = rangeData.rangeBoundaries[i + 1];
                const xMultiplier = BAR_WIDTH / diff;

                // offset y of each graph
                const indexY = BAR_HEIGHT + index * 75;

                const yLeftPoints: number[] = [];
                const xLeftPoints: number[] = [];
                const yRightPoints: number[] = [];
                // points for left boundary
                for (const point of xPoints) {
                    yLeftPoints.push(indexY - (1 / (1 + Math.exp(point - min))) * BAR_HEIGHT);
                    xLeftPoints.push((point - data.minBoundaryValue) * xMultiplier);
                }

                // points for right boundary
                for (const point of xPoints) {
                    yRightPoints.push(indexY - (1 / (1 + Math.exp(point - max))) * BAR_HEIGHT);
                }
                yRightPoints.reverse();

                generatedData.push({
                    specie: rangeData.ionTypeSymbol,
                    oxidationState,
                    potential: [...xLeftPoints, ...xLeftPoints.reverse()],
                    likelihood: [...yLeftPoints, ...yRightPoints],
                    textPos: [(min - data.minBoundaryValue) * xMultiplier + 50, indexY - BAR_HEIGHT / 2 + 5]
                });
            }
        }

        return generatedData;
    }, [data]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && items.length > 0) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                for (const item of items) {
                    ctx.beginPath();
                    const color = ColorPalette[item.oxidationState];
                    ctx.fillStyle = color;
                    console.log(item);

                    ctx.moveTo(item.potential[0], item.likelihood[0]);
                    for (let i = 0; i < item.potential.length; i++) {
                        ctx.lineTo(item.potential[i], item.likelihood[i]);
                    }

                    ctx.closePath();
                    ctx.fill();
                }

                ctx.font = '16px sans-serif';
                ctx.fillStyle = '#000000';
                for (const item of items) {
                    ctx.fillText(formatOxidationState(item.oxidationState), item.textPos[0], item.textPos[1]);
                    console.log(formatOxidationState(item.oxidationState), item.textPos[0], item.textPos[1]);
                }
            }
        }
    }, [items]);

    const figureHeight = 100 * data.oxidationStateRangeData.length;

    return <canvas id="canvasGraph" ref={canvasRef} width="543" height={figureHeight} />;
};

export default CanvasGraph;
