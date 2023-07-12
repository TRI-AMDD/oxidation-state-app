import { Typography } from '@mui/material';
import styles from './InitialState.module.css';
import TitleSkeleton from '../Skeletons/TitleSkeleton';
import GraphSkeleton from '../Skeletons/GraphSkeleton';
import ColumnSkeleton from '../Skeletons/ColumnSkeleton';
import { LoadingState } from '@/models/DataViewerModel';

interface InitialStateProps {
    dataState: LoadingState;
}
const InitialState = ({ dataState }: InitialStateProps) => {
    const isAnimated = dataState === LoadingState.Initial ? false : 'pulse';
    const helperText =
        dataState === LoadingState.Initial ? (
            <>
                Please enter a composition or upload a structure <br />
                to see results
            </>
        ) : (
            <>Loading...</>
        );
    return (
        <div className={styles.container}>
            <Typography component={'div'} variant="body1" color="text.secondary">
                {helperText}
            </Typography>
            <div className={styles.skeletonContainer}>
                <div className={styles.skeleton}>
                    <TitleSkeleton isAnimated={isAnimated} />
                    <div className={styles.columnSkeleton}>
                        <ColumnSkeleton isAnimated={isAnimated} className={styles.marginRight} />
                        <ColumnSkeleton isAnimated={isAnimated} className={styles.marginRight} />
                        <ColumnSkeleton isAnimated={isAnimated} className={styles.marginRight} />
                        <ColumnSkeleton isAnimated={isAnimated} className={styles.marginRight} />
                        <ColumnSkeleton isAnimated={isAnimated} />
                    </div>
                </div>
                <div className={styles.skeleton}>
                    <TitleSkeleton isAnimated={isAnimated} />
                    <GraphSkeleton isAnimated={isAnimated} />
                </div>
            </div>
        </div>
    );
};
export default InitialState;
