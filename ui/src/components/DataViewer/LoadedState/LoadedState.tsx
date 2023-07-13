import { Alert, Typography } from '@mui/material';
import Graph from '../Graph/Graph';
import Table from '../Table/Table';
import styles from './LoadedState.module.css';
import { dynamicCompositionTitleAtom } from '@/atoms/atoms';
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
            <Typography component={'div'} variant="caption" className={styles.noteText}>
                *Note: Rows without mixed valence are in <strong>bold</strong>.
            </Typography>
            <div className={styles.graphAndTableContainer}>
                <div className={styles.tableContainer}>
                    <Table />
                </div>
                <div className={styles.graphContainer}>
                    <Graph />
                </div>
            </div>
        </div>
    );
};

export default LoadedState;
