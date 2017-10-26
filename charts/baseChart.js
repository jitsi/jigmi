import 'highcharts';
import React from 'react';
import ReactHighcharts from 'react-highcharts';

/**
 * Component representing a single chart
 */
module.exports = class Chart extends React.Component {
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
            return (
                <ReactHighcharts config =
                    {this.getChartConfig()}></ReactHighcharts>
            );
        }

        return (
            <div>Loading...</div>
        );
    }

    /**
     * Retrieve results from the given endpoint.  If retrieved successfully,
     * transform the response to json and apply the given function on the
     * results.  Returns a promise with the results.
     */
    _retrieveResultsHelper(endpoint, jsonMapFunc) {
        return fetch(endpoint)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                        .then(jsonData => jsonData.map(jsonMapFunc));
                }
            });
    }
};
