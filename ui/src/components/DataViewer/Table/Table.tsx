import { DataGrid, GridRowId, useGridApiRef } from '@mui/x-data-grid';
import { columns } from '@/utils/DataGridUtils/Columns';
import styles from './Table.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import './MuiClasses.css';
import useTable from '@/hooks/useTable';
import { useEffect, useState } from 'react';

const Table = () => {
    const { tableData, handleTableRowClick } = useTable();
    const [selection, setSelection] = useState<GridRowId[]>([0]);

    const apiRef = useGridApiRef();
    useEffect(() => {
        apiRef.current.setColumnWidth('oxidationState', window.outerWidth - 985);

        const handleResizedWindow = () => {
            setTimeout(() => {
                apiRef.current.setColumnWidth('oxidationState', window.outerWidth - 985);
            }, 500);
        };
        if (apiRef) {
            window.addEventListener('resize', handleResizedWindow);
        }

        return () => {
            window.removeEventListener('resize', handleResizedWindow);
        };
    }, []);

    return (
        <div className={styles.container}>
            <DataGrid
                apiRef={apiRef}
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
