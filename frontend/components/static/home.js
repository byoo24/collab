import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const Home = (props) => {

    const handleLogout = () => {
        props.logout();
    }

    
    return (
        <div id="main">
            <NavLink to="/signup" activeClassName="selected">Signup</NavLink>
            <NavLink to="/login" activeClassName="selected">Login</NavLink>
            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    )
}


const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mdp)(Home);