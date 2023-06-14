export interface OxidationState {
    oxidationState: number;
    potential: number[];
    likelihood: number[];
    textPos: number[];
}

export interface PlotData {
    specie: string;
    textPos: number[];
    oxidationStates: OxidationState[];
}

export enum GraphType {
    Wavy,
    Bar
}
