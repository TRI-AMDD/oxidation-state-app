import { LoadingState, OxidationStatesAPI, OxidationStatesTableItem } from 'models/DataViewerModel';
import { atom } from 'jotai';

export const dataViewerStateAtom = atom<LoadingState>(LoadingState.Initial);

export const dynamicCompositionTitleAtom = atom<JSX.Element[]>([]);

export const tableDataAtom = atom<OxidationStatesTableItem[]>([]);

export const oxidationDataAtom = atom<OxidationStatesAPI | null>(null);
