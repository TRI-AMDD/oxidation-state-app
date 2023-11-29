import { render, renderHook, screen } from '@testing-library/react';
import DataGridComponent from './data-grid-component';
import { FileUploadMockData, InputSectionMockData } from './data-grid-utils/mock-data/mock-data';
import useTable from '../table-hooks/use-table';

describe('data grid component renders with given data', () => {
    describe('ClO payload passed to data grid', () => {
        beforeEach(() => {
            const mockData = InputSectionMockData;
            const {
                result: {
                    current: { handleTableRowClick }
                }
            } = renderHook(useTable);
            render(<DataGridComponent tableData={mockData} handleTableRowClick={handleTableRowClick} />);
        });
        test('all rows render correctly', () => {
            const oxidationStateRow1 = screen.getByTestId('data-grid-column-oxidationState-0');
            const oxidationStateRow2 = screen.getByTestId('data-grid-column-oxidationState-1');
            const oxidationStateRow3 = screen.getByTestId('data-grid-column-oxidationState-2');

            expect(oxidationStateRow1).toBeVisible();
            expect(oxidationStateRow2).toBeVisible();
            expect(oxidationStateRow3).toBeVisible();
        });

        test('oxidation states have correct text', () => {
            const oxidationStateRow1 = screen.getByTestId('data-grid-column-oxidationState-0');
            const oxidationStateRow2 = screen.getByTestId('data-grid-column-oxidationState-1');
            const oxidationStateRow3 = screen.getByTestId('data-grid-column-oxidationState-2');

            const ClOMockData = InputSectionMockData;

            expect(oxidationStateRow1).toHaveTextContent(ClOMockData[0].oxidationStateString.replace(/\s+/g, ''));
            expect(oxidationStateRow2).toHaveTextContent(ClOMockData[1].oxidationStateString.replace(/\s+/g, ''));
            expect(oxidationStateRow3).toHaveTextContent(ClOMockData[2].oxidationStateString.replace(/\s+/g, ''));
        });

        test('likelihood optimal potential has correct value', () => {
            const likelihoodOptimalRow1 = screen.getByTestId('data-grid-column-likelihoodOptimal-0');
            const likelihoodOptimalRow2 = screen.getByTestId('data-grid-column-likelihoodOptimal-1');
            const likelihoodOptimalRow3 = screen.getByTestId('data-grid-column-likelihoodOptimal-2');

            const ClOMockData = InputSectionMockData;

            expect(likelihoodOptimalRow1).toHaveTextContent(ClOMockData[0].likelihoodOptimalMappedPotential.toFixed(2));
            expect(likelihoodOptimalRow2).toHaveTextContent(ClOMockData[1].likelihoodOptimalMappedPotential.toFixed(2));
            expect(likelihoodOptimalRow3).toHaveTextContent(ClOMockData[2].likelihoodOptimalMappedPotential.toFixed(2));
        });

        test('likelihood current potential has correct value', () => {
            const likelihoodCurrentRow1 = screen.getByTestId('data-grid-column-likelihoodCurrent-0');
            const likelihoodCurrentRow2 = screen.getByTestId('data-grid-column-likelihoodCurrent-1');
            const likelihoodCurrentRow3 = screen.getByTestId('data-grid-column-likelihoodCurrent-2');

            const ClOMockData = InputSectionMockData;

            expect(likelihoodCurrentRow1).toHaveTextContent(ClOMockData[0].likelihoodCurrentMappedPotential.toFixed(2));
            expect(likelihoodCurrentRow2).toHaveTextContent(ClOMockData[1].likelihoodCurrentMappedPotential.toFixed(2));
            expect(likelihoodCurrentRow3).toHaveTextContent(ClOMockData[2].likelihoodCurrentMappedPotential.toFixed(2));
        });

        test('optimal potential has correct value', () => {
            const optimalPotentialRow1 = screen.getByTestId('data-grid-column-optimalPotential-0');
            const optimalPotentialRow2 = screen.getByTestId('data-grid-column-optimalPotential-1');
            const optimalPotentialRow3 = screen.getByTestId('data-grid-column-optimalPotential-2');

            const ClOMockData = InputSectionMockData;

            expect(optimalPotentialRow1).toHaveTextContent(ClOMockData[0].optimalMappedPotential.toFixed(2));
            expect(optimalPotentialRow2).toHaveTextContent(ClOMockData[1].optimalMappedPotential.toFixed(2));
            expect(optimalPotentialRow3).toHaveTextContent(ClOMockData[2].optimalMappedPotential.toFixed(2));
        });

        test('GII has correct value', () => {
            const GIIRow1 = screen.getByTestId('data-grid-column-GII-0');
            const GIIRow2 = screen.getByTestId('data-grid-column-GII-1');
            const GIIRow3 = screen.getByTestId('data-grid-column-GII-2');

            expect(GIIRow1).toHaveTextContent('N/A');
            expect(GIIRow2).toHaveTextContent('N/A');
            expect(GIIRow3).toHaveTextContent('N/A');
        });
    });

    describe('file upload payload passed to data grid', () => {
        beforeEach(() => {
            const mockData = FileUploadMockData;
            console.log(mockData);
            const {
                result: {
                    current: { handleTableRowClick }
                }
            } = renderHook(useTable);
            render(<DataGridComponent tableData={mockData} handleTableRowClick={handleTableRowClick} />);
        });
        test('all rows render correctly', () => {
            const oxidationStateRow1 = screen.getByTestId('data-grid-column-oxidationState-0');

            expect(oxidationStateRow1).toBeVisible();
        });

        test('oxidation states have correct text', () => {
            const oxidationStateRow1 = screen.getByTestId('data-grid-column-oxidationState-0');

            const FileMockData = FileUploadMockData;

            expect(oxidationStateRow1).toHaveTextContent(FileMockData[0].oxidationStateString.replace(/\s+/g, ''));
        });

        test('likelihood optimal potential has correct value', () => {
            const likelihoodOptimalRow1 = screen.getByTestId('data-grid-column-likelihoodOptimal-0');

            const FileMockData = FileUploadMockData;

            expect(likelihoodOptimalRow1).toHaveTextContent(
                FileMockData[0].likelihoodOptimalMappedPotential.toFixed(2)
            );
        });

        test('likelihood current potential has correct value', () => {
            const likelihoodCurrentRow1 = screen.getByTestId('data-grid-column-likelihoodCurrent-0');

            const FileMockData = FileUploadMockData;

            expect(likelihoodCurrentRow1).toHaveTextContent(
                FileMockData[0].likelihoodCurrentMappedPotential.toFixed(2)
            );
        });

        test('optimal potential has correct value', () => {
            const optimalPotentialRow1 = screen.getByTestId('data-grid-column-optimalPotential-0');

            const FileMockData = FileUploadMockData;

            expect(optimalPotentialRow1).toHaveTextContent(FileMockData[0].optimalMappedPotential.toFixed(2));
        });

        test('GII has correct value', () => {
            const GIIRow1 = screen.getByTestId('data-grid-column-GII-0');

            const FileMockData = FileUploadMockData;

            const GIINumber = FileMockData[0].globalInstabilityIndex as number;

            expect(GIIRow1).toHaveTextContent(GIINumber.toFixed(2));
        });
    });
});
