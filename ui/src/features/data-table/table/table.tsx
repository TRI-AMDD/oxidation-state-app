import styles from './table.module.css';
import useTable from '@/features/data-table/table-hooks/use-table';
import DataGridComponent from './data-grid-component';

const Table = () => {
    const { tableData, handleTableRowClick } = useTable();

    return (
        <div className={styles.container}>
            <DataGridComponent tableData={tableData} handleTableRowClick={handleTableRowClick} />
        </div>
    );
};

export default Table;
