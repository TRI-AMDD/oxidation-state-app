import { Typography } from '@mui/material';
import styles from './HowToUse.module.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

const HowToUse = () => {
    return (
        <div className={styles.container}>
            <Typography component={'div'} variant="h5" className={styles.howToTitle}>
                How to use our tool:
            </Typography>
            <div className={styles.howToCard}>
                <LeftSide />
                <CompareArrowsOutlinedIcon fontSize="large" className={styles.compareIcon} />
                <RightSide />
            </div>
        </div>
    );
};

export default HowToUse;
