import { isCharNumber } from '@/features/data-table/table/data-grid-utils/oxidation-state-formatter';
import { Fragment } from 'react';

interface Prop {
    composition: string;
}

const CompositionTitle = ({ composition }: Prop) => {
    const symbolsArray = composition.split('');

    return (
        <div>
            {symbolsArray.map(function (item, index) {
                {
                    return (
                        <Fragment key={`composition-title-${index}`}>
                            {isCharNumber(item) ? <sub>{item}</sub> : item}
                        </Fragment>
                    );
                }
            })}
        </div>
    );
};

export default CompositionTitle;
