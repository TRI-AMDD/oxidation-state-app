import { GridRowParams } from '@mui/x-data-grid';
import { fetchTableDataUsingComposition } from 'api/apiRequests';
import {
    dataViewerStateAtom,
    dynamicCompositionTitleAtom,
    selectedRowAtom,
    oxidationDataAtom,
    electronicChemicalPotentialRangeAtom,
    electronicChemicalPotentialValueAtom
} from 'atoms/atoms';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { OxidationStatesAPI, OxidationStatesTableItem } from 'models/DataViewerModel';
import { LoadingState } from 'models/DataViewerModel';
import { useMemo } from 'react';
import { parseAPICompositionString, parseAPITableData } from 'utils/DataGridUtils/OxidationStateFormatter';

const useTable = () => {
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    const [, setDynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);
    const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);
    const [oxidationData, setOxidationData] = useAtom(oxidationDataAtom);
    const [, setECPRange] = useAtom(electronicChemicalPotentialRangeAtom);
    const [ECPValue, setECPValue] = useAtom(electronicChemicalPotentialValueAtom);

    const grabOxidationStates = (chemicalComposition: string, structure?: File) => {
        fetchTableDataUsingComposition(chemicalComposition, structure).then(
            (response: AxiosResponse<OxidationStatesAPI>) => {
                setDynamicCompositionTitle({
                    formattedTitle: parseAPICompositionString(response.data.composition),
                    unformattedTitle: response.data.composition
                });
                setOxidationData(response.data);
                setDataViewerState(LoadingState.Loaded);

                setECPRange([response.data.minBoundaryValue, response.data.maxBoundaryValue]);
                setECPValue(response.data.tableData.tableRows[0].optimalChemicalPotential);
            }
        );
    };

    const handleTableRowClick = (event: GridRowParams<OxidationStatesTableItem>) => {
        setSelectedRow(event.row);
    };

    const parsedTableData = useMemo(() => {
        if (oxidationData) {
            const parseData = parseAPITableData(oxidationData.tableData.tableRows, ECPValue);

            if (!selectedRow) {
                setSelectedRow(parseData[0]);
            }

            return parseData;
        }

        return [];
    }, [oxidationData, ECPValue, selectedRow, setSelectedRow]);

    return { tableData: parsedTableData, grabOxidationStates, handleTableRowClick, selectedRow };
};

export default useTable;
