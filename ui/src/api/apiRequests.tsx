import axios from 'axios';
import { TableRowAPI } from 'models/DataViewerModel';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export function fetchTableDataUsingComposition(chemicalComposition: string) {
    return api.post<TableRowAPI[]>('', {
        composition: chemicalComposition
    });
}
