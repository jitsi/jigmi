import React from 'react';
import Chart from './charts/baseChart';
import PsnrResultRequester from './psnrResultRequester';

/**
 * Component for displaying the top-level dashboard
 */
class Dashboard extends React.Component {

    /**
     * @inheritdoc
     */
    async componentDidMount() {
        // Retrieve the data from the psnr test which will be used by
        // the psnr and frame charts.  We do it here so we only make
        // the request once.
        try {
            const jsonData = await PsnrResultRequester.fetchPsnrResults();

            this.setState({
                psnrData: PsnrResultRequester.getPsnrChartData(jsonData),
                frameData: PsnrResultRequester.getFrameChartData(jsonData)
            });
        } catch (e) {
            this.setState({ e });
        }
    }

    /**
     * @inheritdoc
     */
    render() {
        if (this.state) {
            if (this.state.error) {
                return (
                    <div>Error: {this.state.error}</div>
                );
            }

            return (
                <div>
                    <Chart
                        graphTitle='PSNR'
                        graphYAxis='PSNR value'
                        graphYAxisMin={0}
                        graphYAxisMax={50}
                        graphXAxis='Build number'
                        data={this.state.psnrData}
                    />

                    <Chart
                        graphTitle='Frozen/skipped frames'
                        graphYAxis='% of total frames'
                        graphYAxisMin={0}
                        graphYAxisMax={100}
                        graphXAxis='Build number'
                        data={this.state.frameData}
                    />

                </div>
            );
        }

        return (
            <div>Loading...</div>
        );
    }
}

export default Dashboard;
