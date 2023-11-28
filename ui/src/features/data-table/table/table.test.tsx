import { render, renderHook, screen } from '@testing-library/react';
import DataGridComponent from './data-grid-component';
import { InputSectionMockData } from './data-grid-utils/mock-data/mock-data';
import useTable from '../table-hooks/use-table';

describe('data grid component renders with given data', () => {
    describe('LiMn2O4 payload passed to data grid', () => {
        beforeAll(() => {
            const mockData = InputSectionMockData;
            const {
                result: {
                    current: { handleTableRowClick }
                }
            } = renderHook(useTable);
            console.log(mockData.length);
            render(<DataGridComponent tableData={mockData} handleTableRowClick={handleTableRowClick} />);
        });
        test('oxidation states render correctly', async () => {
            const oxidationStateCells = await screen.findAllByTestId('data-grid-column-oxidationState');
            oxidationStateCells.forEach((v, index) => {
                console.log(v.innerHTML);
                console.log(index);
            });
            const debugScreen = screen.debug();
        });
    });
});
