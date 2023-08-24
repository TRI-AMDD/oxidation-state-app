import { Button } from '@mui/material';
import { exportGraphModalOpenAtom, exportGraphSettingsAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
//import styles from './ExportGraphButton.module.css';
import ExportGraphDialog from './ExportGraphDialog';
import { InitalExportGraphSettingsState } from '@/models/ExportGraphModel';
import { GraphType } from '@/models/PlotDataModel';
import html2canvas from 'html2canvas';

interface ExportGraphButtonProps {
    setGraphType: (newState: GraphType) => void;
}

function fileSaveAs(uri: string, filename: string) {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

const ExportGraphButton = ({ setGraphType }: ExportGraphButtonProps) => {
    const [exportGraphSettings, setExportGraphSettings] = useAtom(exportGraphSettingsAtom);
    const [isOpen, setIsOpen] = useAtom(exportGraphModalOpenAtom);

    const handleExportButtonClick = () => {
        const exportDiv = document.getElementById('graph-export');
        if (exportDiv) {
            html2canvas(exportDiv).then(
                (canvas) => {
                    fileSaveAs(canvas.toDataURL(), 'oxidation-state-graph.png');
                },
                (e) => console.error(e)
            );
        }
    };

    const handleOpenDialogClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setExportGraphSettings({ ...InitalExportGraphSettingsState, showCurves: exportGraphSettings.showCurves });
        setIsOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpenDialogClick}>Export</Button>
            <ExportGraphDialog
                isOpen={isOpen}
                handleClose={handleClose}
                handleExportButtonClick={handleExportButtonClick}
                setGraphType={setGraphType}
            />
        </>
    );
};

export default ExportGraphButton;
