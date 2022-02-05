import React, {useRef, useEffect, useState} from 'react';
import { useFormik } from 'formik';
import {AwesomeButton} from 'react-awesome-button';
import axios from 'axios'

import {gsap} from 'gsap'
import styles from '../css/ContactPageStyles.module.css'
import Message from '../components/Message'
 
 const validate = values => {

   const errors = {};
 
   if (!values.name) {
     errors.name = 'Required';
   } else if (values.name.length < 5) {
     errors.name = 'Must be 5 characters or more';
   }else if (values.name.length > 30){
     errors.name = 'Too long';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
   
   if (!values.message) {
    errors.message = 'Required';
    } else if (values.message.length < 20) {
        errors.message = 'Must be 20 characters or more';
    }
 
   return errors;
 };
 
 const ContactForm = () => {
  // just for gsap animations
  let field1 = useRef(null);
  let field2 = useRef(null);
  let field3 = useRef(null);
  let button = useRef(null);

  // state of status and status color for message after submit
  const [status, setstatus] = useState(null)
  const [statuscolor, setstatuscolor] = useState(null)

  // create timeline
  let formtl = gsap.timeline()

  useEffect(() => {
    formtl.to( field1, {duration:0.2, x:0, delay: 1.5})
          .to( field2, {duration:0.2, x:0})
          .to( field3, {duration:0.2, x:0})
          .to( button, {duration:0.2, x:0})
     // eslint-disable-next-line 
  }, [])

   const formik = useFormik({
     // initial values of form
     initialValues: {
       name: '',
       email: '',
       message: ''
     },
     // validate function declared outside of contact form component
     validate,
     // on form submit
     onSubmit: values => {
      //---axios post request with form values
      axios({
        method: "POST", 
        url:"/api/contact", 
        data:  values
      }).then((response)=>{
        //---response from server can be success or fail depending on if email was sent
        if (response.data.status === 'success'){
            setstatus('Message sent. :)') 
            setstatuscolor('#7bff72')

            formik.resetForm();
        }else if(response.data.status === 'fail'){
          setstatus('Message failed to send. :(') 
          setstatuscolor('#ff7272')
        }
      })
    }
    });    

   return (
     <form onSubmit={formik.handleSubmit} className={styles.contactfrom} >
       {/* if status isnt null then show message if the mail was sent succesfully */}
        {status !== null ? 
          <div id="quitFadeDown" style={{width:'100%', display: 'flex', justifyContent: 'center', overflow: 'hidden'}}>
              <Message color={statuscolor}>{status}</Message>
          </div> : null}
        <div id="quitFadeDown" className={styles.contactinputWrap} >
            <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="NAME"
                ref={el => (field1 = el)}
            />
            <span className={styles.line} ></span>
            {formik.touched.name && formik.errors.name ? (
                <span className={styles.contactformerrormsg}>{formik.errors.name}</span>
            ) : formik.touched.name ? <span className={styles.check}>&#10003;</span> : null}
        </div>
        
        <div id="quitFadeDown"className={styles.contactinputWrap}>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="EMAIL"
                ref={el => (field2 = el)}
            />
             <span className={styles.line} ></span>
            {formik.touched.email && formik.errors.email ? (
                <span className={styles.contactformerrormsg}>{formik.errors.email}</span>
            ) : formik.touched.email ? <span className={styles.check}>&#10003;</span> : null}
       </div>
        
        <div id="quitFadeDown" className={styles.contactinputWrap}>
            <textarea
                id="message"
                name="message"
                type="textarea"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                placeholder="MESSAGE"
                ref={el => (field3 = el)}
            />
             <span className={styles.line} ></span>
            {formik.touched.message && formik.errors.message ? (
                <span className={styles.contactformerrormsg}>{formik.errors.message}</span>
            ) : formik.touched.message ? <span className={styles.check}>&#10003;</span> : null}
        </div>

        <div id="quitFadeDown" className={styles.btnWrap} ref={el => (button = el)}>
          <AwesomeButton type="primary" ripple><span style={{fontWeight:900, userSelect: 'none'}} >SEND</span></AwesomeButton>
        </div>    
     </form>
   );
 };

export default ContactForm
