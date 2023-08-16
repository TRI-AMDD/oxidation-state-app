import { TextField, TextFieldProps } from '@mui/material';
import styles from './ElectronicChemicalPotentialInput.module.css';
import { useAtom } from 'jotai';
import { exportGraphModalOpenAtom } from '@/atoms/atoms';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useRef } from 'react';

interface ECPInputProps {
    onChange: (value: number) => void;
    value: number;
}

const ElectronicChemicalPotentialInput = ({ onChange, value }: ECPInputProps) => {
    const [isModalOpen] = useAtom(exportGraphModalOpenAtom);
    const inputRef = useRef<TextFieldProps>();

    useEffect(() => {
        if (inputRef.current) {
            const formattedValue = value.toFixed(5);
            inputRef.current.value = formattedValue;
        }
    }, [value]);

    // trigger value change after 1 sec
    const debounced = useDebouncedCallback(
        (val: string) => {
            if (!Number.isNaN(Number.parseFloat(val))) {
                const newValue = Number.parseFloat(val);
                if (value !== newValue) {
                    onChange(newValue);
                }
            }
        },
        // delay in ms
        1000
    );

    if (isModalOpen) {
        return null;
    }

    return (
        <TextField
            inputRef={inputRef}
            variant="filled"
            className={styles.textFieldContainer}
            label="Mapped Potential Value (E)"
            type="number"
            onChange={(e) => debounced(e.target.value)}
        />
    );
};

export default ElectronicChemicalPotentialInput;
