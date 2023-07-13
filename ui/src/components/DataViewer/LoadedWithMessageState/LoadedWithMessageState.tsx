import { Alert, Typography } from '@mui/material';
import styles from './LoadedWithMessageState.module.css';
import { useAtom } from 'jotai';
import { dynamicCompositionTitleAtom, oxidationDataAtom } from '@/atoms/atoms';
import Table from '../Table/Table';
import Graph from '../Graph/Graph';
import { useMemo } from 'react';

const LoadedWithMessageState = () => {
    const [dynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);
    const [oxidationData] = useAtom(oxidationDataAtom);
    const message = useMemo(() => {
        if (typeof oxidationData !== 'undefined' && oxidationData && oxidationData.messages.length > 0) {
            return oxidationData?.messages[0].messageString;
        } else {
            return '';
        }
    }, [oxidationData]);
    return (
        <div>
            <Alert severity="warning">
                <div className={styles.alertMessage}>
                    <div className={styles.dynamicTitle}>
                        {' '}
                        Oxidation state analysis for&nbsp;
                        {dynamicCompositionTitle.formattedTitle}
                    </div>
                    <ul className={styles.ul}>
                        <li>{message}</li>
                    </ul>
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

export default LoadedWithMessageState;
