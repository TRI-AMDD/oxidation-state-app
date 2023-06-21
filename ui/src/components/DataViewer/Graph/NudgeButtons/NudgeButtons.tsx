import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import styles from '../GraphTypeToggle/GraphTypeToggle.module.css';
import { OxidationStatesAPI } from 'models/DataViewerModel';
import { useMemo } from 'react';
import { getBoundaries } from 'utils/GraphUtil';

interface Props {
    onChange: (value: number) => void;
    value: number;
    data: OxidationStatesAPI;
}

const NudgeButtons = ({ value, data, onChange }: Props) => {
    const boundaries = useMemo(() => getBoundaries(data), [data]);

    const handleToggleChange = (event: React.MouseEvent<HTMLElement>, direction: string) => {
        if (direction === 'next') {
            for (let i = 0; i < boundaries.length; i++) {
                if (value < boundaries[i]) {
                    onChange(boundaries[i]);
                    return;
                }
            }
        } else if (direction === 'previous') {
            for (let i = boundaries.length - 1; i >= 0; i--) {
                if (value > boundaries[i]) {
                    onChange(boundaries[i]);
                    return;
                }
            }
        }
    };

    return (
        <ToggleButtonGroup exclusive onChange={handleToggleChange} className={styles.container}>
            <ToggleButton value="previous" className={styles.toggleButton}>
                Left
            </ToggleButton>
            <ToggleButton value="next" className={styles.toggleButton}>
                Right
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default NudgeButtons;
