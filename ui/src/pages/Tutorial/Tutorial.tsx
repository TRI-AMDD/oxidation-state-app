import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import styles from './Tutorial.module.css';
import { ReactComponent as Tutorial1Image } from '@/Assets/Images/tutorial1Image.svg';
import Tutorial2Image from '@/Assets/Images/tutorial2Image.png';
import Tutorial3Image from '@/Assets/Images/tutorial3Image.png';
import Tutorial4Image from '@/Assets/Images/tutorial4Image.png';
import Tutorial5Image from '@/Assets/Images/tutorial5Image.png';
import Tutorial6Image from '@/Assets/Images/tutorial6Image.png';
import Tutorial7Image from '@/Assets/Images/tutorial7Image.png';
import Tutorial8Image from '@/Assets/Images/tutorial8Image.png';
import Tutorial9Image from '@/Assets/Images/tutorial9Image.png';
import Tutorial10Image from '@/Assets/Images/tutorial10Image.png';
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

const Tutorial = () => {
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
                        <Tutorial1Image />
                    </div>
                    <Typography component={'div'} variant="body2">
                        {text4}
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
                        {text11}
                    </Typography>
                    <Typography component={'div'} variant="h6" sx={{ marginBottom: '16px', marginTop: '40px' }}>
                        A<sup>2+</sup> 2X<sup>1-</sup>
                    </Typography>
                    <Typography component={'div'} variant="body2" dangerouslySetInnerHTML={{ __html: text12 }} />
                    <div className={styles.imageContainer}>
                        <img src={Tutorial9Image} alt="ninth-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2" dangerouslySetInnerHTML={{ __html: text13 }} />
                    <Typography component={'div'} variant="h6" sx={{ marginBottom: '16px', marginTop: '40px' }}>
                        A<sup>4+</sup> 2X<sup>2-</sup>
                    </Typography>
                    <div className={styles.imageContainer}>
                        <img src={Tutorial10Image} alt="tenth-tutorial-image" />
                    </div>
                    <Typography component={'div'} variant="body2">
                        <div dangerouslySetInnerHTML={{ __html: text14 }} />
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: text15 }} />
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: text16 }} />
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: text17 }} />
                    </Typography>
                    <Typography component={'div'} variant="h6" sx={{ marginBottom: '16px', marginTop: '40px' }}>
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
