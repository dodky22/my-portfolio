import React from 'react'
import {useLocation} from 'react-router-dom'

import { gsap, Power3 } from 'gsap'

import styles from '../css/HeaderStyles.module.css'


const HeaderHomepageLink = () => {
    const location = useLocation()

    const goBack = () => {
        gsap.to('#quitFadeUp', {duration: 0.2 ,y:'-100', opacity:0, ease:Power3.easeInOut , stagger:0.1})
        gsap.to('#quitFadeDown', {duration: 0.2 ,y:'100', opacity:0, ease:Power3.easeInOut , stagger:0.1})
        gsap.to('#quitFadeLeft', {duration: 0.2 ,x:'-100', opacity:0, ease:Power3.easeInOut , stagger:0.1})
        gsap.to('#quitFadeRight', {duration: 0.2 ,x:'100', opacity:0, ease:Power3.easeInOut , stagger:0.1})
        setTimeout(() => {
            (location.pathname === '/portfolio' || location.pathname === '/contact') ? window.location = '/' : window.location = '/portfolio';  
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
