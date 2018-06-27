import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { drawChart } from './lineChartHelper';

// ID for the div, which we will use build chart
const CHART_CONTAINER_ID = 'chartContainer';

class GraphWidget extends Component {
   
    componentDidMount() {
        if (this.props.data) {
            this.renderChart(this.props.data);
        }
    }
    componentWillReceiveProps(nextProps) {
        // New data came in, redraw the chart
        if (nextProps.data !== this.props.data) {
            this.renderChart(nextProps.data);
        }
    }
    renderChart = (data) => {
        // our D3 helper function to draw the chart/
        // we need to tell the id of div, where chart will be drawen
        // data for the chart
        // height and width --> this can be made responsive with some additional JS
        drawChart(
            CHART_CONTAINER_ID,
            data,
            430,
            850,
        );
    }
    render() {
        return (
            <Grid item xs={this.props.colspan}>
                <Paper style={{ padding: 10 }}>
                    <h4 style={{ margin: 10 }}>{this.props.heading}</h4>
                    <div
                        id={CHART_CONTAINER_ID}
                        className="chart-container"
                    />
                </Paper>
            </Grid>
        );
    }
}

// Enforce the type of props to send to this component


export default GraphWidget;
