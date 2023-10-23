import { Accordion, AccordionDetails, AccordionSummary, Link, Typography } from '@mui/material';
import styles from './HowToUse.module.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';

const HowToUse = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAccordianChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
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
                        How to use the Oxidation State Analyzer:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component={'div'} className={styles.helperLinks}>
                        A more detailed explanation of this tool is provided in the{' '}
                        <Link component={RouterLink} to="/tutorial" rel="noopener noreferrer" target="_blank">
                            Tutorial
                        </Link>
                        , and additional information is provided in the{' '}
                        <Link component={RouterLink} to="/faq" rel="noopener noreferrer" target="_blank">
                            FAQ
                        </Link>
                        .
                    </Typography>
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
