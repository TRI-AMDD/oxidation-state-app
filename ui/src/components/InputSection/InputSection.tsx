import { TextField, Button, Typography } from '@mui/material';
import styles from './InputSection.module.css';
import UploadIcon from '@mui/icons-material/Upload';
import useTable from 'hooks/useTable';
import React, { useState } from 'react';
import { dataViewerStateAtom } from 'atoms/atoms';
import { useAtom } from 'jotai';
import { LoadingState } from 'models/DataViewerModel';

const PLACEHOLDER_TEXT = 'ex. LiMn2O4';
const LABEL_TEXT = 'Chemical Composition';

const InputSection = () => {
    const [inputText, setInputText] = useState('');
    const { grabOxidationStates } = useTable();
    const [, setDataViewerState] = useAtom(dataViewerStateAtom);
    //const [structureFile, setStructureFile] = useState();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const form = new FormData();
            form.append('file', event.target.files[0], event.target.files[0].name);
            console.log(form.entries());
            console.log(event.target.files[0]);
        }
    };

    const hanldeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleClick = () => {
        grabOxidationStates(inputText);
        setDataViewerState(LoadingState.Loading);
    };
    return (
        <div className={styles.container}>
            <TextField
                placeholder={PLACEHOLDER_TEXT}
                label={LABEL_TEXT}
                InputLabelProps={{
                    shrink: true
                }}
                className={styles.marginRight}
                onChange={hanldeInputChange}
            />
            <Button variant="contained" size="large" className={styles.marginRight} onClick={handleClick}>
                SUBMIT
            </Button>
            <Typography variant="body2" component={'div'} className={styles.marginRight}>
                Or
            </Typography>
            <Button variant="outlined" component="label" size="large" startIcon={<UploadIcon />}>
                UPLOAD STRUCTURE
                <input hidden type="file" onChange={handleFileUpload} />
            </Button>
        </div>
    );
};

export default InputSection;
