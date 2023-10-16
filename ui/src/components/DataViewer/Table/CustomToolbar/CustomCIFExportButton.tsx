import { MenuItem } from '@mui/material';
import { useMemo } from 'react';
import { generateCIFFile } from '@/components/DataViewer/Table/table-data/TableExportsUtil/cifExportUtil';
import styles from './CustomToolbar.module.css';
interface CIFProps {
    cifString: string;
    fileName: string;
}

const CustomCIFExportButton = ({ cifString, fileName }: CIFProps) => {
    const downloadFile = useMemo(() => {
        return URL.createObjectURL(generateCIFFile(cifString));
    }, [cifString]);

    const handleDownloadClick = () => {
        setTimeout(() => {
            URL.revokeObjectURL(downloadFile);
        }, 3000);
    };

    return (
        <MenuItem>
            <a
                href={downloadFile}
                download={`oxs_${fileName}`}
                className={styles.downloadLink}
                onClick={handleDownloadClick}
            >
                Download CIF
            </a>
        </MenuItem>
    );
};

export default CustomCIFExportButton;
