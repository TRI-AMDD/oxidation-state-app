export interface FAQText {
    question: string;
    answer: string;
}

export const FAQs: FAQText[] = [
    {
        question: 'How can I cite the Oxidation State Analyzer?',
        //answer: 'If you would like to cite the oxidation state analyzer, please reference the following manuscript: PLACEHOLDER. You can directly export this reference to a citation manager by clicking on one of the following links: PLACEHOLDER'
        answer: 'We will update this section when the manuscript becomes available.'
    },
    {
        question: 'For what species can oxidation states be calculated?',
        answer: `Oxidation states can be calculated for all elements up to atomic number 96 other than He, Ar, Kr, Pm, Po, At, Rn, Fr, Ra, Ac, and Pa. Oxidation states can also be calculated for the following polyatomic species: AsO<sub>4</sub>, BO<sub>3</sub>, C<sub>2</sub>O<sub>4</sub>, CIO<sub>4</sub>, CN, CO, CrO<sub>4</sub>, GeO<sub>4</sub>, MoO<sub>4</sub>, NO<sub>2</sub>, NO<sub>3</sub>, P<sub>2</sub>O<sub>7</sub>, PO<sub>3</sub>, PO<sub>4</sub>, PS<sub>4</sub>, SeO<sub>3</sub>, SeO<sub>4</sub>, SiO<sub>4</sub>, SO<sub>2</sub>, SO<sub>3</sub>, SO<sub>4</sub>, and WO<sub>4</sub>. Representative structures of these polyatomic ions in xyz format can be downloaded <a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1r4btWx2-4LwJXVd64kuaWb5yr1oIJ8AI/view?usp=drive_link'>here</a>.`
    },
    {
        question: `Some possible combinations of oxidation states don't appear in the table. Why?`,
        answer: `We have not generated parameters for rare oxidation states, defined here as states that do not appear in at least 25 materials in out data set. The table also only displays combinations of oxidation states with maximum likelihoods of at least 0.005. If no combination passes this threshold, the most likely combination is shown. A table including less likely combinations of oxidation states can be generated by <a rel='noopener noreferrer' target='_blank' href='https://github.com/TRI-AMDD/oxidation-state-api-public'>downloading the library</a> and directly calling its API. The Oxidation State Analyzer also currently only allows one species to have more than one oxidation state in a single material.`
    },
    {
        question: 'Some oxidation states appear in the table, but not in the colored bars on the right. Why?',
        answer: 'The potential range for some oxidation states is too narrow to see in the plots on the right.'
    },
    {
        question: 'What is the ICSD-derived reduction potential (IRP), and what are its units?',
        answer: 'The oxidation state analyzer is trained from a data set of labeled oxidation states of known materials, which contains no information about energies or electronic chemical potentials. To approximately express the boundaries for the oxidation state ranges on a physical scale, we have created a linear map between boundary values and solution-phase data from the electrochemical series.  (More details of this process are available in our manuscript). We use this map to express the boundary values in terms of an ICSD-derived reduction potential (IRP) with units that approximate volts. We use the symbol "E" for this potential.'
    },
    {
        question: 'What is the likelihood score?',
        answer: 'The likelihood score is a number between 0 and 1 representing the estimated relative likelihood that a particular combination of oxidation states coexists in a stable material at a particular electronic chemical potential (or equivalently, at a particular ICSD-derived reduction potential).  More information is available in our manuscript. (We will update this section when the manuscript becomes available)'
    },
    {
        question: 'What is the optimal potential?',
        answer: 'The optimal potential, E<sub>opt</sub>, is the ICSD-derived reduction potential that maximizes the likelihood score.'
    },
    {
        question: 'What is the global instability index? (GII)',
        answer: `The <a rel='noopener noreferrer' target='_blank' href='https://doi.org/10.1016/0022-4596(92)90094-C'>global instability index</a> (GII) is the root-mean-squared difference between the oxidation states of each atom and the bond valence sum for that atom. The bond valence sum was calculated using the parameters published by <a rel='noopener noreferrer' target='_blank' href='https://doi.org/10.1021/ja00009a002'>O'Keeffe and Brese</a>.`
    },
    {
        question: 'Why is the global instability index (GII) sometimes "N/A"?',
        answer: `The global instability index can only be calculated if the structure is known, so it wil not be calculated if only the composition is provided. It will also only be calculated if bond valence parameters are availabe in <a rel='noopener noreferrer' target='_blank' href='https://doi.org/10.1021/ja00009a002'>this paper</a> for all elements in the material.`
    },
    {
        question: 'What file formats can I use to upload structures?',
        answer: 'We currently support the VASP POSCAR format and the Crystallographic Information Framework (CIF) format.'
    },
    {
        question: 'How are oxidation states assigned to sites in the structure?',
        answer: 'The oxidation states are assigned to sites in the unit cell of a structure in a way that minimizes the global instability index.  If multiple different assignments would result in nearly identical global instability indices, then a structure is generated with the average occupancies of all of these assignments. This can result in a structure with partially occupied sites.'
    },
    {
        question: 'Is the Oxidation State Analyzer available for offline use?',
        answer: `The library used to evaluate oxidation states is open source and available for offline use. A description of this library and installation instructions can be found <a rel='noopener noreferrer' target='_blank' href='https://github.com/TRI-AMDD/oxidation-state-api-public'>here</a>. API documentation is generated when the library is installed, and it can also be found <a rel='noopener noreferrer' target='_blank' href='https://javadoc.oxi.matr.io/'>online</a>.`
    },
    {
        question: 'Is there an API for the online application?',
        answer: `Yes. Documentation can be found <a rel='noopener noreferrer' target='_blank' href='https://oxi.matr.io/api_swagger'>here</a>. This API can be used to automate the analysis of oxidation states without installing the Java library. The returned JSON files have the same structure as the PageData class in the <a rel='noopener noreferrer' target='_blank' href='https://github.com/TRI-AMDD/oxidation-state-api-public'>Java library</a> (see <a rel='noopener noreferrer' target='_blank' href='https://javadoc.oxi.matr.io/'>Javadoc</a> for details).`
    },
    {
        question: 'Can I download all of the oxidation state ranges?',
        answer: `The oxidation state ranges for all available species can be downloaded in JSON format <a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1H7QbZsTD101VHunfPucHzaYAeRdjl4hs/view?usp=drive_link'>here</a>. The units are the same as those used on this web site.`
    }
];
