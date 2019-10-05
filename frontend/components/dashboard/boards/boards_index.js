import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { createBoard } from '../../../actions/board_actions';
import { updateSession } from '../../../actions/session_actions';

import BoardsDraggableItem from './boards_draggable_item';



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


    function onDragEnd(result) {
        const { destination, source, draggableId } = result;

        // Dropped item in an invalid area
        if (!destination) {
            return;
        }

        // Dropped the item in it's original location
        if ( destination.droppableId === source.droppableId &&
             destination.index === source.index ) {
            return;
        }

        const newBoardOrder = Array.from(boardOrder);
        newBoardOrder.splice(source.index, 1);
        newBoardOrder.splice(destination.index, 0, draggableId);

        updateUserInfo('personalBoardIds', newBoardOrder);        
    }


    return(
        <div className="boards_index-main">
            <div className="board_index-container">
                <DragDropContext onDragEnd={onDragEnd}>
                    <h2>Personal Boards</h2>
                    <Droppable droppableId="personal-boards" direction="horizontal">
                        {(provided) => (
                            <PersonalBoards
                                className="boards_index-personal"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {personalBoards.map((boardId, idx) => {
                                    const board = boards[boardId];
                                    return <BoardsDraggableItem key={board.id} board={board} index={idx} />;
                                })}
                            </PersonalBoards>
                        )}
                    </Droppable>
                    {/* <BoardsDropZone id="personal-boards" user={userInfo} boards={personalBoards}/> */}
                </DragDropContext>
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
        updateSession: (user) => dispatch(updateSession(user))
    }
}



export default connect(msp, mdp)(BoardContext);