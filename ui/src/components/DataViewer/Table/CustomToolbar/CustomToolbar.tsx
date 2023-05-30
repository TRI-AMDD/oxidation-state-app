import { GridToolbarContainer, GridToolbarContainerProps, GridToolbarFilterButton } from '@mui/x-data-grid';
import CustomExportButton from './CustomExportButton';

const CustomToolbar = (props: GridToolbarContainerProps) => {
    return (
        <GridToolbarContainer
            sx={{
                justifyContent: 'flex-start'
            }}
            {...props}
        >
            <GridToolbarFilterButton />
            <CustomExportButton />
        </GridToolbarContainer>
    );
};

export default CustomToolbar;
