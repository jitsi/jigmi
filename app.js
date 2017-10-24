import React from 'react';
import ReactDOM from 'react-dom';
import 'highcharts';
import ReactHighcharts from 'react-highcharts';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: null
        };
    }

    componentDidMount() {
        fetch("./psnrResults")
            .then(res => {
                if (res.status !== 200) {
                    this.setState({
                        error: "Error retrieving psnr results"
                    });
                } else {
                    res.json().then(jsonData => {
                        console.log(jsonData);
                        this.setState({
                            data: jsonData.map(jd => [jd.buildNum, jd.psnr])
                        });
                    });
                }
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    render() {
        if (this.state.error) {
            return (
                <div>Error: {this.state.error}</div>
            );
        }
        if (this.state.data) {
            const config = {
                title: {
                    text: "PSNR"
                },
                yAxis: {
                    title: {
                        text: "PSNR value"
                    },
                },
                xAxis: {
                    title: {
                        text: "Build number"
                    },
                },
                series: [{
                    data: this.state.data
                }]
            }
            return (
                <ReactHighcharts config = {config}></ReactHighcharts>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <Chart />
        );
    }
}

export default Dashboard;
