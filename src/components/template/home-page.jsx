import React, { useEffect, useState } from "react";
import TableCoin from "../module/table-coin";
import { GetCoinList } from "../services/apiroute";
import PaginationCoin from "../module/pagination-coin";
import SearchCoin from "../module/search-coin";
import toast, { Toaster } from 'react-hot-toast';
import ModalPage from "../module/modal-coins";


const HomePage = () => {
  const [data, setData] = useState([]);
  const [isLoadnig, setIsloadnig] = useState(true)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("usd")
  const [chart, setChart] = useState(null)

  useEffect(() => {
    setIsloadnig(true)
    const getData = async () => {
      try {
        const res = await fetch(GetCoinList(page, currency))
        const data = await res.json()
        setData(data)
        setIsloadnig(false)
      } catch (error) {
        toast.error(error.message)
      }

    }

    getData()

  }, [page, currency]);

  return <div>
    <SearchCoin currency={currency} setCurrency={setCurrency} setChart={setChart} chart={chart} coinid={data}  />
    <TableCoin currency={currency} coins={data} isLoadnig={isLoadnig} setChart={setChart} />
    <PaginationCoin page={page} setPage={setPage} />
    {!!chart && <ModalPage setChart={setChart} chart={chart}  />}
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  </div>;
};

export default HomePage;
