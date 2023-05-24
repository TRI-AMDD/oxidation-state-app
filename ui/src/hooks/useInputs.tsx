import { dataViewerStateAtom, structureWasUploadedAtom, uploadedFileNameAtom } from 'atoms/atoms';
import useTable from './useTable';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { LoadingState } from 'models/DataViewerModel';

const useInputs = () => {
    const [inputText, setInputText] = useState('');
    const [uploadedFileName, setUploadedFileName] = useAtom(uploadedFileNameAtom);
    const { grabOxidationStates } = useTable();
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    const [structureWasUploaded, setStructureWasUploaded] = useAtom(structureWasUploadedAtom);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            event.preventDefault();
            grabOxidationStates('', file);
            setDataViewerState(LoadingState.Loading);
            setStructureWasUploaded(true);
            setUploadedFileName(file.name);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmitClick = () => {
        grabOxidationStates(inputText);
        setDataViewerState(LoadingState.Loading);
        setStructureWasUploaded(false);
    };

    const handleEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            grabOxidationStates(inputText);
            setDataViewerState(LoadingState.Loading);
            setStructureWasUploaded(false);
            event.preventDefault();
        }
    };

    return {
        handleFileUpload,
        handleInputChange,
        handleSubmitClick,
        handleEnterClick,
        structureWasUploaded,
        uploadedFileName
    };
};

export default useInputs;
