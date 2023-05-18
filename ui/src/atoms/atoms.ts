import { LoadingState, OxidationStatesTableItem } from 'models/DataViewerModel';
import { atom } from 'jotai';

export const dataViewerStateAtom = atom<LoadingState>(LoadingState.Initial);

export const dynamicCompositionTitleAtom = atom<string>('');

export const tableDataAtom = atom<OxidationStatesTableItem[]>([]);
