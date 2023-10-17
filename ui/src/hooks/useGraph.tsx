import { boundaryAtom, electronicMappedPotentialValueAtom } from '@/atoms/atoms';
import { Boundary } from '@/features/data-table/table-models/data-viewer-model';
import { useAtom } from 'jotai';

const useGraph = () => {
    const [ECPValue, setECPValue] = useAtom(electronicMappedPotentialValueAtom);

    const [, setBoundary] = useAtom(boundaryAtom);

    const handleMPVChange = (newECPValue: number) => {
        setECPValue(newECPValue);
        setBoundary(null);
    };

    const handleNudgeChange = (boundary: Boundary) => {
        setECPValue(boundary.value);
        setBoundary(boundary);
    };

    return { ECPValue, handleNudgeChange, handleMPVChange };
};

export default useGraph;
