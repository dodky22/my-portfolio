import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazzyLoadImage = ({ imageUrl }) => {
    return (
        <LazyLoadImage 
            alt={imageUrl.split('/').pop().split('.')[0]}
            width= '100%'
            height= '100%'
            effect="blur"
            src={imageUrl} />
    )
}

export default LazzyLoadImage
