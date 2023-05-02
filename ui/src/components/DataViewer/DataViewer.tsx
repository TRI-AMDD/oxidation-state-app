import { dataViewerStateAtom } from 'atoms/atoms';
import styles from './DataViewer.module.css';
import InitialState from './InitialState/InitialState';
import { useAtom } from 'jotai';

const DataViewer = () => {
    const [dataViewerState] = useAtom(dataViewerStateAtom);
    return (
        <div className={styles.container}>
            <InitialState dataState={dataViewerState} />
        </div>
    );
};

export default DataViewer;
