import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import HeaderTooltip from './HeaderTooltip';

export const columns: GridColDef[] = [
    {
        field: 'oxidationState',
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
        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Likelihood" bodyText="at optimal electronic chemical potential">
                <strong>
                    L(&#956;<sub>opt</sub>)
                </strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            return (
                <Typography variant="body2">
                    {params.row.likelihoodOptimalElecChemPotential.toExponential(2)}
                </Typography>
            );
        },
        flex: 1
    },
    {
        field: 'likelihoodCurrentElecChemPotential',
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
        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Optimal" bodyText="electronic chemical potential">
                <strong>
                    &#956;<sub>opt</sub>
                </strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            return <Typography variant="body2">{params.row.optimalElecChemPotential.toExponential(2)}</Typography>;
        },
        flex: 1
    },
    {
        field: 'globalInstabilityIndex',
        headerName: 'GII',
        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Global" bodyText="instability index">
                <strong>GII</strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            return (
                <Typography variant="body2">
                    {typeof params.row.globalInstabilityIndex !== 'string'
                        ? params.row.globalInstabilityIndex.toExponential(2)
                        : params.row.globalInstabilityIndex}
                </Typography>
            );
        },
        flex: 1
    }
];
