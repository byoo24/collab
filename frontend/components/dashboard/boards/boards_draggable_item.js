import React from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to={`/dashboard/boards/${board.id}`}>
                        <h3>{board.name}</h3>
                    </Link>
                </div>

            )}
        </Draggable>
    )
}


export default BoardDraggableItem;