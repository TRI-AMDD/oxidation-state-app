import { IconButton, ButtonGroup, Tooltip } from '@mui/material';
import styles from '../GraphTypeToggle/GraphTypeToggle.module.css';
import { OxidationStatesAPI } from '@/models/DataViewerModel';
import { useMemo } from 'react';
import { getBoundaries } from '@/utils/GraphUtil';
import { ReactComponent as RightToggle } from '@/Assets/Images/rightToggle.svg';
import { ReactComponent as LeftToggle } from '@/Assets/Images/leftToggle.svg';

interface Props {
    onChange: (value: number) => void;
    value: number;
    data: OxidationStatesAPI;
}

const NudgeButtons = ({ value, data, onChange }: Props) => {
    const boundaries = useMemo(() => getBoundaries(data), [data]);

    const handlePreviousNudge = () => {
        for (let i = boundaries.length - 1; i >= 0; i--) {
            if (value > boundaries[i]) {
                onChange(boundaries[i]);
                return;
            }
        }
    };

    const handleNextNudge = () => {
        for (let i = 0; i < boundaries.length; i++) {
            if (value < boundaries[i]) {
                onChange(boundaries[i]);
                return;
            }
        }
    };

    return (
        <ButtonGroup className={styles.container}>
            <Tooltip title="Previous Boundary">
                <IconButton value="previous" className={styles.toggleButton} onClick={handlePreviousNudge}>
                    <LeftToggle />
                </IconButton>
            </Tooltip>
            <Tooltip title="Next Boundary">
                <IconButton value="next" className={styles.toggleButton} onClick={handleNextNudge}>
                    <RightToggle />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );
};

export default NudgeButtons;
