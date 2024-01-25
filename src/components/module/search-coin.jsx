import React, { useEffect, useState } from 'react';
import { GetCoinSearch, MarkChart } from '../services/apiroute';
import toast from 'react-hot-toast';
import { RotatingLines } from "react-loader-spinner";
import styles from "./search-coin.module.css"
import ModalPage from './modal-coins';



const SearchCoin = ({ currency, setCurrency, setChart, chart, coinid }) => {

    const [search, setSearch] = useState("")
    const [coins, setCoins] = useState([]);
    const [isLoadnig, setIsloadnig] = useState(false)
    const [isshow, setIsshow] = useState(false)






    const serchModalHandler = (id) => {
        const [one] = coinid.filter(item => item.id === id)

        const fetchdataById = async () => {
            const res = await fetch(MarkChart(id))
            const data = await res.json()

            setChart({ ...data, coin: one })
        }

        fetchdataById()
    }

    useEffect(() => {
        const controller = new AbortController()
        setCoins([])
        setIsshow(false)
        setIsloadnig(false)
        if (!search) return;
        const searchData = async () => {
            try {
                setIsshow(true)
                setIsloadnig(true)
                const res = await fetch(GetCoinSearch(search), { signal: controller.signal })
                const data = await res.json()
                if (data.coins) setCoins(data.coins)
                setIsloadnig(false)
            }
            catch (error) {
                toast.error(error.message)
            }
        }

        searchData()

        return () => controller.abort()
    }, [search])


    return (
        <div className={styles.searchBox}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search' />
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
            {isshow ? <div className={styles.searchResult}>
                {isLoadnig ? <RotatingLines
                    hieght="50px"
                    width='50px'
                    strokeColor="red"
                    strokeWidth='2'
                /> : <ul>
                    {coins.map(coin => <li onClick={() => serchModalHandler(coin.id, coin)} key={coin.id}>

                        <img src={coin.thumb} alt='coin' />
                        <p>{coin.name}</p>

                    </li>)}
                </ul>}
            </div> : null}
        </div>

    );
};

export default SearchCoin;