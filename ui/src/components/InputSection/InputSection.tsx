import { TextField, Button, Typography } from '@mui/material';
import styles from './InputSection.module.css';
import UploadIcon from '@mui/icons-material/Upload';

import useInputs from 'hooks/useInputs';

const PLACEHOLDER_TEXT = 'ex. LiMn2O4';
const LABEL_TEXT = 'Chemical Composition';

const InputSection = () => {
    const { handleInputChange, handleFileUpload, handleSubmitClick, handleEnterClick, inputText } = useInputs();
    return (
        <div className={styles.container}>
            <TextField
                placeholder={PLACEHOLDER_TEXT}
                label={LABEL_TEXT}
                InputLabelProps={{
                    shrink: true
                }}
                className={styles.marginRight}
                onKeyDown={handleEnterClick}
                onChange={handleInputChange}
                value={inputText}
            />
            <Button
                id="input-section-submit-button"
                variant="contained"
                size="large"
                className={styles.marginRight}
                onClick={handleSubmitClick}
            >
                SUBMIT
            </Button>
            <Typography variant="body2" component={'div'} className={styles.marginRight}>
                Or
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
                    <input hidden type="file" onChange={handleFileUpload} />
                </Button>
                <div className={styles.helperText}>Upload file in Cif or VASP POSCAR</div>
            </div>
        </div>
    );
};

export default InputSection;
