import { fetchTableDataUsingComposition } from 'api/apiRequests';
import { dataViewerStateAtom, dynamicCompositionTitleAtom, oxidationDataAtom, tableDataAtom } from 'atoms/atoms';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { OxidationStatesAPI } from 'models/DataViewerModel';
import { LoadingState } from 'models/DataViewerModel';
import { parseAPICompositionString, parseAPITableData } from 'utils/DataGridUtils/OxidationStateFormatter';

const useTable = () => {
    const [tableData, setTableData] = useAtom(tableDataAtom);
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    const [, setDynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);
    const [, setOxidationData] = useAtom(oxidationDataAtom);

    const grabOxidationStates = (chemicalComposition: string, structure?: File) => {
        fetchTableDataUsingComposition(chemicalComposition, structure).then(
            (response: AxiosResponse<OxidationStatesAPI>) => {
                setDynamicCompositionTitle(parseAPICompositionString(response.data.composition));
                setTableData(parseAPITableData(response.data.tableRows));
                setOxidationData(response.data);
                setDataViewerState(LoadingState.Loaded);
            }
        );
    };

    return { tableData, grabOxidationStates };
};

export default useTable;
