import React from 'react';
import Helmet from 'react-helmet';

const MetaData = ({title}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content="React App" />
        </Helmet>
    );
}

export default MetaData;