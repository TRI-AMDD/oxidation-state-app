import PageWrapper from '@/components/PageWrapper/PageWrapper';
import styles from './FAQ.module.css';
import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Button, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FAQ_ITEMS, URL_FAQ_STRING_MATCH } from './faq-util/faq-text';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useLocation } from 'react-router-dom';

export function FAQ() {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [expandAll, setExpandAll] = useState<boolean>(false);

    const allAccordians = FAQ_ITEMS.map((_value, index) => `panel${index}`);

    const location = useLocation();

    useEffect(() => {
        document.title = 'Oxidation State Analyzer - FAQ';

        const currentUrl = window.location.href;
        const lastIndexOf = currentUrl.lastIndexOf(URL_FAQ_STRING_MATCH);
        const indexOfNumber = lastIndexOf + URL_FAQ_STRING_MATCH.length;
        if (indexOfNumber !== -1) {
            const panelNumberString = currentUrl.slice(indexOfNumber);
            const panelNumber = Number.parseInt(panelNumberString);
            if (!Number.isNaN(panelNumber) && panelNumber >= 0 && panelNumber < FAQ_ITEMS.length) {
                document.getElementById(`faq-${panelNumber}`)?.scrollIntoView({ block: 'center' });
                setExpanded([`panel${panelNumber}`]);
            }
        }
    }, [location]);

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
                        {FAQ_ITEMS.map((value, index) => {
                            const panelName = `panel${index}`;
                            return (
                                <Accordion
                                    expanded={expanded.includes(panelName)}
                                    onChange={handleAccordianChange(panelName)}
                                    id={`faq-${index}`}
                                    key={`faq-${index}`}
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
}
