import { DataGrid, GridRowId } from '@mui/x-data-grid';
import { useState } from 'react';
import { columns } from '@/features/data-table/table/data-grid-utils/columns';
import styles from './table.module.css';
import CustomToolbar from './custom-toolbar/custom-toolbar';
import './mui-classes.css';
import useTable from '@/features/data-table/table-hooks/use-table';

const Table = () => {
    const { tableData, handleTableRowClick } = useTable();
    const [selection, setSelection] = useState<GridRowId[]>([0]);

    return (
        <div className={styles.container}>
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
                rowSelectionModel={selection}
                onRowSelectionModelChange={(rowSelectionModel) => {
                    setSelection(rowSelectionModel);
                }}
            ></DataGrid>
        </div>
    );
};

export default Table;
