import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Bar } from 'react-chartjs-2';

const TEST_DATA = {
    labels: ['A', 'B'],
    datasets: [{
        label: 'First dataset',
        data: [2, 5],
    }]
}

class BarChartWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            chartOptions: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                'millisecond': 'MMM DD',
                                'second': 'MMM DD',
                                'minute': 'MMM DD',
                                'hour': 'MMM DD',
                                'day': 'MMM DD',
                                'week': 'MMM DD',
                                'month': 'MMM DD',
                                'quarter': 'MMM DD',
                                'year': 'MMM DD',
                            }
                        }
                    }],
                },
            }
        }
    }

    // chart.js expects data to be in certain format
    // we will enrich data to match that format and the use
    // the same for rendering our chart
    processData(heading, rawData) {
        // labels - we will collect all paid on dates in an array
        // data - we will collect all amounts in a separate array
        const labels = [];
        const data = [];
        (rawData || []).forEach((d) => {
            labels.push(d.time);
            data.push(d.validShares);
        });
        return {
            labels: labels,
            datasets: [
                {
                    label: heading,
                    data: data,
                }
            ],
        }
    }
    componentDidMount() {
        if (this.props.data) {
            this.setState({ data: this.processData(this.props.heading, this.props.data) });
        }
    }
    componentWillReceiveProps(nextProps) {
        // New data came in, redraw the chart
        if (nextProps.data !== this.props.data) {
            this.setState({ data: this.processData(nextProps.heading, nextProps.data) });
        }
    }

    render() {
        if (this.state.data) {
            console.log(this.state.data);
            return (
                <Grid item xs={this.props.colspan}>
                    <Paper style={{ padding: 10 }}>
                        <div>
                            <Bar
                                options={this.state.chartOptions}
                                data={this.state.data}
                            />
                        </div>
                    </Paper>
                </Grid>
            );
        } else {
            return null;
        }
    }
}

// Enforce the type of props to send to this component


export default BarChartWidget;
