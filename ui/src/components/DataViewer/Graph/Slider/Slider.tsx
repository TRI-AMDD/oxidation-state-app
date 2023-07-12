import { ReactCompareSlider } from 'react-compare-slider';
import CustomHandle from './CustomHandle';
import { getPositionFromValue, getValueFromPosition } from '@/utils/GraphUtil';
import { useEffect, useMemo } from 'react';
import { ecpInitValue, exportGraphSettingsAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';

interface SliderProps {
    graphComponent: React.ReactNode;
    initValue: number;
    ecpRange: [number, number];
    ECPInputValue: number;
    handleSliderChange: (newValue: number) => void;
}

const Slider = ({ graphComponent, ecpRange, ECPInputValue, handleSliderChange }: SliderProps) => {
    const [exportGraphSettings] = useAtom(exportGraphSettingsAtom);

    useEffect(() => {
        const sliderElement = document.querySelector('[data-rcs="handle-container"]');
        if (sliderElement) {
            if (!exportGraphSettings.showSliderBar) {
                sliderElement.setAttribute('hidden', '');
            } else {
                sliderElement.removeAttribute('hidden');
            }
        }
    }, [exportGraphSettings]);

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
