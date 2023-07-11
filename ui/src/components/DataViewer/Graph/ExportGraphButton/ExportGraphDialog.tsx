import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import { exportGraphSettingsAtom } from 'atoms/atoms';
import { useAtom } from 'jotai';
import { ExportGraphFileType } from 'models/ExportGraphModel';
import styles from './ExportGraphButton.module.css';
import { GraphType } from 'models/PlotDataModel';

interface ExportGraphDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    handleExportButtonClick: () => void;
    setGraphType: (newState: GraphType) => void;
}

const ExportGraphDialog = ({ isOpen, handleClose, handleExportButtonClick, setGraphType }: ExportGraphDialogProps) => {
    const [exportGraphSettings, setExportGraphSettings] = useAtom(exportGraphSettingsAtom);

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExportGraphSettings({ ...exportGraphSettings, [event.target.name]: event.target.checked });
        if (event.target.name === 'showCurves') {
            if (event.target.checked) {
                setGraphType(GraphType.Wavy);
            } else {
                setGraphType(GraphType.Bar);
            }
        }
    };

    const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExportGraphSettings({ ...exportGraphSettings, fileType: event.target.value as ExportGraphFileType });
    };
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    padding: '24px'
                }
            }}
        >
            <DialogTitle>Export Current View</DialogTitle>
            <DialogContent>Oxidation State Ranges Graph</DialogContent>
            <DialogContent sx={{ borderTop: '1px solid var(--divider, rgba(0, 0, 0, 0.12))' }}>
                <FormControl>
                    <FormLabel>Options</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={exportGraphSettings.showCurves}
                                    onChange={handleCheckboxClick}
                                    name="showCurves"
                                />
                            }
                            label="Show Curves"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={exportGraphSettings.showSliderBar}
                                    onChange={handleCheckboxClick}
                                    name="showSliderBar"
                                />
                            }
                            label="Show Slider bar"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={exportGraphSettings.showLabels}
                                    onChange={handleCheckboxClick}
                                    name="showLabels"
                                />
                            }
                            label="Show Labels"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={exportGraphSettings.showColorKey}
                                    onChange={handleCheckboxClick}
                                    name="showColorKey"
                                />
                            }
                            label="Show Color Key"
                        />
                    </FormGroup>
                </FormControl>
            </DialogContent>
            <DialogContent>
                <FormControl>
                    <FormLabel>File Type</FormLabel>
                    <RadioGroup value={exportGraphSettings.fileType} onChange={handleRadioButtonChange}>
                        <FormControlLabel control={<Radio />} value={ExportGraphFileType.png} label="PNG" />
                        <FormControlLabel control={<Radio />} value={ExportGraphFileType.pdf} label="PDF" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogContent>
                <div className={styles.buttonContainer}>
                    <Button size="medium" variant="text" sx={{ marginRight: '8px' }} onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button size="medium" variant="contained" onClick={handleExportButtonClick}>
                        EXPORT
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ExportGraphDialog;
