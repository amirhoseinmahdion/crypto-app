import React, { useEffect, useState } from 'react';
import styles from "./modal.module.css"
import { ConvertData } from '../../helper/convertData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ModalPage = ({ setChart, chart }) => {
    const [type, setType] = useState("prices")
    const data = ConvertData(chart, type)
    return (
        <div className={styles.container}>
            <span className={styles.cross} onClick={() => setChart(null)}>X</span>
            <div className={styles.chart}>
                <div className={styles.headerchart}>
                    <img src={chart.coin["image"]} alt="coin" />
                    <h1>{chart.coin["name"]}</h1>
                </div>
                <div className={styles.graph}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={400}
                            height={400}
                            data={data}
                            margin={{
                                top: 30,
                                right: 30,
                                left: 50,
                                bottom: 5,
                              }}
                        >
                            <CartesianGrid stroke='#404042' />
                            <XAxis dataKey="date" hide />
                            <YAxis dataKey={type} domain={["auto", "auto"]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth="2px" />

                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.selectchart}>
                    <button className={type === "prices" ? styles.selected : null} onClick={() => setType("prices")}>prices</button>
                    <button className={type === "market_caps" ? styles.selected : null} onClick={() => setType("market_caps")} >Market Caps</button>
                    <button className={type === "total_volumes" ? styles.selected : null} onClick={() => setType("total_volumes")} >Total Volumes</button>
                </div>
                <div className={styles.detials}>
                    <div>
                        <p>Prices:</p>
                        <span>${chart.coin["current_price"]}</span>
                    </div>
                    <div>

                        <p>ATH:</p>
                        <span>${chart.coin["ath"]}</span>
                    </div>
                    <div>
                        <p>Market Caps:</p>
                        <span>{chart.coin["market_cap"]}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModalPage;