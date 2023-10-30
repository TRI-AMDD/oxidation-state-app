import { TextField, TextFieldProps } from '@mui/material';
import styles from './ElectronicChemicalPotentialInput.module.css';
import { useAtom } from 'jotai';
import { ecpInitValue, exportGraphModalOpenAtom } from '@/atoms/atoms';
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
        if (inputRef.current && value !== ecpInitValue) {
            const formattedValue = value.toFixed(5);
            inputRef.current.value = formattedValue;
        }
    }, [value, isModalOpen]);

    // trigger value change after 1 sec
    const debounced = useDebouncedCallback(
        (val: string) => {
            if (!Number.isNaN(Number.parseFloat(val))) {
                const newValue = Number.parseFloat(val);
                if (value !== newValue) {
                    onChange(newValue);
                    dataLayer.push({ event: 'mpv_input' });
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
            label="ICSD-derived Reduction Potential Value (E)"
            type="number"
            onChange={(e) => debounced(e.target.value)}
        />
    );
};

export default ElectronicChemicalPotentialInput;
