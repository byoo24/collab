import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './logo';


const Navbar = (props) => {
    const { loggedIn, logout, classValue } = props;

    const extraStyle = classValue ? classValue : '';

    return (
        <div className={`dashboard_header ${extraStyle}`}>
            <nav className="nav_dashboard">
                <div className="nav_left">
                    <span className="nav_icon material-icons-outlined">home</span>
                    <span className="nav_icon material-icons">insert_chart_outlined</span>
                </div>
                <div className="nav_mid">
                    <Logo />
                </div>
                <div className="nav_right">
                    <span className="nav_icon material-icons">add</span>
                    <span className="nav_icon material-icons">person_outline</span>
                </div>
            </nav>
        </div>
    )
}



export default Navbar;