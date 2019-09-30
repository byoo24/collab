import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


import { createBoard } from '../../../actions/board_actions';
import { isEmpty } from '../../../libs/helper_methods';

import BoardIndexItem from './_boardIndexItem';


const BoardIndex = (props) => {

    // SETUP
    const { match, currentUser, boards } = props;
    const [boardOrder, setboardOrder] = useState(props.boardOrder);

    const [newBoardInfo, setNewBoardInfo] = useState({
        name: "",
        description: "",
        userId: currentUser.id
    });

    useEffect(() => {
        if (boardOrder !== props.boardOrder) {
            setboardOrder(props.boardOrder);
        }
    }, [props.boardOrder])


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



    const onDragEnd = result => {
        // the item was dropped
    }




    return (
        <div className="board_index">
            <div className="board_index-container">

                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        boardOrder.map((boardId, idx) => {
                            const board = boards[boardId];
                            
                            return (
                                <Droppable key={boardId} droppableId={boardId}>
                                    {(provided) => (
                                        <div
                                            className="board_index-item"
                                            innerref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <BoardIndexItem board={board} index={idx} />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            )
                        })
                    }

                </DragDropContext>











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
            </div>

        </div>
    )
}





const msp = (state, ownProps) => {
    // Personal Board Index
    const currentUser = ownProps.currentUser || {};
    const personalBoardIds = currentUser.personalBoardIds ? currentUser.personalBoardIds : [];
    // const boards = isEmpty(state.boards) ? [] : personalBoardIds.map(boardId => state.boards[boardId]);

    return {
        currentUser,
        boards: state.boards,
        boardOrder: personalBoardIds
    }
}


const mdp = (dispatch) => {
    return {
        createBoard: (board) => dispatch(createBoard(board)),
    }
}



export default connect(msp, mdp)(BoardIndex);