export function formatOxidationState(state: number) {
    if (state > 0) {
        return `+${state}`;
    }

    return state.toString();
}

export function getPositionFromValue(ecp: number, ecpRange: [number, number]) {
    console.log(ecp, ecpRange);
    const range = ecpRange[1] - ecpRange[0];
    const rangeBetweenECPAndLowest = ecp - ecpRange[0];

    console.log((rangeBetweenECPAndLowest / range) * 100);
    return (rangeBetweenECPAndLowest / range) * 100;
}

export function getValueFromPosition(position: number, ecpRange: [number, number]) {
    const range = ecpRange[1] - ecpRange[0];
    const positionDecimal = position / 100;
    const positionDecimalTimesRange = positionDecimal * range;
    return positionDecimalTimesRange + ecpRange[0];
}
