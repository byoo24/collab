import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// const BoardIndexItem = (props) => {
//     return (
//         <Draggable draggableId={props.board.id} index={props.index}>
//             {(provided) => {
//                 <div
//                     className="board_index-item-container"
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     innerRef={provided.innerRef}
//                 >

//                     <h3>{props.board.name}</h3>
//                     <p>{props.board.description}</p>
//                 </div>
//             }}

//         </Draggable>
//     )
// }


export default class BoardIndexItem extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.board.id} index={this.props.index}>
                {(provided) => (
                    <div
                        className="board_index-item-container"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerref={provided.innerRef}
                    >

                        <h3>{this.props.board.name}</h3>
                        <p>{this.props.board.description}</p>
                    </div>
                )}

            </Draggable>
        )
    }
}


// export default BoardIndexItem;