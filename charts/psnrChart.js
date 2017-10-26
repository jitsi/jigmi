import Chart from './baseChart';

module.exports = class PsnrResultsChart extends Chart {
    constructor(props) {
        super(props);
    }

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

    componentDidMount() {
        const jsonResultsFunc =
            jsonData => [ jsonData.buildNum, jsonData.psnrValue ];
        this._retrieveResultsHelper('./psnrResults', jsonResultsFunc)
            .then(jsonResult => this.setState({ data: jsonResult }))
            .catch(err => this.setState({ error: err }));

        //fetch('./psnrResults')
        //    .then(res => {
        //        if (res.status === 200) {
        //            return res.json().then(jsonData => {
        //                console.log(jsonData);
        //                this.setState({
        //                    data: jsonData.map(jd => [ jd.buildNum, jd.psnrValue ])
        //                });
        //            });
        //        }
        //        this.setState({
        //            error: 'Error retrieving psnr results'
        //        });
        //    })
        //    .catch(err => {
        //        this.setState({
        //            error: err
        //        });
        //    });
    }

};
