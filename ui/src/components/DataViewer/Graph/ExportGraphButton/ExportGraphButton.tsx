import { Button } from '@mui/material';
import html2canvas from 'html2canvas';

function fileSaveAs(uri: string, filename: string) {
    var link = document.createElement('a');

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

const ExportGrahpButton = () => {
    const handleButtonClick = () => {
        const exportDiv = document.getElementById('graph-export');
        if (exportDiv) {
            html2canvas(exportDiv).then((canvas) => {
                fileSaveAs(canvas.toDataURL(), 'oxidation-state-graph.png');
            });
        }
    };

    return <Button onClick={handleButtonClick}>Export</Button>;
};

export default ExportGrahpButton;
