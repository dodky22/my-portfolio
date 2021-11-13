import React, {useEffect, useRef} from 'react'

import {Link} from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import Arrows from '../components/Arrows.jsx'
import SocialLinks from '../components/SocialLinks.jsx'

import {AwesomeButton} from 'react-awesome-button';

import { gsap, Power3 } from 'gsap'

import styled from 'styled-components'
import styles from '../css/HomePageStyles.module.css'
import "react-awesome-button/dist/styles.css";

const HomePage = () => {
    let buttons = useRef(null);

    useEffect(() => {
        gsap.to(buttons,{
            duration: 1,
            delay: 2,
            y:"0",
            ease:Power3.easeInOut,          
          })
    }, [buttons])

    return (
        <>
        <Meta />
        <Arrows linkRight={'/portfolio'} labelRight={'portfolio'} linkLeft={'/home'} labelLeft={'home'}/>
        <SocialLinks />
        <Home>
            <div id="quitFadeUp" className={`${styles.typewriter} ${styles.desktop_title} `}>
                <h1 className={styles.home_heading}>Hello, my name is Jozef Müller</h1>
            </div>
            <div   className={`${styles.desktop_home_p}`}>
                <div id="quitFadeUp" className={styles.typewriter}>
                <p  className={styles.home_paragraph}>
                    I am 24 years old student. Aspiring to become a web developer. I
                    am learning
                </p>
                </div>
                <br/>
                <div id="quitFadeUp" className={`${styles.typewriter} ${styles.desktop_middle_line}`}>
                <p className={styles.home_paragraph_2}>
                    programming in my spare time. If you want to see my work feel
                    free to
                </p>
                </div>
                <br/>
                <div id="quitFadeUp" className={styles.typewriter}>
                <p className={styles.home_paragraph_3}>
                    visit my {" "}
                   
                        <Link to="/portfolio" className={styles.homepage_link}>
                            <strong>portfolio page. </strong>
                        </Link>
                    
                    You can contact me via email at:{" "}
                    
                        <a href="mailto:dodkymull@gmail.com" className={styles.homepage_link}>
                            <strong>dodkymull@gmail.com</strong>
                        </a>
                   
                </p>                          
                </div>
                <br/>
          </div>
          <div id="quitFadeDown"  className={`${styles.buttons_container}`} ref={el => (buttons = el)} >
            <Link to="/portfolio">
                <AwesomeButton type="primary"><span style={{fontWeight:500}}>PORFOLIO</span></AwesomeButton>
            </Link>
            <Link to="/contact">
                <AwesomeButton type="primary"><span style={{fontWeight:500}}>CONTACT</span></AwesomeButton>
            </Link>
          </div>
        </Home>
        </>
    )
}

const Home = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

export default HomePage