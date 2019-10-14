import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createBoard } from '../../../actions/board_actions';
import { updateSession } from '../../../actions/session_actions';
import { modalNewBoard } from '../../../actions/modals_action';

import BoardsIndexItem from './boards_index_item';



const PersonalBoards = styled.div``;


const BoardContext = (props) => {
    // SETUP
    const { boards } = props;
    const [userInfo, setUserInfo] = useState(props.currentUser);
    const [updateDebounce, setUpdateDebounce] = useState(() => debounce(1000))
    const personalBoards = userInfo.personalBoardIds ? userInfo.personalBoardIds : [];
    // const personalBoards = personalBoards.map(boardId => boards[boardId]);

    
    // ComponentDidUpdate
    useEffect(() => {
        if (userInfo !== props.currentUser) {
            setUserInfo(props.currentUser);
        }
    }, [props.currentUser]);
    

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
            <div className="boards_index-container">
                <div className="index_header">
                    <span className="index_title">Personal Boards</span>
                    <span className="index_add ui icon" onClick={props.modalNewBoard}>
                        <i className="material-icons">library_add</i>
                    </span>
                </div>
                
                <div className="boards_index-content">
                    <PersonalBoards className="boards_index-drop">
                        {personalBoards.map((boardId, idx) => {
                            const board = boards[boardId];
                            return <BoardsIndexItem key={board.id} board={board} index={idx} />;
                        })}
                        <div className="boards_index-add" onClick={props.modalNewBoard}>
                            <span>Create new board</span>
                        </div>
                    </PersonalBoards>
                    
                </div>
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