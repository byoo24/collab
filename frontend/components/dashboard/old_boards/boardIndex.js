import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


import { createBoard } from '../../../actions/board_actions';
import { isEmpty } from '../../../libs/helper_methods';

import BoardIndexDrop from './boardIndexDrop';
// import BoardIndexItem from './boardIndexDrag';


class BoardIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            boards: {},
            boardOrder: []
        }
    }

    componentDidMount() {
        const {boards} = this.props;
        const {boardOrder} = this.props;
        this.setState({boards, boardOrder});
    }

    componentDidUpdate() {
        if(this.props.boards !== this.state.boards) {
            this.setState({boards: this.props.boards});
        }

        if (this.props.boardOrder !== this.state.boardOrder) {
            this.setState({ boardOrder: this.props.boardOrder });
        }
    }


    onDragEnd(result) {
        // TODO reorder column
    }

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            
            >
                {this.state.boardOrder.map((boardId) => {
                    const board = this.state.boards[boardId];
    
                    return <BoardIndexDrop key={board.id} board={board} />;
                })}
            </DragDropContext>
        )
    }
}



// const BoardIndex = (props) => {

    



//     return (
//         <div className="board_index">
//             <div className="board_index-container">

//                 <DragDropContext onDragEnd={onDragEnd}>
//                     {
//                         boardOrder.map((boardId, idx) => {
//                             const board = boards[boardId];
//                             
//                             return (
//                                 <Droppable key={boardId} droppableId={boardId}>
//                                     {(provided) => (
//                                         <div
//                                             className="board_index-item"
//                                             innerRef={provided.innerRef}
//                                             {...provided.droppableProps}
//                                         >
//                                             <BoardIndexItem board={board} index={idx} />
//                                             {provided.placeholder}
//                                         </div>
//                                     )}
//                                 </Droppable>
//                             )
//                         })
//                     }

//                 </DragDropContext>











//                 <div className="board_index-item">
//                     <form className="add_board_item" onSubmit={(e) => handleCreateBoard(e)}>
//                         <input
//                             type="text"
//                             placeholder="Add a title..."
//                             value={newBoardInfo.name}
//                             onChange={(e) => updateNewBoardInfo("name", e.target.value)} />

//                         <input
//                             type="text"
//                             placeholder="Add a description..."
//                             value={newBoardInfo.description}
//                             onChange={(e) => updateNewBoardInfo("description", e.target.value)} />

//                         <input type="submit" value="Add Board!" />
//                     </form>
//                 </div>
//             </div>

//         </div>
//     )
// }





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