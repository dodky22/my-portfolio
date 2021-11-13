import React from 'react'

import styles from '../css/HeaderStyles.module.css'

const loadingBar = () => {
    return (
        <em id="load" className={styles.loading_bar}></em>
    )
}

export default loadingBar
