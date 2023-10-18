import { atom } from 'jotai';
import { ExportGraphSettings, InitalExportGraphSettingsState } from '@/models/ExportGraphModel';
import {
    LoadingState,
    OxidationStatesTableItem,
    OxidationStatesAPI,
    Boundary
} from '@/features/data-table/table-models/data-viewer-model';

export const dataViewerStateAtom = atom<LoadingState>(LoadingState.Initial);

export const dynamicCompositionTitleAtom = atom<{
    formattedTitle: string[];
    unformattedTitle: string;
}>({
    formattedTitle: [],
    unformattedTitle: ''
});

export const ecpInitValue = -50;

export const selectedRowAtom = atom<OxidationStatesTableItem | null>(null);

export const structureWasUploadedAtom = atom<boolean>(false);

export const uploadedFileNameAtom = atom<string>('');

export const oxidationDataAtom = atom<OxidationStatesAPI | null>(null);

export const graphSliderPositionAtom = atom<number>(50);

export const electronicChemicalPotentialRangeAtom = atom<[number, number]>([0, 0]);

export const electronicMappedPotentialValueAtom = atom<number>(ecpInitValue);

export const apiErrorAtom = atom<boolean>(false);

export const exportGraphSettingsAtom = atom<ExportGraphSettings>(InitalExportGraphSettingsState);

export const exportGraphModalOpenAtom = atom<boolean>(false);

export const boundaryAtom = atom<Boundary | null>(null);
