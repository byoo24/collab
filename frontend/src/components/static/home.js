import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { isEmpty } from '../../libs/helper_methods';

import Navbar from '../navbar/static_nav';
import heroSvg from '../images/hero-a.svg';

const Home = (props) => {
    const { loggedIn, logout } = props;

    
    return (
        <>
            <header className="main_header">
                <Navbar loggedIn={loggedIn} logout={logout} />
            </header>

            <section className="hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <h1 className="hero_title">Collab lets you work more collaboratively and get more done.</h1>
                            <p className="hero_text">Collab's boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.</p>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <img src={heroSvg} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>

        
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