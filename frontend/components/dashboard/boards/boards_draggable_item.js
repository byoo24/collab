import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const BoardDraggableItem = (props) => {
    const { board, index } = props;
    return(
        <Draggable
            draggableId={board.id}
            index={index}
        >
            {(provided) => (
                <div 
                    className="board_index-drag"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <h3>{props.board.name}</h3>
                </div>

            )}
        </Draggable>
    )
}


export default BoardDraggableItem;