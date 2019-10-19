import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createBoard, deleteBoard } from '../../../actions/board_actions';
import { updateSession } from '../../../actions/session_actions';
import { modalNewBoard } from '../../../actions/modals_action';

import BoardsIndexItem from './boards_index_item';
import NavBar from '../../navbar/dashboard_nav';



const PersonalBoards = styled.div``;


const BoardContext = (props) => {
    // SETUP
    const { currentUser, boards } = props;
    const personalBoards = currentUser.personalBoardIds ? currentUser.personalBoardIds : [];


    return(
        <div className="boards_index-main">
            
            <NavBar currentUser={currentUser} logout={props.logout} boards={boards} />
            
            <div className="boards_index-container">
                <div className="boards_index-header">
                    <h4 className="index_title">Personal Boards</h4>
                </div>


                <PersonalBoards className="boards_index-drop row">
                    {personalBoards.map((boardId) => {
                        const board = boards[boardId];
                        return <BoardsIndexItem key={board.id} board={board} deleteBoard={props.deleteBoard} />;
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
        deleteBoard: (board) => dispatch(deleteBoard(board)),
        updateSession: (user) => dispatch(updateSession(user)),
        modalNewBoard: () => dispatch(modalNewBoard())
    }
}



export default connect(msp, mdp)(BoardContext);