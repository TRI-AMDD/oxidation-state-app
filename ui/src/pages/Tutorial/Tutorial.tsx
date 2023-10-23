import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useEffect } from 'react';
import styles from './Tutorial.module.css';
import Tutorial1Image from '@/Assets/Images/tutorial_image_1.png';
import Tutorial2Image from '@/Assets/Images/tutorial_image_2.png';
import Tutorial3Image from '@/Assets/Images/tutorial_image_3.png';
import Tutorial4Image from '@/Assets/Images/tutorial_image_4.png';
import Tutorial5Image from '@/Assets/Images/tutorial_image_5.png';
import Tutorial6Image from '@/Assets/Images/tutorial_image_6.png';
import Tutorial7Image from '@/Assets/Images/tutorial_image_7.png';
import Tutorial8Image from '@/Assets/Images/tutorial_image_8.png';
import Tutorial9Image from '@/Assets/Images/tutorial_image_9.png';
import Tutorial10Image from '@/Assets/Images/tutorial_image_10.png';
import {
    listText,
    text1,
    text10,
    text11,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
    text8,
    text9,
    text12,
    text13,
    text14,
    text15,
    text16,
    text17,
    text18
} from './constants';

const URL_TUTORIAL_STRING_MATCH = 'tutorial-';

const Tutorial = () => {
    useEffect(() => {
        document.title = 'Oxidation State Analyzer - Tutorial';

        const currentUrl = window.location.href;
        const lastIndexOf = currentUrl.lastIndexOf(URL_TUTORIAL_STRING_MATCH);
        const indexOfId = lastIndexOf + URL_TUTORIAL_STRING_MATCH.length;
        if (lastIndexOf !== -1) {
            const idString = currentUrl.slice(indexOfId);
            if (idString.length > 0) {
                document.getElementById(URL_TUTORIAL_STRING_MATCH + idString)?.scrollIntoView();
            }
        }
    }, []);

    return (
        <PageWrapper>
            <Breadcrumbs className={styles.breadcrumbs}>
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link color="text.primary">Tutorial</Link>
            </Breadcrumbs>
            <div className={styles.pageContainer}>
                <Typography component={'div'} variant="h4">
                    Tutorial
                </Typography>
                <div className={styles.body}>
                    <Typography component={'div'} variant="h6" sx={{ marginBottom: '16px' }}>
                        Background
                    </Typography>
                    <Typography component={'div'} variant="body2">
                        {text1}
                    </Typography>
                    <Typography component={'div'} variant="h6" sx={{ marginBottom: '16px', marginTop: '40px' }}>
                        Oxidation state analysis
                    </Typography>
                    <Typography component={'div'} variant="body2">
                        {text2}
                        <br />
                        <br />
                        {text3}
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial1Image} alt="first-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        <div dangerouslySetInnerHTML={{ __html: text4 }} />
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial2Image} alt="second-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        {text5}
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial3Image} alt="third-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        {text6}
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial4Image} alt="fourth-tutorial-image" />
                    </div>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial5Image} alt="fifth-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        {text7}
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial6Image} alt="sixth-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        {text8}
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial7Image} alt="seventh-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        {text9}
                        <ol>
                            {listText.map((item) => {
                                return <li key={item.key}>{item.text}</li>;
                            })}
                        </ol>
                        <br />
                        {text10}
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial8Image} alt="eighth-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        <div dangerouslySetInnerHTML={{ __html: text11 }} />
                    </Typography>
                    <Typography
                        component={'div'}
                        variant="body2"
                        sx={{ marginBottom: '16px', marginTop: '40px', fontWeight: 'bold' }}
                    >
                        1. A<sup>2+</sup> 2X<sup>1-</sup>
                    </Typography>
                    <Typography component={'div'} variant="body2" dangerouslySetInnerHTML={{ __html: text12 }} />
                    <div className={styles.imageContainer}>
                        <img src={Tutorial9Image} alt="ninth-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2" dangerouslySetInnerHTML={{ __html: text13 }} />
                    <Typography
                        component={'div'}
                        variant="body2"
                        sx={{ marginBottom: '16px', marginTop: '40px', fontWeight: 'bold' }}
                    >
                        2. A<sup>4+</sup> 2X<sup>2-</sup>
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial10Image} alt="tenth-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        <div dangerouslySetInnerHTML={{ __html: text14 }} />
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: text15 }} id={`tutorial-text-15`} />
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: text16 }} />
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: text17 }} />
                    </Typography>
                    <Typography
                        component={'div'}
                        variant="h6"
                        sx={{ marginBottom: '16px', marginTop: '40px' }}
                        id="tutorial-polyatomic-ions"
                    >
                        Polyatomic Ions
                    </Typography>
                    <Typography component={'div'} variant="body2" sx={{ marginBottom: '24px;' }}>
                        <div dangerouslySetInnerHTML={{ __html: text18 }} />
                    </Typography>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Tutorial;
