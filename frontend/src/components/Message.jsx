import React from 'react'

import styles from '../css/MessageStyles.module.css'

const Message = ({color, children}) => {
    
    
    return (
            <div id="quitFadeUp" className={styles.statusmessage} style={{background: color}}>
                {children}
                {/* <em className={styles.closeMessage} onClick={() => clickCloseHandle}>X</em> */}
            </div>
    )
}

Message.defaultProps = {
    color: '#ff7272'
}

export default Message
