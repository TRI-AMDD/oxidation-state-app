import { ReactCompareSlider } from 'react-compare-slider';
import CustomHandle from './CustomHandle';
import { getPositionFromValue, getValueFromPosition } from 'utils/GraphUtil';
import { useMemo } from 'react';

interface SliderProps {
    graphComponent: React.ReactNode;
    initValue: number;
    ecpRange: [number, number];
    ECPInputValue: number;
    handleSliderChange: (newValue: number) => void;
}

const Slider = ({ graphComponent, initValue, ecpRange, ECPInputValue, handleSliderChange }: SliderProps) => {
    const handlePositionChange = (position: number) => {
        handleSliderChange(getValueFromPosition(position, ecpRange));
    };
    const position = useMemo(() => {
        if (initValue === ECPInputValue) {
            return getPositionFromValue(initValue, ecpRange);
        }
        return getPositionFromValue(ECPInputValue, ecpRange);
    }, [ECPInputValue, ecpRange, initValue]);

    return (
        <ReactCompareSlider
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
