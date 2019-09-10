import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createBoard } from '../../actions/board_actions';

const Dashboard = (props) => {
    const [count, setCount] = useState(0);
    const [boardInfo, setBoardInfo] = useState({
        name: `Board #${count}`,
        userId: props.currentUser
    });

    const handleCreateBoard = () => {
        props.createBoard(boardInfo);
        setCount(count + 1);
    }

    return (
        <div>
            <button className="board" onClick={handleCreateBoard}>Create Board</button>

        </div>
    )
}



const msp = (state) => {
    return {
        currentUser: state.session.currentUser
    }
}


const mdp = (dispatch) => {
    return {
        createBoard: (board) => dispatch(createBoard(board))
    }
}

export default connect(msp, mdp)(Dashboard);