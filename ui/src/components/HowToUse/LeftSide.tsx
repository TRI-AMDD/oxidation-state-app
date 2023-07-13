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
                This table shows the most likely oxidation state assignments calculated by our tool.
            </Typography>
            <div className={styles.imageContainer}>
                <TableImage1 className={styles.image} />
                <ul className={styles.ul}>
                    <Typography component={'li'} variant="caption">
                        The table can be sorted <br />
                        by{' '}
                        <Typography component={'span'} color="primary" variant="caption">
                            different properties
                        </Typography>{' '}
                        of <br />
                        the assignments.
                    </Typography>
                </ul>
            </div>
            <ul className={styles.ul}>
                <Typography component={'li'} variant="caption">
                    Selecting a{' '}
                    <Typography component={'span'} color="primary" variant="caption">
                        row
                    </Typography>{' '}
                    on the left will automatically update set electronic chemical <br /> potential on the right to the
                    value that maximizes the likelihood of observing the <br /> selected set of oxidation states.
                </Typography>
            </ul>
        </div>
    );
};

export default LeftSide;
