import React from 'react';
import { Link } from 'react-router-dom';

const BoardsIndexItem = (props) => {
    const { board, deleteBoard } = props;
    const bgColor = board.bgColor ? board.bgColor : 'gray';

    const handleDelete = () => {
        deleteBoard(board);
    }

    return(
        <div className={`boards_index-item col-6-gutter col-md-4-gutter col-lg-3-gutter bg-${bgColor}`}>
            <span className="boards_index-close material-icons" onClick={handleDelete}>clear</span>
            <Link to={`/dashboard/boards/${board.id}`} className="boards_index-link">
                <h6>{board.name}</h6>
            </Link>
        </div>
    )
}


export default BoardsIndexItem;