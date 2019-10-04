import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

import { createBoard } from '../../../actions/board_actions';

import BoardsDraggableItem from './boards_draggable_item';

const BoardDropZone = (props) => {
    const { id, user, boards } = props;

    const [newBoardInfo, setNewBoardInfo] = useState({
        name: "",
        description: "",
        userId: user.id
    });


    // setState for NewBoardInfo
    function updateNewBoardInfo(field, value) {
        const copyBoardInfo = Object.assign({}, newBoardInfo);

        copyBoardInfo[field] = value;
        setNewBoardInfo(copyBoardInfo);
    }


    // clearState for NewBoardInfo
    function clearNewBoardInfo() {
        setNewBoardInfo({
            name: "",
            description: "",
            userId: user.id
        })
    }


    // Form Submission
    function handleCreateBoard(e) {
        e.preventDefault();

        props.createBoard(newBoardInfo);
        clearNewBoardInfo();
    }




    return(
        <>
            <Droppable droppableId={id} direction="horizontal">
                {(provided) => (
                    <div className="boards_index-drop"
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >

                        {boards.map((board, idx) => <BoardsDraggableItem key={board.id} board={board} index={idx} />)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div className="board_index-item">
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
            </div>
        </>
    )
}






const mdp = (dispatch) => {
    return {
        createBoard: (board) => dispatch(createBoard(board))
    }
}

export default connect(null, mdp)(BoardDropZone);