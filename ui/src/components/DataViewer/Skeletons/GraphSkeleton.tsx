import { Skeleton } from '@mui/material';
import { SkeletonProps } from './SkeletonProps';

const GraphSkeleton = ({ isAnimated }: SkeletonProps) => {
    return <Skeleton animation={isAnimated} variant="rectangular" width={507} height={214} />;
};

export default GraphSkeleton;
