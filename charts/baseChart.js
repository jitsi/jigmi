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
        if (this.props.data) {
            const config = {
                title: {
                    text: this.props.graphTitle
                },
                yAxis: {
                    title: {
                        text: this.props.graphYAxis
                    }
                },
                xAxis: {
                    title: {
                        text: this.props.graphXAxis
                    }
                },
                series: this.props.data
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
}

Chart.propTypes = {
    graphTitle: PropTypes.string,
    graphXAxis: PropTypes.string,
    graphYAxis: PropTypes.string,
    config: PropTypes.object,
    data: PropTypes.array
};

module.exports = Chart;
