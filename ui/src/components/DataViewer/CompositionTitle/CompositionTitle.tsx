import { isCharNumber } from '@/components/DataViewer/Table/table-data/DataGridUtils/OxidationStateFormatter';
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
