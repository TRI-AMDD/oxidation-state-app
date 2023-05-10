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
