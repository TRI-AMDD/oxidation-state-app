import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import HeaderTooltip from './HeaderTooltip';

export const columns: GridColDef[] = [
    {
        field: 'oxidationState',
        headerName: 'Oxidation State',
        renderHeader: () => <strong>Oxidation States</strong>,
        renderCell(params) {
            return (
                <Typography
                    sx={{
                        flexDirection: 'row',
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '16px 0'
                    }}
                    variant="body2"
                    component={'div'}
                >
                    {params.row.oxidationState}
                </Typography>
            );
        },
        valueGetter(params) {
            return params.row.oxidationStateString;
        },
        width: 284
    },
    {
        field: 'likelihoodOptimalElecChemPotential',
        headerName: 'Likelihood at optimal electronic chemical potential',
        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Likelihood" bodyText="at optimal electronic chemical potential">
                <strong>
                    L(&#956;<sub>opt</sub>)
                </strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            let displayValue;
            if (params.row.likelihoodOptimalElecChemPotential < 0.01) {
                displayValue = params.row.likelihoodOptimalElecChemPotential.toExponential(2);
            } else {
                displayValue = params.row.likelihoodOptimalElecChemPotential.toFixed(2);
            }
            return <Typography variant="body2">{displayValue}</Typography>;
        },
        flex: 1
    },
    {
        field: 'likelihoodCurrentElecChemPotential',
        headerName: 'Likelihood at current electronic chemical potential',

        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Likelihood" bodyText="at current electronic chemical potential">
                <strong>L(&#956;)</strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            return <Typography variant="body2">{params.row.likelihoodCurrentElecChemPotential}</Typography>;
        },
        flex: 1
    },
    {
        field: 'optimalElecChemPotential',
        headerName: 'Optimal electronic chemical potential',
        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Optimal" bodyText="electronic chemical potential">
                <strong>
                    &#956;<sub>opt</sub>
                </strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            return <Typography variant="body2">{params.row.optimalElecChemPotential.toFixed(2)}</Typography>;
        },
        flex: 1
    },
    {
        field: 'globalInstabilityIndex',
        headerName: 'Global instability index',
        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Global" bodyText="instability index">
                <strong>GII</strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            return (
                <Typography variant="body2">
                    {typeof params.row.globalInstabilityIndex !== 'string'
                        ? params.row.globalInstabilityIndex.toFixed(2)
                        : params.row.globalInstabilityIndex}
                </Typography>
            );
        },
        flex: 1
    }
];
