import { dataViewerStateAtom, structureWasUploadedAtom, uploadedFileNameAtom } from '@/atoms/atoms';
import useTable from '../../data-table/table-hooks/use-table';
import { useAtom } from 'jotai';
import { LoadingState } from '@/features/data-table/table-models/data-viewer-model';
import { Dispatch, SetStateAction } from 'react';

const useInputs = () => {
    const [uploadedFileName, setUploadedFileName] = useAtom(uploadedFileNameAtom);
    const { grabOxidationStates } = useTable();
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    const [structureWasUploaded, setStructureWasUploaded] = useAtom(structureWasUploadedAtom);

    const handleFileUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        setInputText: Dispatch<SetStateAction<string>>
    ) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            event.preventDefault();
            grabOxidationStates('', setInputText, file);
            setDataViewerState(LoadingState.Loading);
            setStructureWasUploaded(true);
            setUploadedFileName(file.name);
            const dataViewerElement = document.getElementById('data-viewer-container');

            if (typeof dataViewerElement !== 'undefined' && dataViewerElement) {
                dataViewerElement.scrollIntoView();
            }
        }
    };

    const handleSubmitClick = (inputText: string) => {
        if (inputText !== '') {
            grabOxidationStates(inputText);
            setDataViewerState(LoadingState.Loading);
            setStructureWasUploaded(false);
            const dataViewerElement = document.getElementById('data-viewer-container');

            if (typeof dataViewerElement !== 'undefined' && dataViewerElement) {
                dataViewerElement.scrollIntoView();
            }
        }
    };

    const handleEnterClick = (event: React.KeyboardEvent<HTMLInputElement>, inputText: string) => {
        if (event.code === 'Enter' && inputText !== '') {
            grabOxidationStates(inputText);
            setDataViewerState(LoadingState.Loading);
            setStructureWasUploaded(false);
            event.preventDefault();
            const dataViewerElement = document.getElementById('data-viewer-container');

            if (typeof dataViewerElement !== 'undefined' && dataViewerElement) {
                dataViewerElement.scrollIntoView();
            }
        }
    };

    return {
        handleFileUpload,
        handleSubmitClick,
        handleEnterClick,
        structureWasUploaded,
        uploadedFileName
    };
};

export default useInputs;
