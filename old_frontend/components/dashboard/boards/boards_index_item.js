import React from 'react';
import { Link } from 'react-router-dom';

const BoardsIndexItem = (props) => {
    const { board } = props;
    return(
        <div className="boards_index-item">
            <Link to={`/dashboard/boards/${board.id}`} className="boards_index-link">
                <h4>{board.name}</h4>
            </Link>
        </div>
    )
}


export default BoardsIndexItem;