import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { GraphType } from 'models/PlotDataModel';
import { ReactComponent as BarIcon } from 'Assets/Images/barIcon.svg';
import { ReactComponent as CurveIcon } from 'Assets/Images/curveIcon.svg';
import styles from './GraphTypeToggle.module.css';
interface GraphTypeToggleProps {
    graphType: GraphType;
    setGraphType: (newState: GraphType) => void;
}

const GraphTypeToggle = ({ graphType, setGraphType }: GraphTypeToggleProps) => {
    const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newValue: GraphType) => {
        if (newValue !== null) setGraphType(newValue);
    };
    return (
        <ToggleButtonGroup value={graphType} exclusive onChange={handleToggleChange} className={styles.container}>
            <ToggleButton value={GraphType.Wavy} className={styles.toggleButton}>
                <CurveIcon />
            </ToggleButton>
            <ToggleButton value={GraphType.Bar} className={styles.toggleButton}>
                <BarIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default GraphTypeToggle;
