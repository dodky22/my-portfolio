import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'
import {Link} from 'react-router-dom'

import styles from '../css/LoginRegisterStyles.module.css'

const Logout = () => {
    const [open, setopen] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logouthandler = () => {
        dispatch(logout())
    }

    return (
        <div className={styles.logout_wrap}>
           {userInfo ? (
                <>
                    {open ? (
                        <ul>
                            <li onClick={logouthandler}>Logout</li>
                            {userInfo.isAdmin && (
                                <Link to='/admin/projects'><li>Projects</li></Link>
                            )}
                        </ul>
                    ) : null}
                    <div className={styles.loggedin_status_layout}>
                        <h3>{userInfo.name}</h3>
                        <span onClick={() => setopen(!open)}>⋮</span>                
                    </div>
                </>
           ): null} 
        </div>
    )
}

export default Logout
