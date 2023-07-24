import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import styles from './HowToUse.module.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HowToUse = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAccordianChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setIsOpen(isExpanded);
    };
    return (
        <div className={styles.container}>
            <Accordion
                expanded={isOpen}
                onChange={handleAccordianChange}
                sx={{ background: 'none', boxShadow: 'none' }}
            >
                <AccordionSummary id="howToUse-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography component={'div'} variant="h6" className={styles.howToTitle}>
                        How to use our tool:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.howToCard}>
                        <LeftSide />
                        <div className={styles.compareIcon}>
                            <CompareArrowsOutlinedIcon fontSize="large" />
                        </div>
                        <RightSide />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default HowToUse;
