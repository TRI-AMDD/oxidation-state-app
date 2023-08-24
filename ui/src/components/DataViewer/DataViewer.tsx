import { dataViewerStateAtom } from '@/atoms/atoms';
import styles from './DataViewer.module.css';
import InitialState from './InitialState/InitialState';
import { useAtom } from 'jotai';
import { LoadingState } from '@/models/DataViewerModel';
import LoadedWithMessageState from './LoadedWithMessageState/LoadedWithMessageState';
import ErrorState from './ErrorState/ErrorState';

const DataViewer = () => {
    const [dataViewerState] = useAtom(dataViewerStateAtom);

    return (
        <div id="data-viewer-container" className={styles.container}>
            {(dataViewerState === LoadingState.Initial || dataViewerState === LoadingState.Loading) && (
                <InitialState dataState={dataViewerState} />
            )}
            {dataViewerState === LoadingState.Loaded && <LoadedWithMessageState />}
            {dataViewerState === LoadingState.Error && <ErrorState />}
        </div>
    );
};

export default DataViewer;
