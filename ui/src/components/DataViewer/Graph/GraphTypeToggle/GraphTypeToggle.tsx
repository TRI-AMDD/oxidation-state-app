import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { GraphType } from '@/models/PlotDataModel';
import { ReactComponent as BarIcon } from '@/Assets/Images/barIcon.svg';
import { ReactComponent as CurveIcon } from '@/Assets/Images/curveIcon.svg';
import styles from './GraphTypeToggle.module.css';
import { exportGraphModalOpenAtom, exportGraphSettingsAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
interface GraphTypeToggleProps {
    graphType: GraphType;
    setGraphType: (newState: GraphType) => void;
}

const GraphTypeToggle = ({ graphType, setGraphType }: GraphTypeToggleProps) => {
    const [exportGraphSettings, setExportGraphSettings] = useAtom(exportGraphSettingsAtom);
    const [isExportModalOpen] = useAtom(exportGraphModalOpenAtom);
    const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, newValue: GraphType) => {
        if (newValue !== null) {
            setGraphType(newValue);
            if (newValue === GraphType.Wavy) {
                setExportGraphSettings({ ...exportGraphSettings, showCurves: true });
            } else {
                setExportGraphSettings({ ...exportGraphSettings, showCurves: false });
            }
            dataLayer.push({ event: 'graph_toggle' });
        }
    };
    return (
        <>
            {!isExportModalOpen && (
                <ToggleButtonGroup
                    value={graphType}
                    exclusive
                    onChange={handleToggleChange}
                    className={styles.container}
                >
                    <ToggleButton value={GraphType.Wavy} className={styles.toggleButton}>
                        <CurveIcon />
                    </ToggleButton>
                    <ToggleButton value={GraphType.Bar} className={styles.toggleButton}>
                        <BarIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            )}
        </>
    );
};

export default GraphTypeToggle;
