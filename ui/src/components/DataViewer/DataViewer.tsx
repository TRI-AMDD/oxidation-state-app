import { dataViewerStateAtom, dynamicCompositionTitleAtom } from '@/atoms/atoms';
import styles from './DataViewer.module.css';
import InitialState from './InitialState/InitialState';
import { useAtom } from 'jotai';
import LoadedWithMessageState from './LoadedWithMessageState/LoadedWithMessageState';
import ErrorState from './ErrorState/ErrorState';
import { LoadingState } from '@/features/data-table/table-models/data-viewer-model';

const DataViewer = () => {
    const [dataViewerState] = useAtom(dataViewerStateAtom);
    const [dynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);

    return (
        <div id="data-viewer-container" className={styles.container}>
            {(dataViewerState === LoadingState.Initial || dataViewerState === LoadingState.Loading) && (
                <InitialState dataState={dataViewerState} />
            )}
            {dataViewerState === LoadingState.Loaded && (
                <LoadedWithMessageState dynamicCompositionTitle={dynamicCompositionTitle} />
            )}
            {dataViewerState === LoadingState.Error && <ErrorState />}
        </div>
    );
};

export default DataViewer;
