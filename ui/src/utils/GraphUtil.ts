export function formatOxidationState(state: number) {
    if (state > 0) {
        return `+${state}`;
    }

    return state.toString();
}
