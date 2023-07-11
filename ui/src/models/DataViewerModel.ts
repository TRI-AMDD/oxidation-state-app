export enum LoadingState {
    Initial = 'Initial',
    Loading = 'Loading',
    Loaded = 'Loaded',
    LoadedWithMessage = 'LoadedWithMessage',
    Error = 'Error'
}

export interface OxidationStatesTableItem {
    id: number;
    oxidationState: JSX.Element[];
    likelihoodCurrentElecChemPotential: number;
    likelihoodOptimalElecChemPotential: number;
    optimalElecChemPotential: number;
    globalInstabilityIndex: number | string;
    oxidationStateString: string;
    cifString?: string | null;
    mixedValence: boolean;
}

export interface TableRowAPI {
    counts: number[];
    optimalLikelihood: number;
    symbols: string[];
    oxidationStates: number[];
    optimalChemicalPotential: number;
    globalInstabilityIndex: number | string;
    cifstring?: string | null;
    mixedValence: boolean;
    boundaryPairs: number[][];
}

export interface OxidationRangeItem {
    ionTypeSymbol: string;
    oxidationStates: number[];
    rangeBoundaries: number[];
}

export interface OxidationStatesAPI {
    composition: string;
    messages: ErrorMessage[];
    tableData: {
        tableRows: TableRowAPI[];
    };
    maxBoundaryValue: number;
    minBoundaryValue: number;
    oxidationStateRangeData: OxidationRangeItem[];
}

interface ErrorMessage {
    isErrorMessage: boolean;
    messageString: string;
}
