import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { isEmpty } from '../../libs/helper_methods';


const Home = (props) => {
    const { loggedIn } = props;

    const handleLogout = () => {
        props.logout();
    }

    
    return (
        <div id="main">
            <nav className="nav_main">
                <div className="nav_main-container">
                    <div className="nav_left">
                        <div className="logo">
                            <img src="./images/logo-white.svg" />
                            <span className="logo-text">collab</span>
                        </div>
                    </div>

                    <div className="nav_right">
                        {
                            loggedIn ? (
                                <a href="" className="nav_item" onClick={handleLogout}>Logout</a>
                            ) : (<>
                                <NavLink to="/signup" className="nav_item" activeClassName="active">Signup</NavLink>
                                <NavLink to="/login" className="nav_item" activeClassName="active">Login</NavLink>
                            </>)
                        }
                    </div>
                </div>                
            </nav>
            <section className="hero">
                <div className="hero-container row">
                    <div className="hero-col">
                        <h1>Collab lets you work more collaboratively and get more done.</h1>
                        <p>Collab's boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.</p>
                    </div>
                    <div className="hero-col">
                        <img src="./images/hero-a.svg" alt=""/>
                    </div>
                </div>
            </section>    
        </div>
    )
}




const msp = state => ({
    loggedIn: !isEmpty(state.session),
})

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(msp, mdp)(Home);