import { electronicChemicalPotentialRangeAtom, electronicMappedPotentialValueAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
import { ChangeEvent, useEffect } from 'react';
import useTable from './useTable';

const useGraph = () => {
    const [ECPValue, setECPValue] = useAtom(electronicMappedPotentialValueAtom);
    const [ECPRange] = useAtom(electronicChemicalPotentialRangeAtom);
    const { selectedRow } = useTable();

    useEffect(() => {
        if (selectedRow) {
            setECPValue(selectedRow?.optimalMappedPotential);
        }
    }, [selectedRow, setECPValue]);

    const handleECPInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(Number.parseFloat(event.target.value))) {
            setECPValue(Number.parseFloat(event.target.value));
        }
    };

    const handleSliderChange = (newECPValue: number) => {
        setECPValue(newECPValue);
    };
    return { ECPValue, handleECPInputChange, ECPRange, handleSliderChange };
};

export default useGraph;
