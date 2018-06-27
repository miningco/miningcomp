import React from "react";
//import Coin Icons
import images from "./CoinIcon";
import "./coincard.css"
const CoinCard = ({
  coin_symbol,
  coin_name,
  price_usd,
  percent_change_24h,
  percent_change_7d,
  onClick,
  display
}) => {
  return (
    // <div style={coinWrapper} >
      <div  className="card-container" style={container} onClick={onClick}>
        <div style={upperRow}>
          <img className="coin-symbol" src={images[coin_symbol]} alt={coin_name} style={image} />
          <p style={coinSymbol}>{coin_symbol}</p>
          <p style={coinPrice}>
            <span style={moneySymbol}>$</span>
            {price_usd} USD
          </p>
          <p style={coinSymbol}>Current Price from CoinMarketCap.com</p>

        </div>
        <div className="card-statistics" style={{display: display}}>
          <p
            style={
              percent_change_24h < 0 ? percentChangeMinus : percentChangePlus
            }
          >
            Change past 24 hours: {percent_change_24h}%
          </p>
          <br />
          <p
            style={
              percent_change_7d < 0 ? percentChangeMinus : percentChangePlus
            }
          >
            Change past 7 days: {percent_change_7d}%
          </p>
        </div>
      </div>
    // </div>
  );
};
//   return (
//     <div style={coinWrapper} onClick={onClick}>
//       <div style={container}>
//         <div style={upperRow}>
//           <img src={images[coin_symbol]} alt={coin_name} style={image} />
//           <p style={coinSymbol}>{coin_symbol}</p>
//           <span style={seperator}>|</span>
//           <p style={coinName}>{coin_name} </p>
//           <p style={coinPrice}>
//             <span style={moneySymbol}>$</span>
//             {price_usd}
//           </p>
//         </div>
//         <div style={statisticsContainer}>
//           <p
//             style={
//               percent_change_24h < 0 ? percentChangeMinus : percentChangePlus
//             }
//           >
//             Change past 24 hours: {percent_change_24h}%
//           </p>
//           <br />
//           <p
//             style={
//               percent_change_7d < 0 ? percentChangeMinus : percentChangePlus
//             }
//           >
//             Change past 7 days: {percent_change_7d}%
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CoinCard;

// const styles = {
//   container: {
//     display: "flex",
//     marginBottom: 20,
//     borderBottomColor: "#e5e5e5",
//     borderBottomWidth: 3,
//     padding: 20
//   },
//   upperRow: {
//     display: "flex",
//     flexDirection: "row",
//     marginBottom: 15
//   },
//   coinSymbol: {
//     marginTop: 10,
//     marginLeft: 20,
//     marginRight: 5,
//     fontWeight: "bold"
//   },
//   coinName: {
//     marginTop: 10,
//     marginLeft: 5,
//     marginRight: 20
//   },
//   seperator: {
//     marginTop: 10
//   },
//   coinPrice: {
//     marginTop: 10,
//     marginLeft: "auto",
//     marginRight: 10,
//     fontWeight: "bold"
//   },
//   image: {
//     width: 35,
//     height: 35
//   },
//   moneySymbol: {
//     fontWeight: "bold"
//   },
//   statisticsContainer: {
//     display: "flex",
//     borderTopColor: "#FAFAFA",
//     borderTopWidth: 2,
//     padding: 10,
//     flexDirection: "row",
//     justifyContent: "space-around"
//   },
//   percentChangePlus: {
//     color: "#00BFA5",
//     fontWeight: "bold",
//     marginLeft: 5
//   },
//   percentChangeMinus: {
//     color: "#DD2C00",
//     fontWeight: "bold",
//     marginLeft: 5
//   },
//   coinWrapper: {
//     display: "flex",
//     width: "450px",
//     margin: "10px",
//     cursor: "pointer",
//     // background: ${props => props.isActive ? '#f1f1f1' : '#fff'};
//     // color: ${props => props.isActive ? '#333' : '#000' },
//     borderRadius: "4.5px",
//     boxShadow: "0 8px 12px 0 rgba(118,143,255,0.2)",
//     padding: "15px 10px",
//     transition: "all 175ms ease-in-out"
//   }
// };
const style = {
  container,
  image,
  moneySymbol,
  upperRow,
  coinSymbol,
  coinName,
  coinPrice,
  statisticsContainer,
  seperator,
  percentChangePlus,
  percentChangeMinus,
  coinWrapper
}
const {
  container,
  image,
  moneySymbol,
  upperRow,
  coinSymbol,
  coinName,
  coinPrice,
  statisticsContainer,
  seperator,
  percentChangePlus,
  percentChangeMinus,
  coinWrapper
} =
style;
