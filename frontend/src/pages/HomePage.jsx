import React, {useEffect, useRef} from 'react'

import {Link, useHistory} from 'react-router-dom'

import { gsap, Power3 } from 'gsap'
import {animateElementsOut, animOutTimeline} from '../animationHelpers/gsapHelpers.js'

import Meta from '../components/Meta.jsx'
import Arrows from '../components/Arrows.jsx'
import SocialLinks from '../components/SocialLinks.jsx'

import {AwesomeButton} from 'react-awesome-button';

import styled from 'styled-components'
import styles from '../css/HomePageStyles.module.css'
import "react-awesome-button/dist/styles.css";

const HomePage = () => {
    let history = useHistory()
    let buttons = useRef(null);

    useEffect(() => {
        gsap.to(buttons,{
            duration: 1,
            delay: 2,
            y:"0",
            ease:Power3.easeInOut,          
          })
    }, [buttons])

    const handleHomeBtnClick = (e) => {
        e.preventDefault()

        let href 

        if(e.target.classList.contains('aws-btn__content')){
            href = `/${e.target.parentNode.parentNode.parentNode.href.split('/').pop()}`
        }else if (e.target.classList.contains('aws-btn__wrapper')){
            href = `/${e.target.parentNode.parentNode.href.split('/').pop()}`
        }else if(e.target.classList.length === 0){
            href = `/${e.target.parentNode.parentNode.parentNode.parentNode.parentNode.href.split('/').pop()}`
        }else if (e.target.href) {
            href = `/${e.target.href.split('/').pop()}`
        }else return;

        animateElementsOut()
        setTimeout(() => {
            history.push(href)
        }, animOutTimeline.duration() * 1000);
    }

    const getAge = (dateString) => {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleClick = (e) => {
        e.preventDefault()
        animateElementsOut()

        console.log(e.target.parentNode.href);
        setTimeout(() => {
            history.push(`/${e.target.parentNode.href.split('/').pop()}`)
        }, animOutTimeline.duration() * 1000 + 300 );  
    }

    return (
        <>
        <Meta />
        <Arrows linkRight={'/portfolio'} labelRight={'portfolio'} linkLeft={'/home'} labelLeft={'home'}/>
        <SocialLinks />
        <Home>
            {/* DESKTOP */}
            <div id="quitFadeUp" className={`${styles.typewriter} ${styles.desktop_title} `}>
                <h1 className={styles.home_heading}>Hello, my name is Jozef Müller</h1>
            </div>
            <div   className={`${styles.desktop_home_p}`}>
                <div id="quitFadeUp" className={styles.typewriter}>
                    <p  className={styles.home_paragraph}>
                        I am {getAge("1997/05/08")} years old graduate. Aspiring to become a Frontend Developer.
                    </p>
                </div>
                <br/>
                <div id="quitFadeUp" className={`${styles.typewriter} ${styles.desktop_middle_line}`}>
                    <p className={styles.home_paragraph_2}>
                         If you want to see my work feel
                        free to visit my {" "}
                            <Link to="/portfolio" className={styles.homepage_link} onClick={(e) => handleClick(e)}>
                                <strong>portfolio page.</strong>
                            </Link>
                    </p>
                </div>
                <br/>
                <div id="quitFadeUp" className={styles.typewriter}>
                    <p className={styles.home_paragraph_3}>
                              
                            {" "}You can contact me via email at:{" "}
                            <a href="mailto:dodkymull@gmail.com" className={styles.homepage_link}>
                                <strong>dodkymull@gmail.com</strong>
                            </a>  
                    </p>                          
                </div>
                <br/>
          </div>
          {/* END OF DESKTOP */}
          {/* MOBILE  */}
            <div id="quitFadeUp" className={`${styles.typewriter} ${styles.mobile_title} `}>
                <h1 className={styles.home_heading_1}>Hello, my name is</h1>
            </div>
            <div id="quitFadeUp" className={`${styles.typewriter} ${styles.mobile_title} `}>
                <h1 className={styles.home_heading_2}>Jozef Müller</h1>
            </div>
          <div className={`${styles.mobile_home_p}`}>
                <div id="quitFadeUp" className={styles.typewriter}>
                <p  className={styles.home_paragraph}>
                    I am 25 years old graduate. Aspiring to become a 
                </p>
                </div>
                <br/>
                <div id="quitFadeUp" className={`${styles.typewriter} ${styles.mobile_middle_line}`}>
                <p className={styles.home_paragraph_2}>
                    Frontend Developer.  
                </p>
                </div>
                <br/>
                <div id="quitFadeUp" className={styles.typewriter}>
                    <p className={styles.home_paragraph_3}>
                     If you want to see my work 
                    </p>                          
                </div>
                <br/>
                <div id="quitFadeUp" className={styles.typewriter}>
                    <p className={styles.home_paragraph_4}>
                    feel free to visit my{" "} 
                        <Link to="/portfolio" className={styles.homepage_link}>
                            <strong>portfolio page. </strong>
                        </Link>
                        You can also  
                    </p>                          
                </div>
                <br/>
                <div id="quitFadeUp" className={styles.typewriter}>
                    <p className={styles.home_paragraph_5}>
                    contact me via email at:{" "}
                        <a href="mailto:dodkymull@gmail.com" className={styles.homepage_link}>
                            <strong> dodkymull@gmail.com</strong>
                        </a>
                    </p>                          
                </div>
                <br/>
          </div>
          {/* END OF MOBILE */}
          {/* BUTTONS */}
          <div id="quitFadeDown"  className={`${styles.buttons_container}`} ref={el => (buttons = el)} >
            <Link to="/portfolio" onClick={(e) => {handleHomeBtnClick(e)}}>
                <AwesomeButton type="primary" ripple><span style={{fontWeight:700, userSelect: 'none'}}>PORFOLIO</span></AwesomeButton>
            </Link>
            <Link to="/contact" onClick={(e) => {handleHomeBtnClick(e)}}>
                <AwesomeButton type="primary" ripple><span style={{fontWeight:700, userSelect: 'none'}}>CONTACT</span></AwesomeButton>
            </Link>
          </div>
          {/* ENDOF BUTTONS */}
        </Home>
        </>
    )
}

const Home = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

export default HomePage