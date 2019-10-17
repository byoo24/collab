import React from 'react';
import { Link } from 'react-router-dom';

const BoardsIndexItem = (props) => {
    const { board } = props;
    const bgColor = board.bgColor ? board.bgColor : 'gray';

    return(
        <div className={`boards_index-item col-6-gutter col-md-4-gutter col-lg-3-gutter bg-${bgColor}`}>
            <Link to={`/dashboard/boards/${board.id}`} className="boards_index-link">
                <h6>{board.name}</h6>
            </Link>
        </div>
    )
}


export default BoardsIndexItem;