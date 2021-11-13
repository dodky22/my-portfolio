import React from 'react'

import styles from '../css/MessageStyles.module.css'

const Message = ({color, children}) => {

    
    return (
            <div id="quitFadeUp" className={styles.statusmessage} style={{background: color}}>
                {children}
            </div>
    )
}

Message.defaultProps = {
    color: '#ff7272'
}

export default Message
