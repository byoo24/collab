import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from './logo';


const Navbar = (props) => {
    const { loggedIn, logout, classValue } = props;
    const boards = props.boards || {};
    const extraStyle = classValue ? classValue : '';
    const [ toggleBoardIndex, setToggleBoardIndex ] = useState(false);
    const [subMenus, setSubMenus] = useState({
        boardsIndex: false,
        createMenu: false,
        userMenu: false
    });

    const toggleSubMenu = (field) => {
        const copySubMenus = {
            boardsIndex: false,
            createMenu: false,
            userMenu: false
        };
        const toggled = !subMenus[field]
        copySubMenus[field] = toggled;
        setSubMenus(copySubMenus);
    }
    
    const boardsIndex = subMenus.boardsIndex ? (
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

    const createMenu = subMenus.createMenu ? (
        <div className="nav_boards_create">
            <h6 className="nav_sub_title">Create</h6>
            <div className="nav_sub_link">
                <h6 className="nav_sub_link-title">
                    <span className="nav_sub_link-icon material-icons">insert_chart_outlined</span>
                    Create Board
                </h6>
                <p>A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
            </div>
        </div>
    ) : ( null );

    const userMenu = subMenus.userMenu ? (
        <div className="nav_user_menu">
            <h6 className="nav_sub_title">Menu</h6>
            <div className="nav_sub_link">
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
                    <span className="nav_icon material-icons" onClick={() => toggleSubMenu('boardsIndex')}>insert_chart_outlined</span>
                </div>
                <div className="nav_mid">
                    <Logo />
                </div>
                <div className="nav_right">
                    <span className="nav_icon material-icons" onClick={() => toggleSubMenu('createMenu')}>add</span>
                    <span className="nav_icon material-icons" onClick={() => toggleSubMenu('userMenu')}>person_outline</span>
                </div>
            </nav>
            
            { boardsIndex }
            { createMenu }
            { userMenu }
        </div>
    )
}



export default Navbar;