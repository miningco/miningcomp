import React, { Component } from 'react';

// Import request module
import axios from 'axios';

// Import components
import NumberWidget from './NumberWidget';

const ETHERMINE_BASE_URL = 'https://api.ethermine.org/miner/0x5A1542D942B933c13404E346d4D1B9F324FF0E44/currentStats'


class NumberWidgetContainer extends Component {
    constructor() {
        super();

        // Set initial state
        this.state = {
            loading: false,
            value: undefined
        }

        // Bind function to refer to component
        this.getData = this.getData.bind(this);
    }

    // Fetch data when the component is added
    componentDidMount() {
        this.getData().then(_ => {
            // Re-fetch every minute
            this.interval = setInterval(this.getData, 60000);
        });
    }

    // Fetch new data
    getData() {
        // Tell the Widget component we're currently loading
        this.setState({ loading: true });

        // Fetch data
        return axios.get(ETHERMINE_BASE_URL)
            .then(response => {
                // Build a new state
                let newState = { loading: false };

                // Populate state with new data
                if (response.data.hasOwnProperty("value")) {
                    newState["value"] = response.data.href;
                }

                // Update state with data
                this.setState(newState);
                console.log(ETHERMINE_BASE_URL);
            })
            .catch(error => {
                // At least tell the Widget component we have stopped loading
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            // Render the number widget
            <NumberWidget
                heading={this.props.heading}
                colspan={this.props.colspan}
                rowspan={this.props.rowspan}
                value={this.state.value}
                loading={this.state.loading}
            />
        );
    }
}

// Enforce the type of props to send to this component


export default NumberWidgetContainer;
