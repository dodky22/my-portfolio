import React from 'react'

import styles from '../css/PortfolioPageStyles.module.css'

const Ribbon = ({title}) => {
    let color
    switch (title.toLowerCase()) {
        case 'react':
            color='rgb(97, 218, 251)'
            break;
        case 'mern':
            color='rgb(1, 144, 39)'
            break;
        case 'wordpress':
            color='rgb(33, 117, 155)'
            break;
        case 'game':
            color='#a334b9'
            break;
        default:
            color='#ff9307'
            break;
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
