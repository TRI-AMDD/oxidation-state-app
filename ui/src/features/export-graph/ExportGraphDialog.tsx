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
    Typography
} from '@mui/material';
import { exportGraphSettingsAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
import styles from './ExportGraphButton.module.css';

interface ExportGraphDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    handleExportButtonClick: () => void;
}

const ExportGraphDialog = ({ isOpen, handleClose, handleExportButtonClick }: ExportGraphDialogProps) => {
    const [exportGraphSettings, setExportGraphSettings] = useAtom(exportGraphSettingsAtom);

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExportGraphSettings({ ...exportGraphSettings, [event.target.name]: event.target.checked });
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
                <Typography variant="body1" component={'div'}>
                    The image will export as a PNG.
                </Typography>
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
