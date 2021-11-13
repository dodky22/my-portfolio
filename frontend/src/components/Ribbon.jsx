import React from 'react'

import styles from '../css/PortfolioPageStyles.module.css'

const Ribbon = ({title}) => {
    let color
    if (title.toLowerCase() !== 'my project') {
        color= '#0773ff'
    }
    return (
        <div className={styles.ribbon} style={{background: color}}>
            <span>{title}</span>
        </div>
    )
}

Ribbon.defaultProps = {
    color: '#ff9307'
}

export default Ribbon
