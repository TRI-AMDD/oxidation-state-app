import { Typography } from '@mui/material';
import styles from './HowToUse.module.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

const HowToUse = () => {
    return (
        <div className={styles.container}>
            <Typography component={'div'} variant="h6" className={styles.howToTitle}>
                How to use our tool:
            </Typography>
            <div className={styles.howToCard}>
                <LeftSide />
                <div className={styles.compareIcon}>
                    <CompareArrowsOutlinedIcon fontSize="large" />
                </div>
                <RightSide />
            </div>
        </div>
    );
};

export default HowToUse;
