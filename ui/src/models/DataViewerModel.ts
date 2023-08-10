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
    likelihoodCurrentMappedPotential: number;
    likelihoodOptimalMappedPotential: number;
    optimalMappedPotential: number;
    globalInstabilityIndex: number | string;
    oxidationStateString: string;
    cifString?: string | null;
    mixedValence: boolean;
}

export interface TableRowAPI {
    counts: number[];    
    symbols: string[];
    oxidationStates: number[];
    optimalLikelihood: number;
    optimalMappedPotential: number;
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
    potentialMapper: {
        intercept: number;
        slope: number;
    }
}

interface ErrorMessage {
    isErrorMessage: boolean;
    messageString: string;
}
