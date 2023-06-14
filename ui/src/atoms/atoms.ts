import { LoadingState, OxidationStatesAPI, OxidationStatesTableItem } from 'models/DataViewerModel';
import { atom } from 'jotai';

export const dataViewerStateAtom = atom<LoadingState>(LoadingState.Initial);

export const dynamicCompositionTitleAtom = atom<{
    formattedTitle: JSX.Element[];
    unformattedTitle: string;
}>({
    formattedTitle: [],
    unformattedTitle: ''
});

export const ecpInitValue = -50;

export const tableDataAtom = atom<OxidationStatesTableItem[]>([]);

export const selectedRowAtom = atom<OxidationStatesTableItem | null>(null);

export const structureWasUploadedAtom = atom<boolean>(false);

export const uploadedFileNameAtom = atom<string>('');

export const oxidationDataAtom = atom<OxidationStatesAPI | null>(null);

export const graphSliderPositionAtom = atom<number>(50);

export const electronicChemicalPotentialRangeAtom = atom<[number, number]>([0, 0]);

export const electronicChemicalPotentialValueAtom = atom<number>(ecpInitValue);
