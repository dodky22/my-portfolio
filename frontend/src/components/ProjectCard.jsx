import React, {useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

import Ribbon from '../components/Ribbon'
import LazzyLoadImage from '../components/LazzyLoadImage'

import {animateElementsOut, animOutTimeline} from '../animationHelpers/gsapHelpers.js'

import styles from '../css/PortfolioPageStyles.module.css'

const ProjectCard = ({animationOrder, project}) => {
    let history = useHistory()

    const { name, technologies, imgs, status, slug } = project;

    useEffect(() => {
        imgs && imgs.forEach(img => {
            new Image().src = img;
        })
    }, [imgs])

    const handleClick = (e) => {
        e.preventDefault()
        
        animateElementsOut()

        setTimeout(() => {
            history.push(`/project/${e.target.href.split('/').pop()}`)
        },( animOutTimeline.duration()*1000) + 300);
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
                    <div className={styles.ullinkwrap}>
                        <ul >
                            {technologies.map((item, index) => {
                                return <li key={index} style={{"--animation-order": 8 + index}} >{item}</li>;
                            })}
                        </ul>
                        <Link to={`/project/${slug}`} onClick={(e) => handleClick(e)}>...more</Link>
                    </div>
                </div>
                <Ribbon title={status} />
            </div>
        </div>
    )
}

export default ProjectCard
