import { GridRowParams } from '@mui/x-data-grid';
import { fetchTableDataUsingComposition } from 'api/apiRequests';
import {
    dataViewerStateAtom,
    dynamicCompositionTitleAtom,
    selectedRowAtom,
    oxidationDataAtom,
    tableDataAtom,
    electronicChemicalPotentialRangeAtom
} from 'atoms/atoms';
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
    const [, setOxidationData] = useAtom(oxidationDataAtom);
    const [, setECPRange] = useAtom(electronicChemicalPotentialRangeAtom);

    const setInitialSelectedRow = (row: OxidationStatesTableItem) => {
        setSelectedRow(row);
    };

    const grabOxidationStates = (chemicalComposition: string, structure?: File) => {
        fetchTableDataUsingComposition(chemicalComposition, structure).then(
            (response: AxiosResponse<OxidationStatesAPI>) => {
                setDynamicCompositionTitle({
                    formattedTitle: parseAPICompositionString(response.data.composition),
                    unformattedTitle: response.data.composition
                });
                const parsedTableData = parseAPITableData(response.data.tableRows);
                setTableData(parsedTableData);
                setOxidationData(response.data);
                setDataViewerState(LoadingState.Loaded);
                setSelectedRow(parsedTableData[0]);
                setECPRange([response.data.minBoundaryValue, response.data.maxBoundaryValue]);
            }
        );
    };

    const handleTableRowClick = (event: GridRowParams<OxidationStatesTableItem>) => {
        setSelectedRow(event.row);
    };

    return { tableData, grabOxidationStates, handleTableRowClick, selectedRow, setInitialSelectedRow };
};

export default useTable;
