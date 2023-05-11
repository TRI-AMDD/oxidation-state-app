export enum LoadingState {
    Initial = 'Initial',
    Loading = 'Loading',
    Loaded = 'Loaded'
}

export interface OxidationStatesTableItem {
    id: number;
    oxidationState: JSX.Element[];
    likelihoodCurrentElecChemPotential: number;
    likelihoodOptimalElecChemPotential: number;
    optimalElecChemPotential: number;
    globalInstabilityIndex: number | 'NaN';
}

export interface TableRowAPI {
    counts: number[];
    optimalLikelihood: number;
    symbols: string[];
    oxidationStates: number[];
    optimalChemicalPotential: number;
    globalInstabilityIndex: number | 'NaN';
}
