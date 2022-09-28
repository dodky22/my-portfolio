import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'

import {animateElementsOut} from '../animationHelpers/gsapHelpers.js'

import styles from '../css/HeaderStyles.module.css'


const HeaderHomepageLink = () => {
    let location = useLocation()
    let history = useHistory()

    const goBack = () => {

        animateElementsOut()

        setTimeout(() => {
            (location.pathname === '/portfolio' || location.pathname === '/contact') ? 
            history.push('/') : history.push('/portfolio')  
        }, 1000);
    }
    
    return (
        <>
        {location.pathname === '/' ? null : (
            <div className={styles.headerHomeLink}  onClick={goBack}>
                <i style={{transform: 'translateY(-11px) translateX(-11px)'}}></i>
                <i style={{transform: 'translateY(-11px) translateX(11px)'}}></i>
                <i style={{transform: 'translateY(11px) translateX(-11px)'}}></i>
                <i style={{transform: 'translateY(0px) translateX(-11px)'}}></i>
                <i style={{transform: 'translateY(-11px) translateX(0px)'}}></i>
                <i style={{transform: 'translateY(11px) translateX(0px)'}}></i>
                <i style={{transform: 'translateY(0px) translateX(11px)'}}></i>
                <i style={{transform: 'translateY(0px) translateX(0px)'}}> </i>
                <i style={{transform: 'translateY(11px) translateX(11px)'}}></i>
            </div>
        )}
        </>  
    )
}

export default HeaderHomepageLink
