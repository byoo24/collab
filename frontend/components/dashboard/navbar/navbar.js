import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    const {currentUser, logout} = props;

    return(
        <nav className="ui menu dash-menu">
            <Link to="/dashboard" className="header item">
                <img className="logo" src="./images/logo-white.svg" alt="" />
                Collab
                    </Link>

            <div className="right menu">
                {currentUser.username ? (
                    <div className="item username">
                        <i className="material-icons">person</i>
                        {currentUser.username}
                    </div>
                ) : null}

                <Link to="/login" className="item" onClick={props.logout}>Logout</Link>
            </div>
        </nav>
    );
}



export default NavBar;