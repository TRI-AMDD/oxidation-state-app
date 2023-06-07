import { TextField } from '@mui/material';
import styles from './ElectronicChemicalPotentialInput.module.css';

const ElectronicChemicalPotentialInput = () => {
    return (
        <>
            <TextField
                variant="filled"
                className={styles.textFieldContainer}
                label="Electronic Chemical Potential (μ)"
            />
        </>
    );
};

export default ElectronicChemicalPotentialInput;
