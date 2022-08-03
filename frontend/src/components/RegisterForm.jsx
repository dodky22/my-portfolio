import React, {useState, useRef, useEffect} from 'react';
import { useFormik } from 'formik';
import {AwesomeButton} from 'react-awesome-button';
import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import {register} from '../actions/userActions'

import {gsap, Power4} from 'gsap'
import styles from '../css/LoginRegisterStyles.module.css'
 
 const validate = values => {
   const errors = {};
 
   if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length < 5) {
        errors.name = 'Must be 5 characters or more';
    }else if (values.name.length > 30){
        errors.name = 'Too long';
    }

   if (!values.password) {
     errors.password = 'Required';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }

   
   if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match!';
    }
   
   return errors;
 };
 
 const RegisterForm = ({location}) => {
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
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
     },
     validate,
     onSubmit: values => {
         dispatch(register(values.name, values.email, values.password))
    }
    }); 

      const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        };   

   return (
     <form onSubmit={formik.handleSubmit} className={styles.loginfrom} ref={el => (form = el)}>
         <div>
            <h1>Register</h1>
            <div className={styles.logininputWrap}>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Name"
                />
                <span className={styles.line} ></span>
                {formik.touched.name && formik.errors.name ? (
                    <span className={styles.loginformerrormsg}>{formik.errors.name}</span>
                ) : null}
            </div>
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
                <i style={{ color: passwordShown ? '#ff9307' : null, opacity:0}} className={`fas fa-eye ${styles.password_eye_toogle}`}
                 onClick={togglePasswordVisiblity} ></i>

            </div>
            <div className={styles.logininputWrap} >
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={passwordShown ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder="Confirm password"
                />
                <span className={styles.line} ></span>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <span className={styles.loginformerrormsg}>{formik.errors.confirmPassword}</span>
                ) : null}

            </div>
        </div>
        <div className={styles.btnWrap}>
          <AwesomeButton type='primary' >REGISTER</AwesomeButton>
          <p>Have an account? <Link to={redirect ? `/jm-login?redirect=${redirect}` : '/login'}>Login</Link></p>
        </div>
     </form>
   );
 };

export default RegisterForm
