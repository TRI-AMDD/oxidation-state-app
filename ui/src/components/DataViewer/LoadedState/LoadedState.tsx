import { Alert } from '@mui/material';
import Graph from '../Graph/Graph';
import Table from '../Table/Table';
import styles from './LoadedState.module.css';
import { dynamicCompositionTitleAtom } from 'atoms/atoms';
import { useAtom } from 'jotai';

const LoadedState = () => {
    const [dynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);

    return (
        <div>
            <Alert severity="info">
                <div className={styles.alertMessage}>
                    Oxidation state analysis for&nbsp;{dynamicCompositionTitle.formattedTitle}
                </div>
            </Alert>
            <div className={styles.graphAndTableContainer}>
                <Table />
                <Graph />
            </div>
        </div>
    );
};

export default LoadedState;
