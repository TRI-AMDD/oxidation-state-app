import { GridToolbarContainer, GridToolbarContainerProps } from '@mui/x-data-grid';
import CustomExportButton from './CustomExportButton';

const CustomToolbar = (props: GridToolbarContainerProps) => {
    return (
        <GridToolbarContainer
            sx={{
                justifyContent: 'flex-end'
            }}
            {...props}
        >
            <CustomExportButton />
        </GridToolbarContainer>
    );
};

export default CustomToolbar;
