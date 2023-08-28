import { boundaryAtom, electronicChemicalPotentialRangeAtom, electronicMappedPotentialValueAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import useTable from './useTable';
import { Boundary } from '@/models/DataViewerModel';

const useGraph = () => {
    const [ECPValue, setECPValue] = useAtom(electronicMappedPotentialValueAtom);
    const [ECPRange] = useAtom(electronicChemicalPotentialRangeAtom);
    const [, setBoundary] = useAtom(boundaryAtom);
    const { selectedRow } = useTable();

    useEffect(() => {
        if (selectedRow) {
            setECPValue(selectedRow?.optimalMappedPotential);
        }
    }, [selectedRow, setECPValue]);

    const handleMPVChange = (newECPValue: number) => {
        setECPValue(newECPValue);        
        setBoundary(null);
    };

    const handleNudgeChange = (boundary: Boundary) => {
        setECPValue(boundary.value);
        setBoundary(boundary);
    };

    return { ECPValue, handleNudgeChange, ECPRange, handleMPVChange };
};

export default useGraph;
