import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createBoard } from '../../../actions/board_actions';
import { updateSession } from '../../../actions/session_actions';
import { modalNewBoard } from '../../../actions/modals_action';

import BoardsIndexItem from './boards_index_item';
import NavBar from '../../navbar/dashboard_nav';



const PersonalBoards = styled.div``;


const BoardContext = (props) => {
    // SETUP
    const { currentUser, boards } = props;
    const [userInfo, setUserInfo] = useState(currentUser);
    const [updateDebounce, setUpdateDebounce] = useState(() => debounce(1000))
    const personalBoards = userInfo.personalBoardIds ? userInfo.personalBoardIds : [];
    // const personalBoards = personalBoards.map(boardId => boards[boardId]);

    
    // ComponentDidUpdate
    useEffect(() => {
        if (userInfo !== currentUser) {
            setUserInfo(currentUser);
        }
    }, [currentUser, userInfo]);
    

    // setState for UserInfo
    function updateUserInfo (field, value) {
        const copyUserInfo = Object.assign({}, userInfo);

        copyUserInfo[field] = value;
        setUserInfo(copyUserInfo);
        updateDebounce(copyUserInfo);
    }


    function debounce(interval) {
        let timeout;

        return (arg) => {
            const fnCall = () => {
                timeout = null;
                props.updateSession(arg);
            }

            clearTimeout(timeout);
            timeout = setTimeout(fnCall, interval);
        }
    }




    return(
        <div className="boards_index-main">
            
            <NavBar currentUser={currentUser} logout={props.logout} />
            
            <div className="boards_index-container">
                <div className="boards_index-header">
                    <span className="index_title">Personal Boards</span>
                    <span className="index_add ui icon" onClick={props.modalNewBoard}>
                        <i className="material-icons">library_add</i>
                    </span>
                </div>


                <PersonalBoards className="boards_index-drop row">
                    {personalBoards.map((boardId, idx) => {
                        const board = boards[boardId];
                        return <BoardsIndexItem key={board.id} board={board} index={idx} />;
                    })}
                    <div className="boards_index-add col-6-gutter col-md-4-gutter col-lg-3-gutter bg-gray" onClick={props.modalNewBoard}>
                        <span className="boards_index-link">Create new board</span>
                    </div>
                </PersonalBoards>
                
            </div>
        </div>
    )
}







const msp = (state) => {
    // Personal Board Index
    const currentUser = state.session || {};

    return {
        currentUser,
        boards: state.boards,
    }
}


const mdp = (dispatch) => {
    return {
        createBoard: (board) => dispatch(createBoard(board)),
        updateSession: (user) => dispatch(updateSession(user)),
        modalNewBoard: () => dispatch(modalNewBoard())
    }
}



export default connect(msp, mdp)(BoardContext);