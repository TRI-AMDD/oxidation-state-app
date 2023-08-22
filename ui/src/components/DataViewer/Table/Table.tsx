import { DataGrid, GridRowId } from '@mui/x-data-grid';
import { useState } from 'react';
import { columns } from '@/utils/DataGridUtils/Columns';
import styles from './Table.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import './MuiClasses.css';
import useTable from '@/hooks/useTable';

const Table = () => {
    const { tableData, handleTableRowClick } = useTable();
    const [selection, setSelection] = useState<GridRowId[]>([0]);

    return (
        <div className={styles.container}>
            <DataGrid
                hideFooter={true}
                getRowHeight={() => 'auto'}
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
