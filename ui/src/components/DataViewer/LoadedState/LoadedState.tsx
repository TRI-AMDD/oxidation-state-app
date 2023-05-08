import { Alert } from '@mui/material';
import Graph from '../Graph/Graph';
import Table from '../Table/Table';
import styles from './LoadedState.module.css';
import { chemicalCompositionInputAtom } from 'atoms/atoms';
import { useAtom } from 'jotai';

const LoadedState = () => {
    const [chemicalComposition] = useAtom(chemicalCompositionInputAtom);
    return (
        <div>
            <Alert severity="info">Oxidation state analysis for {chemicalComposition}</Alert>
            <div className={styles.graphAndTableContainer}>
                <Table />
                <Graph />
            </div>
        </div>
    );
};

export default LoadedState;
