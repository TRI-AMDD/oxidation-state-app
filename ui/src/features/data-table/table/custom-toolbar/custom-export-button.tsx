import { ButtonProps } from '@mui/material';
import {
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
    GridCsvExportOptions,
    useGridApiContext,
    gridSortedRowIdsSelector
} from '@mui/x-data-grid';
import CustomCIFExportButton from './custom-cif-export-button';
import useInputs from '@/features/input-submission/input-hooks/use-inputs';
import useTable from '@/features/data-table/table-hooks/use-table';
import { dynamicCompositionTitleAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';

const CustomExportButton = (props: ButtonProps) => {
    const { structureWasUploaded, uploadedFileName } = useInputs();
    const { selectedRow } = useTable();
    const [dynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);

    const apiRef = useGridApiContext();

    const csvOptions: GridCsvExportOptions = {
        getRowsToExport: () => gridSortedRowIdsSelector(apiRef),
        fileName: `oxidation_analysis_${dynamicCompositionTitle.unformattedTitle}`
    };

    return (
        <GridToolbarExportContainer {...props}>
            <GridCsvExportMenuItem options={csvOptions} />
            {structureWasUploaded && selectedRow && selectedRow.cifString && (
                <CustomCIFExportButton cifString={selectedRow.cifString} fileName={uploadedFileName} />
            )}
        </GridToolbarExportContainer>
    );
};

export default CustomExportButton;
