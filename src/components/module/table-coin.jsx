import { RotatingLines } from "react-loader-spinner";
import postivesvg from "../../assets/chart-up.svg"
import negtivesv from "../../assets/chart-down.svg"
import styles from "./table-coin.module.css"
import { GetCoinById, MarkChart } from '../services/apiroute';

const TableCoin = ({ coins, isLoadnig, setChart, currency }) => {

  return <div className={styles.container}>
    {isLoadnig ? <RotatingLines
      strokeColor="red"
      strokeWidth="2"
    /> : <table className={styles.table}>
      <thead>
        <tr>
          <th>coin</th>
          <th>name</th>
          <th>price</th>
          <th>24h</th>
          <th>total volume</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {coins.map(coin => <TableRow coin={coin} setChart={setChart} key={coin.id} currency={currency} />)}
      </tbody>
    </table>}

  </div>
};

export default TableCoin;


const TableRow = ({ coin, setChart, setCoinid, currency }) => {

  const { id, image, symbol, name, current_price, price_change_percentage_24h, total_volume } = coin

  const showModalHandler = () => {
    const fetchdataById = async () => {
      const res = await fetch(MarkChart(id))
      const data = await res.json()

      setChart({ ...data, coin: coin })
    }

    fetchdataById()
  }
  return <tr key={id}>
    <td>
      <div onClick={() => showModalHandler()} className={styles.symbol}>
        <img src={image} alt="coin" />
        <span>{symbol.toUpperCase()}</span>
      </div>
    </td>
    <td>{name}</td>
    <td>{currency === "usd" ? "$" : currency === "jpy" ? "¥" : "€"}{current_price.toLocaleString()}</td>
    <td className={price_change_percentage_24h > 0 ? styles.success : styles.error}>{price_change_percentage_24h.toFixed(2)}%</td>
    <td>{total_volume.toLocaleString()}</td>
    <td>
      <img src={price_change_percentage_24h > 0 ? postivesvg : negtivesv} alt="svgchart" />
    </td>
  </tr>

}



