import { Skeleton } from '@mui/material';
import { SkeletonProps } from './SkeletonProps';

const ColumnSkeleton = ({ className, isAnimated }: SkeletonProps) => {
    return (
        <div className={className}>
            <Skeleton
                animation={isAnimated}
                variant="rectangular"
                width={81}
                height={23}
                sx={{ marginBottom: '16px' }}
            />
            <Skeleton
                animation={isAnimated}
                variant="rectangular"
                width={81}
                height={12}
                sx={{ marginBottom: '16px' }}
            />
            <Skeleton
                animation={isAnimated}
                variant="rectangular"
                width={81}
                height={12}
                sx={{ marginBottom: '16px' }}
            />
            <Skeleton
                animation={isAnimated}
                variant="rectangular"
                width={81}
                height={12}
                sx={{ marginBottom: '16px' }}
            />
            <Skeleton
                animation={isAnimated}
                variant="rectangular"
                width={81}
                height={12}
                sx={{ marginBottom: '16px' }}
            />
            <Skeleton
                animation={isAnimated}
                variant="rectangular"
                width={81}
                height={12}
                sx={{ marginBottom: '16px' }}
            />
            <Skeleton
                animation={isAnimated}
                variant="rectangular"
                width={81}
                height={12}
                sx={{ marginBottom: '16px' }}
            />
            <Skeleton animation={isAnimated} variant="rectangular" width={81} height={12} />
        </div>
    );
};

export default ColumnSkeleton;
