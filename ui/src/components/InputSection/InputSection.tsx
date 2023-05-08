import { TextField, Button, Typography } from '@mui/material';
import styles from './InputSection.module.css';
import UploadIcon from '@mui/icons-material/Upload';
import { chemicalCompositionInputAtom } from 'atoms/atoms';
import { useAtom } from 'jotai';

const PLACEHOLDER_TEXT = 'ex. LiMn2O4';
const LABEL_TEXT = 'Chemical Composition';
const InputSection = () => {
    const [, setChemicalComposition] = useAtom(chemicalCompositionInputAtom);

    const hanldeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChemicalComposition(event.target.value);
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
            <Button variant="contained" size="large" className={styles.marginRight}>
                SUBMIT
            </Button>
            <Typography variant="body2" component={'div'} className={styles.marginRight}>
                Or
            </Typography>
            <Button variant="contained" size="large" startIcon={<UploadIcon />}>
                UPLOAD STRUCTURE
            </Button>
        </div>
    );
};

export default InputSection;
