import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import styles from './Tutorial.module.css';
import { ReactComponent as TutorialImage } from '@/Assets/Images/tutorialImage.svg';

const Tutorial = () => {
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
                    Tutorial
                </Typography>
                <div className={styles.body}>
                    <Typography component={'div'} variant="h6" sx={{ marginBottom: '16px' }}>
                        Background
                    </Typography>
                    <Typography component={'div'} variant="body2">
                        Chemists and materials scientists often use the concept of “oxidation states” to understand
                        molecular or materials chemistry. The idea is that when two or more atoms combine to form a
                        compound, some atoms effectively transfer electrons to other atoms. For example, when magnesium
                        (Mg) and oxygen (O) combine to form magnesium oxide (MgO), each magnesium atom effectively gives
                        two of its electrons to the oxygen atoms. This leaves each oxygen atom with two extra electrons,
                        or in a “-2” oxidation state. (Each electron has -1 charge.) The magnesium atom has given up two
                        electrons, so it is in a “+2” oxidation state. Each element is commonly found in a limited set
                        of oxidation states. For example, oxygen usually has an oxidation state of “-2”, sometimes “-1”,
                        and never “+3”. Aluminum usually has an oxidation state of “+3” but never “-2”. Researchers can
                        use this knowledge to understand and predict chemical reactions and material properties.
                    </Typography>
                    <Typography component={'div'} variant="h6" sx={{ marginBottom: '16px', marginTop: '40px' }}>
                        Oxidation state analysis
                    </Typography>
                    <Typography component={'div'} variant="body2">
                        The oxidation state analyzer can be used to rapidly determine the oxidation states of a
                        material, based on the principle that the most likely oxidation state of an atom depends on the
                        electronic chemical potential of the atomic environment. Lower electronic chemical potentials
                        make it more energetically favorable for atoms to give up electrons, increasing their oxidation
                        states (oxidation). Higher electronic chemical potentials make it more energetically favorable
                        for atoms to accept additional electrons, reducing their oxidation states (reduction).
                        <br />
                        <br />
                        For example, a plot of the oxidation states of a hypothetical atom as a function of the local
                        electronic chemical potential is provided below. Here we use the negative of the electronic
                        chemical potential as the x-axis, so that the oxidation states increase from left to right. At
                        the more reducing electronic chemical potentials, the atom can be expected to be found in a +2
                        oxidation state. As the electronic chemical potential becomes more oxidizing, at some point it
                        becomes favorable for the atom to have a +3 oxidation state. As the electronic chemical
                        potential becomes even more oxidizing, at some point the +4 oxidation state is favored.
                    </Typography>
                    <div className={styles.imageContainer}>
                        <TutorialImage />
                    </div>
                    <Typography component={'div'} variant="body2" sx={{ marginBottom: '64px;' }}>
                        Using the above analysis, we can plot the likelihood that an element is found in a +3 oxidation
                        state as a function of the electronic chemical potential: The likelihood is 0 to the left of the
                        boundary between +2 and +3 oxidation states, then it reaches 1 in the shaded region, and then
                        drops down back to zero to the right of the boundary between the 3+ and 4+ oxidation states.
                    </Typography>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Tutorial;
