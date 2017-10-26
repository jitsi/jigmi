import Chart from './baseChart';

module.exports = class FrameSkipResultsChart extends Chart {
    /**
     * Get the config for this chart to be passed to highcharts
     */
    getChartConfig() {
        return {
            title: {
                text: 'Frame Skips'
            },
            yAxis: {
                title: {
                    text: 'Frame skip percentage'
                }
            },
            xAxis: {
                title: {
                    text: 'Build number'
                }
            },
            series: [
                {
                    data: this.state.data
                }
            ]
        };
    }

    /**
     * @inheritdoc
     */
    componentDidMount() {
        const jsonResultsFunc
            = jsonData => [ jsonData.buildNum, jsonData.frameSkipPercentage ];

        this._retrieveResultsHelper('./frameSkipResults', jsonResultsFunc)
            .then(jsonResult => this.setState({ data: jsonResult }))
            .catch(err => this.setState({ error: err }));
    }

};
