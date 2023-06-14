import { TextField } from '@mui/material';
import styles from './ElectronicChemicalPotentialInput.module.css';

interface ECPInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: number;
}

const ElectronicChemicalPotentialInput = ({ onChange, value }: ECPInputProps) => {
    console.log(value);
    return (
        <TextField
            variant="filled"
            className={styles.textFieldContainer}
            label="Electronic Chemical Potential (μ)"
            type="number"
            onChange={onChange}
            value={value}
        />
    );
};

export default ElectronicChemicalPotentialInput;
