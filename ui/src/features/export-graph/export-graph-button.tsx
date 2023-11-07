import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import {
    electronicMappedPotentialValueAtom,
    exportGraphModalOpenAtom,
    exportGraphSettingsAtom,
    oxidationDataAtom
} from '@/atoms/atoms';
import ExportGraphDialog from './ExportGraphDialog';
import { InitalExportGraphSettingsState } from '@/models/ExportGraphModel';
import { BAR_HEIGHT, renderExportGraph } from './render-export-graph';
import keyImage from '@/Assets/Images/graphKey.svg';


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

const ExportGraphButton = () => {
    const [exportGraphSettings, setExportGraphSettings] = useAtom(exportGraphSettingsAtom);
    const [isOpen, setIsOpen] = useAtom(exportGraphModalOpenAtom);
    const [oxidationData] = useAtom(oxidationDataAtom);
    const [mpValue] = useAtom(electronicMappedPotentialValueAtom);

    const handleExportButtonClick = () => {
        const canvas = document.createElement('canvas');

        if (canvas && oxidationData) {
            const oxidationLength = oxidationData?.oxidationStateRangeData.length ?? 0;
            const height = BAR_HEIGHT * oxidationLength + 600;

            canvas.width = 2100;
            canvas.height = height;

            const img = new Image();
            img.onload = () => {
                const canvasUrl = renderExportGraph({
                    canvas,
                    data: oxidationData,
                    mpValue,
                    img,
                    exportSettings: exportGraphSettings
                });

                fileSaveAs(canvasUrl, 'oxidation-state-graph.png');
                setIsOpen(false);
                dataLayer.push({ event: 'graph_export' });
            };
            img.src = keyImage;
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
            />
        </>
    );
};

export default ExportGraphButton;
