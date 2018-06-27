import React, { Component } from "react";

import CoinAPI from "./CoinAPI";
import CoinCard from "./CoinCard";

const styles = {
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 55,
    textAlign: 'center',
  }
};
class CryptoContainer extends Component {
  constructor() {
    super();

    this.state = {
      cryptoData: [],
      display: "none",
    };
  }
  handleToggle= () => {
    if (this.state.display === "none") {
      this.setState({display: "block"})
    } else {
    this.setState({
     display: "none"
    });
    }
  }

  loadCryptoCoinData() {
    CoinAPI.fetchCoinData()
      .then(response => {
        // console.log(response.data);
        this.setState({
          cryptoData: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.loadCryptoCoinData();
  }

  renderCoinCards() {

    const { cryptoData , display} = this.state;
    //    console.log(cryptoData)
    return cryptoData.map(coin => (
      <CoinCard
        coin_name={coin.name}
        coin_symbol={coin.symbol}
        price_usd={coin.price_usd}
        percent_change_24h={coin.percent_change_24h}
        percent_change_7d={coin.percent_change_7d}
        display={display}
      onClick={this.handleToggle}
      />
    ));
  }
  render() {
    // const { cryptoData } = this.state;
    // console.log(cryptoData)

    return <div style={styles}>{this.renderCoinCards()}</div>;
  }
}

export default CryptoContainer;
