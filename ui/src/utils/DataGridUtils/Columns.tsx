import { GridColDef, getGridBooleanOperators, getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import HeaderTooltip from './HeaderTooltip';
import { OxidationStatesTableItem } from '@/models/DataViewerModel';

export const columns: GridColDef<OxidationStatesTableItem>[] = [
    {
        field: 'oxidationState',
        headerName: 'Oxidation State',
        renderHeader: () => <strong>Oxidation States</strong>,
        renderCell(params) {
            if (params.row.mixedValence) {
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
            } else {
                return (
                    <Typography
                        sx={{
                            flexDirection: 'row',
                            display: 'flex',
                            flexWrap: 'wrap',
                            padding: '16px 0',
                            fontWeight: 'bold'
                        }}
                        variant="body2"
                        component={'div'}
                    >
                        {params.row.oxidationState}
                    </Typography>
                );
            }
        },
        valueGetter(params) {
            return params.row.oxidationStateString;
        },
        filterable: false,
        flex: 3
    },
    {
        field: 'oxidationStateString',
        headerName: 'Oxidation State',
        filterOperators: getGridStringOperators().filter((operator) => operator.value === 'contains')
    },
    {
        field: 'likelihoodOptimalElecChemPotential',
        headerName: 'Likelihood at optimal electronic chemical potential',
        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Likelihood" bodyText="at optimal electronic chemical potential">
                <strong>
                    L(E<sub>opt</sub>)
                </strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            let displayValue;
            if (
                params.row.likelihoodOptimalElecChemPotential < 0.01 &&
                params.row.likelihoodOptimalElecChemPotential !== 0
            ) {
                displayValue = params.row.likelihoodOptimalElecChemPotential.toExponential(2);
            } else {
                displayValue = params.row.likelihoodOptimalElecChemPotential.toFixed(2);
            }

            if (params.row.mixedValence) {
                return (
                    <Typography component={'div'} variant="body2">
                        {displayValue}
                    </Typography>
                );
            } else {
                return (
                    <Typography component={'div'} variant="body2" sx={{ fontWeight: 'bold' }}>
                        {displayValue}
                    </Typography>
                );
            }
        },
        valueGetter(params) {
            return params.row.likelihoodOptimalElecChemPotential;
        },
        flex: 1,
        maxWidth: 100,
        filterOperators: getGridNumericOperators().filter(
            (operator) => operator.value === '=' || operator.value === '>' || operator.value === '<'
        )
    },
    {
        field: 'likelihoodCurrentElecChemPotential',
        headerName: 'Likelihood at current electronic chemical potential',

        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Likelihood" bodyText="at current electronic chemical potential">
                <strong>L(E)</strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            let displayValue;
            if (
                params.row.likelihoodCurrentElecChemPotential < 0.01 &&
                params.row.likelihoodCurrentElecChemPotential !== 0
            ) {
                displayValue = params.row.likelihoodCurrentElecChemPotential.toExponential(2);
            } else {
                displayValue = params.row.likelihoodCurrentElecChemPotential.toFixed(2);
            }

            if (params.row.mixedValence) {
                return (
                    <Typography component={'div'} variant="body2">
                        {displayValue}
                    </Typography>
                );
            } else {
                return (
                    <Typography component={'div'} variant="body2" sx={{ fontWeight: 'bold' }}>
                        {displayValue}
                    </Typography>
                );
            }
        },
        valueGetter(params) {
            return params.row.likelihoodCurrentElecChemPotential;
        },
        flex: 1,
        maxWidth: 100,
        filterOperators: getGridNumericOperators().filter(
            (operator) => operator.value === '=' || operator.value === '>' || operator.value === '<'
        )
    },
    {
        field: 'optimalElecChemPotential',
        headerName: 'Optimal electronic chemical potential',
        renderHeader: () => (
            <HeaderTooltip linkPath="/" linkText="Optimal" bodyText="electronic chemical potential">
                <strong>
                    E<sub>opt</sub>
                </strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            if (params.row.mixedValence) {
                return (
                    <Typography component={'div'} variant="body2">
                        {params.row.optimalElecChemPotential.toFixed(2)}
                    </Typography>
                );
            } else {
                return (
                    <Typography component={'div'} variant="body2" sx={{ fontWeight: 'bold' }}>
                        {params.row.optimalElecChemPotential.toFixed(2)}
                    </Typography>
                );
            }
        },
        valueGetter(params) {
            return params.row.optimalElecChemPotential;
        },
        flex: 1,
        maxWidth: 100,
        filterOperators: getGridNumericOperators().filter(
            (operator) => operator.value === '=' || operator.value === '>' || operator.value === '<'
        )
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
            const displayValue =
                typeof params.row.globalInstabilityIndex !== 'string'
                    ? params.row.globalInstabilityIndex.toFixed(2)
                    : params.row.globalInstabilityIndex;
            if (params.row.mixedValence) {
                return (
                    <Typography component={'div'} variant="body2">
                        {displayValue}
                    </Typography>
                );
            } else {
                return (
                    <Typography component={'div'} variant="body2" sx={{ fontWeight: 'bold' }}>
                        {displayValue}
                    </Typography>
                );
            }
        },
        valueGetter(params) {
            return typeof params.row.globalInstabilityIndex !== 'string'
                ? params.row.globalInstabilityIndex.toFixed(2)
                : params.row.globalInstabilityIndex;
        },
        flex: 1,
        maxWidth: 100,
        filterOperators: getGridNumericOperators().filter(
            (operator) => operator.value === '=' || operator.value === '>' || operator.value === '<'
        )
    },
    {
        field: 'mixedValence',
        headerName: 'Mixed Valence',
        filterOperators: getGridBooleanOperators()
    }
];
