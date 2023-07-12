import styles from './ErrorState.module.css';
import { Alert } from '@mui/material';
import { apiErrorAtom, dynamicCompositionTitleAtom, oxidationDataAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

const ErrorState = () => {
    const [dynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);
    const [oxidationData] = useAtom(oxidationDataAtom);
    const [apiError] = useAtom(apiErrorAtom);
    const message = useMemo(() => {
        if (typeof oxidationData !== 'undefined' && oxidationData && oxidationData.messages.length > 0) {
            return oxidationData?.messages[0].messageString;
        } else {
            return '';
        }
    }, [oxidationData]);
    return (
        <div>
            {!apiError ? (
                <Alert severity="error">
                    <div className={styles.alertMessage}>
                        <div className={styles.dynamicTitle}>
                            {' '}
                            No Oxidation state analysis for&nbsp;
                            {dynamicCompositionTitle.formattedTitle}
                        </div>
                        <ul className={styles.ul}>
                            <li>{message}</li>
                        </ul>
                    </div>
                </Alert>
            ) : (
                <Alert severity="error">
                    Analysis could not be completed for uploaded structure
                    <ul className={styles.ul}>
                        <li>This is a format we do not recognize.</li>
                    </ul>
                </Alert>
            )}
        </div>
    );
};

export default ErrorState;
