import Chart from './baseChart';

module.exports = class PsnrResultsChart extends Chart {
    /**
     * Get the config for this chart to be passed to highcharts
     */
    getChartConfig() {
        return {
            title: {
                text: 'PSNR'
            },
            yAxis: {
                title: {
                    text: 'PSNR value'
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
            = jsonData => [ jsonData.buildNum, jsonData.psnrValue ];

        this._retrieveResultsHelper('./psnrResults', jsonResultsFunc)
            .then(jsonResult => this.setState({ data: jsonResult }))
            .catch(err => this.setState({ error: err }));
    }
};
