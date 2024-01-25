import React from 'react';
import styles from "./layout.module.css"
const Layout = ({ children }) => {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Crypto App</h1>
                <p>react | course</p>
            </div>
            {children}
            <div className={styles.footer}>
                <p>Developed by amirhosein</p>
            </div>
        </div>
    );
};

export default Layout;