import { ButtonProps } from '@mui/material';
import { GridToolbarExportContainer, GridCsvExportMenuItem } from '@mui/x-data-grid';
import CustomCIFExportButton from './CustomCIFExportButton';

const CustomExportButton = (props: ButtonProps) => {
    return (
        <GridToolbarExportContainer {...props}>
            <GridCsvExportMenuItem />
            <CustomCIFExportButton />
        </GridToolbarExportContainer>
    );
};

export default CustomExportButton;
