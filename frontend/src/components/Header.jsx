import React, {useEffect, useRef} from 'react'

import {Link, useLocation } from 'react-router-dom'

import HeaderHomepageLink from './HeaderHomepageLink.jsx'

import {gsap, Power4} from 'gsap'
import styled from 'styled-components'
import styles from '../css/HeaderStyles.module.css'

const Header = () => {
    let animNav = useRef(null);
    let ulWrap = useRef(null);
    let navUl = useRef(null);

    let location = useLocation()

    let burger = useRef(null);
    let homeLink = useRef(null);

    let topArr = useRef(null);
    let botArr = useRef(null);
    let midArr = useRef(null);

    let tlnav = gsap.timeline({paused: true, reversed: true})
    let tlclosenav = gsap.timeline({paused: true, reversed: true})

    useEffect(() => {
        gsap.to(burger, {duration: 0.5, x: 0,delay: 1, ease:Power4.easeInOut})
        gsap.to(homeLink, {duration: 0.5, x: 0,delay: 1, ease:Power4.easeInOut})
    }, [])

    useEffect(() => { 
           
        tlnav.to(animNav, {duration: 0.5, y:0, ease:Power4.easeInOut})
            .to(ulWrap, {duration: 0.5, height: 300, ease:Power4.easeInOut})
            .to([...navUl.children], {duration:0.3,  x:0, ease:Power4.easeInOut, stagger:0.1}, '-=0.1')
        
        tlclosenav.to(topArr, {duration: 0.2, rotate: 135, y:10, ease:Power4.easeInOut} )
                    .to(botArr, {duration: 0.2, rotate: '-135', y:'-10', ease:Power4.easeInOut}, '-=0.2')
                    .to(midArr, {duration: 0.2, width: 0, ease:Power4.easeInOut}, '-=0.2')
        // eslint-disable-next-line
    }, [])

    const toggleTimeline = (tlnav) => {
        tlnav.reversed() ? tlnav.play() :  tlnav.reverse()
    }

     const handleClick = () => {
        toggleTimeline(tlnav);
        toggleTimeline(tlclosenav);
    }

    const handleAnimation = (e, tlnav) => {
        e.preventDefault()

        toggleTimeline(tlnav);
        toggleTimeline(tlclosenav);

        setTimeout(() => {
            if(location.pathname !== `/${e.target.href.split('/').pop()}`){
                gsap.to('#quitFadeUp', {duration: 0.2 ,y:'-100', opacity:0, ease:Power4.easeInOut , stagger:0.1})
                gsap.to('#quitFadeDown', {duration: 0.2 ,y:'100', opacity:0, ease:Power4.easeInOut , stagger:0.1})
                gsap.to('#quitFadeLeft', {duration: 0.2 ,x:'-100', opacity:0, ease:Power4.easeInOut , stagger:0.1})
                gsap.to('#quitFadeRight', {duration: 0.2 ,x:'100', opacity:0, ease:Power4.easeInOut , stagger:0.1})
           
                setTimeout(() => {
                    window.location = e.target.href; 
                }, 1000);
            }
        }, tlnav.duration()*1000);

        
    }

    return (
        <Head > 
            <div className={styles.col}  ref={el => homeLink = el}>
                <HeaderHomepageLink />
            </div>         
            <div   className={styles.col} ref={el => burger = el}>
                <div className={styles.special_con} onClick={() => {
                handleClick()
                }}>
                    <div className={`${styles.bar} ${styles.arrow_top_fall}`} ref={el => topArr = el} ></div>
                    <div className={`${styles.bar} ${styles.arrow_middle_fall}`} ref={el => midArr = el}></div>
                    <div className={`${styles.bar} ${styles.arrow_bottom_fall}`} ref={el => botArr = el} ></div>
                </div>
            </div>
            <nav ref={el => animNav = el} className={styles.navigation}>
                <div className={styles.ulNavWrapper} ref={el => ulWrap = el}>
                    <ul ref={el => navUl = el}>
                        <li><Link to="/" onClick={(e) =>  handleAnimation(e,tlnav)}>HOME</Link></li>
                        <li><Link to="/portfolio" onClick={(e) => handleAnimation(e,tlnav)}>PORTFOLIO</Link></li>
                        <li><Link to="/contact" onClick={(e) =>  handleAnimation(e,tlnav)}>CONTACT</Link></li>
                    </ul>
                </div>
            </nav>
       </Head>            
    )
}


const Head = styled.div`
  top: 0;
  height: 80px;
  width: calc(100% - 50px);
  max-width: 1020px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index:251;
  position:absolute;
`

export default Header
