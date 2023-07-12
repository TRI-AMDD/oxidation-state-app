import { GridRowParams } from '@mui/x-data-grid';
import { fetchTableDataUsingComposition } from '@/api/apiRequests';
import {
    dataViewerStateAtom,
    dynamicCompositionTitleAtom,
    selectedRowAtom,
    oxidationDataAtom,
    electronicChemicalPotentialRangeAtom,
    electronicChemicalPotentialValueAtom,
    apiErrorAtom
} from '@/atoms/atoms';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { OxidationStatesAPI, OxidationStatesTableItem } from '@/models/DataViewerModel';
import { LoadingState } from '@/models/DataViewerModel';
import React, { useMemo } from 'react';
import { parseAPICompositionString, parseAPITableData } from '@/utils/DataGridUtils/OxidationStateFormatter';

const useTable = () => {
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    const [, setDynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);
    const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);
    const [oxidationData, setOxidationData] = useAtom(oxidationDataAtom);
    const [, setECPRange] = useAtom(electronicChemicalPotentialRangeAtom);
    const [ECPValue, setECPValue] = useAtom(electronicChemicalPotentialValueAtom);
    const [, setApiError] = useAtom(apiErrorAtom);

    const grabOxidationStates = (
        chemicalComposition: string,
        setInputText?: React.Dispatch<React.SetStateAction<string>>,
        structure?: File
    ) => {
        fetchTableDataUsingComposition(chemicalComposition, structure).then(
            (response: AxiosResponse<OxidationStatesAPI>) => {
                setDynamicCompositionTitle({
                    formattedTitle: parseAPICompositionString(response.data.composition),
                    unformattedTitle: response.data.composition
                });
                setOxidationData(response.data);
                setTimeout(() => {
                    if (response.data.messages.length > 0 && response.data.messages[0].isErrorMessage) {
                        setDataViewerState(LoadingState.Error);
                    } else if (response.data.messages.length > 0) {
                        setDataViewerState(LoadingState.LoadedWithMessage);
                    } else {
                        setDataViewerState(LoadingState.Loaded);
                    }
                }, 500);

                setECPRange([response.data.minBoundaryValue, response.data.maxBoundaryValue]);
                if (response.data.tableData.tableRows.length > 0) {
                    setECPValue(response.data.tableData.tableRows[0].optimalChemicalPotential);
                } else {
                    setECPValue(1);
                }

                if (structure && setInputText) {
                    setInputText(response.data.composition);
                }
                setApiError(false);
            },
            () => {
                setTimeout(() => {
                    setDataViewerState(LoadingState.Error);
                }, 500);
                setApiError(true);
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
