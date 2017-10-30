import 'highcharts';
import PropTypes from 'prop-types';
import React from 'react';
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
    render() {
        if (this.state.error) {
            return (
                <div>Error: {this.state.error}</div>
            );
        }
        if (this.state.data) {
            const config = {
                title: {
                    text: this.props.config.graphTitle
                },
                yAxis: {
                    title: {
                        text: this.props.config.graphYAxis
                    }
                },
                xAxis: {
                    title: {
                        text: this.props.config.graphXAxis
                    }
                },
                series: this.state.data
            };

            return (
                <ReactHighcharts config =
                    {config}></ReactHighcharts>
            );
        }

        return (
            <div>Loading...</div>
        );
    }

    /**
     * @inheritdoc
     */
    componentDidMount() {
        const config = this.props.config;

        this._retrieveResultsHelper(config.resultsUrl, config.resultsFunc)
            .then(jsonResult => this.setState({ data: jsonResult }))
            .catch(err => this.setState({ error: err }));
    }

    /**
     * Retrieve results from the given endpoint.  If retrieved successfully,
     * transform the response to json and apply the given function on the
     * results.  Returns a promise with the results.
     */
    _retrieveResultsHelper(endpoint, jsonTransformFunc) {
        return fetch(endpoint)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                        .then(jsonData => jsonTransformFunc(jsonData));
                }
            });
    }
}

Chart.propTypes = {
    config: PropTypes.object
};

module.exports = Chart;
