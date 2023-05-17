import { fetchTableDataUsingComposition } from 'api/apiRequests';
import { dataViewerStateAtom, tableDataAtom } from 'atoms/atoms';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { LoadingState } from 'models/DataViewerModel';
import { parseAPITableData } from 'utils/DataGridUtils/OxidationStateFormatter';

const useTable = () => {
    const [tableData, setTableData] = useAtom(tableDataAtom);
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);

    const grabOxidationStates = (chemicalComposition: string, structure?: File) => {
        fetchTableDataUsingComposition(chemicalComposition, structure).then((response: AxiosResponse) => {
            setTableData(parseAPITableData(response.data.tableRows));
            setDataViewerState(LoadingState.Loaded);
        });
    };

    return { tableData, grabOxidationStates };
};

export default useTable;
