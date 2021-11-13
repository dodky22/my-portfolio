import React from 'react'
import {Helmet} from 'react-helmet'


const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Web Developer Porfolio',
    description: 'I am 24 years old student. Aspiring to become a web developer. I am learning programming in my spare time.',
    keywords: 'Portfolio, Web Dev, Javascript, React JS'
}

export default Meta