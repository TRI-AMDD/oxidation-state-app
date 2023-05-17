import { dataViewerStateAtom } from 'atoms/atoms';
import useTable from './useTable';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { LoadingState } from 'models/DataViewerModel';

const useInputs = () => {
    const [inputText, setInputText] = useState('');
    const { grabOxidationStates } = useTable();
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            event.preventDefault();

            grabOxidationStates('', file);
            setDataViewerState(LoadingState.Loading);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmitClick = () => {
        grabOxidationStates(inputText);
        setDataViewerState(LoadingState.Loading);
    };

    const handleEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            grabOxidationStates(inputText);
            setDataViewerState(LoadingState.Loading);

            event.preventDefault();
        }
    };

    return { handleFileUpload, handleInputChange, handleSubmitClick, handleEnterClick };
};

export default useInputs;
