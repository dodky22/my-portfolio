import React, { useEffect} from 'react'
import { useSelector} from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import LoginForm from '../components/LoginForm'


import styles from '../css/LoginRegisterStyles.module.css'

const LoginPage = ({location, history}) => {
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin


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
            <LoginForm location={location}/>
        </div>
    )
}

export default LoginPage
