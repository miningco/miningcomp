import React, { Component } from 'react';

// Import styling
import './NumberDisplay.css';

class NumberDisplay extends Component {
    render() {
        // Only display "of xx" when a max prop is available
        let max = null;

        if (this.props.max !== undefined) {
            max =
                <span className="max">
                    of {this.props.max}
                </span>;
        }

        return (
            <div className="NumberDisplay">
                <span className="value">
                    {this.props.value}
                </span>

                {max}
            </div>
        );
    }
}

// Enforce the type of props to send to this component


export default NumberDisplay;
