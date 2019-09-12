import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createBoard } from '../../actions/board_actions';
import { getUserInfo } from '../../actions/user_actions';

const Dashboard = (props) => {
    const [count, setCount] = useState(0);

    const handleCreateBoard = () => {
        const boardInfo = {
            name: `Board #${count}`,
            description: "abc",
            userId: props.currentUserId
        }
        
        props.createBoard(boardInfo);

        setCount(count + 1);
    }

    return (
        <div>
            <button className="getUser" onClick={() => props.getUserInfo(props.currentUserId)}>GET USER INFO</button>
            <button className="board" onClick={handleCreateBoard}>Create Board</button>
            <ul>
                { Object.values(props.boards).map(board => {
                    return (
                        <li key={board.id}>
                            { board.name }
                        </li>
                    )
                }) }
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
        getUserInfo: (userId) => dispatch(getUserInfo(userId)),
        createBoard: (board) => dispatch(createBoard(board))
    }
}

export default connect(msp, mdp)(Dashboard);