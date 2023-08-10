import { TextField } from '@mui/material';
import styles from './ElectronicChemicalPotentialInput.module.css';
import { useAtom } from 'jotai';
import { exportGraphModalOpenAtom } from '@/atoms/atoms';

interface ECPInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: number;
}

const ElectronicChemicalPotentialInput = ({ onChange, value }: ECPInputProps) => {
    const formattedValue = value.toFixed(4);
    const [isModalOpen] = useAtom(exportGraphModalOpenAtom);
    return (
        <>
            {!isModalOpen && (
                <TextField
                    variant="filled"
                    className={styles.textFieldContainer}
                    label="Mapped Potential Value (E)"
                    type="number"
                    onChange={onChange}
                    value={formattedValue}
                />
            )}
        </>
    );
};

export default ElectronicChemicalPotentialInput;
