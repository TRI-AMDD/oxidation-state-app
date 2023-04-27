import { Typography } from '@mui/material';
import styles from './HowToUse.module.css';
import { ReactComponent as TableImage2 } from 'Assets/Images/TableImage2.svg';

const RightSide = () => {
    return (
        <div className={styles.rightSide}>
            <Typography component={'div'} variant="h6" color="secondary">
                Oxidation State Ranges
            </Typography>
            <TableImage2 className={styles.image} />
            <Typography component={'div'} variant="caption">
                The colored plots show the ranges of the electronic <br />
                chemical potential at which different oxidation states are <br />
                likely to be observed.
            </Typography>
            <ul className={styles.ul}>
                <Typography component={'li'} variant="caption">
                    Moving the vertical line left to right adjusts the electronic <br />
                    chemical potential and updates the likelihoods in the table <br /> on the left
                </Typography>
            </ul>
        </div>
    );
};

export default RightSide;
