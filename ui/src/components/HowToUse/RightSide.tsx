import { Typography } from '@mui/material';
import styles from './HowToUse.module.css';
import { ReactComponent as TableImage2 } from '@/Assets/Images/TableImage2.svg';

const RightSide = () => {
    return (
        <div className={styles.rightSide}>
            <Typography component={'div'} variant="h6">
                Oxidation State Ranges
            </Typography>
            <Typography component={'div'} variant="caption">
                The colored plots show the ranges of the ICSD-derived reduction potential (IRP) at which <br />{' '}
                different oxidation states are likely to be observed.
            </Typography>
            <div className={styles.imageContainer}>
                <TableImage2 className={styles.image} />

                <ul className={styles.ul}>
                    <Typography component={'li'} variant="caption">
                        Moving the vertical line horizontally <br /> changes the IRP <br />
                        and{' '}
                        <Typography component={'span'} color="primary" variant="caption">
                            updates the L(E) column in <br /> the table{' '}
                        </Typography>
                        on the left
                    </Typography>
                </ul>
            </div>

            <ul className={styles.ul}>
                <Typography component={'li'} variant="caption">
                    The IRP can also be entered in the text box below the <br /> graph,{' '}
                    <Typography component={'span'} color="primary" variant="caption">
                        updating the location of the vertical line
                    </Typography>
                    in the graph and{' '}
                    <Typography component={'span'} color="primary" variant="caption">
                        the L(E) <br /> column in the table.
                    </Typography>
                </Typography>
            </ul>
        </div>
    );
};

export default RightSide;
