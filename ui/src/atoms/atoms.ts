import { LoadingState, OxidationStatesAPI, OxidationStatesTableItem } from 'models/DataViewerModel';
import { atom } from 'jotai';
import { GridRowParams } from '@mui/x-data-grid';

export const dataViewerStateAtom = atom<LoadingState>(LoadingState.Initial);

export const dynamicCompositionTitleAtom = atom<{
    formattedTitle: JSX.Element[];
    unformattedTitle: string;
}>({
    formattedTitle: [],
    unformattedTitle: ''
});

export const tableDataAtom = atom<OxidationStatesTableItem[]>([]);

export const selectedRowAtom = atom<GridRowParams | null>(null);

export const structureWasUploadedAtom = atom<boolean>(false);

export const uploadedFileNameAtom = atom<string>('');

export const oxidationDataAtom = atom<OxidationStatesAPI | null>(null);
