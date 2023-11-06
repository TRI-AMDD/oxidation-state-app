import { Typography } from '@mui/material';
import styles from './HowToUse.module.css';
import { ReactComponent as TableImage1 } from '@/Assets/Images/tableImage1.svg';

const LeftSide = () => {
    return (
        <div className={styles.leftSide}>
            <Typography component={'div'} variant="h6">
                Oxidation States
            </Typography>
            <Typography component={'div'} variant="caption">
                This table shows the most likely oxidation state assignments for the given structure or composition.
            </Typography>
            <div className={styles.imageContainer}>
                <TableImage1 className={styles.image} />
                <ul className={styles.ul}>
                    <Typography component={'li'} variant="caption">
                        The table can be sorted <br />
                        by different properties of <br />
                        the assignments.
                    </Typography>
                </ul>
            </div>
            <ul className={styles.ul}>
                <Typography component={'li'} variant="caption">
                    Selecting a row on the left will automatically set the ICSD-derived reduction <br /> potential on
                    the right to the value that maximizes the likelihood score of the <br /> selected set of oxidation
                    states.
                </Typography>
            </ul>
        </div>
    );
};

export default LeftSide;
