import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { CustomRoute } from '../../util/route_util';
import { connect } from 'react-redux';

import { getSessionData } from '../../actions/session_actions';
import { createBoard } from '../../actions/board_actions';
import { createList } from '../../actions/list_actions';


import BoardIndex from './boards/boardIndex';
import Board from './boards/board';



const Dashboard = (props) => {

    // SETUP
    const { match } = props;


    // ComponentDidMount
    useEffect(() => {
        props.getSessionData(props.currentUser.id);
    }, []);

    
     
    return (
        <div>
            <h1>Dashboard</h1>

            <Switch>
                <CustomRoute exact path={match.url + "/"} 
                        component={ BoardIndex } 
                        currentUser={ props.currentUser }
                        boards={ props.boards }
                        createBoard={ props.createBoard }
                />
                <CustomRoute exact path={match.url + "/board/:boardId"} 
                        component={ Board }
                        board={props.board}
                        lists={props.lists}
                        createList={props.createList}
                />
            </Switch>
        </div>
    )
}




const msp = (state, ownProps) => {
    
    // Personal Board Index
    const currentUser = state.session || null;
    const personalBoardIds = currentUser ? currentUser.personalBoardIds : null;
    const boards = personalBoardIds ? personalBoardIds.map(boardId => state.boards[boardId]) : null;

    return {
        currentUser,
        boards
    }
}

const mdp = (dispatch) => {
    return {
        getSessionData: (userId) => dispatch(getSessionData(userId)),
        createBoard: (board) => dispatch(createBoard(board)),
    }
}

export default connect(msp, mdp)(Dashboard);