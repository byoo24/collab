import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';


const Container = styled.div`
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Title = styled.p``;



const CardRows = (props) => {
    const { index, card } = props;
    
    return(
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    className="card_item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    onClick={() => console.log(index)}
                >
                    <Title>{card.name}</Title>
                </Container>
            )}
        </Draggable>
    )
}




export default CardRows;