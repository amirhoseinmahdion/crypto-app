import React from 'react';
import styles from "./pagination.module.css"

const PaginationCoin = ({ page, setPage }) => {

    const perivoushandler = () => {

        if (page > 1) {
            setPage(page => page - 1)
        } else {
            return;
        }

    }
    const nexthandler = () => {
        if (page < 10) {
            setPage(page => page + 1)
        } else {
            return;
        }
    }
    return (
        <div className={styles.container}>
            <button onClick={perivoushandler} className={page === 1 ? styles.disabled : null}>perivous</button>
            <p className={page === 1 ? styles.selected : null}>1</p>
            <p className={page === 2 ? styles.selected : null}>2</p>
            {page > 2 && page < 9 && (
                <>
                    <span>...</span>
                    <p className={ styles.selected }>{page}</p>
                </>
            )}
            <span>...</span>
            <p className={page === 9 ? styles.selected : null}>9</p>
            <p className={page === 10 ? styles.selected : null}>10</p>
            <button onClick={nexthandler} className={page === 10 ? styles.disabled : null}>next</button>
        </div>
    );
};

export default PaginationCoin;