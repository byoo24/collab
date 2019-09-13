import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createBoard } from '../../actions/board_actions';
import { getUserCollections } from '../../actions/user_actions';

import Board from '../dashboard/board';

const Dashboard = (props) => {
    const [boardName, setBoardName] = useState("");
    const [boardDescription, setBoardDescription] = useState("");

    const [countLists, setCountLists] = useState(0);


    useEffect(() => {
        props.getUserCollections(props.currentUserId);
    }, []);


    const handleCreateBoard = (e) => {
        e.preventDefault();

        const boardInfo = {
            name: boardName,
            description: boardDescription,
            userId: props.currentUserId
        }
        
        props.createBoard(boardInfo);
    }

    const handleCreateList = (boardId) => {
        const listInfo = {
            name: `List #${countLists}`,
            boardId
        }
        props.createList(listInfo);

        setCountLists(countLists + 1);
    }

    return (
        <div>
            <button className="getUser" onClick={() => props.getUserInfo(props.currentUserId)}>GET USER INFO</button>
            <button className="board" onClick={handleCreateBoard}>Create Board</button>
            <ul className="board_index">
                { Object.values(props.boards).map(board => {
                    return (
                        <div>
                            <Link key={board.id} to={`/board/${board.id}`}>
                                {board.name}
                            </Link>
                        </div>

                        // <li key={board.id}>
                        //     { board.name }
                        //     <button className="addList" onClick={() => handleCreateList(board.id)}>Add List</button>
                        // </li>
                    )
                }) }

                <li className="board_item">
                    <form className="add_board_item" onSubmit={(e) => handleCreateBoard(e)}>
                        <input 
                            type="text"
                            placeholder="Add a title..."
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)} />
                        
                        <input
                            type="text"
                            placeholder="Add a description..."
                            value={boardDescription}
                            onChange={(e) => setBoardDescription(e.target.value)} />

                        <input type="submit" value="Add Board"/>
                    </form>
                </li>
            </ul>

        </div>
    )
}





const msp = (state) => {
    return {
        boards: state.boards,
        currentUserId: state.session.currentUser.id
    }
}


const mdp = (dispatch) => {
    return {
        getUserCollections: (userId) => dispatch(getUserCollections(userId)),
        createBoard: (board) => dispatch(createBoard(board))
    }
}

export default connect(msp, mdp)(Dashboard);