import { OxidationStatesTableItem, TableRowAPI } from 'models/DataViewerModel';
import styles from './FormatterStyles.module.css';

export const formatOxidationState = ({ counts, oxidationStates, symbols }: TableRowAPI) => {
    const finalArr = [];
    if (counts.length > 0 && oxidationStates.length > 0 && symbols.length > 0) {
        symbols.forEach((symbol, index) => {
            let oxidationState;
            if (oxidationStates[index] > 0) {
                oxidationState = `${oxidationStates[index]}+`;
            } else {
                oxidationState = `${Math.abs(oxidationStates[index])}-`;
            }
            if (counts[index] === 1.0) {
                finalArr.push(
                    <div key={`oxidationState- ${index}`}>
                        {symbol}
                        <sup className={styles.super}>{oxidationState}</sup>&nbsp;
                    </div>
                );
            } else if (counts[index] % 1 === 0) {
                finalArr.push(
                    <div key={`oxidationState- ${index}`}>
                        {~~counts[index] + symbol}
                        <sup className={styles.super}>{oxidationState}</sup>&nbsp;
                    </div>
                );
            } else {
                finalArr.push(
                    <div key={`oxidationState- ${index}`}>
                        {counts[index].toFixed(2) + symbol}
                        <sup className={styles.super}>{oxidationState}</sup>&nbsp;
                    </div>
                );
            }
        });
    } else {
        finalArr.push(<></>);
    }
    return finalArr;
};

export const parseAPITableData = (data: TableRowAPI[]) => {
    const returnObject: OxidationStatesTableItem[] = [];

    data.forEach((item, index) => {
        const oxidationState = formatOxidationState(item);

        returnObject.push({
            oxidationState,
            likelihoodCurrentElecChemPotential: 0,
            likelihoodOptimalElecChemPotential: item.optimalLikelihood,
            optimalElecChemPotential: item.optimalChemicalPotential,
            globalInstabilityIndex: item.globalInstabilityIndex,
            id: index
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
                <div>
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
