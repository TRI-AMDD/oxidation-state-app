import { DataGrid } from '@mui/x-data-grid';
import { dataTableTestData } from 'test-data/test-data';
import { columns } from 'utils/DataGridUtils/Columns';
import styles from './Table.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar';
import './MuiClasses.css';

const Table = () => {
    return (
        <div className={styles.container}>
            <DataGrid
                hideFooter={true}
                getRowHeight={() => 'auto'}
                columns={columns}
                rows={dataTableTestData}
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
