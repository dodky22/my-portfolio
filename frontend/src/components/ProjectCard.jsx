import React from 'react'
import {Link} from 'react-router-dom'

import Ribbon from '../components/Ribbon'
import LazzyLoadImage from '../components/LazzyLoadImage'

import {gsap, Power4} from 'gsap'

import styles from '../css/PortfolioPageStyles.module.css'

const ProjectCard = ({animationOrder, project}) => {
    const { name, technologies, imgs, status, _id } = project;

    const animateElementsOut = (e) => {
        e.preventDefault()
        
        gsap.to('#quitFadeUp', {duration: 0.2 ,y:'-100', opacity:0, ease:Power4.easeInOut , stagger:0.1})
        gsap.to('#quitFadeDown', {duration: 0.2 ,y:'100', opacity:0, ease:Power4.easeInOut , stagger:0.1})
        gsap.to('#quitFadeLeft', {duration: 0.2 ,x:'-100', opacity:0, ease:Power4.easeInOut , stagger:0.1})
        gsap.to('#quitFadeRight', {duration: 0.2 ,x:'100', opacity:0, ease:Power4.easeInOut , stagger:0.1})

        setTimeout(() => {
            window.location = e.target.href; 
        }, 1000);
    }

    return (
        <div className={styles.item_card} style={{"--animation-order": 1 + animationOrder}}>
            <div className={styles.item_card_header}>
                <div className={styles.arrows}>
                <span>&#60;</span>
                <span>&#62;</span>
                <span>&#8634;</span>
                </div>
                <div className={styles.adress}>
                <div>
                    <h4>{name}</h4>
                </div>
                <span>&#9734;</span>
                </div>
                <span className={styles.vertical_dots}>⋮</span>
            </div>

            <div className={styles.main_info} >
                <LazzyLoadImage imageUrl={imgs[0]} />
                <div className={styles.item_image_shadow}></div>
                <div
                className={styles.hover_info}
                style={{
                    backgroundImage: `url("${imgs[1]}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "rgba(0, 0, 0,0.45)",
                    backgroundBlendMode: "multiply",
                }}
                >
                {/* <LazzyLoadImage imageUrl={imgs[1]} /> */}
                    <div className={styles.ullinkwrap}>
                        <ul >
                            {technologies.map((item, index) => {
                                return <li key={index} style={{"--animation-order": 8 + index}} >{item}</li>;
                            })}
                        </ul>
                        <Link to={`/project/${_id}`} onClick={(e) => animateElementsOut(e)}>...more</Link>
                    </div>
                </div>
                <Ribbon title={status} />
            </div>
        </div>
    )
}

export default ProjectCard
