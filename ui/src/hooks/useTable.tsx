import { GridRowParams } from '@mui/x-data-grid';
import { fetchTableDataUsingComposition } from '@/api/apiRequests';
import {
    dataViewerStateAtom,
    dynamicCompositionTitleAtom,
    selectedRowAtom,
    oxidationDataAtom,
    electronicMappedPotentialValueAtom,
    apiErrorAtom
} from '@/atoms/atoms';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { OxidationStatesAPI, OxidationStatesTableItem } from '@/models/DataViewerModel';
import { LoadingState } from '@/models/DataViewerModel';
import React, { useMemo } from 'react';
import {
    parseAPICompositionString,
    parseAPITableData,
    parseOxidationData
} from '@/utils/DataGridUtils/OxidationStateFormatter';

const useTable = () => {
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    const [, setDynamicCompositionTitle] = useAtom(dynamicCompositionTitleAtom);
    const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);
    const [oxidationData, setOxidationData] = useAtom(oxidationDataAtom);
    const [ECPValue, setECPValue] = useAtom(electronicMappedPotentialValueAtom);
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
                setOxidationData(parseOxidationData(response.data));
                setTimeout(() => {
                    if (response.data.messages.length > 0 && response.data.messages[0].isErrorMessage) {
                        setDataViewerState(LoadingState.Error);
                        dataLayer.push({ composition_status: 'fail' });
                    } else {
                        setDataViewerState(LoadingState.Loaded);
                        dataLayer.push({ composition_status: 'success' });
                    }
                    dataLayer.push({ event: 'composition_submit' });
                }, 500);

                if (response.data.tableData.tableRows.length > 0) {
                    setECPValue(response.data.tableData.tableRows[0].optimalMappedPotential);
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
                dataLayer.push({ composition_status: 'fail' });
                dataLayer.push({ event: 'composition_submit' });
                setApiError(true);
            }
        );
    };

    const handleTableRowClick = (event: GridRowParams<OxidationStatesTableItem>) => {
        const { row } = event;
        setSelectedRow(row);

        if (row?.optimalMappedPotential) {
            setECPValue(row?.optimalMappedPotential);
        }
    };

    const parsedTableData = useMemo(() => {
        if (oxidationData) {
            const parseData = parseAPITableData(oxidationData, ECPValue);

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
