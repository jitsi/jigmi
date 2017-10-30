import React from 'react';
import Chart from './charts/baseChart';
import psnrTransformer from './charts/psnrChartHandler';
import frameResultTransformer from './charts/frameChartHandler';

/**
 * Component for displaying the top-level dashboard
 */
class Dashboard extends React.Component {
    /**
     * @inheritdoc
     */
    render() {
        return (
            <div>
                <Chart
                    graphTitle='PSNR'
                    graphYAxis='PSNR value'
                    graphXAxis='Build number'
                    config={{
                        resultsUrl: './psnrResults',
                        resultTransformers: [ psnrTransformer ]
                    }}
                />

                <Chart
                    graphTitle='Frozen/skipped frames'
                    graphYAxis='% of total frames'
                    graphXAxis='Build number'
                    config={{
                        resultsUrl: './psnrResults',
                        resultTransformers: [
                            jsonData => frameResultTransformer(
                                jsonData, 'numSkippedFrames'),
                            jsonData => frameResultTransformer(
                                jsonData, 'numFrozenFrames')
                        ]
                    }}
                />

            </div>
        );
    }
}

export default Dashboard;
