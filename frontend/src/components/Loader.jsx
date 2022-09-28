import React from 'react'
import Gif from '../images/loader.svg'

const Loader = () => {
    return (
        // <div className="lds-facebook"><div></div><div></div><div></div></div>
        <img src={Gif} alt="Loader" style={{margin: '0px auto'}} />
    )
}

export default Loader
