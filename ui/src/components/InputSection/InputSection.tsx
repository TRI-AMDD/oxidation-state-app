import { TextField, Button, Typography } from '@mui/material';
import styles from './InputSection.module.css';
import UploadIcon from '@mui/icons-material/Upload';

import useInputs from 'hooks/useInputs';

const PLACEHOLDER_TEXT = 'ex. LiMn2O4';
const LABEL_TEXT = 'Chemical Composition';

const InputSection = () => {
    const { handleInputChange, handleFileUpload, handleSubmitClick, handleEnterClick } = useInputs();
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
            />
            <Button variant="contained" size="large" className={styles.marginRight} onClick={handleSubmitClick}>
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
