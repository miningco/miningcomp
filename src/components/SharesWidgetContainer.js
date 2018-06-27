import React, { Component } from 'react';
import * as Api from './api';
// Import components
import BarChartWidget from './BarChartWidget';

class SharesWidgetContainer extends Component {
	constructor() {
		super();

		// Set initial state
		this.state = {
			loading: false,
			values: []
		}

		// Bind function to refer to component
		this.getData = this.getData.bind(this);
	}

	// Fetch data when the component is added
	componentDidMount() {
		this.getData().then(_ => {
			// Re-fetch every minute
			// AJ | IT WILL LEAD TO MEMORY LEAK, YOU SHOULD ALWAYS CLEAR INTERVAL ON UNMOUNT
			this.interval = setInterval(this.getData, 600000);
		});
	}


	componentWillUnmount() {
		// AJ | If interval is active get rid of it. So that we do not set state
		// on an unmounted component
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	// Fetch new data
	getData() {
		// Tell the Widget component we're currently loading
		this.setState({ loading: true });

		// Fetch data
		return Api.getMinerShares(this.props.minerId)
			.then(data => {
				// Update state with data
				this.setState({ loading: false, data });
			})
			.catch(error => {
				// At least tell the Widget component we have stopped loading
				console.log(error);
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			// Render the graph widget
			<div style={{ padding: 8 }}>
				<BarChartWidget
					heading={this.props.heading}
					colspan={this.props.colspan}
					rowspan={this.props.rowspan}
					data={this.state.data}
					loading={this.state.loading}
				/>
			</div>
		);
	}
}

// Enforce the type of props to send to this component


export default SharesWidgetContainer;
