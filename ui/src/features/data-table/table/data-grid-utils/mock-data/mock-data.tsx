import { OxidationStatesAPI, OxidationStatesTableItem } from '@/features/data-table/table-models/data-viewer-model';
import { parseAPITableData, parseOxidationData } from '../oxidation-state-formatter';
const LiMn2O4Payload: OxidationStatesAPI = {
    tableData: {
        tableRows: [
            {
                optimalLikelihood: 0.24986682338501875,
                globalInstabilityIndex: 'NaN',
                mixedValence: true,
                counts: [1.0, 1.0, 1.0, 4.0],
                cifstring: null,
                oxidationStates: [1, 3, 4, -2],
                optimalMappedPotential: 0.6624184346336293,
                symbols: ['Li', 'Mn', 'Mn', 'O'],
                boundaryPairs: [
                    [-16.973591418866732, 18.52990701983895],
                    [3.868369425692821, 6.527383523638193],
                    [6.527383523638193, 10.105078221731805],
                    [-17.393909848682924, 14.075423435770237]
                ]
            },
            {
                optimalLikelihood: 0.04377558549403938,
                globalInstabilityIndex: 'NaN',
                mixedValence: true,
                counts: [1.0, 0.5, 1.5, 4.0],
                cifstring: null,
                oxidationStates: [1, 2, 4, -2],
                optimalMappedPotential: 0.3970189446973529,
                symbols: ['Li', 'Mn', 'Mn', 'O'],
                boundaryPairs: [
                    [-16.973591418866732, 18.52990701983895],
                    [-15.805536851282808, 3.868369425692821],
                    [6.527383523638193, 10.105078221731805],
                    [-17.393909848682924, 14.075423435770237]
                ]
            },
            {
                optimalLikelihood: 0.02044546576867927,
                globalInstabilityIndex: 'NaN',
                mixedValence: true,
                counts: [1.0, 1.5, 0.5, 4.0],
                cifstring: null,
                oxidationStates: [1, 3, 5, -2],
                optimalMappedPotential: 1.0173415387640796,
                symbols: ['Li', 'Mn', 'Mn', 'O'],
                boundaryPairs: [
                    [-16.973591418866732, 18.52990701983895],
                    [3.868369425692821, 6.527383523638193],
                    [10.105078221731805, 10.105078222113512],
                    [-17.393909848682924, 14.075423435770237]
                ]
            },
            {
                optimalLikelihood: 0.02044546576198057,
                globalInstabilityIndex: 'NaN',
                mixedValence: true,
                counts: [1.0, 1.75, 0.25, 4.0],
                cifstring: null,
                oxidationStates: [1, 3, 7, -2],
                optimalMappedPotential: 1.0173415388021967,
                symbols: ['Li', 'Mn', 'Mn', 'O'],
                boundaryPairs: [
                    [-16.973591418866732, 18.52990701983895],
                    [3.868369425692821, 6.527383523638193],
                    [10.105078222113512, 13.790884338442877],
                    [-17.393909848682924, 14.075423435770237]
                ]
            }
        ]
    },
    composition: 'LiMn2O4',
    oxidationStateRangeData: [
        { oxidationStates: [1], ionTypeSymbol: 'Li', rangeBoundaries: [-4.030947564664589, 3.059756522132119] },
        {
            oxidationStates: [2, 3, 4, 5, 7],
            ionTypeSymbol: 'Mn',
            rangeBoundaries: [
                -3.797665503453981, 0.1315767902948093, 0.6626309950994969, 1.377162675995114, 1.3771626760713478,
                2.1132862030898787
            ]
        },
        {
            oxidationStates: [-2, -1],
            ionTypeSymbol: 'O',
            rangeBoundaries: [-4.114892914816463, 2.170113913850715, 4.015252157854681]
        }
    ],
    messages: [],
    minBoundaryValue: -4.481096377933891,
    maxBoundaryValue: 4.015252157854681,
    potentialMapper: { slope: 0.199718461521146, intercept: -0.641008 }
};

const fileUploadPayload = {
    tableData: {
        tableRows: [
            {
                optimalLikelihood: 0.9995764869349357,
                globalInstabilityIndex: 0.6787268823996284,
                mixedValence: false,
                counts: [16.0, 4.0, 4.0, 4.0],
                cifstring:
                    "data_H4Na1O5P1\n_description 'H16 Na4 O20 P4'\n_chemical_formula_sum 'H16 Na4 O20 P4'\n_chemical_formula_weight 44.0\n_cell_formula_units_Z 4\n_cell_length_a 7.616\n_cell_length_b 7.899\n_cell_length_c 7.382\n_cell_angle_alpha 90.0\n_cell_angle_beta 90.0\n_cell_angle_gamma 90.0\n_cell_volume 444.092143488\n_symmetry_space_group_name_H-M 'P 1'\nloop_\n_symmetry_equiv_pos_as_xyz\nx,y,z \n\nloop_\n_atom_site_type_symbol\n_atom_site_label\n_atom_site_fract_x\n_atom_site_fract_y\n_atom_site_fract_z\n_atom_site_occupancy\nNa1+ Na1 0.4993 0.5179 0.4857 1.0 \nNa1+ Na2 0.5007 0.48210000000000003 0.9857 1.0 \nNa1+ Na3 7.0E-4 0.0179 0.9857 1.0 \nNa1+ Na4 0.9993000000000001 0.9821000000000001 0.4857 1.0 \nP5+ P1 0.6262 0.1268 0.25 1.0 \nP5+ P2 0.3738 0.8732000000000001 0.75 1.0 \nP5+ P3 0.8738 0.6268 0.75 1.0 \nP5+ P4 0.1262 0.37320000000000003 0.25 1.0 \nH1+ H1 0.755 0.33 0.32 1.0 \nH1+ H2 0.245 0.67 0.8200000000000001 1.0 \nH1+ H3 0.745 0.8300000000000001 0.8200000000000001 1.0 \nH1+ H4 0.255 0.17 0.32 1.0 \nH1+ H5 0.55 0.135 0.9600000000000001 1.0 \nH1+ H6 0.45 0.865 0.46 1.0 \nH1+ H7 0.9500000000000001 0.635 0.46 1.0 \nH1+ H8 0.05 0.365 0.9600000000000001 1.0 \nH1+ H9 0.685 0.75 0.21000000000000002 1.0 \nH1+ H10 0.315 0.25 0.7100000000000001 1.0 \nH1+ H11 0.8150000000000001 0.25 0.7100000000000001 1.0 \nH1+ H12 0.185 0.75 0.21000000000000002 1.0 \nH1+ H13 0.77 0.62 0.23 1.0 \nH1+ H14 0.23 0.38 0.73 1.0 \nH1+ H15 0.73 0.12000000000000001 0.73 1.0 \nH1+ H16 0.27 0.88 0.23 1.0 \nO2- O1 0.7817000000000001 0.011300000000000001 0.2389 1.0 \nO2- O2 0.21830000000000002 0.9887 0.7389 1.0 \nO2- O3 0.7183 0.5113 0.7389 1.0 \nO2- O4 0.2817 0.4887 0.2389 1.0 \nO2- O5 0.4627 0.050300000000000004 0.3346 1.0 \nO2- O6 0.5373 0.9497 0.8346 1.0 \nO2- O7 0.0373 0.5503 0.8346 1.0 \nO2- O8 0.9627 0.4497 0.3346 1.0 \nO2- O9 0.6662 0.29300000000000004 0.3602 1.0 \nO2- O10 0.3338 0.7070000000000001 0.8602000000000001 1.0 \nO2- O11 0.8338 0.793 0.8602000000000001 1.0 \nO2- O12 0.16620000000000001 0.20700000000000002 0.3602 1.0 \nO2- O13 0.5744 0.1991 0.058 1.0 \nO2- O14 0.42560000000000003 0.8009000000000001 0.558 1.0 \nO2- O15 0.9256 0.6991 0.558 1.0 \nO2- O16 0.07440000000000001 0.3009 0.058 1.0 \nO2- O17 0.663 0.6508 0.2129 1.0 \nO2- O18 0.337 0.3492 0.7129 1.0 \nO2- O19 0.8370000000000001 0.15080000000000002 0.7129 1.0 \nO2- O20 0.163 0.8492000000000001 0.2129 1.0",
                oxidationStates: [1, 1, -2, -3],
                optimalMappedPotential: 0.3145578189800099,
                symbols: ['H', 'Na', 'O', '(PO4)'],
                boundaryPairs: [
                    [-3.675165905428912, 20.027951487177848],
                    [-17.943363519567278, 20.181014299448954],
                    [-17.393909848682924, 14.075423435770237],
                    [-12.896643443454971, 13.818116506234288]
                ]
            }
        ]
    },
    composition: 'H16Na4O4(PO4)4',
    oxidationStateRangeData: [
        {
            oxidationStates: [-1, 1],
            ionTypeSymbol: 'H',
            rangeBoundaries: [-4.273239234278341, -1.375006480467232, 3.3589436584393075]
        },
        { oxidationStates: [1], ionTypeSymbol: 'Na', rangeBoundaries: [-4.224628956642633, 3.389513127822193] },
        {
            oxidationStates: [-2, -1],
            ionTypeSymbol: 'O',
            rangeBoundaries: [-4.114892914816463, 2.170113913850715, 4.015252157854681]
        },
        { oxidationStates: [-3], ionTypeSymbol: 'PO4', rangeBoundaries: [-3.216705787313602, 2.118724969745065] }
    ],
    messages: [],
    minBoundaryValue: -4.481096377933891,
    maxBoundaryValue: 4.015252157854681,
    potentialMapper: { slope: 0.199718461521146, intercept: -0.641008 }
};

export const InputSectionMockData: OxidationStatesTableItem[] = parseAPITableData(
    parseOxidationData(LiMn2O4Payload),
    LiMn2O4Payload.tableData.tableRows[0].optimalLikelihood
);

export const FileUploadMockData: OxidationStatesTableItem[] = parseAPITableData(
    parseOxidationData(fileUploadPayload),
    fileUploadPayload.tableData.tableRows[0].optimalLikelihood
);
