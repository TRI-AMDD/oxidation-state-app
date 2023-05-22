// import styles from './Graph.module.css';
import { useMemo } from 'react';
import testData from './test.json';

import Plot from 'react-plotly.js';

interface PlotData {
    [key: number]: {
        potential: number;
        likelihood: number;
    }[];
}

const PlotlyGraph = () => {
    const items = useMemo(() => {
        const parsedData: PlotData = {};
        const uniqueStates = [...new Set(testData.map((item) => item.oxidationState))];
        console.log(uniqueStates);
        for (const unique of uniqueStates) {
            parsedData[unique] = testData.filter((item) => item.oxidationState === unique);
        }

        return parsedData;
    }, []);

    console.log(items);

    return (
        <Plot
            data={[
                {
                    // x: [1, 2, 3],
                    // y: [2, 6, 3],
                    x: items[0].map((item) => item.potential),
                    y: items[0].map((item) => item.likelihood),
                    type: 'scatter',
                    fill: 'toself',
                    mode: 'lines',
                    name: '+1'
                    // mode: 'lines+markers',
                    // marker: { color: 'red' }
                }
            ]}
            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        />
    );
};

export default PlotlyGraph;
