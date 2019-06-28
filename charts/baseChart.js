import 'highcharts';
import PropTypes from 'prop-types';
import React from 'react';
import ReactHighcharts from 'react-highcharts';

/**
 * Component representing a single chart
 */
export default class Chart extends React.Component {
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
                    },
                    min: this.props.graphYAxisMin,
                    max: this.props.graphYAxisMax
                },
                xAxis: {
                    title: {
                        text: this.props.graphXAxis
                    },
                    step: 1
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
    graphYAxisMin: PropTypes.number,
    graphYAxisMax: PropTypes.number,
    config: PropTypes.object,
    data: PropTypes.array
};
