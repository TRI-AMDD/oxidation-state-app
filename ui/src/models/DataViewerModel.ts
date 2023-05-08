export enum LoadingState {
    Initial = 'Initial',
    Loading = 'Loading',
    Loaded = 'Loaded'
}

export interface OxidationStatesTableItem {
    id: number;
    oxidationState: string;
    likelihoodCurrentElecChemPotential: number;
    likelihoodOptimalElecChemPotential: number;
    optimalElecChemPotential: number;
    globalInstabilityIndex: number;
}
