// import styles from './Graph.module.css';
import { useMemo } from 'react';
import testData from './test.json';

import Plot from 'react-plotly.js';
import { formatOxidationState } from 'utils/GraphUtil';
import { Data } from 'plotly.js';

interface PlotData {
    oxidationState: number;
    potential: number[];
    likelihood: number[];
}

const PlotlyGraph = () => {
    const items = useMemo(() => {
        const parsedData: PlotData[] = [];
        const uniqueStates = [...new Set(testData.map((item) => item.oxidationState))].sort();
        console.log(uniqueStates);
        for (const unique of uniqueStates) {
            parsedData.push({
                oxidationState: unique,
                potential: testData.filter((item) => item.oxidationState === unique).map((item) => item.potential),
                likelihood: testData.filter((item) => item.oxidationState === unique).map((item) => item.likelihood)
            });
        }

        const graphData: Data[] = [];

        for (let i = 0; i < parsedData.length; i++) {
            if (parsedData[i].oxidationState !== 0) {
                const potentialPrevReverse = [...parsedData[i - 1].potential].reverse();
                const likelihoodPrevReverse = [...parsedData[i - 1].likelihood].reverse();

                graphData.push({
                    name: formatOxidationState(parsedData[i].oxidationState),
                    x: [...parsedData[i].potential, ...potentialPrevReverse],
                    y: [...parsedData[i].likelihood, ...likelihoodPrevReverse],
                    type: 'scatter',
                    fill: 'toself',
                    mode: 'lines'
                });
            }
        }
        return graphData;
    }, []);

    return <Plot data={items} layout={{ width: 543, height: 244 }} />;
};

export default PlotlyGraph;
