import { GetAsync } from "../utils/httpHelper";
import Moment from 'moment';
import orderBy from 'lodash.orderby';

const ETHERMINE_BASE_API = 'https://api.ethermine.org';
const MINER_API = 'miner';
const MAX_ITEMS = 25;

export function getMinerPayout(minerId) {
	return GetAsync({
		url: `${ETHERMINE_BASE_API}/${MINER_API}/${minerId}/payouts`,
	})
		.then((response) => {
			if (response && response.data) {
				// Order by paidOn date in descending order
				// as we are showing max 25 records, it will be good to show most recent dates
				const dataSortedByDate = orderBy(response.data, ['paidOn'], ['desc']);
				let itemCount =
					dataSortedByDate.length > MAX_ITEMS ? MAX_ITEMS : dataSortedByDate.length;
				const formattedData = [];
				for (let index = 0; index < itemCount; index++) {
					const payoutDataRow = dataSortedByDate[index];
					if (payoutDataRow.paidOn
						&& payoutDataRow.amount) {
						payoutDataRow.paidOn = Moment.unix(payoutDataRow.paidOn).toDate();
						payoutDataRow.amount =
							(payoutDataRow.amount / Math.pow(10, 18)).toFixed(4);
						// remove unecesary data points
						delete payoutDataRow.start;
						delete payoutDataRow.end;
						delete payoutDataRow.txHash;
						formattedData.push(payoutDataRow);
					}
				}
				return formattedData;
			} else {
				return [];
			}
		})
}

export function getMinerShares(minerId) {
	return GetAsync({
		url: `${ETHERMINE_BASE_API}/${MINER_API}/${minerId}/history`,
	})
		.then((response) => {
			if (response && response.data) {
				// Order by paidOn date in descending order
				// as we are showing max 25 records, it will be good to show most recent dates
				const dataSortedByDate = orderBy(response.data, ['time'], ['validShares']);
				let itemCount =
					dataSortedByDate.length > MAX_ITEMS ? MAX_ITEMS : dataSortedByDate.length;
				const formattedData = [];
				for (let index = 0; index < itemCount; index++) {
					const payoutDataRow = dataSortedByDate[index];
					if (payoutDataRow.time
						&& payoutDataRow.validShares) {
						payoutDataRow.time = Moment.unix(payoutDataRow.time).toDate();

						// remove unecesary data points
						delete payoutDataRow.reportedHashrate;
						delete payoutDataRow.currentHashrate;
						delete payoutDataRow.averageHashrate;
						delete payoutDataRow.invalidShares;
						delete payoutDataRow.staleShares;
						delete payoutDataRow.activeWorkers;

						formattedData.push(payoutDataRow);
					}
				}
				return formattedData;
			} else {
				return [];
			}
		})
}


export function getCurrentStats(minerId) {
	return GetAsync({
		url: `${ETHERMINE_BASE_API}/${MINER_API}/${minerId}/currentStats`,
	})
		.then((response) => {
			const currentStats = {
				coinsPerMin: 0,
				usdPerMin: 0,
				unpaid: 0,
			};
			if (response && response.data) {
				const {
					coinsPerMin,
					usdPerMin,
					unpaid,
				} = response.data;
				if (coinsPerMin) {
					(currentStats.coinsPerMin = coinsPerMin * 60 * 24).toFixed(4);
				}
				if (usdPerMin) {
					(currentStats.usdPerMin = usdPerMin * 60 * 24).toFixed(4);
				}
				if (unpaid) {
					(currentStats.unpaid = unpaid / Math.pow(10, 18)).toFixed(4);
				}
			}
			return currentStats;
		});
}
