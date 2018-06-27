import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';
import { GetAsync } from '../utils/httpHelper';
import Moment from 'moment';

const API_URL = 'https://api.ethermine.org/miner/0x0e1f151967ee6cc11613ab101f4090fd67f6b8b4';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {
        case GET_LIST: {
            return { url: `${API_URL}/${resource}` };
        }
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { data } = response;
    switch (type) {
        case GET_LIST:
            // This is where response of api is getting processed,
            // we can formatting here, similar to what we do in api.js
            // but the only problem is this code is generic and will have no knowledge
            // of property names
            // We can use resource name to apply custom formatting
            let formattedData = [];
            // For each resource we have different columns, so we will need
            // different formatting but all of the should return a data array with id
            // property in it
            switch (resource) {
                case "payouts":
                    formattedData = formatPayoutData(data);
                    break;
                case "workers":
                    formattedData = formatWorkerData(data);
                    break;
                case "history":
                    formattedData = formatHistoryData(data);
                    break;
                default:
                    break;
            }
            return {
                data: formattedData,
                total: 1,
            };
    }
};


/**
 * Formatter function to change epoch time and amount to required formats
 *
 * @param {*} data
 */
function formatPayoutData(data) {
    const formattedData = [];
    (data || []).forEach((dataRow, index) => {
        if (dataRow.paidOn
            && dataRow.amount) {
            dataRow.id = index;
            dataRow.paidOn = Moment.unix(dataRow.paidOn).format('MM-DD-YYYY HH:mm:ss');
            dataRow.amount =
                (dataRow.amount / Math.pow(10, 18)).toFixed(4);

            // Add any other column formatting here, in case you want to change
            // amount or divide anything by 1000

            formattedData.push(dataRow);
        }
    });
    return formattedData;
}

/**
 * Formatter function to change epoch time and amount to required formats
 *
 * @param {*} data
 */
function formatWorkerData(data) {
    const formattedData = [];
    (data || []).forEach((dataRow, index) => {
        if (dataRow.time
            && dataRow.lastSeen) {
            dataRow.id = index;
            dataRow.time = Moment.unix(dataRow.time).format('MM-DD-YYYY HH:mm:ss');
            dataRow.lastSeen = Moment.unix(dataRow.lastSeen).format('MM-DD-YYYY HH:mm:ss');

            // Add any other column formatting here, in case you want to change
            // amount or divide anything by 1000

            formattedData.push(dataRow);
        }
    });
    return formattedData;
}


/**
 * Formatter function to change epoch time and amount to required formats
 *
 * @param {*} data
 */
function formatHistoryData(data) {
    const formattedData = [];
    (data || []).forEach((dataRow, index) => {
        if (dataRow.time) {
            dataRow.id = index;
            dataRow.time = Moment.unix(dataRow.time).format('MM-DD-YYYY HH:mm:ss');

            // Add any other column formatting here, in case you want to change
            // amount or divide anything by 1000

            formattedData.push(dataRow);
        }
    });
    return formattedData;
}

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
    // const { fetchJson } = fetchUtils;
    const request = convertDataProviderRequestToHTTP(type, resource, params);
    // return fetchJson(url, options)
    return GetAsync(request)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};
