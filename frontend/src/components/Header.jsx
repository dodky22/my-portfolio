import React, {useEffect, useRef} from 'react'

import {NavLink, useLocation, useHistory } from 'react-router-dom'
import {animateElementsOut, toggleTimeline, animOutTimeline} from '../animationHelpers/gsapHelpers.js'

import HeaderHomepageLink from './HeaderHomepageLink.jsx'

import {gsap, Power4} from 'gsap'
import styled from 'styled-components'
import styles from '../css/HeaderStyles.module.css'

const Header = () => {

    let animNav = useRef(null);
    let ulWrap = useRef(null);
    let navUl = useRef(null);

    let location = useLocation()
    let history = useHistory()

    let topArr = useRef(null);
    let botArr = useRef(null);
    let midArr = useRef(null);

    let tlnav = gsap.timeline({paused: true, reversed: true})

    useEffect(() => {    

        tlnav.to(animNav, {duration: 0.5, y:0, ease:Power4.easeInOut}, 'start')
            .to(ulWrap, {duration: 0.5, height: 300, ease:Power4.easeInOut})
            .to([...navUl.children], {duration:0.3,  x:0, ease:Power4.easeInOut, stagger:0.1}, '-=0.1')
            .to(topArr, {duration: 0.2, rotate: 135, y:10, ease:Power4.easeInOut}, 'start' )
            .to(botArr, {duration: 0.2, rotate: '-135', y:'-10', ease:Power4.easeInOut}, 'start')
            .to(midArr, {duration: 0.2, width: 0, ease:Power4.easeInOut}, 'start')

    }, [tlnav])

    const handleAnimation = (e) => {
        e.preventDefault()

        if (e.target.href) {
            if(`/${e.target.href.split('/').pop()}` ===  location.pathname){
                toggleTimeline(tlnav)       
            }          
            else {
                setTimeout(() => {

                    animateElementsOut()

                    setTimeout(() => {
                        history.push(`/${e.target.href.split('/').pop()}`)
                    }, animOutTimeline.duration() * 1000);

                }, (tlnav.duration() * 1000) + 300)
                toggleTimeline(tlnav)       
            }          
        }else{
            toggleTimeline(tlnav)       
        } 
    }

    return (
        <Head > 
            <div id="homelinkHeader"  className={styles.col}>
                <HeaderHomepageLink />
            </div>         
            <div   className={styles.col} >
                <button id="burgerHeader" className={styles.special_con} onClick={(e) => handleAnimation(e)}>
                    <span className={`${styles.bar} ${styles.arrow_top_fall}`} ref={el => topArr = el} ></span>
                    <span className={`${styles.bar} ${styles.arrow_middle_fall}`} ref={el => midArr = el}></span>
                    <span className={`${styles.bar} ${styles.arrow_bottom_fall}`} ref={el => botArr = el} ></span>
                </button>
            </div>
            <nav ref={el => animNav = el} className={styles.navigation} >
                <div className={styles.ulNavWrapper} ref={el => ulWrap = el}>
                    <ul ref={el => navUl = el}>
                        <li><NavLink to="/" onClick={(e) => handleAnimation(e)}>HOME</NavLink></li>
                        <li><NavLink to="/portfolio" onClick={(e) => handleAnimation(e)}>PORTFOLIO</NavLink></li>
                        <li><NavLink to="/contact" onClick={(e) =>  handleAnimation(e)}>CONTACT</NavLink></li>
                    </ul>
                </div>
            </nav>         
       </Head>            
    )
}


const Head = styled.div`
  top: 0;
  height: 80px;
  width: 100% ;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index:251;
  position:absolute;
`

export default Header
