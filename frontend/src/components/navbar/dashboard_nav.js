import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './logo';

import { navIndex, navUser, navCreate, navClear } from '../../actions/nav_actions';
import { modalNewBoard } from '../../actions/modals_action';
import { logout } from '../../actions/session_actions';


const Navbar = (props) => {
    const { logout, classValue, navState } = props;
    const boards = props.boards || {};
    const extraStyle = classValue ? classValue : '';
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    useEffect(() => {
        setActiveSubMenu(navState);
    }, [navState])


    const toggleSubMenu = (field) => {
   
        switch (field) {
            case "navIndex":
                if (activeSubMenu != 'NAV_INDEX'){
                    props.navIndex();
                    return;
                }
                break;
            case "navCreate":
                if (activeSubMenu != 'NAV_CREATE') {
                    props.navCreate();
                    return;
                }
                break;
            case "navUser":
                if (activeSubMenu != 'NAV_USER') {
                    props.navUser();
                    return;
                }
                break;
        }
        props.navClear();
    }
    
    const boardsIndex = navState === 'NAV_INDEX' ? (
        <div className="nav_boards_index">
            <h6 className="nav_boards_title">Personal Boards</h6>

            { Object.keys(boards).map((boardId, i) => {
                const board = boards[boardId];
                return (
                    <Link key={i} to={`/dashboard/boards/${board.id}`} className={`nav_boards_link bg-${board.bgColor}`}>
                        <span className="nav_boards_tile"></span>
                        <span className="nav_boards_text">{board.name}</span> 
                    </Link> 
                )
            })}
        </div>
    ) : ( null );

    const createMenu = navState === 'NAV_CREATE' ? (
        <div className="nav_boards_create">
            <h6 className="nav_sub_title">Create</h6>
            <div className="nav_sub_link" onClick={props.modalNewBoard}>
                <h6 className="nav_sub_link-title">
                    <span className="nav_sub_link-icon material-icons">insert_chart_outlined</span>
                    Create Board
                </h6>
                <p>A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
            </div>
        </div>
    ) : ( null );

    const userMenu = navState === 'NAV_USER' ? (
        <div className="nav_user_menu">
            <h6 className="nav_sub_title">Menu</h6>
            <div className="nav_sub_link" onClick={logout}>
                <h6 className="nav_sub_link-title">
                    <span className="nav_sub_link-icon material-icons">meeting_room</span>
                    Logout
                </h6>
            </div>
        </div>
    ) : (null);


    return (
        <div className={`dashboard_header ${extraStyle}`}>
            <nav className="nav_dashboard">
                <div className="nav_left">
                    <Link to="/dashboard/" className="nav_icon material-icons-outlined">home</Link>
                    <span className="nav_icon material-icons" onClick={() => toggleSubMenu('navIndex')}>insert_chart_outlined</span>
                </div>
                <div className="nav_mid">
                    <Logo />
                </div>
                <div className="nav_right">
                    <span className="nav_icon material-icons" onClick={() => toggleSubMenu('navCreate')}>add</span>
                    <span className="nav_icon material-icons" onClick={() => toggleSubMenu('navUser')}>person_outline</span>
                </div>
            </nav>
            
            { boardsIndex }
            { createMenu }
            { userMenu }
        </div>
    )
}


const msp = (state) => {
    return {
        navState: state.nav
    }
}


const mdp = (dispatch) => {
    return {
        modalNewBoard: () => dispatch(modalNewBoard()),
        navIndex: () => dispatch(navIndex()),
        navUser: () => dispatch(navUser()),
        navCreate: () => dispatch(navCreate()),
        navClear: () => dispatch(navClear()),
        logout: () => dispatch(logout())
    }
}


export default connect(msp, mdp)(Navbar);