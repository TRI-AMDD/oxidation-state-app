import { useEffect, useMemo, useRef } from 'react';
import { formatOxidationState } from 'utils/GraphUtil';
import { OxidationStatesAPI } from 'models/DataViewerModel';
import { ColorPalette } from 'constants/colors';
import { createPlotData } from './canvas-graph-util';

interface Props {
    data: OxidationStatesAPI;
}

const CanvasGraph = ({ data }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const items = useMemo(() => createPlotData(data), [data]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && items.length > 0) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
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

                ctx.font = '16px sans-serif';
                ctx.fillStyle = '#000000';
                for (const specie of items) {
                    for (const item of specie.oxidationStates) {
                        ctx.fillText(formatOxidationState(item.oxidationState), item.textPos[0], item.textPos[1]);
                    }
                }

                ctx.font = '16px sans-serif';
                ctx.fillStyle = '#000000';
                for (const specie of items) {
                    ctx.fillText(specie.specie, specie.textPos[0], specie.textPos[1]);
                }
            }
        }
    }, [items]);

    const figureHeight = 100 * data.oxidationStateRangeData.length;

    return <canvas id="canvasGraph" ref={canvasRef} width="543" height={figureHeight} />;
};

export default CanvasGraph;
