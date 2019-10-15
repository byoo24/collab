import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {

    return (
        <Link to="/" className="logo">
            <i className="logo_icon material-icons">insert_chart_outlined</i>
            <span className="logo_text">Collab</span>
        </Link>
    )
}



export default Logo;