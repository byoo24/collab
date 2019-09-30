import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import BoardIndexDrag from './boardIndexDrag'

class BoardIndexDrop extends React.Component {
    render() {

        return(
            <div className="board_index-container">
                <Droppable droppableId={this.props.board.id}>
                    {(provided) => (
                        <div
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <BoardIndexDrag key={this.props.board.id} board={this.props.board} />
                            {provided.placeholder}
                        </div>

                    )}
                </Droppable>
                
            </div>
        );
    }
}


export default BoardIndexDrop;