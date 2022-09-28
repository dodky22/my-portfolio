import React,{useEffect,useRef} from 'react'
import {Link} from 'react-router-dom'
import {useLocation, useHistory} from 'react-router-dom'

import { gsap, Power4} from 'gsap'
import {animateElementsOut, animOutTimeline} from '../animationHelpers/gsapHelpers.js'

import styles from '../css/ArrowsStyles.module.css'

const Arrows = ({linkRight, labelRight, labelLeft, linkLeft}) => {
    const location = useLocation()
    const history = useHistory()

    let arrowLeftTl = gsap.timeline({paused:true, reversed:true})
    let arrowRightTl = gsap.timeline({paused:true, reversed:true})
    let arrowclickRightTl = gsap.timeline({paused:true, reversed:true})
    let arrowclickLeftTl = gsap.timeline({paused:true, reversed:true})

    let arrowLeft = useRef(null);
    let arrowRight = useRef(null);
    let arrowLeftSpan = useRef(null);
    let arrowRightSpan = useRef(null);

    useEffect(() => {
        if(arrowRight.current !== null) {
            arrowRightTl.from(arrowRight, {duration:0.3, x:'1000', ease: Power4.easeInOut, delay:0.7})
            arrowRightTl.play()
            arrowclickRightTl.to(arrowRightSpan,{duration:0.1, x:'100', opacity:0, ease: Power4.easeInOut}, 'start')
                            .to(arrowRight, {duration:0.1, x:'1000', ease: Power4.easeInOut},'-=0.1')
        } 
        if(arrowLeft.current !== null) {
            arrowLeftTl.from(arrowLeft, {duration:0.3, x:'-1000', ease: Power4.easeInOut, delay:0.7})
            arrowLeftTl.play()
            arrowclickLeftTl.to(arrowLeftSpan,{duration:0.1, x:'-100', opacity:0, ease: Power4.easeInOut}, 'start')
                    .to(arrowLeft, {duration:0.1, x:'-1000', ease: Power4.easeInOut},'-=0.1')
        }
      //   eslint-disable-next-line
    }, [])

    const arrowClickAnim = (e) => {
        e.preventDefault()
        
        arrowclickLeftTl.play()
        arrowclickRightTl.play()
        animateElementsOut()

        setTimeout(() => {
            history.push(`/${e.target.href.split('/').pop()}`)
        }, animOutTimeline.duration() * 1000 + 300 );  
    }

    return (
        <>
            {location.pathname === '/contact' ? null : (
                <Link id="right quitFadeRight" to={linkRight} className={`${styles.arrows_link_main} ${styles.arrowRight}`} ref={el => (arrowRight = el)}
                onClick={(e) => arrowClickAnim(e)}> 
                    <span  ref={el => (arrowRightSpan = el)}>{labelRight}</span>
                    <em></em>
                </Link>
            )}
            {location.pathname === '/' ? null : (
                <Link id="left quitFadeLeft" to={linkLeft} className={`${styles.arrows_link_main} ${styles.arrowLeft}`} ref={el => (arrowLeft = el)}
                onClick={(e) => arrowClickAnim(e)}> 
                    <span  ref={el => (arrowLeftSpan = el)}>{labelLeft}</span>
                    <em></em>
                </Link>
            )}
            
        </>
    )
}

export default Arrows
