import { GridColDef, getGridBooleanOperators, getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import HeaderTooltip from './header-tooltip';
import { OxidationStatesTableItem } from '../../table-models/data-viewer-model';

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
                        data-testid={`data-grid-column-oxidationState-${params.row.id}`}
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
                        data-testid={`data-grid-column-oxidationState-${params.row.id}`}
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
        headerName: 'Likelihood at optimal ICSD-derived reduction potential value',
        renderHeader: () => (
            <HeaderTooltip
                linkPath="/tutorial/#tutorial-icsd-derived-reduction-potential"
                linkText="Likelihood score"
                bodyText="at optimal ICSD-derived reduction potential value"
            >
                <strong>
                    L(E<sub>opt</sub>)
                </strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            let displayValue;
            if (
                params.row.likelihoodOptimalMappedPotential < 0.01 &&
                params.row.likelihoodOptimalMappedPotential !== 0
            ) {
                displayValue = params.row.likelihoodOptimalMappedPotential.toExponential(2);
            } else {
                displayValue = params.row.likelihoodOptimalMappedPotential.toFixed(2);
            }

            if (params.row.mixedValence) {
                return (
                    <Typography
                        component={'div'}
                        variant="body2"
                        data-testid={`data-grid-column-likelihoodOptimal-${params.row.id}`}
                    >
                        {displayValue}
                    </Typography>
                );
            } else {
                return (
                    <Typography
                        component={'div'}
                        variant="body2"
                        sx={{ fontWeight: 'bold' }}
                        data-testid={`data-grid-column-likelihoodOptimal-${params.row.id}`}
                    >
                        {displayValue}
                    </Typography>
                );
            }
        },
        valueGetter(params) {
            return params.row.likelihoodOptimalMappedPotential;
        },
        maxWidth: 65,
        filterOperators: getGridNumericOperators().filter(
            (operator) => operator.value === '=' || operator.value === '>' || operator.value === '<'
        )
    },
    {
        field: 'likelihoodCurrentElecChemPotential',
        headerName: 'Likelihood at current ICSD-derived reduction potential value',

        renderHeader: () => (
            <HeaderTooltip
                linkPath="/tutorial/#tutorial-icsd-derived-reduction-potential"
                linkText="Likelihood score"
                bodyText="at current ICSD-derived reduction potential value"
            >
                <strong>L(E)</strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            let displayValue;
            if (
                params.row.likelihoodCurrentMappedPotential < 0.01 &&
                params.row.likelihoodCurrentMappedPotential !== 0
            ) {
                displayValue = params.row.likelihoodCurrentMappedPotential.toExponential(2);
            } else {
                displayValue = params.row.likelihoodCurrentMappedPotential.toFixed(2);
            }

            if (params.row.mixedValence) {
                return (
                    <Typography
                        component={'div'}
                        variant="body2"
                        data-testid={`data-grid-column-likelihoodCurrent-${params.row.id}`}
                    >
                        {displayValue}
                    </Typography>
                );
            } else {
                return (
                    <Typography
                        component={'div'}
                        variant="body2"
                        sx={{ fontWeight: 'bold' }}
                        data-testid={`data-grid-column-likelihoodCurrent-${params.row.id}`}
                    >
                        {displayValue}
                    </Typography>
                );
            }
        },
        valueGetter(params) {
            return params.row.likelihoodCurrentMappedPotential;
        },
        maxWidth: 65,
        filterOperators: getGridNumericOperators().filter(
            (operator) => operator.value === '=' || operator.value === '>' || operator.value === '<'
        )
    },
    {
        field: 'optimalElecChemPotential',
        headerName: 'Optimal ICSD-derived reduction potential value',
        renderHeader: () => (
            <HeaderTooltip
                linkPath="/tutorial/#tutorial-icsd-derived-reduction-potential"
                linkText="Optimal ICSD-derived reduction potential value"
                bodyText=""
            >
                <strong>
                    E<sub>opt</sub>
                </strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            if (params.row.mixedValence) {
                return (
                    <Typography
                        component={'div'}
                        variant="body2"
                        data-testid={`data-grid-column-optimalPotential-${params.row.id}`}
                    >
                        {params.row.optimalMappedPotential.toFixed(2)}
                    </Typography>
                );
            } else {
                return (
                    <Typography
                        component={'div'}
                        variant="body2"
                        sx={{ fontWeight: 'bold' }}
                        data-testid={`data-grid-column-optimalPotential-${params.row.id}`}
                    >
                        {params.row.optimalMappedPotential.toFixed(2)}
                    </Typography>
                );
            }
        },
        valueGetter(params) {
            return params.row.optimalMappedPotential;
        },
        maxWidth: 65,
        filterOperators: getGridNumericOperators().filter(
            (operator) => operator.value === '=' || operator.value === '>' || operator.value === '<'
        )
    },
    {
        field: 'globalInstabilityIndex',
        headerName: 'Global instability index',
        renderHeader: () => (
            <HeaderTooltip linkPath="/faq/#faq-7" linkText="Global instability index" bodyText="">
                <strong>GII</strong>
            </HeaderTooltip>
        ),
        renderCell(params) {
            const displayValue =
                typeof params.row.globalInstabilityIndex !== 'string'
                    ? params.row.globalInstabilityIndex.toFixed(2)
                    : 'N/A';
            if (params.row.mixedValence) {
                return (
                    <Typography component={'div'} variant="body2" data-testid={`data-grid-column-GII-${params.row.id}`}>
                        {displayValue}
                    </Typography>
                );
            } else {
                return (
                    <Typography
                        component={'div'}
                        variant="body2"
                        sx={{ fontWeight: 'bold' }}
                        data-testid={`data-grid-column-GII-${params.row.id}`}
                    >
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
        maxWidth: 65,
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
