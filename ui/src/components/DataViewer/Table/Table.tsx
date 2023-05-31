import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { columns } from 'utils/DataGridUtils/Columns';
import styles from './Table.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import './MuiClasses.css';
import useTable from 'hooks/useTable';

const Table = () => {
    const { tableData, handleTableRowClick } = useTable();

    const apiRef = useGridApiRef();

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
                    flexDirection: 'column-reverse'
                }}
                slots={{
                    toolbar: CustomToolbar
                }}
                onRowClick={handleTableRowClick}
                disableColumnMenu
                columnVisibilityModel={{
                    mixedValence: false
                }}
            ></DataGrid>
        </div>
    );
};

export default Table;
