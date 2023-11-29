import styles from './table.module.css';
import useTable from '@/features/data-table/table-hooks/use-table';
import DataGridComponent from './data-grid-component';
import { useState } from 'react';
import { GridRowId } from '@mui/x-data-grid';

const Table = () => {
    const [selection, setSelection] = useState<GridRowId[]>([0]);
    const { tableData, handleTableRowClick } = useTable();

    return (
        <div className={styles.container}>
            <DataGridComponent tableData={tableData} handleTableRowClick={handleTableRowClick} />
        </div>
    );
};

export default Table;
