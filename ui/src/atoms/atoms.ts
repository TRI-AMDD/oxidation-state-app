import { LoadingState } from 'models/DataViewerModel';
import { atom } from 'jotai';

export const dataViewerStateAtom = atom<LoadingState>(LoadingState.Initial);
