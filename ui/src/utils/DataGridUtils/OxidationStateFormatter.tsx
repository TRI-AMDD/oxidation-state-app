import { OxidationStatesTableItem, TableRowAPI } from 'models/DataViewerModel';
import styles from './FormatterStyles.module.css';

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
            {currentSymbol}
            <sup className={styles.super}>{oxidationState}</sup>&nbsp;
        </div>
    );
};

const formatOxidationStateWithWholeNumberCount = (
    currentIndex: number,
    currentSymbol: string,
    currentCount: number,
    oxidationState: string
) => {
    return (
        <div key={`oxidationState- ${currentIndex}`}>
            {~~currentCount + currentSymbol}
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
            {currentCount.toFixed(2) + currentSymbol}
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

export const getCurrentLikelihood = (tableRow: TableRowAPI, ECPValue: number) => {
    let currentLikelihood = -1;
    for (const boundaryPair of tableRow.boundaryPairs) {
        const leftBoundary = 1 / (1 + Math.exp(boundaryPair[0] - ECPValue));
        const rightBoundary = 1 / (1 + Math.exp(ECPValue - boundaryPair[1]));
        const minValue = Math.min(leftBoundary, rightBoundary);
        if (currentLikelihood === -1) {
            currentLikelihood = minValue;
        } else {
            currentLikelihood = currentLikelihood * minValue;
        }
    }

    return currentLikelihood;
};

export const parseAPITableData = (data: TableRowAPI[], ECPValue: number) => {
    const returnObject: OxidationStatesTableItem[] = [];

    data.forEach((item, index) => {
        const { oxidationState, oxidationStateString } = formatOxidationState(item);

        returnObject.push({
            oxidationState,
            likelihoodCurrentElecChemPotential: getCurrentLikelihood(item, ECPValue),
            likelihoodOptimalElecChemPotential: item.optimalLikelihood,
            optimalElecChemPotential: item.optimalChemicalPotential,
            globalInstabilityIndex: item.globalInstabilityIndex,
            id: index,
            oxidationStateString,
            cifString: item.cifstring,
            mixedValence: item.mixedValence
        });
    });

    return returnObject;
};

const parseArrayOfChars = (chars: string[]) => {
    const arrayOfSymbolsInComposition: string[] = [];
    const arrayOfNumbersInComposition: number[] = [];
    let inParen = false;

    let symbol = '';
    let number = 0;

    chars.forEach((char, index) => {
        if (isNaN(parseInt(char))) {
            if (char === '(') {
                inParen = true;
                if (index !== 0) {
                    arrayOfSymbolsInComposition.push(symbol);
                    arrayOfNumbersInComposition.push(number);
                }

                symbol = '(';
                number = 0;
            } else if (char === ')') {
                inParen = false;
                symbol += ')';
            } else if (char === char.toUpperCase() && symbol !== '' && !inParen) {
                arrayOfSymbolsInComposition.push(symbol);
                arrayOfNumbersInComposition.push(number);
                symbol = char;
                number = 0;
            } else {
                symbol += char;
            }
        } else if (inParen) {
            symbol += char;
        } else {
            number = parseInt(char);
        }
    });
    arrayOfNumbersInComposition.push(number);
    arrayOfSymbolsInComposition.push(symbol);

    return { symbolsArray: arrayOfSymbolsInComposition, numbersArray: arrayOfNumbersInComposition };
};
const formatDynamicTitle = (symbolsArray: string[], numbersArray: number[]) => {
    const finalArr = [];
    if (symbolsArray && symbolsArray.length > 0) {
        symbolsArray.forEach((symbol, index) => {
            const numberForSymbol = numbersArray[index];
            finalArr.push(
                <div key={`dynamic title - ${index}`}>
                    {symbol}
                    {numberForSymbol !== 0 ? (
                        <>
                            <sub>{numberForSymbol}</sub>&nbsp;
                        </>
                    ) : (
                        <>&nbsp;</>
                    )}
                </div>
            );
        });
    } else {
        finalArr.push(<></>);
    }
    return finalArr;
};

export const parseAPICompositionString = (compositionTitle: string) => {
    const arrayOfCharsInComposition = compositionTitle.split('');

    const { symbolsArray, numbersArray } = parseArrayOfChars(arrayOfCharsInComposition);

    return formatDynamicTitle(symbolsArray, numbersArray);
};
