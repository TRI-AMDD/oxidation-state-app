import { Skeleton } from '@mui/material';
import { SkeletonProps } from './SkeletonProps';

const TitleSkeleton = ({ isAnimated }: SkeletonProps) => {
    return (
        <Skeleton
            animation={isAnimated}
            variant="rectangular"
            width={283}
            height={23}
            sx={{ margin: '43px 0 30px 0' }}
        />
    );
};

export default TitleSkeleton;
