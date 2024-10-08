import { TextField, Button, Typography } from '@mui/material';
import styles from './input-section.module.css';
import UploadIcon from '@mui/icons-material/Upload';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const PLACEHOLDER_TEXT = 'ex. LiMn2O4';
const LABEL_TEXT = 'Chemical Composition';

interface InputSectionProps {
    handleFileUpload: (
        event: React.ChangeEvent<HTMLInputElement>,
        setInputText: Dispatch<SetStateAction<string>>
    ) => void;
    handleSubmitClick: (inputText: string) => void;
    handleEnterClick: (event: React.KeyboardEvent<HTMLInputElement>, inputText: string) => void;
}

const InputSection = ({
    handleFileUpload,
    handleSubmitClick,
    handleEnterClick,
    inputvalue
}: InputSectionProps & { inputvalue: string }) => {
    const [inputText, setInputText] = useState(inputvalue || '');
    if (inputText == null) {
        setInputText('');
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };
    useEffect(() => {
        if (inputText != '') {
            handleSubmitClick(inputText);
        }
    }, []);
    useEffect(() => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('q', inputText);
        window.history.replaceState({}, '', currentUrl.href);
    }, [inputText]);
    return (
        <div className={styles.container}>
            <TextField
                id="input-section-chemical-composition"
                data-testid="input-section-chemical-composition"
                placeholder={PLACEHOLDER_TEXT}
                label={LABEL_TEXT}
                InputLabelProps={{
                    shrink: true
                }}
                className={styles.marginRight}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleEnterClick(event, inputText)}
                onChange={handleInputChange}
                value={inputText}
            />
            <Button
                id="input-section-submit-button"
                data-testid="input-section-submit-button"
                variant="contained"
                size="large"
                className={styles.marginRight}
                onClick={() => handleSubmitClick(inputText)}
                disabled={inputText === ''}
            >
                SUBMIT
            </Button>
            <Typography variant="body2" component={'div'} className={styles.marginRight}>
                or
            </Typography>
            <div className={styles.uploadButtonContainer}>
                <Button
                    id="input-section-upload-button"
                    variant="outlined"
                    component="label"
                    size="large"
                    startIcon={<UploadIcon />}
                >
                    UPLOAD STRUCTURE
                    <input
                        hidden
                        type="file"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setInputText)}
                    />
                </Button>
                <div className={styles.helperText}>Upload file in CIF or VASP POSCAR format.</div>
            </div>
        </div>
    );
};

export default InputSection;
