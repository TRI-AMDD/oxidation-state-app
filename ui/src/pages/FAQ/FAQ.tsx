import PageWrapper from '@/components/PageWrapper/PageWrapper';
import styles from './FAQ.module.css';
import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Button, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { FAQs } from '@/utils/FAQUtil/FAQText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const FAQ = () => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [expandAll, setExpandAll] = useState<boolean>(false);

    const allAccordians = FAQs.map((_value, index) => `panel${index}`);

    const handleAccordianChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        if (isExpanded && !expanded.includes(panel)) {
            setExpanded([...expanded, panel]);
        } else {
            if (expanded.includes(panel)) {
                const tempArr = [...expanded];
                const index = tempArr.indexOf(panel);
                tempArr.splice(index, 1);
                setExpanded(tempArr);
            }
        }
    };

    const expandButtonLabel = expandAll ? 'Collapse All' : 'Expand All';

    const handleExpandAllClick = () => {
        if (expandAll) {
            setExpanded([]);
            setExpandAll(false);
        } else {
            setExpanded(allAccordians);
            setExpandAll(true);
        }
    };

    return (
        <PageWrapper>
            <Breadcrumbs className={styles.breadcrumbs}>
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link color="text.primary">FAQ</Link>
            </Breadcrumbs>
            <div className={styles.pageContainer}>
                <Typography component={'div'} variant="h4">
                    Frequently Asked Questions
                </Typography>
                <div className={styles.innerContainer}>
                    <div className={styles.expandAllButtonContainer}>
                        <Button
                            endIcon={expandAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            onClick={handleExpandAllClick}
                            variant="text"
                        >
                            {expandButtonLabel}
                        </Button>
                    </div>
                    <div className={styles.accordiansContainer}>
                        {FAQs.map((value, index) => {
                            const panelName = `panel${index}`;
                            return (
                                <Accordion
                                    expanded={expanded.includes(panelName)}
                                    onChange={handleAccordianChange(panelName)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`${panelName}-content`}
                                        id={`${panelName}-header`}
                                    >
                                        <Typography component={'div'} variant="body1">
                                            {value.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            component={'div'}
                                            variant="body1"
                                            dangerouslySetInnerHTML={{ __html: value.answer }}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default FAQ;
