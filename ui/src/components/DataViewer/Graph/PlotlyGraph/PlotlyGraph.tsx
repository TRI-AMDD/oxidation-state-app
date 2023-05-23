// import styles from './Graph.module.css';
import { useMemo } from 'react';
import testData from './test.json';

import Plot from 'react-plotly.js';

interface PlotData {
    oxidationState: number;
    potential: number[];
    likelihood: number[];
}

interface GraphData {
    name: string;
    x: number[];
    y: number[];
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

        const graphData: GraphData[] = [];

        for (let i = 0; i < parsedData.length; i++) {
            if (parsedData[i].oxidationState !== 0) {
                const potentialPrevReverse = [...parsedData[i - 1].potential].reverse();
                const likelihoodPrevReverse = [...parsedData[i - 1].likelihood].reverse();

                graphData.push({
                    name: parsedData[i].oxidationState.toString(),
                    x: [...parsedData[i].potential, ...potentialPrevReverse],
                    y: [...parsedData[i].likelihood, ...likelihoodPrevReverse]
                });
            }
        }

        return graphData;
    }, []);

    console.log(items);

    return (
        <Plot
            data={[
                {
                    // x: [1, 2, 3],
                    // y: [2, 6, 3],
                    x: items[0].x,
                    y: items[0].y,
                    name: items[0].name,
                    // y: items[0].map((item) => item.likelihood),
                    type: 'scatter',
                    fill: 'toself',
                    mode: 'lines'

                    // mode: 'lines+markers',
                    // marker: { color: 'red' }
                }
            ]}
            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        />
    );
};

export default PlotlyGraph;
