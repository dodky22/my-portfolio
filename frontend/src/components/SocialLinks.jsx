import React, {useEffect, useRef} from 'react'

import { gsap, Power3 } from 'gsap'

import styles from '../css/HomePageStyles.module.css'

const SocialLinks = () => {
    let socialLinks = useRef(null);

    let socialLinksTl = gsap.timeline({paused:true, reversed:true})

    useEffect(() => {
        socialLinksTl.to([...socialLinks.children], {duration:0.5, x:0, ease: Power3.easeInOut, stagger: 0.1, delay:0.7})
        socialLinksTl.play()
    }, [socialLinksTl])

    return (
        <div className={styles.social_links}>
            <ul ref={el => (socialLinks = el)}>
                <li id="quitFadeLeft"><small>Follow me</small></li>
                {/* // eslint-disable-next-line */}
                <li id="quitFadeLeft"><a href="https://github.com/jozefmull" target="_blank" rel="noopener noreferrer"  className={styles.github} title="Follow me on GitHub"><span>Follow me on GitHub</span></a></li>
                {/* // eslint-disable-next-line */}
                <li id="quitFadeLeft"><a href="https://linkedin.com/in/jozef-müller" target="_blank" rel="noopener noreferrer" className={styles.linkedin} title="Follow me on LinkedIn"><span>Follow me on LinkedIn</span></a></li>
                {/* // eslint-disable-next-line */}
                <li id="quitFadeLeft"><a href="\Jozef_Müller_en_CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.CV} title="My CV"><span>CV</span></a></li>
            </ul>
        </div>
    )
}

export default SocialLinks
