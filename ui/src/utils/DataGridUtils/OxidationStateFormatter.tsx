import { OxidationStatesAPI, OxidationStatesTableItem, TableRowAPI } from '@/models/DataViewerModel';
import styles from './FormatterStyles.module.css';
import { computeECP } from '@/features/render-graph/render-graph';
import { Fragment } from 'react';

const formatSymbol = (symbol: string) => {
    const symbolsArray = symbol.split('');

    return symbolsArray.map(function (item) {
        return <Fragment key={item}>{isCharNumber(item) ? <sub>{item}</sub> : item}</Fragment>;
    });
};

const formatOxidationWithChargeSign = (currentOxidation: number) => {
    if (currentOxidation > 0) {
        return `${currentOxidation}+`;
    } else {
        return `${Math.abs(currentOxidation)}-`;
    }
};

const formatOxidationStateWithOneCount = (currentIndex: number, currentSymbol: string, oxidationState: string) => {
    return (
        <div key={`oxidationState- ${currentIndex}`}>
            {formatSymbol(currentSymbol)}
            <sup className={styles.super}>{oxidationState}</sup>&nbsp;
        </div>
    );
};

export function isCharNumber(c: string) {
    return c >= '0' && c <= '9';
}

const formatOxidationStateWithWholeNumberCount = (
    currentIndex: number,
    currentSymbol: string,
    currentCount: number,
    oxidationState: string
) => {
    return (
        <div key={`oxidationState- ${currentIndex}`}>
            {~~currentCount}{formatSymbol(currentSymbol)}
            <sup className={styles.super}>{oxidationState}</sup>&nbsp;
        </div>
    );
};

const formatOxidationStateWithDecimalCount = (
    currentIndex: number,
    currentSymbol: string,
    currentCount: number,
    oxidationState: string
) => {
    return (
        <div key={`oxidationState- ${currentIndex}`}>
            {currentCount.toFixed(2)}{formatSymbol(currentSymbol)}
            <sup className={styles.super}>{oxidationState}</sup>&nbsp;
        </div>
    );
};

export const formatOxidationState = ({ counts, oxidationStates, symbols }: TableRowAPI) => {
    const finalArr = [];
    let finalString = '';
    if (counts.length > 0 && oxidationStates.length > 0 && symbols.length > 0) {
        symbols.forEach((symbol, index) => {
            const oxidationState = formatOxidationWithChargeSign(oxidationStates[index]);
            if (counts[index] === 1.0) {
                finalArr.push(formatOxidationStateWithOneCount(index, symbol, oxidationState));
                finalString += symbol + oxidationState + ' ';
            } else if (counts[index] % 1 === 0) {
                finalArr.push(formatOxidationStateWithWholeNumberCount(index, symbol, counts[index], oxidationState));
                finalString += ~~counts[index] + symbol + oxidationState + ' ';
            } else {
                finalArr.push(formatOxidationStateWithDecimalCount(index, symbol, counts[index], oxidationState));
                finalString += counts[index].toFixed(2) + symbol + oxidationState + ' ';
            }
        });
    } else {
        finalArr.push(<></>);
    }
    return { oxidationState: finalArr, oxidationStateString: finalString };
};

export const getCurrentLikelihood = (tableRow: TableRowAPI, MPValue: number, intercept: number, slope: number) => {
    let currentLikelihood = -1;
    for (const boundaryPair of tableRow.boundaryPairs) {
        const ecpBoundaryLeft = boundaryPair[0];
        const ecpBoundaryRight = boundaryPair[1];
        const ECPValue = computeECP(MPValue, intercept, slope);

        const leftBoundary = 1 / (1 + Math.exp(ecpBoundaryLeft - ECPValue));
        const rightBoundary = 1 / (1 + Math.exp(ECPValue - ecpBoundaryRight));
        const minValue = Math.min(leftBoundary, rightBoundary);
        if (currentLikelihood === -1) {
            currentLikelihood = minValue;
        } else {
            currentLikelihood = currentLikelihood * minValue;
        }
    }

    return currentLikelihood;
};

export const parseOxidationData = (data: OxidationStatesAPI) => {
    const returnObject: OxidationStatesAPI = { ...data };

    // pad min and max graph drawing regions
    const pad = data.potentialMapper.slope * 5;
    returnObject.maxGraph = data.maxBoundaryValue + pad;
    returnObject.minGraph = data.minBoundaryValue - pad;

    return returnObject;
};

export const parseAPITableData = (data: OxidationStatesAPI, ECPValue: number) => {
    const returnObject: OxidationStatesTableItem[] = [];

    const tableItems = data.tableData.tableRows;
    const { intercept, slope } = data.potentialMapper;
    tableItems.forEach((item, index) => {
        const { oxidationState, oxidationStateString } = formatOxidationState(item);

        returnObject.push({
            oxidationState,
            likelihoodCurrentMappedPotential: getCurrentLikelihood(item, ECPValue, intercept, slope),
            likelihoodOptimalMappedPotential: item.optimalLikelihood,
            optimalMappedPotential: item.optimalMappedPotential,
            globalInstabilityIndex: item.globalInstabilityIndex,
            id: index,
            oxidationStateString,
            cifString: item.cifstring,
            mixedValence: item.mixedValence
        });
    });

    return returnObject;
};

export const parseArrayOfChars = (chars: string[]) => {
    const arrayOfSymbols: string[] = [];
    let inParen = false;
    let symbol = '';

    chars.forEach((char, index) => {
        if (char === '(') {
            inParen = true;
            if (index !== 0) {
                arrayOfSymbols.push(symbol);
            }

            symbol = '(';
        } else if (char === ')') {
            inParen = false;
            symbol += ')';
        } else if (char === char.toUpperCase() && !isCharNumber(char) && symbol !== '' && !inParen) {
            arrayOfSymbols.push(symbol);
            symbol = char;
        } else {
            symbol += char;
        }
    });
    arrayOfSymbols.push(symbol);

    return arrayOfSymbols;
};

export const parseAPICompositionString = (compositionTitle: string) => {
    const elems = compositionTitle.split('');
    return parseArrayOfChars(elems);
};
