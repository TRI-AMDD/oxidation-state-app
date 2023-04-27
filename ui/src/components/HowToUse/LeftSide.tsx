import { Typography } from '@mui/material';
import styles from './HowToUse.module.css';
import { ReactComponent as TableImage1 } from 'Assets/Images/tableImage1.svg';

const LeftSide = () => {
    return (
        <div className={styles.leftSide}>
            <Typography component={'div'} variant="h6" color="primary">
                Oxidation States
            </Typography>
            <TableImage1 className={styles.image} />
            <Typography component={'div'} variant="caption">
                This table shows the most likely oxidation state assignments <br /> calculated by our tool.
            </Typography>
            <ul className={styles.ul}>
                <Typography component={'li'} variant="caption">
                    Sortable by{' '}
                    <Typography component={'span'} color="primary" variant="caption">
                        four different properties
                    </Typography>{' '}
                    of the assignments.
                </Typography>
                <Typography component={'li'} variant="caption">
                    Clicking on an{' '}
                    <Typography component={'span'} color="secondary" variant="caption">
                        assignment
                    </Typography>{' '}
                    will automatically set the <br />
                    electronic chemical potential on the right to the optimal value <br />
                    for that assignment.
                </Typography>
            </ul>
        </div>
    );
};

export default LeftSide;
