import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createBoard } from '../../../actions/board_actions';
import { isEmpty } from '../../../libs/helper_methods'


const BoardIndex = (props) => {

    // SETUP
    const { match, currentUser, boards } = props;

    const [newBoardInfo, setNewBoardInfo] = useState({
        name: "",
        description: "",
        userId: currentUser.id
    });


    // Update State
    const updateNewBoardInfo = (field, value) => {
        const copyBoardInfo = Object.assign({}, newBoardInfo);

        copyBoardInfo[field] = value;
        setNewBoardInfo(copyBoardInfo);
    }


    // Clear State
    const clearNewBoardInfo = () => {
        setNewBoardInfo({
            name: "",
            description: "",
            userId: currentUser.id
        });
    }


    // Form Submission
    const handleCreateBoard = (e) => {
        e.preventDefault();

        props.createBoard(newBoardInfo);
        clearNewBoardInfo();
    }
    

    // Board Index
    const boardItems = boards.map(board => {
        return (
            <li key={board.id} className="board_item">
                <Link to={match.url + `/board/${board.id}`}>
                    {board.name}
                </Link>
            </li>
        )
    });


    return (
        <div className="board_index">
            <h1>BOARD INDEX</h1>
            <ul className="board_index-container">

                { boardItems }

                <li className="board_item">
                    <form className="add_board_item" onSubmit={(e) => handleCreateBoard(e)}>
                        <input
                            type="text"
                            placeholder="Add a title..."
                            value={newBoardInfo.name}
                            onChange={(e) => updateNewBoardInfo("name", e.target.value)} />

                        <input
                            type="text"
                            placeholder="Add a description..."
                            value={newBoardInfo.description}
                            onChange={(e) => updateNewBoardInfo("description", e.target.value)} />

                        <input type="submit" value="Add Board!" />
                    </form>
                </li>
            </ul>

        </div>
    )
}





const msp = (state, ownProps) => {
    // Personal Board Index
    const currentUser = ownProps.currentUser || {};
    const personalBoardIds = currentUser.personalBoardIds ? currentUser.personalBoardIds : [];
    const boards = isEmpty(state.boards) ? [] : personalBoardIds.map(boardId => state.boards[boardId]);

    return {
        currentUser,
        boards
    }
}


const mdp = (dispatch) => {
    return {
        createBoard: (board) => dispatch(createBoard(board)),
    }
}



export default connect(msp, mdp)(BoardIndex);