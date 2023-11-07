import { Alert, Typography } from '@mui/material';
import styles from './LoadedWithMessageState.module.css';
import { useAtom } from 'jotai';
import { dynamicCompositionTitleAtom, oxidationDataAtom } from '@/atoms/atoms';
import Table from '@/features/data-table/table/table';
import Graph from '../Graph/Graph';
import { useMemo } from 'react';
import CompositionTitle from '../CompositionTitle/CompositionTitle';

const LoadedWithMessageState = () => {
    const [dynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);
    const [oxidationData] = useAtom(oxidationDataAtom);
    const messages = useMemo(() => {
        if (typeof oxidationData !== 'undefined' && oxidationData && oxidationData.messages.length > 0) {
            return oxidationData.messages.map((m) => m.messageString);
        }

        return [];
    }, [oxidationData]);

    return (
        <div>
            <Alert severity="info">
                <div className={styles.alertMessage}>
                    <div className={styles.dynamicTitle}>
                        {' '}
                        Oxidation state analysis for&nbsp;
                        {dynamicCompositionTitle.formattedTitle.map((item) => (
                            <CompositionTitle composition={item} key={item} />
                        ))}
                    </div>
                    {messages.length > 0 && (
                        <ul className={styles.ul}>
                            {messages.map((message, i) => (
                                <li key={`loaded-with-message-array-${i}`}>{message}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </Alert>
            <Typography component={'div'} variant="caption" className={styles.noteText}>
                *Note: Rows without mixed valence are in <strong>bold</strong>.
            </Typography>
            <div className={styles.graphAndTableContainer}>
                <Table />
                <Graph />
            </div>
        </div>
    );
};

export default LoadedWithMessageState;
