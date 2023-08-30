import { Boundary, OxidationStatesAPI } from '@/models/DataViewerModel';
import { toFixedNumber } from './GraphUtils/BoundariesUtil';

function compareBoundaries(a: Boundary, b: Boundary) {
    return a.value - b.value;
}

export function formatOxidationState(state: number) {
    if (state > 0) {
        return `+${state}`;
    }

    return state.toString();
}

export function getPositionFromValue(ecp: number, ecpRange: [number, number]) {
    const range = ecpRange[1] - ecpRange[0];
    const rangeBetweenECPAndLowest = ecp - ecpRange[0];

    return (rangeBetweenECPAndLowest / range) * 100;
}

export function getValueFromPosition(position: number, ecpRange: [number, number]) {
    const range = ecpRange[1] - ecpRange[0];
    const positionDecimal = position / 100;
    const positionDecimalTimesRange = positionDecimal * range;
    return positionDecimalTimesRange + ecpRange[0];
}

export function getBoundaries(data: OxidationStatesAPI) {
    const boundaryArray: Boundary[] = [];
    for (const [ionIndex, rangeData] of data.oxidationStateRangeData.entries()) {
        for (const [index, boundary] of rangeData.rangeBoundaries.entries()) {
            const oxiIndex = index == 0 ? 0 : index - 1;
            boundaryArray.push({
                ionIndex,
                oxidationState: formatOxidationState(rangeData.oxidationStates[oxiIndex]),
                value: toFixedNumber(boundary, 13, 10)
            });
        }
    }

    boundaryArray.sort(compareBoundaries);
    return boundaryArray;
}
