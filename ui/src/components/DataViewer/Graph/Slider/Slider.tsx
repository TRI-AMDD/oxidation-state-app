import { ReactCompareSlider } from 'react-compare-slider';
import CustomHandle from './CustomHandle';
import { getPositionFromValue, getValueFromPosition } from '@/utils/GraphUtil';
import { useMemo } from 'react';
import { ecpInitValue } from '@/atoms/atoms';
import { OxidationStatesAPI } from '@/models/DataViewerModel';
import { BAR_WIDTH } from '../CanvasGraph/CanvasGraph';

interface SliderProps {
    graphComponent: React.ReactNode;
    initValue: number;
    oxidationData: OxidationStatesAPI;
    ECPInputValue: number;
    handleSliderChange: (newValue: number) => void;
}

const Slider = ({ graphComponent, oxidationData, ECPInputValue, handleSliderChange }: SliderProps) => {    
    const ecpRange = useMemo(() => [oxidationData.minGraph, oxidationData.maxGraph], [oxidationData]);

    // pad slider to only the useable range
    const boundsPadding = useMemo(() => {
        const totalDiff = oxidationData.maxGraph - oxidationData.minGraph;
        const leftDiff = oxidationData.maxGraph - oxidationData.maxBoundaryValue;
        return Math.round(BAR_WIDTH * (leftDiff / totalDiff));
    }, [oxidationData]);

    const position = useMemo(() => {
        if (ECPInputValue === ecpInitValue) {
            return 50;
        }

        return getPositionFromValue(ECPInputValue, ecpRange);
    }, [ECPInputValue, ecpRange]);

    const handlePositionChange = (newPosition: number) => {
        // do not trigger mpv changes on very slight slider position changes
        if (Math.abs(position - newPosition) > 0.0005) {
            const newValue = getValueFromPosition(newPosition, ecpRange)
            // limit changes to the accepted boundary values
            if (newValue <= oxidationData.maxBoundaryValue && newValue >= oxidationData.minBoundaryValue) {
                handleSliderChange(newValue);
                dataLayer.push({ event: 'graph_slider' });
            }
        }
    };

    return (
        <ReactCompareSlider
            boundsPadding={boundsPadding}
            position={position}
            itemOne={graphComponent}
            itemTwo={graphComponent}
            handle={<CustomHandle />}
            onPositionChange={handlePositionChange}
            style={{
                overflow: 'visible'
            }}
        />
    );
};

export default Slider;
