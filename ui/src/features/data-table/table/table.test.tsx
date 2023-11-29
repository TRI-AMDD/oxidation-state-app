import { render, renderHook, screen, waitFor } from '@testing-library/react';
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
            console.log(mockData);
            render(<DataGridComponent tableData={mockData} handleTableRowClick={handleTableRowClick} />);
        });
        test('oxidation states render correctly', () => {
            //console.log(screen.getByTestId('data-grid-column-oxidationState-3'));
        });
    });
});
