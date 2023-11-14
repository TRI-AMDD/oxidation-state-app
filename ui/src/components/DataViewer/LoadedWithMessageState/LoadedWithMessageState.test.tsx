import { parseAPICompositionString } from '@/features/data-table/table/data-grid-utils/oxidation-state-formatter';
import LoadedWithMessageState from './LoadedWithMessageState';
import { render, screen, within } from '@testing-library/react';

describe('ensure composition title renders correctly', () => {
    test('MgO passed as composition title', () => {
        const dynamicTitleProp = {
            formattedTitle: parseAPICompositionString('MgO'),
            unformattedTitle: 'MgO'
        };
        render(<LoadedWithMessageState dynamicCompositionTitle={dynamicTitleProp} />);
        const compositionTitleElem = screen.getByTestId('dynamic-composition-title');
        expect(compositionTitleElem).toHaveTextContent('MgO');
    });

    test('LiMn2O4 passed as composition title', () => {
        const dynamicTitleProp = {
            formattedTitle: parseAPICompositionString('LiMn2O4'),
            unformattedTitle: 'LiMn2O4'
        };
        render(<LoadedWithMessageState dynamicCompositionTitle={dynamicTitleProp} />);
        const compositionTitleElem = screen.getByTestId('dynamic-composition-title');
        const innerSubElem1 = within(compositionTitleElem).getByText('2');
        const innerSubElem2 = within(compositionTitleElem).getByText('4');

        expect(compositionTitleElem).toHaveTextContent('LiMn2O4');
        expect(innerSubElem1.nodeName).toEqual('SUB');
        expect(innerSubElem2.nodeName).toEqual('SUB');
    });
});
