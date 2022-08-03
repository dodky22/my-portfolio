import React,{useEffect, useRef} from 'react'

import Separator from '../components/Separator.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Meta from '../components/Meta.jsx'
import Arrows from '../components/Arrows.jsx'

import { gsap } from 'gsap'

import styles from '../css/ContactPageStyles.module.css'
import styled from 'styled-components'

const ContactPage = () => {
    let text = useRef(null);

    useEffect(() => {
        gsap.to(text, {duration: 1, x:0,opacity:1, delay: 1})
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
            <Text id="quitFadeUp" ref={el => (text = el)}>
                If you want to get in touch and talk please fill up this form or contact me via email at: 
                <a href="mailto:dodkymull@gmail.com" className={styles.contactpage_link}>
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
  padding-top:50px;
`

const Text = styled.p`
    font-size: 18px;
    text-align: left;
    color: #cacaca;
    transform: translateX(-30px);
    opacity:0;
    line-height: 1.4;
    @media (max-width: 480px) {
        font-size: 14px;
    }
`

export default ContactPage
