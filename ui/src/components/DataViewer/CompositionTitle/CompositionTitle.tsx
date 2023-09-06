import { isCharNumber } from '@/utils/DataGridUtils/OxidationStateFormatter';
import styles from './composition-title.module.css';
import { Fragment } from 'react';

interface Prop {
    composition: string;
}

const CompositionTitle = ({ composition }: Prop) => {
    const symbolsArray = composition.split('');

    return (
        <div className={styles.compositionTitle}>
            {symbolsArray.map(function (item) {
                {
                    return <Fragment key={item}>{isCharNumber(item) ? <sub>{item}</sub> : item}</Fragment>;
                }
            })}
        </div>
    );
};

export default CompositionTitle;
