import React, {useRef, useEffect, useState} from 'react';
import { useFormik } from 'formik';
import {AwesomeButton} from 'react-awesome-button';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import {login} from '../actions/userActions'

import {gsap, Power4} from 'gsap'
import styles from '../css/LoginRegisterStyles.module.css'
 
 const validate = values => {
   const errors = {};
 
   if (!values.password) {
     errors.password = 'Required';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
   
   return errors;
 };
 
 const LoginForm = ({location}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  let form = useRef(null);
  
  const dispatch = useDispatch()

  let tl = gsap.timeline()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    tl.to(form, {duration:1.5, y:0,opacity:1, ease: Power4.easeInOut})
  }, [tl])

   const formik = useFormik({
     initialValues: {
        email: '',
        password: ''
     },
     validate,
     onSubmit: values => {
        dispatch(login(values.email, values.password))
    }
    }); 
    
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };

   return (
     <form onSubmit={formik.handleSubmit} className={styles.loginfrom} ref={el => (form = el)}>
         <div>
            <h1>Login</h1>
            <div className={styles.logininputWrap}>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Email"
                />
                <span className={styles.line} ></span>
                {formik.touched.email && formik.errors.email ? (
                    <span className={styles.loginformerrormsg}>{formik.errors.email}</span>
                ) : null}
            </div>
            <div className={styles.logininputWrap} >
                <input
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Password"
                />
                <span className={styles.line} ></span>
                {formik.touched.password && formik.errors.password ? (
                    <span className={styles.loginformerrormsg}>{formik.errors.password}</span>
                ) : null}
                <i style={{ color: passwordShown ? '#ff9307' : null, opacity: 0}} className={`fas fa-eye ${styles.password_eye_toogle}`}
                    onClick={togglePasswordVisiblity} ></i>
            </div>
        </div>
        <div className={styles.btnWrap}>
          <AwesomeButton type="primary" >LOGIN</AwesomeButton>
          <p>New account? <Link to={redirect ? `/jm-register?redirect=${redirect}` : '/register'}>Register</Link></p>
        </div>
     </form>
   );
 };

export default LoginForm
