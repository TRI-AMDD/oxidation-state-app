import { DataGrid } from '@mui/x-data-grid';
import { columns } from 'utils/DataGridUtils/Columns';
import styles from './Table.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import './MuiClasses.css';
import useTable from 'hooks/useTable';

const Table = () => {
    const { tableData } = useTable();
    return (
        <div className={styles.container}>
            <DataGrid
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
            ></DataGrid>
        </div>
    );
};

export default Table;
