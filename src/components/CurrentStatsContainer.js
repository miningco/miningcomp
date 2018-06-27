import React from 'react';
import NumberWidget from './NumberDisplay/NumberWidget';
import * as Api from './api';
import { Grid } from '@material-ui/core';

const DEFAULT_STATS = {
	coinsPerMin: 0,
	usdPerMin: 0,
	unpaid: 0,
};
export default class CurrentStatsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStats: DEFAULT_STATS,
			loading: true,
		}
	}

	componentDidMount() {
		Api.getCurrentStats(this.props.minerId)
			.then((currentStats) => {
				this.setState({ currentStats, loading: false });
			})
			.catch((err) => {
				console.error(err);
				this.setState({ currentStats: DEFAULT_STATS, loading: false });
			});
	}

	render() {
		const {
			currentStats,
			loading,
		} = this.state;

		const {
			coinsPerMin,
			usdPerMin,
			unpaid,
		} = currentStats;
		return (
			<Grid container={true} spacing={8}>
				<Grid item xs={12} sm={4}>
					<NumberWidget
						heading="Eth per Day"
						loading={loading}
						value={coinsPerMin}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<NumberWidget
						heading="USD per Day"
						loading={loading}
						value={usdPerMin}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<NumberWidget
						heading="Unpaid Balance in Eth"
						loading={loading}
						value={unpaid}
					/>
				</Grid>
			</Grid>
		);
	}
}
