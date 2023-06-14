import { ReactCompareSlider } from 'react-compare-slider';
import CustomHandle from './CustomHandle';
import { getPositionFromValue, getValueFromPosition } from 'utils/GraphUtil';
import { useMemo } from 'react';
import { ecpInitValue } from 'atoms/atoms';

interface SliderProps {
    graphComponent: React.ReactNode;
    initValue: number;
    ecpRange: [number, number];
    ECPInputValue: number;
    handleSliderChange: (newValue: number) => void;
}

const Slider = ({ graphComponent, ecpRange, ECPInputValue, handleSliderChange }: SliderProps) => {
    const position = useMemo(() => {
        if (ECPInputValue === ecpInitValue) {
            return 50;
        }

        return getPositionFromValue(ECPInputValue, ecpRange);
    }, [ECPInputValue, ecpRange]);

    const handlePositionChange = (newPosition: number) => {
        if (position !== newPosition) {
            handleSliderChange(getValueFromPosition(newPosition, ecpRange));
        }
    };

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
