export const text1 = `Chemists and materials scientists often use the concept of “oxidation states” to understand
molecular or materials chemistry. The idea is that when two or more atoms combine to form a
compound, some atoms effectively transfer electrons to other atoms. For example, when magnesium
(Mg) and oxygen (O) combine to form magnesium oxide (MgO), each magnesium atom effectively gives
two of its electrons to the oxygen atoms. This leaves each oxygen atom with two extra electrons,
or in a “-2” oxidation state. (Each electron has -1 charge.) The magnesium atom has given up two
electrons, so it is in a “+2” oxidation state. Each element is commonly found in a limited set
of oxidation states. For example, oxygen usually has an oxidation state of “-2”, sometimes “-1”,
and never “+3”. Aluminum usually has an oxidation state of “+3” but never “-2”. Researchers can
use this knowledge to understand and predict chemical reactions and material properties.`;

export const text2 = `The oxidation state analyzer can be used to rapidly determine the oxidation states of a
material, based on the principle that the most likely oxidation state of an atom depends on the
electronic chemical potential of the atomic environment. Lower electronic chemical potentials
make it more energetically favorable for atoms to give up electrons, increasing their oxidation
states (oxidation). Higher electronic chemical potentials make it more energetically favorable
for atoms to accept additional electrons, reducing their oxidation states (reduction).`;

export const text3 = `For example, a plot of the oxidation states of a hypothetical atom as a function of the local
electronic chemical potential is provided below. Here we use the negative of the electronic
chemical potential as the x-axis, so that the oxidation states increase from left to right. At
the more reducing electronic chemical potentials, the atom can be expected to be found in a +2
oxidation state. As the electronic chemical potential becomes more oxidizing, at some point it
becomes favorable for the atom to have a +3 oxidation state. As the electronic chemical
potential becomes even more oxidizing, at some point the +4 oxidation state is favored.`;

export const text4 = `Using the above analysis, we can plot the likelihood that an element is found in a +3 oxidation
state as a function of the electronic chemical potential: The likelihood is 0 to the left of the
boundary between +2 and +3 oxidation states, then it reaches 1 in the shaded region, and then
drops down back to zero to the right of the boundary between the 3+ and 4+ oxidation states.`;

export const text5 = `In practice, the boundaries at which the atom transitions from a +2 to +3 oxidation state, or from a +3 to +4 oxidation state, will depend on the local atomic structure around the atom.  We account for this uncertainty in the boundary position by replacing the sharp cutoff at each boundary with a smooth boundary with the shape of a logistic function:`;

export const text6 = `We can create similar likelihood functions for the +2 and +4 oxidation states:`;

export const text7 = `We combine the information in the above three plots into bar plots like the one below to illustrate the ranges of all of the likelihood functions for a single element:`;

export const text8 = `The boundaries that mark the transitions between oxidation states will be different for each element.  For example, an element that is typically an anion might have the following oxidation state ranges:`;

export const text9 = `To identify the most likely oxidation states of a material as a function of composition, we use bar plots like the ones above along with the following two constraints:`;

export const listText = [
    {
        key: 0,
        text: 'In a single material, each element should experience nearly the same electronic chemical potential.'
    },
    {
        key: 1,
        text: `The total number of electrons in the material should be conserved; i.e. the sum of all oxidation states in the material should be zero.  We say such a material is “charge-balanced” or “charge-neutral”.`
    }
];

export const text10 = `For example, let the two plots above represent hypothetical elements “A” and “X”, respectively.`;

export const text11 = `Consider a material with composition AX2.  We will consider two possible ways to assign oxidation states to the A and X atoms while maintaining charge neutrality:`;

export const text12 = `(A<sup>2+</sup> is standard notation indicating that A is in a +2 oxidation state.)  The likelihood functions for these oxidation states are below. `;

export const text13 = `These oxidation states maintain charge neutrality, but there is no single electronic chemical potential at which both A<sup>2+</sup> and X<sup>1-</sup> are likely to be observed.  Thus it is highly unlikely that a material with composition AX<sub>2</sub> would have these oxidation states.`;

export const text14 = `These oxidation states also maintain charge neutrality, and there is a single electronic chemical potential (dashed red line) at which both A<sup>2+</sup> and X<sup>1-</sup> are likely to be observed.  Thus a material with composition AX<sub>2</sub> will most likely have these oxidation states.`;

export const text15 = `We can generalize the above analysis to determine the most likely set of charge-neutral oxidation states for any composition. Let L<sub>S</sub>(μ) be the likelihood that oxidation state S is stable at electronic chemical potential μ, We can then calculate the likelihood function, L(μ), for any charge-neutral combination of oxidation states by simply taking the product of L<sub>S</sub>(μ) for all oxidation states in the set.  There will be one value of μ that maximizes L(μ), and we call this value μ<sub>opt</sub>. The μ<sub>opt</sub> value is indicated by the dashed red line in the above plot.  The most likely combination of oxidation states is then the one that has the maximum value of L(μ<sub>opt</sub>).`;

export const text16 = `To apply this approach, it is necessary to have good estimates for the width of the logistic function (i.e. the amount of uncertainty) for each boundary between oxidation states and for the locations of the boundaries. Here we have used the approximation that the logistic functions all have the same width and determined the boundary locations through machine learning.  Specifically, we collected a set of over 50,000 materials with labeled oxidation states from the <a rel='noopener noreferrer' target='_blank' href='https://icsd.products.fiz-karlsruhe.de/'>Inorganic Crystal Structure Database</a> (ICSD), and then we found the boundary values that maximized the geometric mean likelihood of observing the labeled oxidation states.  To prevent the minimum and maximum boundary values from diverging to positive or negative infinity, we regularized the fit by applying a slight penalty proportional to the difference between the maximum and minimum boundary values for each oxidation state.`;

export const text17 = `The boundary values discovered by our machine learning algorithm do not have any physical units; we only know that they should change monotonically with the electronic chemical potential.  Although this relationship does not necessarily have to be linear, a comparison between the boundary values we calculate and the standard reduction potentials for ions in solution reveals a roughly linear trend. To facilitate the interpretation of the oxidation state range data, we have used this fit to linearly scale the boundary values so that they are expressed in units roughly corresponding to volts.  Accordingly, on the web site we use the “fitted potential”, E, and the “optimal fitted potential”, E<sub>opt</sub>, in place of μ and μ<sub>opt</sub> respectively.
`;

export const text18 = `Polyatomic ions are ions that contain more than one atom. Such ions can have their own oxidation state ranges that are significantly different from the ranges of the individual atoms.  For example, S<sup>6+</sup> is stable in much more reducing conditions when in a (SO<sub>4</sub>)<sup>2-</sup> ion than when in a single sulfur ion.  We have calculated oxidation state ranges for 23 of the most common polyatomic ions:  AsO<sub>4</sub>, BO<sub>3</sub>, C<sub>2</sub>O<sub>4</sub>, CIO<sub>4</sub>, CN, CO, CrO<sub>4</sub>, GeO<sub>4</sub>, MoO<sub>4</sub>, NO<sub>2</sub>, NO<sub>3</sub>, P<sub>2</sub>O<sub>7</sub>, PO<sub>3</sub>, PO<sub>4</sub>, PS<sub>4</sub>, SeO<sub>3</sub>, SeO<sub>4</sub>, SiO<sub>4</sub>, SO<sub>2</sub>, SO<sub>3</sub>, SO<sub>4</sub>, and WO<sub>4</sub>. These will be auto-detected if contained in an uploaded structure. If you want to specify a polyatomic ion in a composition, surround the ion type from the above list with parenthesis.  E.g. (SO<sub>4</sub>).`;
