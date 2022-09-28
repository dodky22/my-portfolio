import React, { useEffect} from 'react'
import { useSelector} from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import RegisterForm from '../components/RegisterForm'

import styles from '../css/LoginRegisterStyles.module.css'

const LoginPage = ({location, history}) => {
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    return (
        <div className={styles.login_page} >
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
            <RegisterForm location={location}/>
        </div>
    )
}

export default LoginPage
