import { fetchTableDataUsingComposition } from 'api/apiRequests';
import { dataViewerStateAtom, tableDataAtom } from 'atoms/atoms';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { OxidationStatesAPI } from 'models/DataViewerModel';
import { LoadingState } from 'models/DataViewerModel';
import { formatDynamicTitle, parseAPITableData } from 'utils/DataGridUtils/OxidationStateFormatter';

const useTable = () => {
    const [tableData, setTableData] = useAtom(tableDataAtom);
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    //const [, setDynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);

    const grabOxidationStates = (chemicalComposition: string, structure?: File) => {
        fetchTableDataUsingComposition(chemicalComposition, structure).then(
            (response: AxiosResponse<OxidationStatesAPI>) => {
                console.log(formatDynamicTitle(response.data.composition));
                setTableData(parseAPITableData(response.data.tableRows));
                setDataViewerState(LoadingState.Loaded);
            }
        );
    };

    return { tableData, grabOxidationStates };
};

export default useTable;
