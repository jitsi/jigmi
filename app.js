import React from 'react';
import Chart from './charts/baseChart';

/**
 * Component for displaying the top-level dashboard
 */
class Dashboard extends React.Component {
    /**
     * @inheritdoc
     */
    constructor(props) {
        super(props);
        this.psnrTestResultTransformFunc = jsonData => {
            const extractData = (json, yAxisFieldName) =>
                json.reduce((currData, currRow) => {
                    const field = currRow[yAxisFieldName];

                    currData.push([ currRow.buildNum, field ]);

                    return currData;
                }, []);

            // The frame data needs to be transformed to the percentage
            //  of all the frames, so we need another helper
            const extractPctData
                = (json,
                        yAxisNumeratorFieldName,
                        yAxisDenominatorFieldName) =>
                    json.reduce((currData, currRow) => {
                        const num = currRow[yAxisNumeratorFieldName];
                        const denom = currRow[yAxisDenominatorFieldName];
                        const val = num / denom;

                        currData.push([ currRow.buildNum, val ]);

                        return currData;
                    }, []);

            const psnrData = extractData(jsonData, 'psnr');
            const frameSkipData
                = extractPctData(jsonData, 'numSkippedFrames', 'totalFrames');
            const frameFrozenData
                = extractPctData(jsonData, 'numFrozenFrames', 'totalFrames');

            return [
                {
                    name: 'psnr',
                    data: psnrData
                },
                {
                    name: 'skipped frames',
                    data: frameSkipData
                },
                {
                    name: 'frozen frames',
                    data: frameFrozenData
                }
            ];
        };
    }

    /**
     * @inheritdoc
     */
    render() {
        return (
            <div>
                <Chart config={{
                    resultsUrl: './psnrResults',
                    resultsFunc: this.psnrTestResultTransformFunc,
                    graphTitle: 'PSNR',
                    graphYAxis: 'PSNR value',
                    graphXAxis: 'Build number'
                }} />

            </div>
        );
    }
}

export default Dashboard;
