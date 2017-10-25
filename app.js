import React from 'react';
import 'highcharts';
import ReactHighcharts from 'react-highcharts';

/**
 * Component representing a single chart
 */
class Chart extends React.Component {
    /**
     * Create a new chart
     * @param props props of the chart
     */
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: null
        };
    }

    /**
     * @inheritdoc
     */
    componentDidMount() {
        fetch('./psnrResults')
            .then(res => {
                if (res.status === 200) {
                    return res.json().then(jsonData => {
                        console.log(jsonData);
                        this.setState({
                            data: jsonData.map(jd => [ jd.buildNum, jd.psnr ])
                        });
                    });
                }
                this.setState({
                    error: 'Error retrieving psnr results'
                });
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    /**
     * @inheritdoc
     */
    render() {
        if (this.state.error) {
            return (
                <div>Error: {this.state.error}</div>
            );
        }
        if (this.state.data) {
            const config = {
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

            return (
                <ReactHighcharts config = {config}></ReactHighcharts>
            );
        }

        return (
            <div>Loading...</div>
        );
    }
}

/**
 * Component for displaying the top-level dashboard
 */
class Dashboard extends React.Component {
    /**
     * @inheritdoc
     */
    render() {
        return (
            <Chart />
        );
    }
}

export default Dashboard;
