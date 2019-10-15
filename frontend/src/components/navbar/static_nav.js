import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './logo';


const Navbar = ({ loggedIn, logout }) => {



    return (
        <nav className="nav_main">
            <div className="nav_left">
                <Logo />
            </div>
            <div className="nav_right">
                {
                    loggedIn ? (
                        <Link href="/" className="nav_link" onClick={logout}>Logout</Link>
                    ) : (<>
                        <Link to="/login" className="nav_link">Login</Link>
                        <Link to="/signup" className="nav_link">Signup</Link>
                    </>)
                }
            </div>
        </nav>
    )
}



export default Navbar;