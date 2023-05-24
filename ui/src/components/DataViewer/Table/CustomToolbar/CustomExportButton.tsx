import { ButtonProps } from '@mui/material';
import {
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
    GridCsvExportOptions,
    useGridApiContext,
    gridSortedRowIdsSelector
} from '@mui/x-data-grid';
import CustomCIFExportButton from './CustomCIFExportButton';
import useInputs from 'hooks/useInputs';
import useTable from 'hooks/useTable';

const CustomExportButton = (props: ButtonProps) => {
    const { structureWasUploaded, uploadedFileName } = useInputs();
    const { selectedRow } = useTable();

    const apiRef = useGridApiContext();

    const csvOptions: GridCsvExportOptions = { getRowsToExport: () => gridSortedRowIdsSelector(apiRef) };

    return (
        <GridToolbarExportContainer {...props}>
            <GridCsvExportMenuItem options={csvOptions} />
            {structureWasUploaded && selectedRow && selectedRow.row.cifString && (
                <CustomCIFExportButton cifString={selectedRow.row.cifString} fileName={uploadedFileName} />
            )}
        </GridToolbarExportContainer>
    );
};

export default CustomExportButton;
