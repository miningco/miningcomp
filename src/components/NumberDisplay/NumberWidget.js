import React, { Component } from 'react';

// Import components
import Widget from '../Widget';
import NumberDisplay from './NumberDisplay';
import Progress from '../Progress';

//Import styling
import './NumberWidget.css';

class NumberWidget extends Component {
    // Decide whether to show widget
    showWidget() {
        // Show loading indicator while initial data is being fetched
        if (this.props.value === undefined) {
            return <p>Loading...</p>;
        }

        return <div className="NumberWidget">
            <NumberDisplay value={this.props.value} />
            {/* Conditionally show the progress bar */}
            {this.showProgress()}
        </div>
    }

    // Decide whether to show a progress bar
    showProgress() {
        // Only show if the required min, max and value props are supplied
        if (this.props.value !== undefined) {
            return <Progress value={this.props.value} />;
        }

        return null;
    }

    render() {
        return (
            // Wrap the number display component in the generic wrapper
            <div className="NumberWidget-container">
                <Widget
                    heading={this.props.heading}
                    colspan={this.props.colspan}
                    rowspan={this.props.rowspan}
                    loading={this.props.loading}>
                  {this.showWidget()}
              </Widget>
            </div>
        );
    }
}

// Enforce the type of props to send to this component


export default NumberWidget;
