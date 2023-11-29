import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { columns } from '@/features/data-table/table/data-grid-utils/columns';
import { OxidationStatesTableItem } from '../table-models/data-viewer-model';
import CustomToolbar from './custom-toolbar/custom-toolbar';
import './mui-classes.css';

interface DataGridComponentProps {
    tableData: OxidationStatesTableItem[];
    handleTableRowClick: (event: GridRowParams<OxidationStatesTableItem>) => void;
}
const DataGridComponent = ({ tableData, handleTableRowClick }: DataGridComponentProps) => {
    useEffect(() => {
        console.log(document.querySelector('[data-testid="data-grid-column-oxidationState-2"]'));
    });

    return (
        <DataGrid
            hideFooter={true}
            getRowHeight={() => 'auto'}
            getRowId={(item) => `row-id-${item.id}`}
            columns={columns}
            rows={tableData}
            sx={{
                border: 0,
                '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important'
                }
            }}
            slots={{
                toolbar: CustomToolbar
            }}
            onRowClick={handleTableRowClick}
            disableColumnMenu
            columnVisibilityModel={{
                mixedValence: false,
                oxidationStateString: false
            }}
        ></DataGrid>
    );
};

export default DataGridComponent;
