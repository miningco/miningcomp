import axios from "axios";

//base API URL
const apiBaseUrl = "https://api.coinmarketcap.com";

// fetch top 10 ranking Cryptocurrencies
const fetchCoinData = () => axios.get(`${apiBaseUrl}/v1/ticker/ethereum/`);

export default {
  fetchCoinData
};
