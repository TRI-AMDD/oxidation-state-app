import { GridRowParams } from '@mui/x-data-grid';
import { fetchTableDataUsingComposition } from 'api/apiRequests';
import { dataViewerStateAtom, dynamicCompositionTitleAtom, selectedRowAtom, tableDataAtom } from 'atoms/atoms';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { OxidationStatesAPI, OxidationStatesTableItem } from 'models/DataViewerModel';
import { LoadingState } from 'models/DataViewerModel';
import { parseAPICompositionString, parseAPITableData } from 'utils/DataGridUtils/OxidationStateFormatter';

const useTable = () => {
    const [tableData, setTableData] = useAtom(tableDataAtom);
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    const [, setDynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);
    const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);

    const grabOxidationStates = (chemicalComposition: string, structure?: File) => {
        fetchTableDataUsingComposition(chemicalComposition, structure).then(
            (response: AxiosResponse<OxidationStatesAPI>) => {
                setDynamicCompositionTitle({
                    formattedTitle: parseAPICompositionString(response.data.composition),
                    unformattedTitle: response.data.composition
                });
                setTableData(parseAPITableData(response.data.tableRows));
                setDataViewerState(LoadingState.Loaded);
                setSelectedRow(null);
            }
        );
    };

    const handleTableRowClick = (event: GridRowParams<OxidationStatesTableItem>) => {
        setSelectedRow(event);
    };

    return { tableData, grabOxidationStates, handleTableRowClick, selectedRow };
};

export default useTable;
