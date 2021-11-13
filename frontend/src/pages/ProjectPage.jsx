import React , {useEffect, useRef} from 'react'
import {AwesomeButton} from 'react-awesome-button';

import {useDispatch, useSelector} from 'react-redux'
import {singleProject} from '../actions/projectActions'

import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import Separator from '../components/Separator.jsx'
import Footer from '../components/Footer.jsx'
import Meta from '../components/Meta.jsx'
import ImageSlider from '../components/ImageSlider.jsx'

import { gsap, Power3 } from 'gsap'

import styles from '../css/SingleProjectStyles.module.css'

const ProjectPage = ({match}) => {
    let techul = useRef(null);
    let tl = gsap.timeline()

    const dispatch = useDispatch()

    const projectDetails = useSelector(state => state.projectDetails)
    const {loading, error, project} = projectDetails

    const {shortDesc, name, description, technologies, codeUrl, url, imgs} = project

    useEffect(() => {
        dispatch(singleProject(match.params.id))
    }, [dispatch, match])

    useEffect(() => {
        if(technologies){
            tl.staggerTo([...techul.children], 1, {x: 0, ease: Power3.easeInOut}, 0.2)
        }
        gsap.from('.singlePortfolioEnterDown', {duration: 0.5, y: '-20', opacity:0, ease:Power3.easeInOut, stagger: 0.1})
    }, [technologies, tl])

    
    return (
        <>
        <Meta title={`${name} | ${shortDesc} | Jozef Müller`} />
        <div className={styles.single_project_container}>
            {loading ? <Loader /> : error ? <Message>{error}</Message> :
                <div className={styles.single_item_main_div}>
                    <div className={styles.single_item_head_wrap}>
                        <div id="quitFadeUp" className={styles.typewriter}>
                            <h1 className={styles.single_item_heading}>{name}</h1>
                        </div>
                        <Separator />
                    </div>
                    <p id="quitFadeUp" className="singlePortfolioEnterDown" >{shortDesc}</p>
                    <div  id="quitFadeUp" className={`${styles.single_item_buttons} singlePortfolioEnterDown`}>
                        <AwesomeButton className={styles.single_item_button} type="primary" href={url} >
                            Visit the website
                        </AwesomeButton>
                        {codeUrl === "-" ? ( <button className={styles.single_item_button_disabled} type="primary" disabled>
                            Code
                        </button>): ( <AwesomeButton className={styles.single_item_button} type="primary" href={codeUrl}>
                            Code
                        </AwesomeButton>)  }    
                    </div>
                    <ImageSlider images={imgs} />
                    <h2 id="quitFadeDown" className={`${styles.single_item_about} singlePortfolioEnterDown`} >About</h2>
                    <Separator />
                    <p id="quitFadeDown" className="singlePortfolioEnterDown">{description}</p>
                    <h2 id="quitFadeDown" className={`${styles.single_item_tech} singlePortfolioEnterDown`}>Tech</h2>
                    <h3 id="quitFadeDown" className="singlePortfolioEnterDown">Technologies i used while working on this project</h3>
                    <Separator />
                    <ul className={styles.tech_list_items} ref={el => (techul = el)}>
                        {technologies && technologies.map((item, id) => {
                        return <li id="quitFadeLeft" key={id}>{item}</li>;
                        })}
                    </ul>
                    <Separator />
                    <Footer/>
                </div>
            }
        </div>
        </>
    )
}

export default ProjectPage
