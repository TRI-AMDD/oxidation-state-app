import axios from 'axios';
import { OxidationStatesAPI } from 'models/DataViewerModel';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export async function fetchTableDataUsingComposition(chemicalComposition: string, structure: File | undefined) {
    if (chemicalComposition === '' && typeof structure !== 'undefined') {
        const fileAsString = await structure.text();
        return api.post<OxidationStatesAPI>('', {
            composition: chemicalComposition,
            structure: fileAsString
        });
    } else {
        return api.post<OxidationStatesAPI>('', {
            composition: chemicalComposition,
            structure: ''
        });
    }
}
