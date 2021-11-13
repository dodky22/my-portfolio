import React,{useEffect, useRef} from 'react'

import Separator from '../components/Separator.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Meta from '../components/Meta.jsx'
import Arrows from '../components/Arrows.jsx'

import { gsap, Power3 } from 'gsap'

import styles from '../css/ContactPageStyles.module.css'
import styled from 'styled-components'

const ContactPage = () => {
    let text = useRef(null);

    useEffect(() => {
        gsap.from(text, {duration: 0.5, x:'-100', opacity: 0, ease:Power3.easeInOut, delay: 0.5})
        // eslint-disable-next-line
    }, [])
    return (
        <>
        <Meta title='Contact | Let`s talk | Jozef Müller'/>      
        <Arrows linkLeft={'/portfolio'} labelLeft={'portfolio'}/>
        <Contact>
            <div id="quitFadeUp" className={styles.typewriter}>
                <h1 className={styles.contact_heading}>CONTACT</h1>
            </div>
            <Separator />
            <Text id="quitFadeUp" ref={el => (text = el)} >If you want to get in touch and talk please fill up this form or contact me via email at: 
                <a href="mailto:dodkymull@gmail.com" className={styles.homepage_link}>
                    <strong> dodkymull@gmail.com</strong>
                </a>
            </Text>
            <ContactForm />
        </Contact>
        </>
    )
}

const Contact = styled.div`
  min-height: calc(100vh - 100px);
  height:100%;
  background-color: #2f2f2f;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  padding-top: 50px;
`

const Text = styled.p`
    font-size: 18px;
    text-align: left;
`

export default ContactPage
